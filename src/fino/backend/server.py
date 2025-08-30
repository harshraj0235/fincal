from fastapi import FastAPI, HTTPException, WebSocket
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
import spacy
import requests
import json
import redis
import asyncio
from typing import Optional, List, Dict, Any
import logging
from datetime import datetime, timedelta
import re

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(title="Fino Finance Chat API", version="1.0.0")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify your frontend domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize Redis (fallback to in-memory if Redis not available)
try:
    redis_client = redis.Redis(host='localhost', port=6379, db=0, decode_responses=True)
    redis_client.ping()
    logger.info("Connected to Redis")
except:
    redis_client = None
    logger.warning("Redis not available, using in-memory cache")

# Initialize spaCy for English NLP
try:
    nlp_en = spacy.load("en_core_web_sm")
    logger.info("Loaded spaCy English model")
except:
    nlp_en = None
    logger.warning("spaCy English model not available")

# Pydantic models
class QueryRequest(BaseModel):
    query: str
    lang: str = "en"
    timestamp: Optional[datetime] = None

class QueryResponse(BaseModel):
    query: str
    response: Dict[str, Any]
    timestamp: datetime

class StockData(BaseModel):
    name: str
    price: float
    change: float
    change_percent: float
    volume: int
    market_cap: str
    high_52_week: float
    low_52_week: float

class InsurancePlan(BaseModel):
    name: str
    company: str
    premium: int
    coverage: str
    features: List[str]
    rating: float

class TaxSlab(BaseModel):
    min_income: int
    max_income: int
    rate: int
    description: str

# Mock data for development
MOCK_STOCK_DATA = {
    'reliance': StockData(
        name='Reliance Industries',
        price=2450.25,
        change=15.50,
        change_percent=0.64,
        volume=1250000,
        market_cap='16.5L Cr',
        high_52_week=2850.00,
        low_52_week=2100.00
    ),
    'tcs': StockData(
        name='TCS',
        price=3850.75,
        change=-25.30,
        change_percent=-0.65,
        volume=850000,
        market_cap='14.2L Cr',
        high_52_week=4200.00,
        low_52_week=3200.00
    ),
    'infosys': StockData(
        name='Infosys',
        price=1450.50,
        change=8.75,
        change_percent=0.61,
        volume=950000,
        market_cap='6.1L Cr',
        high_52_week=1650.00,
        low_52_week=1200.00
    ),
    'hdfc': StockData(
        name='HDFC Bank',
        price=1650.80,
        change=12.40,
        change_percent=0.76,
        volume=1100000,
        market_cap='12.8L Cr',
        high_52_week=1800.00,
        low_52_week=1400.00
    )
}

MOCK_INSURANCE_PLANS = [
    InsurancePlan(
        name='LIC Term Plan',
        company='LIC',
        premium=25000,
        coverage='₹1 Crore',
        features=['High Coverage', 'Low Premium', 'Tax Benefits'],
        rating=4.5
    ),
    InsurancePlan(
        name='HDFC Life Click 2 Protect',
        company='HDFC Life',
        premium=30000,
        coverage='₹1.5 Crore',
        features=['Flexible Premium', 'Multiple Riders', 'Online Purchase'],
        rating=4.3
    ),
    InsurancePlan(
        name='Max Life Smart Term',
        company='Max Life',
        premium=28000,
        coverage='₹1.2 Crore',
        features=['Return of Premium', 'Critical Illness', 'Accidental Death'],
        rating=4.4
    )
]

MOCK_TAX_SLABS = [
    TaxSlab(min_income=0, max_income=300000, rate=0, description='Up to ₹3 Lakh'),
    TaxSlab(min_income=300001, max_income=600000, rate=5, description='₹3-6 Lakh'),
    TaxSlab(min_income=600001, max_income=900000, rate=10, description='₹6-9 Lakh'),
    TaxSlab(min_income=900001, max_income=1200000, rate=15, description='₹9-12 Lakh'),
    TaxSlab(min_income=1200001, max_income=1500000, rate=20, description='₹12-15 Lakh'),
    TaxSlab(min_income=1500001, max_income=999999999, rate=30, description='Above ₹15 Lakh')
]

