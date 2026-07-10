import { DiscoverArticle } from './types';

export const tataCommunicationsDataCentreFireGoogleCloud: DiscoverArticle = {
  id: "tata-communications-data-centre-fire-google-cloud",
  title: "India’s biggest data disaster? Companies may lose years of data",
  slug: "tata-communications-data-centre-fire-google-cloud",
  snippet: "A massive fire at the STT data centre in New Delhi has caused major disruptions to Google Cloud in India, with some companies facing the permanent loss of 20 years of data.",
  coverImage: "/discover/tata-communications-data-centre-fire-google-cloud/cover.png",
  date: "2026-06-28",
  author: 'MoneyCal Team',
  category: "Technology",
  tags: ["Data Centre Fire", "Google Cloud", "Tata Communications", "Disaster", "Tech News"],
  sections: [
    {
      type: "p",
      content: "डिजिटल दुनिया में डेटा ही सबसे बड़ा पैसा है। लेकिन क्या हो जब 20 साल का महत्वपूर्ण बिज़नेस डेटा अचानक राख हो जाए? भारत की टेक दुनिया में इस वक्त हड़कंप मचा हुआ है क्योंकि दिल्ली के एक बड़े डेटा सेंटर में लगी भयंकर आग ने करोड़ों का नुकसान कर दिया है।"
    },
    {
      type: "h2",
      content: "STT डेटा सेंटर की आग 🔥"
    },
    {
      type: "p",
      content: "यह आग दिल्ली के ग्रेटर कैलाश इलाके में स्थित STT Global Data Centres (जो Tata Communications का एक जॉइंट वेंचर है) में लगी। शुरुआती जाँच के अनुसार, आग <strong>लिथियम बैटरी (Lithium batteries)</strong> वाले बैकअप पावर सिस्टम से शुरू हुई और तेज़ी से सर्वर रैक्स (Server Racks) तक पहुँच गई।"
    },
    {
      type: "ul",
      content: "<li><strong>Google Cloud ठप:</strong> इस डेटा सेंटर का इस्तेमाल Google Cloud भी करता था। आग की वजह से पावर शटडाउन करना पड़ा, जिससे पूरे भारत (खासकर दिल्ली, मुंबई, चेन्नई) में Google की क्लाउड सर्विसेज़ में भारी नेटवर्क एरर और रुकावट (Latency) आई।</li><li><strong>20 साल का डेटा स्वाहा:</strong> आग ने इतना 'भयानक नुकसान' किया है कि Matrix Cellular जैसी कंपनियों का दावा है कि उनका पिछले 20 सालों का ऑपरेशनल और बिज़नेस डेटा हमेशा के लिए खत्म हो सकता है।</li>"
    },
    {
      type: "image",
      content: "/discover/tata-communications-data-centre-fire-google-cloud/crisis.png"
    },
    {
      type: "callout",
      content: "<strong>The Real Risk:</strong> टाटा कम्युनिकेशंस ने कहा है कि सिस्टम रिकवरी में कई हफ्तों का समय लग सकता है। यह घटना साबित करती है कि 'क्लाउड' (Cloud) कोई हवा में उड़ने वाली चीज़ नहीं है, बल्कि ज़मीन पर रखे भारी-भरकम कंप्यूटर्स हैं जो कभी भी जल सकते हैं।"
    },
    {
      type: "quiz",
      content: "{\"question\": \"What is the most critical backup strategy a company should use to prevent total data loss in case a single Data Centre catches fire?\",\"options\": [\"Store all data on a single hard drive in the CEO's office\",\"Use a Multi-AZ (Availability Zone) or Multi-Region cloud architecture to replicate data geographically\",\"Print all emails and documents on paper\",\"Wrap the servers in fireproof blankets\"],\"correctAnswerIndex\": 1,\"explanation\": \"By using a Multi-Region or Multi-AZ architecture, your data is continuously mirrored (copied) to a completely different physical city or building. If one data centre burns down, the other takes over immediately with zero data loss.\"}"
    },
    {
      type: "h2",
      content: "बिज़नेस ओनर्स के लिए बड़ी सीख 🛡️"
    },
    {
      type: "p",
      content: "अगर आपका बिज़नेस या स्टार्टअप किसी एक सर्वर या एक शहर के डेटा सेंटर पर निर्भर है, तो यह आपके लिए खतरे की घंटी है। आपको हमेशा 'Disaster Recovery' (DR) प्लान बनाना चाहिए और अपना डेटा अलग-अलग लोकेशंस (Geographical locations) पर बैकअप करना चाहिए।"
    },
    {
      type: "p",
      content: "अपने बिज़नेस को सुरक्षित रखने के साथ-साथ अपने फाइनेंस को सुरक्षित रखने के लिए <strong>MoneyCal</strong> की टूल्स (जैसे <a href=\"/tools/sip-calculator\">SIP Calculator</a>) का इस्तेमाल करते रहें।"
    }
  ]
};
