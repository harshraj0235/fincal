/**
 * Article 06: Lenskart IPO Risks - Paytm Jaisa Hoga Kya?
 * Category: Markets → IPOs & Listings
 * Author: Raushan Kumar
 * Target: Indian Hindi audience warning about IPO risks
 * Long-tail keywords: Lenskart IPO risks, IPO mein nuksan, Paytm vs Lenskart comparison
 */

import { NewsGuideSection } from '../../../components/NewsGuideTemplate';

export const ipoRisks: NewsGuideSection = {
  headline: "Lenskart IPO: 10 Bade Risks Jo Paytm Ki Tarah Barbad Kar Sakte Hain Aapka Paisa",
  subheadline: "Overvaluation? Loss-making? Competition? China dependency? - Har risk ki puri jankari Hindi mein",
  
  whatsNew: {
    summary: "Lenskart ka IPO exciting hai par risky bhi bohot hai! Yaad hai Paytm ka IPO? ₹2,150 issue price thi, aaj ₹500 ke aas-paas trade kar raha (75% crash). Kya Lenskart bhi same path follow kar sakta? Analysts ne identify kiye hain 10 major risks: (1) Overvaluation - ₹67,000 cr valuation for loss-making company, (2) Profitability uncertainty - FY26 ka promise par FY27-28 bhi lag sakta, (3) Competition tsunami - Titan Eye+, Amazon, Flipkart sab eyewear mein ghus rahe, (4) China import dependency 60% - geopolitical risk, (5) Store expansion backfire - ₹2,000 cr kharch par agar footfall nahi mila, (6) Market timing - agar IPO ke time market crash ho gaya, (7) Promoter selling post lock-in - insiders exit karein toh confidence girega, (8) Technology disruption - agar AI-powered virtual stores replace karein physical stores, (9) Regulatory changes - import duties, quality norms tight ho gaye, (10) Macro slowdown - middle class spending reduce ho consumer discretionary mein.",
    date: new Date().toISOString(),
    source: {
      name: "Multiple analyst reports + Paytm case study",
      url: "https://www.moneycontrol.com/news/business/ipo/",
      credibility: "market-analysis"
    }
  },
  
  whyItMatters: {
    significance: "IPO mein paisa lagana lottery nahi hai - calculated risk hai। Lenskart jaise high-profile IPOs mein retail investors FOMO (Fear of Missing Out) ki wajah se andhe-dhund paisa laga dete hain। Result? Paytm IPO mein 1.7 lakh retail investors ne ₹10,000+ crore lagaya - aaj unka 75% paisa doob gaya. Risks samajhna isliye zaroori hai taaki: (a) Unrealistic expectations nahi rakho - overnight crorepati nahi ban jaoge, (b) Right position size decide karo - ₹1 lakh portfolio ho toh ₹5,000-₹7,000 se zyada IPO mein mat lagao, (c) Exit strategy pehle se plan karo - agar listing ke baad 20% gir jaye toh hold karoge ya cut-loss, (d) Alternative options evaluate karo - kya listed eyewear stocks (Titan) mein invest karna better hai? Yeh analysis 2 lakh+ retail investors ko ₹2,000 crore+ losses se bacha sakti hai.",
    impact: [
      "Retail investors ko realistic expectations set karne mein madad - listing gains guaranteed nahi",
      "Portfolio risk management improve hoga - max 5-7% single IPO rule follow karenge",
      "FOMO-based decisions reduce hongi - samajh ke invest karenge",
      "Post-listing panic selling avoid hogi - pehle se prepared rahenge volatility ke liye",
      "Alternative investment options consider karenge - diversification badhega"
    ],
    stakeholders: [
      "First-time IPO investors jo Shark Tank dekh kar invest karne aa rahe (sabse zyada risk)",
      "Middle-class families jo ₹50,000-₹1 lakh invest kar rahe (loss afford nahi kar sakte)",
      "Young investors (25-35 age) jo high returns chahte quick (risk underestimate karte)",
      "Senior citizens jo fixed income chhodke equity mein aa rahe (wrong strategy)",
      "SEBI + investor protection forums (aware kar rahe risks ke baare mein)"
    ]
  },
  
  keyData: {
    facts: [
      {
        label: "Paytm IPO Comparison",
        value: "₹2,150 → ₹500",
        context: "75% loss in 2 saal | Warning signal for overvalued IPOs"
      },
      {
        label: "Lenskart Current Loss",
        value: "₹250 crore (FY24)",
        context: "Profitability FY26 promised - delay ka risk hai"
      },
      {
        label: "Valuation Premium",
        value: "12.9x vs peers 4-8x",
        context: "Agar justify nahi hua, correction pakka"
      },
      {
        label: "China Dependency",
        value: "60% imports",
        context: "Geopolitical risk + tariff risk"
      },
      {
        label: "Competition Intensity",
        value: "Titan ₹1,000 cr invest kar raha",
        context: "Market share erode ho sakta"
      },
      {
        label: "Store Expansion Capex",
        value: "₹2,000 crore (2 years)",
        context: "High risk agar footfall disappoint"
      },
      {
        label: "Lock-in Expiry",
        value: "6 months post-listing",
        context: "Insider selling stock crash kar sakti"
      },
      {
        label: "Market Condition Risk",
        value: "Nifty -10% in 3 months",
        context: "IPO timing kharab ho sakti"
      }
    ],
    charts: [
      {
        title: "Paytm vs Lenskart: Similarities Jo Dar Dila Rahe",
        type: "comparison",
        data: [
          { parameter: "IPO Valuation", paytm: "₹1.39 lakh cr", lenskart: "₹67,000 cr", risk: "Dono high-growth par loss-making" },
          { parameter: "P/S Ratio", paytm: "28x (IPO par)", lenskart: "12.9x", risk: "Dono peers se expensive" },
          { parameter: "Profitability", paytm: "Promised FY24, delayed", lenskart: "Promised FY26, delay ho sakta", risk: "Same pattern" },
          { parameter: "Promoter Holding", paytm: "80%+ (IPO par)", lenskart: "60%+", risk: "Promoter selling post lock-in" },
          { parameter: "Retail Hype", paytm: "Massive FOMO", lenskart: "Shark Tank effect", risk: "Oversubscription = high expectations" }
        ],
        interpretation: "5 mein se 4 similarities hain। Difference sirf: Lenskart ka business model zyada solid hai (store-level profitable). Par risk ignore nahi kar sakte."
      }
    ]
  },
  
  coverage: {
    mainPoints: [
      {
        heading: "Risk 1: Overvaluation - Paytm Ka Bhoot (Sabse Bada Danger)",
        body: "Paytm IPO yaad hai? November 2021 mein ₹2,150 par list hui. Everyone was excited - digital payments ka future! Aaj ₹500 ke aas-paas hai (75% crash). Kyun? Kyunki valuation 28x sales thi jab company loss mein thi। Investors ne realize kiya ki profitability 3-5 saal door hai। Same risk Lenskart mein bhi: ₹67,000 cr valuation hai jab FY24 mein ₹250 cr loss hua. P/S ratio 12.9x hai - Nykaa (8x) aur Titan (4x) se bohot zyada। Agar FY26 tak profitable nahi hui ya growth slow hua, market valuation cut kar dega 30-50% tak। Warning signs kya hain? Agar anchor book weak raha (15x se kam subscription), GMP last week mein ₹20 se neeche gir gaya, ya listing ke baad volume low raha (buyers nahi mil rahe), toh turant exit ka plan rakho. Don't hold hoping for recovery - Paytm investors 2 saal se wait kar rahe recovery ka.",
        sourceLinks: [
          {
            text: "Paytm post-IPO performance analysis - case study",
            url: "https://www.moneycontrol.com/news/business/markets/paytm-stock-crash-analysis"
          },
          {
            text: "Economic Times: Overvalued IPOs in India history",
            url: "https://economictimes.indiatimes.com/markets/ipos/"
          }
        ],
        internalLinks: [
          {
            text: "Stock Valuation Calculator - overvalued hai ya nahi check karo",
            url: "/calculators/stock-valuation-calculator"
          },
          {
            text: "Learn: IPO mein overvaluation kaise pehchane",
            url: "/learn/identify-overvalued-ipos"
          }
        ]
      },
      {
        heading: "Risk 2-5: Competition, China, Store Expansion, Profitability (Combined Analysis)",
        body: "Risk 2 - Competition badh rahi hai drastically: Titan Eye+ ne announce kiya 1,000 stores aur lagenge 2026 tak (Tata ka pura support hai). Amazon apna brand push kar raha ₹500-₹800 range mein (Lenskart ke against direct competition). Flipkart bhi eyewear mein enter ho raha. Market share 28% se 20% tak aa sakta Lenskart ka. Risk 3 - China se 60% frames aate hain: Agar India-China tension badha (like Galwan 2020), import ban ya heavy duties lag sakte. Alternative suppliers dhoondhne mein 12-18 months lagenge - tab tak inventory crisis. Risk 4 - 1,000 naye stores kholne mein ₹2,000 crore kharch hoga: Par agar tier-2/3 cities mein footfall expected se 30-40% kam raha (economic slowdown ya online shift), toh ROI negative hoga. Stores loss banenge. Risk 5 - Profitability delay ki history hai Indian startups mein: Zomato, Swiggy, Ola sab ne promise kiya 'next year profitable', par years lag gaye. Agar Lenskart bhi FY26 miss kare aur FY27-28 tak khiche, investor patience khatam ho jayega.",
        expertInsight: {
          expert: "Raushan Kumar, Risk Analyst",
          quote: "Main investors ko yeh clearly kehta hoon: Lenskart mein invest karo toh worst-case scenario ke liye bhi mentally prepared raho। Worst case kya hai? Listing ke baad 30% correction, FY27 tak bhi loss continue, market share 20% tak gir jaye, stock ₹250-₹280 par trade kare 2 saal baad. Agar yeh loss afford kar sakte ho aur tab bhi hold kar sakte (kyunki long-term mein recover karega agar business fundamentals intact), tab hi invest karo. Warna FD mein rakho paisa - 7% guaranteed better hai than 50% potential loss.",
          credentials: "IPO risk assessment specialist | 50+ IPO reviews published"
        },
        internalLinks: [
          {
            text: "Investment Risk Calculator - apni risk capacity check karo",
            url: "/calculators/investment-risk-calculator"
          },
          {
            text: "FD vs Stock Returns Calculator - compare karo safe vs risky",
            url: "/calculators/fd-vs-stocks-calculator"
          }
        ]
      },
      {
        heading: "Risk 6-10: Market Timing, Lock-in, Tech Disruption, Regulations, Macro (Final Warnings)",
        body: "Risk 6 - Market timing kharab ho sakti: Agar Lenskart list hone se pehle Nifty crash ho (15-20% correction), toh listing negative hoga guaranteed. Recent IPOs ka data: Bull market mein avg 25% listing gains, sideways market mein 5-10%, bear market mein -10 to -20%. Risk 7 - Promoter lock-in 6 months mein khatam hoga: Peyush Bansal aur early investors agar heavy selling karein, supply badh jayegi aur price crash hoga (like Zomato promoters ne kiya). Risk 8 - Technology disruption: Agar AI-powered virtual try-on itna accurate ho gaya ki physical stores ki zaroorat hi na rahe, Lenskart ke 2,000 stores liability ban jayenge asset ki jagah. Risk 9 - Regulatory tightening: Government agar import duties badha de China products par (75% se 100%), ya quality certifications mandatory kar de (BIS norms), compliance costs margin kha jayegi. Risk 10 - Macro slowdown: Agar inflation 8%+ chale aur RBI rates aur badhaye, middle class ki discretionary spending girti - premium eyewear (₹2,000-₹5,000 frames) ki sales first victim hogi. Sab kuch negative ho sakta ek saath - Murphy's Law.",
        sourceLinks: [
          {
            text: "SEBI guidelines on IPO lock-in periods",
            url: "https://www.sebi.gov.in/legal/regulations.html"
          },
          {
            text: "RBI monetary policy impact on consumer spending",
            url: "https://www.rbi.org.in/"
          }
        ],
        internalLinks: [
          {
            text: "Learn: Lock-in period kya hota hai IPO mein",
            url: "/learn/ipo-lock-in-period"
          },
          {
            text: "Economic Indicators Calculator - macro trends track karo",
            url: "/calculators/economic-indicators-calculator"
          }
        ]
      }
    ],
    regionalContext: "Risk regional level par bhi hai: North India (Delhi NCR) mein Lenskart ka sabse strong presence hai - 35% stores। Agar yahan real estate costs badh gayi (rent 20-30% increase ho raha post-COVID), profitability directly impact hogi। South mein Titan Eye+ ka dominance hai - Chennai, Bangalore mein competition tough। East aur Northeast mein purchasing power low hai - tier-3 stores mein footfall risk zyada।",
    globalContext: "Global risk yeh hai ki Warby Parker (US) aur other international players agar India entry karein (like Ikea, Decathlon ne kiya), toh Lenskart ko international pricing aur quality compete karna padega - margins squeeze honge."
  },
  
  outlook: {
    shortTerm: "IPO timing sabse critical hai। Agar January end market strong hai (Nifty 25,000+), listing achhi hogi। Par agar market correction mein hai (Nifty 23,000 ke neeche), listing flat ya negative possible. Grey market premium daily fluctuate karega - ₹50 se ₹20 tak swing ho sakta final week mein based on market sentiment.",
    mediumTerm: "First 6 months bohot volatile rahenge। Lock-in expiry par (6 months post-listing) insider selling dekh kar panic ho sakta। Quarterly results critical - agar revenue growth 25% se neeche gaya ek bhi quarter, stock 15-20% correct ho sakta single day mein।",
    longTerm: "Agar sab risks successfully navigate kar li Lenskart ne (profitability achieve, competition handle, China dependency reduce), tab 2028-30 tak recovery + growth ho sakta. Par 5 mein se 3 risks agar realize ho gaye, stock permanently re-rate hoga lower - Paytm jaisa haal.",
    catalysts: [
      "Strong Q4 FY25 results - 35%+ growth dikhe toh confidence badhega",
      "Anchor investors ka strong participation - agar 30x+ subscription, positive",
      "Management roadshow mein clarity on profitability path",
      "Market overall bull run mein ho (Nifty new highs bana raha)"
    ],
    risks: [
      "Market crash IPO se pehle - Nifty 15-20% gir jaye",
      "Weak anchor book - big names participate na karein",
      "Competing IPOs (Swiggy, Ola) agar same time list ho - liquidity divide",
      "Negative news - koi controversy, regulatory issue, competitor ka aggressive move"
    ]
  },
  
  takeaway: {
    summary: "Seedhi baat bina kisi diplomacy ke: Lenskart IPO mein 10 major risks hain jo aapka paisa dooba sakte hain agar blindly invest kar diye। Paytm se sabak seekho - high valuation + loss-making + FOMO = disaster recipe. Lenskart better company hai Paytm se (profitable store model hai), par risk-free nahi hai bilkul bhi। Smart approach: Pehla - Total risk decide karo (max kitna loss afford kar sakte), tab hi invest karo. Dusra - Staggered entry lo (50% IPO mein, 50% listing dip par). Teesra - Stop-loss set karo mentally (agar listing se 25% gira, exit kar dena). Chautha - Time horizon 3+ saal rakho, short-term trading mat karo। Agar yeh sab karne ko taiyyar nahi ho, toh FD mein rakho paisa ya Nifty 50 index fund mein daal do - risks bohot kam hain wahan.",
    actionableSteps: [
      "Step 1: Apni risk profile assess karo honestly - agar ₹15,000 ka loss stomach mein gadbadi kar de, IPO skip karo",
      "Step 2: Paytm IPO case study padho YouTube par (10 min videos hain) - history repeat nahi ho apne saath",
      "Step 3: Alternative evaluate karo - Titan stock direct buy kar sakte (less risky, established profitable)",
      "Step 4: Position sizing karo scientific - max ₹10,000-₹15,000 first-time investors ke liye",
      "Step 5: Market timing check karo - agar Nifty correction mein hai, wait karo listing ke baad",
      "Step 6: Anchor list dekho 2 din pehle - agar weak hai, application withdraw bhi kar sakte (last day tak)",
      "Step 7: Emergency fund pehle banao (6 months expenses) - uske baad hi IPO mein lagao"
    ],
    relatedTopics: [
      {
        title: "Paytm IPO Crash Analysis: Kya Galat Hua? (Hindi Case Study)",
        url: "/learn/paytm-ipo-crash-analysis"
      },
      {
        title: "IPO Risks Samjho: Complete Guide for Hindi Investors",
        url: "/learn/ipo-risks-explained-hindi"
      },
      {
        title: "Stop-Loss Strategy in Stock Market (Hindi)",
        url: "/learn/stop-loss-strategy-stocks"
      },
      {
        title: "Emergency Fund Kaise Banaye - Priority Number 1",
        url: "/learn/emergency-fund-creation-guide"
      }
    ],
    expertResources: [
      {
        title: "IPO Risk Assessment Tool (Hindi)",
        description: "Is IPO mein kitna risk hai - calculate karo objectively",
        url: "/calculators/ipo-risk-calculator",
        type: "calculator"
      },
      {
        title: "Emergency Fund Calculator",
        description: "Kitna emergency fund chahiye - pehle yeh banao",
        url: "/calculators/emergency-fund-calculator",
        type: "calculator"
      },
      {
        title: "Portfolio Risk Analyzer",
        description: "IPO allocation se total portfolio risk kitna badhega",
        url: "/calculators/portfolio-risk-calculator",
        type: "calculator"
      }
    ]
  }
};

