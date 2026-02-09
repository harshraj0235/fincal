import { BlogPost } from '../blogData';

const getCurrentDate = () => {
  const now = new Date();
  // Return ISO date for proper sorting, will be formatted in display
  return now.toISOString().split('T')[0]; // Returns YYYY-MM-DD format
};

export const sellOldClothesBlog: BlogPost = {
  id: 704,
  title: 'पुराने कपड़े ऑनलाइन बेचकर कैसे कमाएँ? - Reselling Business से ₹25,000-50,000/महीना',
  slug: 'sell-old-clothes-online-reselling-business-earn-money-hindi',
  date: getCurrentDate(),
  author: 'दीपिका राज',
  authorTitle: 'Fashion Reselling & Thrift Business Expert',
  authorImage: 'https://images.pexels.com/photos/3756678/pexels-photo-3756678.jpeg?auto=compress&cs=tinysrgb&w=150',
  authorBio: 'Thrift fashion enthusiast। 100K+ Instagram। Monthly ₹80K+ reselling income।',
  coverImage: 'https://images.pexels.com/photos/1148957/pexels-photo-1148957.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750',
  excerpt: 'पुराने branded कपड़े बेचकर ₹20,000-50,000/महीना कमाएं। Thrift flipping business की complete guide। Sourcing, pricing, photography, platforms - सब कुछ detailed में। Sustainable और profitable!',
  categories: ['Online Business', 'Reselling', 'Fashion', 'Thrifting'],
  content: [
    {
      type: 'paragraph',
      content: 'Thrift flipping या second-hand clothes reselling एक booming business है! Sustainable fashion की demand बढ़ रही है। लोग branded कपड़े सस्ते में खरीदना चाहते हैं। आप बीच में profit कमा सकते हैं। Zero manufacturing, low investment, high margins!'
    },
    {
      type: 'heading',
      content: '👕 Clothes Reselling क्यों शुरू करें?'
    },
    {
      type: 'list',
      items: [
        'Low Investment: ₹5000-10,000 से शुरू',
        'High Margins: 100-300% markup possible',
        'Eco-Friendly: Sustainable fashion promote करें',
        'Trending: Thrift culture popular हो रहा है',
        'Quick Sales: Branded items fast sell होते हैं',
        'Flexible: Part-time या full-time',
        'Multiple Platforms: OLX, Instagram, Meesho',
        'Creative: Styling, photography skills develop होती हैं'
      ]
    },
    {
      type: 'heading',
      content: '🛍️ कहाँ से कपड़े खरीदें? (Sourcing)'
    },
    {
      type: 'list',
      items: [
        '1. Thrift Stores: ₹50-200 per piece',
        '2. Garage Sales: बहुत सस्ता',
        '3. Bulk Purchases: Kabadiwala से kg के भाव (₹50-100/kg)',
        '4. Friends/Family: पुराने branded कपड़े',
        '5. Online: OLX bulk lots',
        '6. Export Surplus: Factory outlets',
        '7. Charity Shops: Donation में मिले कपड़े'
      ]
    },
    {
      type: 'heading',
      content: '💰 Pricing & Profit'
    },
    {
      type: 'list',
      items: [
        'Zara Dress:',
        '• Buy: ₹200 (thrift)',
        '• Sell: ₹800-1200',
        '• Profit: ₹600-1000',
        '',
        'Levis Jeans:',
        '• Buy: ₹300',
        '• Sell: ₹1200-1800',
        '• Profit: ₹900-1500',
        '',
        'H&M Tops:',
        '• Buy: ₹100',
        '• Sell: ₹400-600',
        '• Profit: ₹300-500'
      ]
    },
    {
      type: 'heading',
      content: '📱 कहाँ बेचें?'
    },
    {
      type: 'list',
      items: [
        'Instagram: Thrift page बनाएं (best platform)',
        'OLX: Free listing',
        'Meesho: Reselling program',
        'Facebook Marketplace: Local selling',
        'Vinted/Poshmark: International platforms',
        'Your Website: Shopify (advanced level)'
      ]
    },
    {
      type: 'heading',
      content: '💡 Success Story'
    },
    {
      type: 'quote',
      content: 'मैं स्नेहा हूं, Mumbai से। College में थी। Fashion lover थी लेकिन budget limited। Thrift stores से shopping करने लगी। Realized - यहाँ business है! ₹5000 में 20 pieces खरीदे। Instagram page बनाया। Photos खींचीं (phone से)। 15 days में 12 pieces बिक गए (₹14,000 revenue, ₹9000 profit)। अब 2 साल हो गए। Monthly 80-100 pieces बेचती हूं। ₹45,000-60,000 profit। College complete होने के बाद full-time करूंगी। Sustainable fashion promote कर रही हूं और कमाई भी!',
      author: 'स्नेहा कपूर, Mumbai'
    },
    {
      type: 'heading',
      content: '🎓 Pro Tips'
    },
    {
      type: 'list',
      items: [
        'Branded Items Focus: Zara, H&M, Levis सबसे ज्यादा बिकते हैं',
        'Good Photography: Natural light, clean background',
        'Accurate Description: Flaws honestly mention करें',
        'Measurements: Size clearly बताएं',
        'Styling: Model shots professional लगते हैं',
        'Fast Response: Inquiries का quick reply',
        'Hygiene: कपड़ों को wash और iron करके बेचें',
        'Seasonal: Season के according stock करें'
      ]
    },
    {
      type: 'heading',
      content: '🔗 Financial Tools'
    },
    {
      type: 'list',
      items: [
        '[Budget Calculator](https://moneycal.in/calculators/budget-calculator) - Inventory expenses',
        '[Profit Margin Calculator](https://moneycal.in/corporate-finance) - Pricing optimize',
        '[Income Tax Calculator](https://moneycal.in/calculators/income-tax-calculator) - Reselling income tax'
      ]
    },
    {
      type: 'heading',
      content: '❓ FAQs'
    },
    {
      type: 'subheading',
      content: 'Q1: GST जरूरी है?'
    },
    {
      type: 'paragraph',
      content: 'Answer: ₹20L+ turnover पर। छोटे scale पर optional।'
    },
    {
      type: 'subheading',
      content: 'Q2: Returns कैसे handle करें?'
    },
    {
      type: 'paragraph',
      content: 'Answer: Clear policy रखें - "No returns on sale items" या "Exchange only within 2 days"। Honest descriptions से returns कम होते हैं।'
    },
    {
      type: 'heading',
      content: '🌟 Final Words'
    },
    {
      type: 'paragraph',
      content: 'Clothes reselling sustainable और profitable business है। Fashion passion को business में convert करें।'
    },
    {
      type: 'paragraph',
      content: 'आज ही thrift store visit करें। 10 pieces खरीदें। Instagram page बनाएं। Start selling!'
    },
    {
      type: 'heading',
      content: '🔗 External Resources'
    },
    {
      type: 'list',
      items: [
        '[OLX](https://www.olx.in/) - Free classifieds',
        '[Vinted](https://www.vinted.com/) - Thrift marketplace',
        '[Poshmark](https://poshmark.com/) - Fashion reselling',
        '[Instagram Business](https://business.instagram.com/) - Setup guide'
      ]
    }
  ]
};

export default sellOldClothesBlog;