# Utility functions
def get_cache_key(prefix: str, query: str) -> str:
    """Generate cache key for query"""
    return f"{prefix}:{hash(query.lower())}"

def get_cached_data(key: str) -> Optional[Any]:
    """Get data from cache"""
    if redis_client:
        try:
            data = redis_client.get(key)
            return json.loads(data) if data else None
        except:
            return None
    return None

def set_cached_data(key: str, data: Any, ttl: int = 3600) -> None:
    """Set data in cache"""
    if redis_client:
        try:
            redis_client.setex(key, ttl, json.dumps(data, default=str))
        except:
            pass

def check_robots_txt(url: str) -> bool:
    """Check if URL allows scraping"""
    try:
        robots_url = f"{url.rstrip('/')}/robots.txt"
        response = requests.get(robots_url, timeout=5)
        if "Disallow: /" in response.text:
            return False
        return True
    except:
        return True

def scrape_static_page(url: str) -> Optional[BeautifulSoup]:
    """Scrape static page with BeautifulSoup"""
    if not check_robots_txt(url):
        return None
    
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
    }
    
    try:
        response = requests.get(url, headers=headers, timeout=10)
        response.raise_for_status()
        return BeautifulSoup(response.text, "html.parser")
    except Exception as e:
        logger.error(f"Error scraping {url}: {e}")
        return None

def scrape_dynamic_page(url: str) -> Optional[BeautifulSoup]:
    """Scrape dynamic page with Selenium"""
    if not check_robots_txt(url):
        return None
    
    options = Options()
    options.add_argument("--headless")
    options.add_argument("--no-sandbox")
    options.add_argument("--disable-dev-shm-usage")
    
    try:
        driver = webdriver.Chrome(options=options)
        driver.get(url)
        soup = BeautifulSoup(driver.page_source, "html.parser")
        driver.quit()
        return soup
    except Exception as e:
        logger.error(f"Error scraping dynamic page {url}: {e}")
        return None

def extract_stock_name(query: str) -> str:
    """Extract stock name from query"""
    query_lower = query.lower()
    stocks = list(MOCK_STOCK_DATA.keys())
    
    for stock in stocks:
        if stock in query_lower:
            return stock
    
    # Try to extract from spaCy if available
    if nlp_en:
        doc = nlp_en(query)
        for ent in doc.ents:
            if ent.label_ == "ORG":
                return ent.text.lower().replace(" ", "")
    
    return "reliance"  # Default fallback

def get_stock_price(stock_name: str) -> Optional[StockData]:
    """Get stock price data"""
    cache_key = get_cache_key("stock", stock_name)
    cached_data = get_cached_data(cache_key)
    
    if cached_data:
        return StockData(**cached_data)
    
    # For now, return mock data
    # In production, implement real scraping
    stock_data = MOCK_STOCK_DATA.get(stock_name.lower())
    
    if stock_data:
        set_cached_data(cache_key, stock_data.dict(), 300)  # 5 minutes cache
        return stock_data
    
    return None

def get_insurance_plans(query: str) -> List[InsurancePlan]:
    """Get insurance plans data"""
    cache_key = get_cache_key("insurance", query)
    cached_data = get_cached_data(cache_key)
    
    if cached_data:
        return [InsurancePlan(**plan) for plan in cached_data]
    
    # For now, return mock data
    # In production, implement real scraping
    set_cached_data(cache_key, [plan.dict() for plan in MOCK_INSURANCE_PLANS], 3600)
    return MOCK_INSURANCE_PLANS

def get_tax_info(query: str) -> List[TaxSlab]:
    """Get tax information"""
    cache_key = get_cache_key("tax", query)
    cached_data = get_cached_data(cache_key)
    
    if cached_data:
        return [TaxSlab(**slab) for slab in cached_data]
    
    # For now, return mock data
    # In production, implement real scraping
    set_cached_data(cache_key, [slab.dict() for slab in MOCK_TAX_SLABS], 3600)
    return MOCK_TAX_SLABS

