# Fino Finance Chat System - Deployment Guide

This guide covers deploying the complete Fino Finance Chat System to production.

## System Architecture

```
Frontend (Next.js/React)     Backend (Python FastAPI)     Data Sources
├── /fino (Chat Interface)   ├── /query (API Endpoint)    ├── Moneycontrol
├── /fino-home (Landing)     ├── /live-data (WebSocket)   ├── Policybazaar
└── Main Homepage Banner     ├── /health (Health Check)   ├── ClearTax
                            └── Redis Cache              └── BankBazaar
```

## Prerequisites

### Frontend Requirements
- Node.js 18+
- npm or yarn
- Modern web browser

### Backend Requirements
- Python 3.8+
- Redis (optional but recommended)
- Chrome/Chromium for web scraping
- 2GB+ RAM
- 1GB+ storage

## Deployment Options

### Option 1: Vercel + Railway (Recommended)

#### Frontend (Vercel)
1. **Connect Repository**:
   ```bash
   # Push to GitHub
   git add .
   git commit -m "Add Fino Finance Chat System"
   git push origin main
   ```

2. **Deploy to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Set build command: `npm run build`
   - Set output directory: `dist`
   - Deploy

3. **Environment Variables**:
   ```env
   REACT_APP_FINO_API_URL=https://your-backend-url.railway.app
   ```

#### Backend (Railway)
1. **Create Railway Project**:
   ```bash
   # Install Railway CLI
   npm install -g @railway/cli
   
   # Login and create project
   railway login
   railway init
   ```

2. **Deploy Backend**:
   ```bash
   cd src/fino/backend
   railway up
   ```

3. **Environment Variables**:
   ```env
   REDIS_URL=redis://your-redis-url
   WEBDRIVER_PATH=/usr/bin/chromedriver
   ```

### Option 2: Netlify + Heroku

#### Frontend (Netlify)
1. **Build Settings**:
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Node version: `18`

2. **Environment Variables**:
   ```env
   REACT_APP_FINO_API_URL=https://your-heroku-app.herokuapp.com
   ```

#### Backend (Heroku)
1. **Create Heroku App**:
   ```bash
   heroku create your-fino-backend
   ```

2. **Add Buildpacks**:
   ```bash
   heroku buildpacks:add heroku/python
   heroku buildpacks:add --index 1 heroku/nodejs
   ```

3. **Deploy**:
   ```bash
   cd src/fino/backend
   git subtree push --prefix=src/fino/backend heroku main
   ```

### Option 3: Docker Deployment

#### Frontend Dockerfile
```dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

#### Backend Dockerfile
```dockerfile
FROM python:3.9-slim

# Install system dependencies
RUN apt-get update && apt-get install -y \
    wget \
    gnupg \
    unzip \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Install Chrome
