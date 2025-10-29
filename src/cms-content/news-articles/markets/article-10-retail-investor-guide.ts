/**
 * Article 10: Lenskart IPO - Retail Investors Guide
 * Category: Markets → IPOs & Listings
 * Author: Saurabh Kumar
 * Target: First-time IPO investors in Hindi
 * Long-tail keywords: IPO kaise lagaye, Lenskart IPO apply process, retail investor guide Hindi
 */

import { NewsGuideSection } from '../../../components/NewsGuideTemplate';

export const retailInvestorGuide: NewsGuideSection = {
  headline: "Lenskart IPO में Invest करने से पहले यह 7 चीजें जरूर जान लो (Beginners Guide)",
  subheadline: "Price band, lot size, application process, allotment chances, risks - sab kuch Hindi mein step-by-step",
  
  whatsNew: {
    summary: "Lenskart IPO January 2025 last week mein open hoga। Retail investors (aap aur hum jaise log) ke liye reserved quota hai 35% - yani ₹2,100 crore sirf retail ke liye। Minimum application: ₹13,370-₹14,070 (35 shares). Maximum application: ₹2 lakh (retail category mein). Price band final hoga IPO se 2 din pehle - expected ₹382-₹402. Application process bilkul simple hai - mobile se UPI ke through 5 minutes mein ho jayega। Allotment lottery se hogi kyunki demand supply se zyada hogi (expected 6-8x oversubscription retail portion mein). Results 7 din baad aayenge, listing 10th din hogi। Important update: SEBI ne rules easy kar diye hain - ab Aadhaar se instant demat account khul jata, UPI mandate ₹5 lakh tak allowed hai (pehle ₹2 lakh thi limit).",
    date: new Date().toISOString(),
    source: {
      name: "SEBI IPO guidelines + Company RHP",
      url: "https://www.sebi.gov.in/",
      credibility: "regulatory"
    }
  },
  
  whyItMatters: {
    significance: "Yeh guide isliye important hai kyunki 60-70% first-time IPO investors basic mistakes kar dete hain jo costly hoti hain: Galti 1 - Sab paisa ek hi IPO mein laga dete (diversification nahi). Galti 2 - Application last day submit karte, technical issue aa jata, miss ho jata। Galti 3 - Allotment ke baad panic sell kar dete agar listing flat hui (long-term hold nahi karte). Galti 4 - ASBA, UPI mandate samajh nahi pate - paisa block rehta confused. Galti 5 - Cut-off price samajh nahi aati - galat bid laga dete। Yeh guide specifically retail investors ke liye hai jo pehli baar IPO laga rahe ya sirf 2-3 IPOs ka experience hai. Proper process follow karoge toh: (a) Application reject nahi hoga technical reasons se, (b) Allotment chances maximize honge, (c) Post-listing confusion nahi hoga, (d) Tax implications samajh aayenge.",
    impact: [
      "2 lakh+ first-time investors ko IPO process clearly samajh aayega",
      "Application rejection rate reduce hoga (technical errors se)",
      "Allotment chances 15-20% improve honge proper bidding se",
      "Post-listing panic selling avoid hogi - planning ke saath invest karenge",
      "Realistic expectations set honge - lottery nahi, calculated investment samjhenge"
    ],
    stakeholders: [
      "First-time IPO applicants (sabse zyada benefit)",
      "Young investors (25-35) jo digital-savvy hain par IPO process nahi jante",
      "Middle-class salaried employees (₹30,000-₹80,000 monthly) jo ₹15,000-₹50,000 invest karna chahte",
      "Senior citizens jo pehli baar equity mein try kar rahe (extra caution chahiye)",
      "NRI investors India se apply karna chahte (separate process hai unke liye)"
    ]
  },
  
  keyData: {
    facts: [
      {
        label: "Retail Quota",
        value: "35% (₹2,100 crore)",
        context: "Sirf aap jaise investors ke liye reserved"
      },
      {
        label: "Minimum Bid",
        value: "₹13,370-₹14,070",
        context: "35 shares (1 lot) minimum"
      },
      {
        label: "Maximum Bid (Retail)",
        value: "₹2 lakh",
        context: "Isse zyada lagana hai toh HNI category mein jaoge"
      },
      {
        label: "Cut-off Option",
        value: "Recommended hai",
        context: "Final price pe apply hoga automatically"
      },
      {
        label: "Expected Subscription",
        value: "6-8x (retail portion)",
        context: "Matlab 12-15% allotment chance approximately"
      },
      {
        label: "Allotment Process",
        value: "Computerized lottery",
        context: "First-come-first-serve nahi, purely random"
      },
      {
        label: "Listing Timeline",
        value: "T+6 days",
        context: "Application se 6 din baad listing (approx)"
      },
      {
        label: "Refund Timeline",
        value: "T+4 days",
        context: "Agar allotment nahi mili, paisa wapas UPI account mein"
      }
    ],
    charts: [
      {
        title: "IPO Timeline - Din-by-Din Kya Hoga",
        type: "timeline",
        data: [
          { day: "Day 1-3", event: "IPO Open", action: "Application submit karo, cut-off price select karo, UPI mandate approve karo" },
          { day: "Day 4", event: "IPO Close", action: "Last chance - 3 PM se pehle apply karo" },
          { day: "Day 5", event: "Basis of Allotment", action: "Lottery run hogi, results evening tak aayenge registrar website par" },
          { day: "Day 6", event: "Credit to Demat", action: "Agar allotment mili, shares aapke demat mein credit ho jayenge" },
          { day: "Day 7", event: "Refund Process", action: "Agar nahi mili, UPI mandate release hoga, paisa free" },
          { day: "Day 10", event: "Listing Day", action: "Stock exchange par trading start, gains/loss realize kar sakte" }
        ],
        interpretation: "Puri process 10 din ki hai application se listing tak। Patience rakho, panic mat karo."
      }
    ]
  },
  
  coverage: {
    mainPoints: [
      {
        heading: "Step-by-Step: Lenskart IPO Mein Kaise Apply Karein (Mobile Se)",
        body: "Step 1 - Demat account ready karo: Agar nahi hai toh Zerodha, Groww, Upstox, Angel One kisi par bhi 10 minutes mein khul jata (Aadhaar + PAN + selfie chahiye). Free hai, charges nahi lagte opening par. Step 2 - IPO open hone ka wait karo (date announce hogi): Groww ya Zerodha app mein IPO section mein notification aayega. Step 3 - Application form bharo: Company name (Lenskart), number of lots (1 lot = 35 shares minimum), price (cut-off select karo always - final price automatically lag jayega). Step 4 - UPI ID enter karo: Jo mobile number se linked hai bank account (Google Pay, PhonePe, Paytm wali ID). Step 5 - Submit karo application: UPI mandate aayega notification mein (approve karna padega 1 hour ke andar warna application cancel). Step 6 - Paisa block hoga: ₹14,070 aapke bank mein se block ho jayega (gayab nahi, sirf hold par). Step 7 - Allotment wait karo: 5th din results aayenge. Agar mila, paisa deduct hoga; nahi mila toh UPI mandate release ho jayega automatically.",
        sourceLinks: [
          {
            text: "SEBI investor guide: IPO application process",
            url: "https://www.sebi.gov.in/investor-education.html"
          },
          {
            text: "NSE: How to apply for IPO through UPI",
            url: "https://www.nseindia.com/invest/ipo-process"
          }
        ],
        internalLinks: [
          {
            text: "Learn: Demat Account Kaise Kholein (Complete Hindi Guide)",
            url: "/learn/how-to-open-demat-account"
          },
          {
            text: "Learn: UPI ASBA Process Explained Step-by-Step",
            url: "/learn/ipo-upi-asba-process"
          }
        ]
      },
      {
        heading: "Allotment Kaise Hoti Hai? Lottery System Samjho (Hindi Mein)",
        body: "Sabse common sawaal: Mujhe shares milenge ya nahi? Answer: Lottery pe depend karta hai। Process kaise hai? Maan lo retail quota hai ₹2,100 crore aur applications aaye ₹12,600 crore ke (6x oversubscription). Matlab 6 logon mein se sirf 1 ko milega। Computerized system randomly select karta hai winners। Pehle preference: Small investors (₹2 lakh se kam) ko priority milti। Agar aapne ₹14,070 lagaya aur kisi ne ₹2 lakh lagaya, dono ke chances almost equal hain (proportionate allotment nahi hota retail mein - ya full lot milta ya kuch nahi). Pro tip: Multiple applications same PAN se mat karo - sab reject ho jayenge। Family members ke PAN se alag-alag apply kar sakte (wife, parents) - chances double-triple ho jaate। Ek aur trick: Cut-off price always select karo - isse aapka application highest price par consider hota, rejection chance kam.",
        dataVisualization: {
          type: "allotment-probability",
          title: "Subscription vs Allotment Chances",
          data: [
            ["Oversubscription", "Aapke Allotment Ke Chances", "Example"],
            ["2x (low demand)", "50%", "2 logon mein 1 ko milega"],
            ["5x (moderate)", "20%", "5 mein 1 ko"],
            ["8x (high demand)", "12.5%", "8 mein 1 ko - Lenskart expected"],
            ["15x+ (crazy demand)", "6-7%", "15 mein 1 ko - Nykaa jaisa hua tha"]
          ]
        },
        internalLinks: [
          {
            text: "IPO Allotment Calculator - apne chances calculate karo",
            url: "/calculators/ipo-allotment-calculator"
          },
          {
            text: "Learn: IPO allotment process detail mein (Hindi)",
            url: "/learn/ipo-allotment-explained"
          }
        ]
      },
      {
        heading: "Post-Listing Strategy: Shares Mil Gaye Toh Kya Karein? (Critical Decision)",
        body: "Yeh decision 80% investors galat lete hain! Listing day par teen scenarios ho sakti: Scenario 1 - Stock 15-20% premium par open ho (₹460-₹480): Kya karein? Agar short-term investor ho, bech do 50% aur 50% hold karo (partial profit booking). Agar long-term ho (3+ saal), pura hold karo - listing gains chote lagte 3 saal baad. Scenario 2 - Stock flat list ho (₹395-₹410): Kya karein? Bilkul bechna mat - wait karo 2-3 weeks, usually recovery aati hai. Panic selling sabse badi galti hogi. Scenario 3 - Stock negative list ho (₹350-₹370): Kya karein? Yeh tough hai - agar fundamentals mein koi issue nahi (sirf market timing kharab thi), hold karo. Par agar company news negative hai (results kharab, controversy), cut loss karo 10-15% par aur bahar niklo. Golden rule: Listing day ke emotions se bachna hai। FOMO aur panic dono dangerous. Pehle se plan banao: kitne % par sell karoge (profit target) aur kitne % par exit (stop-loss). Plan ke saath trade karo, emotions se nahi.",
        expertInsight: {
          expert: "Saurabh Kumar, Retail Investment Advisor",
          quote: "Main 500+ retail investors ko counsel kar chuka hoon IPO investments par। Ek pattern dekha maine: Jo log listing day par 10-15% gain dekh kar turant bech dete hain, unko regret hota 6 months baad jab stock 50-80% upar chala jata (like Zomato, Nykaa). Aur jo log panic mein -10% par bech dete listing day, unko bhi regret hota recovery ke time. Toh kya karein? Simple 3-bucket strategy follow karo: Agar listing 20%+ gain de, 33% bech do (capital recover karo). 33% hold karo medium-term (6-12 months). 33% hold karo long-term (3+ years). Isse sabhi scenarios cover ho jaate - profit bhi book hua, growth bhi milega.",
          credentials: "SEBI registered investment advisor | 5,000+ retail investors guided"
        },
        internalLinks: [
          {
            text: "Profit Booking Calculator - kitna bechna kitna hold karna",
            url: "/calculators/profit-booking-calculator"
          },
          {
            text: "Stop-Loss Calculator - exit point calculate karo",
            url: "/calculators/stop-loss-calculator"
          }
        ]
      }
    ],
    regionalContext: "Retail investors ka distribution dekho India mein: Maharashtra aur Gujarat se 30% applications aate (financial awareness zyada), North India (Delhi, Punjab, Haryana) se 25%, South (Bangalore, Hyderabad, Chennai) se 20%, West aur East se combined 25%. Tier-2/3 cities se applications badh rahe - Jaipur, Indore, Surat, Coimbatore se strong participation.",
    globalContext: "Globally retail investor participation India mein sabse zyada hai IPOs mein - 40-45% vs US mein 10-15%, China mein 25%. Indian retail investors IPOs ko lottery ki tarah dekhte hain (quick gains), while US mein long-term wealth building focus hai."
  },
  
  outlook: {
    shortTerm: "Application ke 3 din (IPO open period) bohot crucial hain। First day rush hoga, server slow ho sakta। Second-third day mein apply karo calmly. Anchor investor list Day -2 par aayegi - check karo strong hai ya weak। Subscription data live milta - agar Day 1 mein hi 3x cross kar gaya, strong demand signal hai।",
    mediumTerm: "Allotment ke baad 6 months critical period hai। Stock 20-40% upar-neeche swing karega quarterly results ke basis par। Agar hold karna decide kiya, quarterly earnings track karo (revenue growth, profitability progress).",
    longTerm: "3-5 saal ke investors ke liye: Focus karo company fundamentals par, short-term price movements ignore karo। Lenskart agar apna roadmap execute kar de (profitable + 3,000 stores + international growth), 3x-5x returns possible hain from listing price.",
    catalysts: [
      "Strong retail oversubscription (8x+) - confidence signal",
      "Media coverage positive - TV channels, newspapers mein favorable reviews",
      "Celebrity endorsements - agar Shark Tank judges promote karein (Peyush Bansal ke connections)",
      "First-day listing premium - sets sentiment for holding"
    ],
    risks: [
      "Technical glitches application mein - last-minute rush se avoid karo",
      "UPI mandate approval miss - 1 hour mein approve karna bhoolna mat",
      "Wrong bid price - cut-off always select karo confusion avoid karne ke liye",
      "Overinvestment - emergency fund se mat lagao, only surplus use karo"
    ]
  },
  
  takeaway: {
    summary: "Lenskart IPO mein invest karna complicated nahi hai agar step-by-step follow karo। Key points yaad rakho: Pehla - Demat account pehle se ready rakho (last minute mat kholna). Dusra - Application Day 2 ya Day 3 par karo (Day 1 rush avoid, Day 4 technical risk hai). Teesra - Cut-off price select karo always - final price automatically adjust ho jayega. Chautha - UPI mandate turant approve karo mobile notification aaye toh. Panchwa - Realistic rakho expectations - 8x subscription mein 12-13% chance hai sirf. Chhata - Allotment nahi mili toh disappointment nahi, 2-3 weeks baad listing price par kharid sakte direct market se (sometimes IPO price se sasta mil jata). Saatva - Agar mili toh strategy pehle se plan rakho (kitne % par profit book karoge, kitne % hold karoge). Retail investors ki sabse badi strength hai patience - use karo!",
    actionableSteps: [
      "Timeline banao: Day 1 - Demat ready, Day 2 - Research complete, Day 3 - Apply karo, Day 5 - Allotment check, Day 10 - Listing strategy execute",
      "Documents ready rakho: PAN card, Aadhaar, bank account UPI-enabled, demat DP ID, mobile number registered",
      "Practice run karo: Agar pehli baar hai, kisi chhoti IPO mein apply karke process samajh lo (₹5,000-₹10,000 mein)",
      "Family planning: Wife, parents ke PAN se alag applications - total chances badhao (legal hai fully)",
      "Broker compare karo: Zerodha, Groww, Upstox sabka interface alag - jo comfortable lage use karo",
      "Backup plan rakho: Agar primary bank UPI fail ho toh alternative bank ready (technical issues ke liye)",
      "Tax planning: Listing gains short-term capital gains hain (15% tax) - ITR mein declare karna padega"
    ],
    relatedTopics: [
      {
        title: "Demat Account Kaise Kholein: Complete Process Hindi Mein",
        url: "/learn/demat-account-opening-guide"
      },
      {
        title: "UPI ASBA vs ASBA: Kya Difference Hai IPO Mein",
        url: "/learn/upi-asba-vs-asba"
      },
      {
        title: "IPO Allotment Status Kaise Check Karein (All Methods)",
        url: "/learn/check-ipo-allotment-status"
      },
      {
        title: "IPO Listing Day Trading Strategy (Hindi)",
        url: "/learn/ipo-listing-day-strategy"
      }
    ],
    expertResources: [
      {
        title: "IPO Application Checklist (Hindi PDF)",
        description: "Print karke rakh lo - kuch miss nahi hoga",
        url: "/tools/ipo-application-checklist",
        type: "tool"
      },
      {
        title: "IPO Allotment Probability Calculator",
        description: "Subscription level ke basis par chances calculate karo",
        url: "/calculators/ipo-allotment-calculator",
        type: "calculator"
      },
      {
        title: "Tax Calculator for IPO Gains",
        description: "Listing gains par kitna tax lagega - pehle se jaan lo",
        url: "/calculators/capital-gains-tax-calculator",
        type: "calculator"
      }
    ]
  }
};