def process_hindi_query(query: str) -> Dict[str, Any]:
    """Process Hindi query (simplified implementation)"""
    query_lower = query.lower()
    
    # Simple keyword matching for Hindi
    if any(word in query_lower for word in ['शेयर', 'स्टॉक', 'मूल्य', 'price']):
        stock_name = extract_stock_name(query)
        stock_data = get_stock_price(stock_name)
        
        if stock_data:
            content = f"{stock_data.name} का वर्तमान शेयर मूल्य ₹{stock_data.price:.2f} है। यह ₹{stock_data.change:.2f} ({stock_data.change_percent:.2f}%) {'बढ़ा' if stock_data.change >= 0 else 'गिरा'} है।"
            
            return {
                "type": "stock",
                "content": content,
                "data": stock_data.dict(),
                "suggestions": [
                    "मूल्य ट्रेंड दिखाएं",
                    "अन्य स्टॉक से तुलना करें",
                    "मेरे निवेश रिटर्न की गणना करें"
                ],
                "chartData": generate_stock_chart(stock_data),
                "source": "Moneycontrol"
            }
    
    elif any(word in query_lower for word in ['बीमा', 'insurance']):
        plans = get_insurance_plans(query)
        content = f"भारत में शीर्ष जीवन बीमा योजनाएं:\n\n" + "\n".join([
            f"• {plan.name} ({plan.company})\n  - कवरेज: {plan.coverage}\n  - प्रीमियम: ₹{plan.premium:,}/वर्ष\n  - रेटिंग: {plan.rating}/5"
            for plan in plans
        ])
        
        return {
            "type": "insurance",
            "content": content,
            "data": [plan.dict() for plan in plans],
            "suggestions": [
                "मेरी उम्र के लिए प्रीमियम की गणना करें",
                "बीमा योजनाओं की तुलना करें",
                "स्वास्थ्य बीमा विकल्प दिखाएं"
            ],
            "chartData": generate_insurance_chart(plans),
            "source": "Policybazaar"
        }
    
    elif any(word in query_lower for word in ['कर', 'tax', 'आयकर']):
        slabs = get_tax_info(query)
        content = f"2024 के लिए आयकर स्लैब:\n\n" + "\n".join([
            f"• {slab.description}: {slab.rate}%"
            for slab in slabs
        ]) + "\n\nनोट: यह नई कर व्यवस्था के अनुसार है।"
        
        return {
            "type": "tax",
            "content": content,
            "data": [slab.dict() for slab in slabs],
            "suggestions": [
                "मेरी कर देनदारी की गणना करें",
                "कर बचत विकल्प दिखाएं",
                "पुरानी बनाम नई कर व्यवस्था की तुलना करें"
            ],
            "chartData": generate_tax_chart(slabs),
            "source": "ClearTax"
        }
    
    else:
        return {
            "type": "general",
            "content": "मैं स्टॉक, बीमा, ऋण, कर आदि के बारे में मदद कर सकता हूं। कृपया फिर से पूछें!",
            "suggestions": ["/budget-planner", "/emi-calculator"]
        }

