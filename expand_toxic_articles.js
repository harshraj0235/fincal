const fs = require('fs');
const path = require('path');

const additionalContent = `
        { type: 'h2', content: 'Yash (यश) का KGF 1 और KGF 2 का बॉक्स ऑफिस रिकॉर्ड (Box Office Records)' },
        { type: 'p', content: 'सुपरस्टार यश की पिछली फिल्म KGF Chapter 2 ने भारतीय सिनेमा के सारे रिकॉर्ड तोड़ दिए थे। 14 अप्रैल 2022 को रिलीज हुई इस फिल्म ने दुनिया भर में लगभग ₹1,200 से ₹1,250 करोड़ का ग्रॉस कलेक्शन (Gross Collection) किया था। हिंदी बेल्ट में भी इस फिल्म ने ₹434 करोड़ से ज्यादा की नेट कमाई (Net Income) की थी। इसके साथ ही यह फिल्म भारत की सबसे ज्यादा कमाई करने वाली फिल्मों की लिस्ट (Dangal, Baahubali 2, RRR) में शामिल हो गई।' },
        { type: 'p', content: 'फिल्म की बंपर कमाई ने फिल्म डिस्ट्रीब्यूटर्स और थिएटर्स को मालामाल कर दिया था। अगर किसी डिस्ट्रीब्यूटर ने उस समय इस प्रॉफिट को सही जगह इन्वेस्ट किया होता, तो आज उसे करोड़ों का रिटर्न मिलता। आम इंसान भी मात्र ₹1,000 या ₹5,000 की SIP (Systematic Investment Plan) से शुरुआत कर सकता है। अगर आप अपने पैसे पर कंपाउंड इंटरेस्ट (Compound Interest) का जादू देखना चाहते हैं, तो एक बार हमारा <a href="https://moneycal.in/tools/sip-calculator">SIP Calculator</a> जरूर चेक करें। लंबे समय में शेयर मार्केट में निवेश करना हमेशा फायदेमंद साबित होता है।' },
        { type: 'h2', content: 'Toxic: A Fairy Tale for Grown-Ups - फिल्म की स्टार कास्ट और टीम (Cast and Crew)' },
        { type: 'p', content: 'Toxic फिल्म का डायरेक्शन Geetu Mohandas कर रही हैं, जिन्हें उनकी फिल्म "Moothon" और "Liar\\'s Dice" के लिए जाना जाता है। "Liar\\'s Dice" भारत की तरफ से ऑस्कर (Oscar) के लिए भी नॉमिनेट हुई थी। यह साफ है कि Geetu Mohandas एक टिपिकल मसाला फिल्म नहीं बना रही हैं, बल्कि इसमें डार्क और साइकोलॉजिकल एलिमेंट्स होंगे। फिल्म को KVN Productions के बैनर तले प्रोड्यूस किया जा रहा है।' },
        { type: 'p', content: 'कास्ट की बात करें तो, फिल्म में यश (Yash) के अलावा कियारा आडवाणी (Kiara Advani), नयनतारा (Nayanthara), और हुमा कुरैशी (Huma Qureshi) के होने की पुष्टि हुई है। कियारा आडवाणी बॉलीवुड की टॉप एक्ट्रेसेस में से एक हैं, जबकि नयनतारा साउथ की लेडी सुपरस्टार (Lady Superstar) हैं। फिल्म में नयनतारा यश की बहन का रोल कर रही हैं, ऐसा कई रिपोर्ट्स में दावा किया गया है।' },
        { type: 'callout', content: '<strong>🔥 Financial Tip:</strong> फिल्म के बजट की बात करें तो यह ₹500 करोड़ से ऊपर बताया जा रहा है। इतनी बड़ी रकम का इनकम टैक्स (Income Tax) भी करोड़ों में होता है। अगर आपकी सैलरी भी अच्छी है और आप टैक्स बचाना चाहते हैं, तो <a href="https://moneycal.in/tools/income-tax-calculator">Income Tax Calculator</a> का इस्तेमाल करके 80C और 80D के तहत अपनी टैक्स प्लानिंग जरूर करें।' },
        { type: 'h2', content: '1970s के गोवा का अंडरवर्ल्ड और रियल ड्रग माफिया' },
        { type: 'p', content: 'रिपोर्ट्स के मुताबिक, Toxic की कहानी 1950 से लेकर 1970 के दशक के गोवा (Goa) पर आधारित है। यह वह समय था जब हिप्पी कल्चर (Hippie Culture) भारत में अपनी जड़ें जमा रहा था और गोवा विदेशी ड्रग्स और स्मगलिंग का सबसे बड़ा अड्डा बन चुका था। फिल्म में रेट्रो (Retro) जमाने की लग्जरी, विंटेज कारें, कसीनो (Casinos) और अंडरवर्ल्ड का असली चेहरा देखने को मिलेगा। फिल्म के लिए बेंगलुरु में कई बड़े और महंगे सेट लगाए गए हैं।' },
        { type: 'p', content: 'उस जमाने में सोने की कीमत (Gold Price) मात्र कुछ सौ रुपये प्रति 10 ग्राम हुआ करती थी। आज सोना ₹75,000 प्रति 10 ग्राम को पार कर चुका है। जो लोग उस जमाने में सोने में निवेश करते थे, आज वो करोड़पति हैं। अगर आप आज के सोने के रेट और फ्यूचर वैल्यू का अंदाजा लगाना चाहते हैं, तो हमारे <a href="https://moneycal.in/gold-tools/gold-price-calculator">Gold Price Calculator</a> का उपयोग करें।' },
        { type: 'h2', content: 'Toxic Movie Release Date (रिलीज डेट)' },
        { type: 'p', content: 'मेकर्स ने फिल्म की रिलीज डेट पहले 10 अप्रैल 2025 तय की थी, लेकिन फिल्म के स्केल और वीएफएक्स (VFX) के भारी काम को देखते हुए इसे आगे बढ़ा दिया गया है। नई रिपोर्ट्स के मुताबिक, फिल्म अब 26 अगस्त 2026 (August 26, 2026) को सिनेमाघरों में रिलीज होगी। यह रिलीज डेट बहुत ही सोच समझ कर तय की गई है, क्योंकि इसके आसपास ओणम (Onam), रक्षाबंधन (Raksha Bandhan) और ईद जैसे बड़े त्योहार आ रहे हैं, जिससे फिल्म को लंबा वीकेंड मिलेगा।' },
        { type: 'p', content: 'छुट्टियों में फिल्म देखने जाने से पहले अपनी पर्सनल फाइनेंस प्लानिंग भी दुरुस्त रखें। अगर आप कार लोन (Car Loan) या होम लोन (Home Loan) लेने का प्लान कर रहे हैं, तो बैंक जाने से पहले <a href="https://moneycal.in/tools/home-loan-emi-calculator">Home Loan EMI Calculator</a> पर अपनी ईएमआई (EMI) चेक करना न भूलें।' },
        { type: 'h2', content: 'हॉलीवुड लेवल का एक्शन: JJ Perry की एंट्री' },
        { type: 'p', content: 'एक्शन को नेक्स्ट लेवल पर ले जाने के लिए मेकर्स ने हॉलीवुड के मशहूर एक्शन डायरेक्टर J.J. Perry (जे.जे. पेरी) को साइन किया है। J.J. Perry ने "John Wick" और "Fast & Furious" सीरीज जैसी बड़ी फिल्मों में काम किया है। इस बार दर्शक यश को पुरानी साउथ इंडियन स्टाइल फाइट के बजाय मार्शल आर्ट्स, गन फू (Gun-fu) और क्लोज कॉम्बैट (Close combat) करते हुए देखेंगे। फिल्म का एक्शन बहुत ही खूंखार (Brutal) होने वाला है।' },
        { type: 'h2', content: 'FAQ: Toxic Movie से जुड़े अहम सवाल' },
        { type: 'p', content: '<strong>Q1: Toxic फिल्म का लीड एक्टर कौन है?</strong><br>Ans: फिल्म में लीड एक्टर सुपरस्टार यश (Yash) हैं, जिन्हें KGF सीरीज के रॉकी भाई (Rocky Bhai) के रूप में जाना जाता है।' },
        { type: 'p', content: '<strong>Q2: Toxic फिल्म की हीरोइन कौन है?</strong><br>Ans: फिल्म में कियारा आडवाणी (Kiara Advani) और लेडी सुपरस्टार नयनतारा (Nayanthara) लीड फीमेल रोल्स में नजर आएंगी।' },
        { type: 'p', content: '<strong>Q3: Toxic movie release date क्या है?</strong><br>Ans: फिल्म 26 अगस्त 2026 (26 August 2026) को सिनेमाघरों में पैन इंडिया लेवल पर रिलीज होने की संभावना है।' },
        { type: 'p', content: '<strong>Q4: Toxic का डायरेक्टर कौन है?</strong><br>Ans: फिल्म को Geetu Mohandas (गीतू मोहनदास) डायरेक्ट कर रही हैं, जो अपनी डार्क और रियलिस्टिक फिल्मों के लिए जानी जाती हैं।' },
        { type: 'p', content: '<strong>Q5: Toxic movie budget (बजट) कितना है?</strong><br>Ans: मीडिया रिपोर्ट्स के मुताबिक, फिल्म का बजट ₹500 करोड़ से ₹800 करोड़ के बीच बताया जा रहा है, जो इसे भारत की सबसे महंगी फिल्मों में से एक बनाता है।' },
        { type: 'h2', content: 'निष्कर्ष (Conclusion)' },
        { type: 'p', content: 'Yash की Toxic movie भारतीय सिनेमा के इतिहास में एक नया पन्ना जोड़ने जा रही है। फिल्म की स्टार कास्ट, इसका रेट्रो डार्क अंडरवर्ल्ड थीम, हॉलीवुड लेवल का एक्शन, और ₹500 करोड़ से ज्यादा का बजट इसे एक मास्टरपीस बनाता है। 2026 में जब यह फिल्म रिलीज होगी, तो तय है कि बॉक्स ऑफिस पर पैसों की बारिश होगी। आप भी अपने पैसों को बैंक में रखने के बजाय उसे इन्वेस्ट करके ग्रो करें। सही इन्वेस्टमेंट स्ट्रेटेजी के लिए हमारे <a href="https://moneycal.in/tools/ppf-calculator">PPF Calculator</a> और <a href="https://moneycal.in/tools/fd-calculator">FD Calculator</a> जैसे टूल्स का इस्तेमाल करके आज ही अपने भविष्य को सुरक्षित करें!' }
`;

function processFile(filePath) {
    const fullPath = path.resolve(__dirname, filePath);
    if (!fs.existsSync(fullPath)) return;
    
    let content = fs.readFileSync(fullPath, 'utf8');
    
    // We want to insert the additionalContent right before the closing bracket of the sections array.
    // The sections array ends with:
    //     ]
    // };
    // Since there are multiple objects in toxic-movie-series.ts, we need to do it for every object.
    
    content = content.replace(/\]\s*;\s*/g, (match) => {
        // Insert a comma if the last object doesn't have one? 
        // We'll just prepend a comma to our additionalContent block (remove the first curly bracket's preceding comma if needed)
        // Wait, the sections array elements are comma separated. 
        return ',' + additionalContent + '\n' + match;
    });

    fs.writeFileSync(fullPath, content, 'utf8');
    console.log('Successfully expanded:', filePath);
}

processFile('src/data/discover/yash-toxic-movie-raya-release-date-box-office.ts');
processFile('src/data/discover/toxic-movie-series.ts');
