# Fino - AI Finance Chat System

## 🚀 Overview

Fino is an advanced AI-powered finance chat system designed for the Indian market. It provides instant answers to any financial question with features like voice input, real-time data visualization, multi-language support (English & Hindi), and beautiful UI. Built with Next.js frontend and Python FastAPI backend, it's optimized for SEO and designed to drive millions of organic visitors to moneycal.in.

## 🌟 Key Features

### 🤖 AI-Powered Intelligence
- Advanced natural language processing for English and Hindi
- Context-aware responses with intelligent query classification
- Real-time financial data integration from multiple sources
- Personalized suggestions based on user queries

### 🎤 Voice & Multi-Language Support
- Speech recognition in English (`en-IN`) and Hindi (`hi-IN`)
- Hands-free interaction with Web Speech API
- Dynamic language switching with localized responses
- Cultural context awareness for Indian users

### 📊 Real-time Data & Visualizations
- Live stock prices from BSE/NSE via Moneycontrol
- Interactive charts using Chart.js (line, bar, doughnut)
- Insurance plan comparisons from Policybazaar
- Tax slab visualizations from ClearTax
- Market status indicators and trends

### 🔒 Privacy & Security
- No login required - instant access for all users
- Local storage for chat history persistence
- Secure data handling with GDPR compliance
- No personal data collection or storage

### 📱 Modern UI/UX
- Mobile-first responsive design
- Dark/Light mode toggle
- Touch-friendly interface with smooth animations
- Cross-platform compatibility (Web, iOS, Android ready)

## Features

### 🤖 AI-Powered Chat
- Advanced natural language processing
- Context-aware responses
- Intelligent query classification
- Real-time financial data integration

### 🎤 Voice Input
- Speech recognition in English and Hindi
- Hands-free interaction
- Web Speech API integration
- Language-specific voice processing

### 📊 Real-time Data & Visualizations
- Live stock prices and trends
- Interactive charts using Chart.js
- Insurance plan comparisons
- Tax slab visualizations
- Market status indicators

### 🌐 Multi-language Support
- English and Hindi interface
- Dynamic language switching
- Localized responses
- Cultural context awareness

### 🔒 Privacy & Security
- No login required
- Local storage for chat history
- Secure data handling
- GDPR compliant

### 📱 Responsive Design
- Mobile-first approach
- Dark/Light mode toggle
- Touch-friendly interface
- Cross-platform compatibility

## Technical Architecture

### Frontend (React + TypeScript)
- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS with custom components
- **Animations**: Framer Motion for smooth transitions
- **Charts**: Chart.js with react-chartjs-2
- **Icons**: Lucide React icon library
- **Routing**: React Router v6

### Backend API (Mock Service)
- **Service**: TypeScript-based mock API
- **Data Sources**: Simulated financial data
- **Response Time**: 1-2 seconds (simulated)
- **Error Handling**: Comprehensive error management
- **Caching**: Local storage for performance

### Key Components

#### 1. FinoHome (`/fino-home`)
- Landing page with feature showcase
- SEO-optimized content
- Call-to-action sections
- Testimonials and statistics

#### 2. FinoChat (`/fino`)
- Main chat interface
- Real-time messaging
- Voice input/output
- Chart visualizations
- Multi-language support

#### 3. API Service (`finoApi.ts`)
- Query processing
- Data simulation
- Response formatting
- Error handling

## 🚀 Quick Start

### Accessing Fino
1. **Main Chat**: Visit `/fino` for the chat interface
2. **Home Page**: Visit `/fino-home` for the landing page
3. **From Home**: Click the Fino banner on the main homepage

### Local Development

#### Frontend Setup
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

#### Backend Setup
```bash
# Navigate to backend directory
cd src/fino/backend

# Install Python dependencies
pip install -r requirements.txt

# Download spaCy model
python -m spacy download en_core_web_sm

# Start the server
python start.py
```

#### Full Stack Setup
```bash
# Terminal 1: Start backend
cd src/fino/backend
python start.py

# Terminal 2: Start frontend
npm run dev
```

### Production Deployment
See [DEPLOYMENT.md](./DEPLOYMENT.md) for complete deployment guide.

**Quick Deploy Options:**
- **Vercel + Railway**: Recommended for easy deployment
- **Netlify + Heroku**: Alternative cloud deployment
- **Docker**: Self-hosted deployment with Docker Compose

### Supported Queries

#### Stock Information
- "What is the current price of Reliance stock?"
- "Show me TCS share price"
- "रिलायंस का शेयर मूल्य क्या है?"

#### Insurance
- "Best life insurance plans in India"
- "Compare insurance policies"
- "भारत में सर्वश्रेष्ठ बीमा योजनाएं"

#### Tax Information
- "Income tax slabs for 2024"
- "Tax saving options"
- "2024 के लिए आयकर स्लैब"

#### Loans
- "How to calculate EMI for home loan?"
- "Personal loan interest rates"
- "होम लोन के लिए EMI कैसे कैलकुलेट करें?"

### Voice Commands
- Click the microphone button
- Speak your question in English or Hindi
- The system will automatically detect the language
- Voice responses are also available

## Development

### Prerequisites
- Node.js 18+
- npm or yarn
- Modern web browser

### Installation
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

### Project Structure
```
src/
├── components/
│   └── FinoChat.tsx          # Main chat component
├── pages/
│   ├── FinoHome.tsx          # Landing page
│   └── HomeNew.tsx           # Updated with Fino banner
├── services/
│   └── finoApi.ts            # API service
└── App.tsx                   # Updated with routes
```

### Key Dependencies
```json
{
  "react": "^18.3.1",
  "react-dom": "^18.3.1",
  "react-router-dom": "^6.30.1",
  "framer-motion": "^12.23.12",
  "chart.js": "^4.5.0",
  "react-chartjs-2": "^5.3.0",
  "lucide-react": "^0.344.0",
  "tailwindcss": "^3.4.1"
}
```

## SEO Optimization

### Meta Tags
- Comprehensive meta descriptions
- Open Graph tags
- Twitter Card support
- Language-specific content

### Schema Markup
- SoftwareApplication schema
- QAPage schema for chat interface
- Rich snippets for better search visibility

### Performance
- Lazy loading of components
- Optimized images
- Minimal bundle size
- Fast loading times

## Future Enhancements

### Planned Features
1. **Real Backend Integration**
   - Python FastAPI backend
   - Web scraping for live data
   - Redis caching
   - WebSocket for real-time updates

2. **Advanced AI**
   - GPT integration
   - Better Hindi NLP
   - Context memory
   - Personalized responses

3. **Additional Features**
   - PDF report generation
   - Email notifications
   - Mobile app
   - Offline mode

4. **Data Sources**
   - Real stock APIs
   - Insurance company APIs
   - Government tax APIs
   - Banking APIs

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is part of the Fincal platform and follows the same licensing terms.

## Support

For support or questions about Fino:
- Create an issue in the repository
- Contact the development team
- Check the documentation

---

**Fino** - Your intelligent finance companion for the Indian market! 🇮🇳