def process_english_query(query: str) -> Dict[str, Any]:
    """Process English query"""
    query_lower = query.lower()
    
    if any(word in query_lower for word in ['stock', 'share', 'price']):
        stock_name = extract_stock_name(query)
        stock_data = get_stock_price(stock_name)
        
        if stock_data:
            content = f"The current stock price of {stock_data.name} is ₹{stock_data.price:.2f}. It has {'increased' if stock_data.change >= 0 else 'decreased'} by ₹{stock_data.change:.2f} ({stock_data.change_percent:.2f}%)."
            
            return {
                "type": "stock",
                "content": content,
                "data": stock_data.dict(),
                "suggestions": [
                    "Show me the price trend",
                    "Compare with other stocks",
                    "Calculate my investment returns",
                    "What is the 52-week high/low?"
                ],
                "chartData": generate_stock_chart(stock_data),
                "source": "Moneycontrol"
            }
    
    elif any(word in query_lower for word in ['insurance', 'life insurance']):
        plans = get_insurance_plans(query)
        content = f"Top life insurance plans in India:\n\n" + "\n".join([
            f"• {plan.name} ({plan.company})\n  - Coverage: {plan.coverage}\n  - Premium: ₹{plan.premium:,}/year\n  - Rating: {plan.rating}/5"
            for plan in plans
        ])
        
        return {
            "type": "insurance",
            "content": content,
            "data": [plan.dict() for plan in plans],
            "suggestions": [
                "Calculate premium for my age",
                "Compare insurance plans",
                "Show me health insurance options",
                "What are the tax benefits?"
            ],
            "chartData": generate_insurance_chart(plans),
            "source": "Policybazaar"
        }
    
    elif any(word in query_lower for word in ['tax', 'income tax', 'tax slab']):
        slabs = get_tax_info(query)
        content = f"Income tax slabs for 2024:\n\n" + "\n".join([
            f"• {slab.description}: {slab.rate}%"
            for slab in slabs
        ]) + "\n\nNote: This is according to the new tax regime."
        
        return {
            "type": "tax",
            "content": content,
            "data": [slab.dict() for slab in slabs],
            "suggestions": [
                "Calculate my tax liability",
                "Show tax saving options",
                "Compare old vs new tax regime",
                "What are the deductions available?"
            ],
            "chartData": generate_tax_chart(slabs),
            "source": "ClearTax"
        }
    
    elif any(word in query_lower for word in ['loan', 'emi', 'home loan', 'personal loan']):
        content = "To calculate EMI for home loan, please provide me with:\n\n• Loan amount (₹)\n• Interest rate (% per annum)\n• Tenure (in years)\n\nI'll provide you with detailed EMI calculation and interest breakdown."
        
        return {
            "type": "loan",
            "content": content,
            "data": {"needsInput": True},
            "suggestions": [
                "Calculate EMI for ₹50L loan at 8.5% for 20 years",
                "Compare different loan options",
                "Show me personal loan rates",
                "What is the processing fee?"
            ],
            "source": "BankBazaar"
        }
    
    else:
        general_responses = [
            "I can help you with stocks, insurance, loans, taxes, and other financial topics. Please ask your question clearly.",
            "What specific financial information are you looking for? I can assist with investments, savings, and financial planning.",
            "Feel free to ask me about any financial topic. I'm here to help with your money-related queries."
        ]
        
        import random
        content = random.choice(general_responses)
        
        return {
            "type": "general",
            "content": content,
            "suggestions": [
                "What is the current market trend?",
                "Best investment options for beginners",
                "How to save tax legally?",
                "Compare different insurance plans",
                "Calculate my retirement corpus"
            ]
        }

def generate_stock_chart(stock_data: StockData) -> Dict[str, Any]:
    """Generate chart data for stock"""
    return {
        "type": "line",
        "data": {
            "labels": ["9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM", "12:00 PM"],
            "datasets": [{
                "label": f"{stock_data.name} Price (₹)",
                "data": [
                    stock_data.price - 50,
                    stock_data.price - 30,
                    stock_data.price - 10,
                    stock_data.price + 20,
                    stock_data.price + 10,
                    stock_data.price
                ],
                "borderColor": "#10B981" if stock_data.change >= 0 else "#EF4444",
                "backgroundColor": "rgba(16, 185, 129, 0.1)" if stock_data.change >= 0 else "rgba(239, 68, 68, 0.1)",
                "tension": 0.4,
                "fill": True
            }]
        },
        "options": {
            "responsive": True,
            "plugins": {
                "title": {
                    "display": True,
                    "text": f"{stock_data.name} Price Trend"
                }
            }
        }
    }

def generate_insurance_chart(plans: List[InsurancePlan]) -> Dict[str, Any]:
    """Generate chart data for insurance plans"""
    return {
        "type": "bar",
        "data": {
            "labels": [plan.name for plan in plans],
            "datasets": [{
                "label": "Annual Premium (₹)",
                "data": [plan.premium for plan in plans],
                "backgroundColor": ["#3B82F6", "#10B981", "#8B5CF6"]
            }]
        },
        "options": {
            "responsive": True,
            "plugins": {
                "title": {
                    "display": True,
                    "text": "Insurance Plan Comparison"
                }
            }
        }
    }

def generate_tax_chart(slabs: List[TaxSlab]) -> Dict[str, Any]:
    """Generate chart data for tax slabs"""
    return {
        "type": "doughnut",
        "data": {
            "labels": [slab.description for slab in slabs],
            "datasets": [{
                "data": [slab.rate for slab in slabs],
                "backgroundColor": ["#10B981", "#3B82F6", "#8B5CF6", "#F59E0B", "#EF4444", "#EC4899"]
            }]
        },
        "options": {
            "responsive": True,
            "plugins": {
                "title": {
                    "display": True,
                    "text": "Income Tax Slabs 2024"
                }
            }
        }
    }

