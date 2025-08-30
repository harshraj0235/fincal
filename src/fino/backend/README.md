# Fino Finance Chat Backend

A FastAPI-based backend service for the Fino Finance Chat System that provides real-time financial data and AI-powered responses.

## Features

- **AI-Powered Query Processing**: Natural language processing for English and Hindi queries
- **Real-time Financial Data**: Stock prices, insurance plans, tax information
- **Web Scraping**: Automated data collection from financial websites
- **Caching**: Redis-based caching for improved performance
- **WebSocket Support**: Real-time data updates
- **Multi-language Support**: English and Hindi query processing

## Quick Start

### Prerequisites

- Python 3.8+
- Redis (optional, for caching)
- Chrome/Chromium (for Selenium web scraping)

### Installation

1. **Clone and navigate to backend directory**:
   ```bash
   cd src/fino/backend
   ```

2. **Install dependencies**:
   ```bash
   python start.py
   ```
   
   Or manually:
   ```bash
   pip install -r requirements.txt
   python -m spacy download en_core_web_sm
   ```

3. **Start Redis (optional)**:
   ```bash
   # Using Docker
   docker run -d -p 6379:6379 redis
   
   # Or install locally
   # Ubuntu/Debian: sudo apt install redis-server
   # macOS: brew install redis
   # Windows: Download from https://redis.io/download
   ```

4. **Run the server**:
   ```bash
   python start.py
   ```
   
   Or manually:
   ```bash
   uvicorn server:app --host 0.0.0.0 --port 8000 --reload
   ```

The API will be available at `http://localhost:8000`

## API Endpoints

### Core Endpoints

- `GET /` - API information
- `GET /health` - Health check
- `POST /query` - Process finance queries
- `GET /popular-queries` - Get popular query suggestions
- `GET /market-status` - Get market status
- `WebSocket /live-data` - Real-time data updates

### Query Processing

Send POST requests to `/query` with:

```json
{
  "query": "What is the current price of Reliance stock?",
  "lang": "en"
}
```

Response:
```json
{
  "query": "What is the current price of Reliance stock?",
  "response": {
    "type": "stock",
    "content": "The current stock price of Reliance Industries is ₹2450.25...",
    "data": {...},
    "suggestions": [...],
    "chartData": {...},
    "source": "Moneycontrol"
  },
  "timestamp": "2024-01-15T10:30:00"
}
```

## Supported Query Types

### Stock Information
- "What is the current price of Reliance stock?"
- "Show me TCS share price"
- "रिलायंस का शेयर मूल्य क्या है?"

### Insurance
- "Best life insurance plans in India"
- "Compare insurance policies"
- "भारत में सर्वश्रेष्ठ बीमा योजनाएं"

### Tax Information
- "Income tax slabs for 2024"
- "Tax saving options"
- "2024 के लिए आयकर स्लैब"

### Loans
- "How to calculate EMI for home loan?"
- "Personal loan interest rates"
- "होम लोन के लिए EMI कैसे कैलकुलेट करें?"

## Configuration

### Environment Variables

Create a `.env` file:

```env
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_DB=0
WEBDRIVER_PATH=/usr/bin/chromedriver
PROXY_URL=
DEBUG=True
```

### Redis Configuration

The system works without Redis but performs better with it:

```python
# Redis settings
REDIS_HOST = "localhost"
REDIS_PORT = 6379
REDIS_DB = 0
```

## Development

### Project Structure

```
backend/
├── server.py          # Main FastAPI application
├── requirements.txt   # Python dependencies
├── start.py          # Startup script
├── README.md         # This file
└── .env              # Environment variables (create this)
```

### Adding New Data Sources

1. **Create scraping function**:
   ```python
   def scrape_new_source(url: str) -> Optional[BeautifulSoup]:
       # Implementation
   ```

2. **Add data processing**:
   ```python
   def process_new_data(query: str) -> Dict[str, Any]:
       # Implementation
   ```

3. **Update query processor**:
   ```python
   def process_english_query(query: str) -> Dict[str, Any]:
       # Add new condition
       if "new_keyword" in query_lower:
           return process_new_data(query)
   ```

### Testing

```bash
# Test the API
curl -X POST "http://localhost:8000/query" \
     -H "Content-Type: application/json" \
     -d '{"query": "What is the current price of Reliance stock?", "lang": "en"}'

# Test health endpoint
curl http://localhost:8000/health
```

## Production Deployment

### Using Docker

1. **Create Dockerfile**:
   ```dockerfile
   FROM python:3.9-slim
   
   WORKDIR /app
   COPY requirements.txt .
   RUN pip install -r requirements.txt
   RUN python -m spacy download en_core_web_sm
   
   COPY . .
   EXPOSE 8000
   
   CMD ["uvicorn", "server:app", "--host", "0.0.0.0", "--port", "8000"]
   ```

2. **Build and run**:
   ```bash
   docker build -t fino-backend .
   docker run -p 8000:8000 fino-backend
   ```

### Using Gunicorn

```bash
pip install gunicorn
gunicorn server:app -w 4 -k uvicorn.workers.UvicornWorker --bind 0.0.0.0:8000
```

## Monitoring

### Health Checks

The `/health` endpoint provides:
- Server status
- Redis connection status
- spaCy model status
- Timestamp

### Logging

Logs are written to stdout with different levels:
- INFO: Normal operations
- WARNING: Non-critical issues
- ERROR: Critical errors

## Troubleshooting

### Common Issues

1. **spaCy model not found**:
   ```bash
   python -m spacy download en_core_web_sm
   ```

2. **Redis connection failed**:
   - Check if Redis is running
   - Verify connection settings
   - System works without Redis (uses in-memory cache)

3. **Selenium WebDriver issues**:
   - Install Chrome/Chromium
   - Update ChromeDriver
   - Check headless mode settings

4. **Web scraping blocked**:
   - Check robots.txt compliance
   - Use proxies if needed
   - Implement rate limiting

### Performance Optimization

1. **Enable Redis caching**
2. **Use connection pooling**
3. **Implement request rate limiting**
4. **Optimize database queries**
5. **Use CDN for static assets**

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is part of the Fincal platform and follows the same licensing terms.

## Support

For support or questions:
- Create an issue in the repository
- Check the documentation
- Contact the development team

---

**Fino Backend** - Powering intelligent finance conversations! 🚀