RUN wget -q -O - https://dl.google.com/linux/linux_signing_key.pub | apt-key add - \
    && echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google-chrome.list \
    && apt-get update \
    && apt-get install -y google-chrome-stable \
    && rm -rf /var/lib/apt/lists/*

# Install ChromeDriver
RUN CHROME_VERSION=$(google-chrome --version | awk '{print $3}' | cut -d. -f1-3) \
    && CHROMEDRIVER_VERSION=$(curl -s "https://chromedriver.storage.googleapis.com/LATEST_RELEASE_${CHROME_VERSION}") \
    && wget -O /tmp/chromedriver.zip "https://chromedriver.storage.googleapis.com/${CHROMEDRIVER_VERSION}/chromedriver_linux64.zip" \
    && unzip /tmp/chromedriver.zip -d /usr/local/bin/ \
    && chmod +x /usr/local/bin/chromedriver \
    && rm /tmp/chromedriver.zip

WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
RUN python -m spacy download en_core_web_sm

COPY . .
EXPOSE 8000

CMD ["uvicorn", "server:app", "--host", "0.0.0.0", "--port", "8000"]
```

#### Docker Compose
```yaml
version: '3.8'
services:
  redis:
    image: redis:alpine
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data

  backend:
    build: ./src/fino/backend
    ports:
      - "8000:8000"
    environment:
      - REDIS_HOST=redis
      - REDIS_PORT=6379
    depends_on:
      - redis
    volumes:
      - ./src/fino/backend:/app

  frontend:
    build: .
    ports:
      - "3000:80"
    environment:
      - REACT_APP_FINO_API_URL=http://localhost:8000
    depends_on:
      - backend

volumes:
  redis_data:
```

## Environment Configuration

### Frontend (.env)
```env
REACT_APP_FINO_API_URL=https://your-backend-url.com
REACT_APP_GOOGLE_ANALYTICS_ID=GA_MEASUREMENT_ID
REACT_APP_SENTRY_DSN=your-sentry-dsn
```

### Backend (.env)
```env
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_DB=0
WEBDRIVER_PATH=/usr/bin/chromedriver
PROXY_URL=
DEBUG=False
CORS_ORIGINS=https://your-frontend-url.com
```

## Domain Configuration

### Custom Domain Setup
1. **Frontend Domain**: `fino.moneycal.in`
2. **Backend Domain**: `api-fino.moneycal.in`
3. **SSL Certificates**: Use Let's Encrypt or Cloudflare

### DNS Configuration
```
A    fino.moneycal.in        -> Frontend IP
A    api-fino.moneycal.in    -> Backend IP
CNAME www.fino.moneycal.in   -> fino.moneycal.in
```

## Performance Optimization

### Frontend Optimization
1. **Code Splitting**:
   ```javascript
   const FinoChat = lazy(() => import('./fino/components/FinoChat'));
   ```

2. **Image Optimization**:
   ```javascript
   // Use WebP format
   // Implement lazy loading
   // Compress images
   ```

3. **Caching Strategy**:
   ```javascript
   // Service Worker for offline support
   // Browser caching headers
   // CDN for static assets
   ```

### Backend Optimization
1. **Redis Caching**:
   ```python
   # Cache API responses
   # Cache scraped data
   # Implement cache invalidation
   ```

2. **Connection Pooling**:
   ```python
   # Database connection pooling
   # HTTP connection reuse
   # WebSocket connection management
   ```

3. **Rate Limiting**:
   ```python
   # API rate limiting
   # Scraping rate limiting
   # User request throttling
   ```

## Monitoring & Analytics

### Health Monitoring
1. **Uptime Monitoring**: UptimeRobot, Pingdom
2. **Performance Monitoring**: New Relic, DataDog
3. **Error Tracking**: Sentry, Rollbar

### Analytics
1. **User Analytics**: Google Analytics 4
2. **API Analytics**: Custom logging
3. **Business Metrics**: Query volume, response times

### Logging
```python
# Backend logging
import logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Frontend logging
console.log('Fino Chat System initialized');
```

## Security Considerations

### API Security
1. **CORS Configuration**:
   ```python
   app.add_middleware(
       CORSMiddleware,
       allow_origins=["https://fino.moneycal.in"],
       allow_credentials=True,
       allow_methods=["GET", "POST"],
       allow_headers=["*"],
   )
   ```

2. **Rate Limiting**:
   ```python
   from slowapi import Limiter
   limiter = Limiter(key_func=get_remote_address)
   
   @app.post("/query")
   @limiter.limit("10/minute")
   async def handle_query(request: Request, ...):
   ```

3. **Input Validation**:
   ```python
   # Validate query length
   # Sanitize user input
   # Prevent injection attacks
   ```

### Data Privacy
1. **No Personal Data Storage**
2. **GDPR Compliance**
3. **Data Encryption in Transit**

## Backup & Recovery

### Database Backup
```bash
# Redis backup
redis-cli --rdb /backup/redis-backup.rdb

# Automated backups
0 2 * * * redis-cli --rdb /backup/redis-$(date +\%Y\%m\%d).rdb
```

### Application Backup
```bash
# Code backup
git clone https://github.com/your-repo/fincal.git

# Configuration backup
tar -czf config-backup.tar.gz .env docker-compose.yml
```

## Scaling Considerations

### Horizontal Scaling
1. **Load Balancer**: Nginx, HAProxy
2. **Multiple Backend Instances**
3. **Redis Cluster**

### Vertical Scaling
1. **Increase Server Resources**
2. **Optimize Database Queries**
3. **Implement Caching Layers**

## Maintenance

### Regular Updates
1. **Security Patches**: Monthly
2. **Dependency Updates**: Quarterly
3. **Feature Updates**: As needed

### Monitoring Checklist
- [ ] API response times < 2 seconds
- [ ] Uptime > 99.9%
- [ ] Error rate < 1%
- [ ] Memory usage < 80%
- [ ] CPU usage < 70%

## Troubleshooting

### Common Issues
1. **API Connection Failed**:
   - Check backend URL
   - Verify CORS settings
   - Check network connectivity

2. **Web Scraping Blocked**:
   - Update user agents
   - Implement proxy rotation
   - Check robots.txt compliance

3. **Redis Connection Issues**:
   - Verify Redis is running
   - Check connection settings
   - Monitor memory usage

### Debug Commands
```bash
# Check backend health
curl https://api-fino.moneycal.in/health

# Test API endpoint
curl -X POST https://api-fino.moneycal.in/query \
  -H "Content-Type: application/json" \
  -d '{"query": "test", "lang": "en"}'

# Check Redis connection
redis-cli ping
```

## Support & Documentation

### User Documentation
- [Fino User Guide](./FINO_README.md)
- [API Documentation](./backend/README.md)
- [FAQ](./FAQ.md)

### Developer Resources
- [GitHub Repository](https://github.com/your-repo/fincal)
- [Issue Tracker](https://github.com/your-repo/fincal/issues)
- [Contributing Guide](./CONTRIBUTING.md)

---

**Fino Finance Chat System** - Deployed and ready to serve millions of users! 🚀