# API Endpoints
@app.get("/")
async def root():
    """Root endpoint"""
    return {"message": "Fino Finance Chat API", "version": "1.0.0", "status": "running"}

@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {
        "status": "healthy",
        "timestamp": datetime.now(),
        "redis_connected": redis_client is not None,
        "spacy_loaded": nlp_en is not None
    }

@app.post("/query", response_model=QueryResponse)
async def handle_query(request: QueryRequest):
    """Handle finance queries"""
    try:
        logger.info(f"Processing query: {request.query} in {request.lang}")
        
        if request.lang == "hi":
            response_data = process_hindi_query(request.query)
        else:
            response_data = process_english_query(request.query)
        
        return QueryResponse(
            query=request.query,
            response=response_data,
            timestamp=datetime.now()
        )
    
    except Exception as e:
        logger.error(f"Error processing query: {e}")
        error_response = {
            "type": "error",
            "content": "Sorry, I'm having trouble understanding your question. Please ask again." if request.lang == "en" else "क्षमा करें, मुझे आपके प्रश्न को समझने में कठिनाई हो रही है। कृपया अपना प्रश्न फिर से पूछें।",
            "suggestions": [
                "Try rephrasing your question",
                "Ask about stocks, insurance, loans, or taxes",
                "Use simpler language"
            ]
        }
        
        return QueryResponse(
            query=request.query,
            response=error_response,
            timestamp=datetime.now()
        )

@app.get("/popular-queries")
async def get_popular_queries(lang: str = "en"):
    """Get popular queries for suggestions"""
    queries = {
        "en": [
            "What is the current price of Reliance stock?",
            "Best life insurance plans in India",
            "Income tax slabs for 2024",
            "How to calculate EMI for home loan?",
            "Compare mutual fund returns",
            "What are the tax saving options?",
            "Stock market trends today",
            "Best investment options for beginners"
        ],
        "hi": [
            "रिलायंस का वर्तमान शेयर मूल्य क्या है?",
            "भारत में सर्वश्रेष्ठ जीवन बीमा योजनाएं",
            "2024 के लिए आयकर स्लैब",
            "होम लोन के लिए EMI कैसे कैलकुलेट करें?",
            "म्यूचुअल फंड रिटर्न की तुलना करें",
            "कर बचत के विकल्प क्या हैं?",
            "आज के स्टॉक मार्केट ट्रेंड",
            "शुरुआती लोगों के लिए सर्वश्रेष्ठ निवेश विकल्प"
        ]
    }
    
    return {"queries": queries.get(lang, queries["en"])}

@app.get("/market-status")
async def get_market_status():
    """Get current market status"""
    now = datetime.now()
    hour = now.hour
    day = now.weekday()
    
    # Market is open Monday to Friday, 9:15 AM to 3:30 PM IST
    is_weekday = day < 5
    is_market_hours = 9 <= hour < 16
    
    return {
        "isOpen": is_weekday and is_market_hours,
        "nextOpen": "Tomorrow 9:15 AM" if is_weekday and not is_market_hours else "Monday 9:15 AM",
        "currentTime": now.strftime("%H:%M:%S IST"),
        "day": now.strftime("%A")
    }

@app.websocket("/live-data")
async def websocket_endpoint(websocket: WebSocket):
    """WebSocket endpoint for live data updates"""
    await websocket.accept()
    
    try:
        while True:
            # Wait for client to send stock name
            data = await websocket.receive_text()
            
            if data.startswith("stock:"):
                stock_name = data.split(":")[1]
                stock_data = get_stock_price(stock_name)
                
                if stock_data:
                    await websocket.send_json({
                        "type": "stock_update",
                        "stock": stock_name,
                        "data": stock_data.dict(),
                        "timestamp": datetime.now().isoformat()
                    })
            
            # Update every 60 seconds
            await asyncio.sleep(60)
    
    except Exception as e:
        logger.error(f"WebSocket error: {e}")
        await websocket.close()

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=True)
