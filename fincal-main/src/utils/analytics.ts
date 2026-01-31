// Google Analytics 4 integration for MoneyCal India

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

// Google Analytics 4 configuration
const GA_MEASUREMENT_ID = 'G-XXXXXXXXXX'; // Replace with your actual GA4 measurement ID

// Initialize Google Analytics
export const initGoogleAnalytics = () => {
  // Load Google Analytics script
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script);

  // Initialize gtag
  window.dataLayer = window.dataLayer || [];
  window.gtag = function() {
    window.dataLayer.push(arguments);
  };

  window.gtag('js', new Date());
  window.gtag('config', GA_MEASUREMENT_ID, {
    page_title: document.title,
    page_location: window.location.href,
    custom_map: {
      'custom_parameter_1': 'finance_platform',
      'custom_parameter_2': 'india'
    }
  });

  console.log('Google Analytics 4 initialized');
};

// Track page views
export const trackPageView = (pagePath: string, pageTitle: string) => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('config', GA_MEASUREMENT_ID, {
      page_path: pagePath,
      page_title: pageTitle,
      page_location: window.location.href
    });
  }
};

// Track custom events
export const trackEvent = (eventName: string, parameters: Record<string, any> = {}) => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', eventName, {
      event_category: parameters.category || 'engagement',
      event_label: parameters.label || '',
      value: parameters.value || 0,
      ...parameters
    });
  }
};

// Track calculator usage
export const trackCalculatorUsage = (calculatorName: string, action: string, value?: number) => {
  trackEvent('calculator_usage', {
    calculator_name: calculatorName,
    action: action, // 'opened', 'calculated', 'shared'
    value: value,
    category: 'calculator'
  });
};

// Track market data interactions
export const trackMarketDataInteraction = (dataType: string, action: string) => {
  trackEvent('market_data_interaction', {
    data_type: dataType, // 'nifty', 'sensex', 'gold', 'bitcoin'
    action: action, // 'viewed', 'refreshed', 'shared'
    category: 'market_data'
  });
};

// Track news article interactions
export const trackNewsInteraction = (articleId: string, action: string, category: string) => {
  trackEvent('news_interaction', {
    article_id: articleId,
    action: action, // 'viewed', 'bookmarked', 'shared'
    news_category: category,
    category: 'news'
  });
};

// Track search queries
export const trackSearch = (query: string, resultsCount: number, category: string) => {
  trackEvent('search', {
    search_term: query,
    results_count: resultsCount,
    search_category: category,
    category: 'search'
  });
};

// Track user engagement
export const trackEngagement = (engagementType: string, duration?: number) => {
  trackEvent('user_engagement', {
    engagement_type: engagementType, // 'time_on_page', 'scroll_depth', 'click'
    duration: duration,
    category: 'engagement'
  });
};

// Track conversion events
export const trackConversion = (conversionType: string, value?: number, currency: string = 'INR') => {
  trackEvent('conversion', {
    conversion_type: conversionType, // 'tool_usage', 'newsletter_signup', 'share'
    value: value,
    currency: currency,
    category: 'conversion'
  });
};

// Track performance metrics
export const trackPerformance = (metricName: string, value: number, unit: string = 'ms') => {
  trackEvent('performance_metric', {
    metric_name: metricName, // 'page_load_time', 'api_response_time'
    metric_value: value,
    metric_unit: unit,
    category: 'performance'
  });
};

// Track errors
export const trackError = (errorType: string, errorMessage: string, errorLocation: string) => {
  trackEvent('error', {
    error_type: errorType,
    error_message: errorMessage,
    error_location: errorLocation,
    category: 'error'
  });
};

// Track user demographics (if available)
export const trackUserDemographics = (age?: number, gender?: string, location?: string) => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('config', GA_MEASUREMENT_ID, {
      custom_map: {
        'user_age': age,
        'user_gender': gender,
        'user_location': location
      }
    });
  }
};

// Enhanced ecommerce tracking for financial products
export const trackFinancialProductView = (productId: string, productName: string, category: string, price?: number) => {
  trackEvent('view_item', {
    currency: 'INR',
    value: price || 0,
    items: [{
      item_id: productId,
      item_name: productName,
      item_category: category,
      price: price || 0,
      quantity: 1
    }]
  });
};

// Track loan calculator results
export const trackLoanCalculation = (loanType: string, loanAmount: number, interestRate: number, tenure: number) => {
  trackEvent('loan_calculation', {
    loan_type: loanType,
    loan_amount: loanAmount,
    interest_rate: interestRate,
    tenure_months: tenure,
    category: 'loan_calculator'
  });
};

// Track investment calculator results
export const trackInvestmentCalculation = (investmentType: string, amount: number, returns: number, period: number) => {
  trackEvent('investment_calculation', {
    investment_type: investmentType,
    investment_amount: amount,
    expected_returns: returns,
    investment_period: period,
    category: 'investment_calculator'
  });
};

// Track tax calculation results
export const trackTaxCalculation = (income: number, deductions: number, taxLiability: number) => {
  trackEvent('tax_calculation', {
    annual_income: income,
    total_deductions: deductions,
    tax_liability: taxLiability,
    category: 'tax_calculator'
  });
};

// Track user journey
export const trackUserJourney = (step: string, journeyType: string) => {
  trackEvent('user_journey', {
    journey_step: step,
    journey_type: journeyType,
    category: 'user_journey'
  });
};

// Track social sharing
export const trackSocialShare = (platform: string, contentType: string, contentId: string) => {
  trackEvent('social_share', {
    social_platform: platform,
    content_type: contentType,
    content_id: contentId,
    category: 'social'
  });
};

// Track newsletter signup
export const trackNewsletterSignup = (email: string, source: string) => {
  trackEvent('newsletter_signup', {
    email_domain: email.split('@')[1],
    signup_source: source,
    category: 'newsletter'
  });
};

// Track feedback submission
export const trackFeedback = (feedbackType: string, rating: number, comment?: string) => {
  trackEvent('feedback_submission', {
    feedback_type: feedbackType,
    rating: rating,
    has_comment: !!comment,
    category: 'feedback'
  });
};

// Track API usage
export const trackAPIUsage = (endpoint: string, responseTime: number, statusCode: number) => {
  trackEvent('api_usage', {
    api_endpoint: endpoint,
    response_time: responseTime,
    status_code: statusCode,
    category: 'api'
  });
};

// Track mobile app interactions (if applicable)
export const trackMobileInteraction = (action: string, screen: string) => {
  trackEvent('mobile_interaction', {
    action: action,
    screen_name: screen,
    category: 'mobile'
  });
};

// Initialize analytics on app start
export const initAnalytics = () => {
  // Only initialize in production
  if (process.env.NODE_ENV === 'production') {
    initGoogleAnalytics();
    
    // Track app initialization
    trackEvent('app_initialized', {
      app_version: '1.0.0',
      platform: 'web',
      category: 'app'
    });
  }
};

// Export all tracking functions
export default {
  initAnalytics,
  trackPageView,
  trackEvent,
  trackCalculatorUsage,
  trackMarketDataInteraction,
  trackNewsInteraction,
  trackSearch,
  trackEngagement,
  trackConversion,
  trackPerformance,
  trackError,
  trackUserDemographics,
  trackFinancialProductView,
  trackLoanCalculation,
  trackInvestmentCalculation,
  trackTaxCalculation,
  trackUserJourney,
  trackSocialShare,
  trackNewsletterSignup,
  trackFeedback,
  trackAPIUsage,
  trackMobileInteraction
};
