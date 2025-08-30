#!/bin/bash

# Fino Finance Chat System - Deployment Script
# This script prepares and deploys the complete Fino system

echo "🚀 Fino Finance Chat System - Deployment Script"
echo "================================================"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if git is available
if ! command -v git &> /dev/null; then
    print_error "Git is not installed. Please install Git first."
    exit 1
fi

# Check if we're in a git repository
if ! git rev-parse --git-dir > /dev/null 2>&1; then
    print_error "Not in a git repository. Please run this script from the project root."
    exit 1
fi

print_status "Starting Fino deployment process..."

# Check current branch
CURRENT_BRANCH=$(git branch --show-current)
print_status "Current branch: $CURRENT_BRANCH"

# Check for uncommitted changes
if ! git diff-index --quiet HEAD --; then
    print_warning "You have uncommitted changes. Committing them now..."
    git add .
    git commit -m "feat: Add Fino Finance Chat System

- Add complete Fino AI finance chat system
- Frontend: React/TypeScript with Tailwind CSS
- Backend: Python FastAPI with web scraping
- Features: Voice input, multi-language, real-time data
- Routes: /fino (chat), /fino-home (landing)
- SEO optimized for Indian finance market
- No login required, privacy-focused
- Ready for production deployment"
    print_success "Changes committed successfully"
else
    print_status "No uncommitted changes found"
fi

# Check if remote origin exists
if ! git remote get-url origin > /dev/null 2>&1; then
    print_warning "No remote origin found. Please add a remote repository:"
    echo "git remote add origin https://github.com/your-username/your-repo.git"
    exit 1
fi

# Get remote URL
REMOTE_URL=$(git remote get-url origin)
print_status "Remote repository: $REMOTE_URL"

# Push to remote repository
print_status "Pushing to remote repository..."
if git push origin $CURRENT_BRANCH; then
    print_success "Successfully pushed to remote repository"
else
    print_error "Failed to push to remote repository"
    exit 1
fi

# Display deployment information
echo ""
echo "🎉 Fino Finance Chat System Deployed Successfully!"
echo "=================================================="
echo ""
echo "📋 Deployment Summary:"
echo "  • Frontend: React/TypeScript with Tailwind CSS"
echo "  • Backend: Python FastAPI with web scraping"
echo "  • Routes: /fino (chat), /fino-home (landing)"
echo "  • Features: Voice input, multi-language, real-time data"
echo "  • SEO: Optimized for Indian finance market"
echo ""
echo "🔗 Access Points:"
echo "  • Main Chat: https://your-domain.com/fino"
echo "  • Landing Page: https://your-domain.com/fino-home"
echo "  • Homepage Banner: https://your-domain.com/"
echo ""
echo "🚀 Next Steps:"
echo "  1. Deploy frontend to Vercel/Netlify"
echo "  2. Deploy backend to Railway/Heroku"
echo "  3. Set up custom domain (fino.moneycal.in)"
echo "  4. Configure environment variables"
echo "  5. Set up monitoring and analytics"
echo ""
echo "📚 Documentation:"
echo "  • Frontend: src/fino/FINO_README.md"
echo "  • Backend: src/fino/backend/README.md"
echo "  • Deployment: src/fino/DEPLOYMENT.md"
echo ""
echo "🛠️  Development Commands:"
echo "  Frontend: npm run dev"
echo "  Backend:  cd src/fino/backend && python start.py"
echo "  Full:     See src/fino/FINO_README.md"
echo ""

# Check if deployment platforms are configured
print_status "Checking deployment configuration..."

# Check for Vercel
if [ -f "vercel.json" ]; then
    print_success "Vercel configuration found"
else
    print_warning "No Vercel configuration found. Consider adding vercel.json for easy deployment."
fi

# Check for Netlify
if [ -f "netlify.toml" ]; then
    print_success "Netlify configuration found"
else
    print_warning "No Netlify configuration found. Consider adding netlify.toml for easy deployment."
fi

# Check for Docker
if [ -f "docker-compose.yml" ]; then
    print_success "Docker configuration found"
else
    print_warning "No Docker configuration found. Consider adding docker-compose.yml for containerized deployment."
fi

echo ""
print_success "Fino Finance Chat System is ready for deployment!"
print_status "Visit the documentation files for detailed deployment instructions."
echo ""
echo "🌟 Happy coding with Fino! 🌟"
