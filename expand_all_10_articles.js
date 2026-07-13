const fs = require('fs');
const path = require('path');

const additionalContent = `
        , { type: 'h2', content: 'Toxic Movie Real Facts: Budget, Cast & Director (सच्चाई)' }
        , { type: 'p', content: 'इंटरनेट पर कई अफवाहें हैं, लेकिन आधिकारिक जानकारी (Official Details) के मुताबिक, <strong>Toxic: A Fairytale for Grown-Ups</strong> एक हाई-बजट पीरियड गैंगस्टर (Period Gangster) फिल्म है। फिल्म का निर्देशन अवॉर्ड-विनिंग डायरेक्टर <strong>Geetu Mohandas</strong> (गीतू मोहनदास) कर रही हैं। इसे KVN Productions (वेंकट के. नारायण) और यश की खुद की कंपनी Monster Mind Creations द्वारा जॉइंटली प्रोड्यूस किया जा रहा है।' }
        , { type: 'p', content: 'इस फिल्म का कुल बजट (Toxic Movie Budget) <strong>₹500 करोड़ से ₹1,000 करोड़</strong> के बीच बताया जा रहा है, जो इसे भारत की सबसे महंगी फिल्मों की लिस्ट में शामिल करता है। इस फिल्म की शूटिंग कन्नड़ और इंग्लिश (Kannada and English) दोनों भाषाओं में हो रही है। शूटिंग के प्रमुख लोकेशंस में बेंगलुरु, मुंबई, गोवा, थूथुकुडी (Thoothukudi) और जयपुर शामिल हैं। फिल्म में 1950-1970 के दशक के तटीय गोवा (Goa coast) के ड्रग कार्टेल (Drug Cartel) का खौफनाक रूप दिखाया जाएगा।' }
        , { type: 'p', content: 'फिल्म का स्केल इतना बड़ा है कि इसका बजट कई बड़ी कंपनियों के नेटवर्थ से भी ज्यादा है। अगर आप जानना चाहते हैं कि 1000 करोड़ जैसी बड़ी रकम को अगर FD में रखा जाए तो कितना रिटर्न मिलेगा, तो आप <a href="https://moneycal.in/tools/fd-calculator">FD Calculator</a> से इसे कैलकुलेट कर सकते हैं। यह रिटर्न ही लाखों रुपये महीने का होता है!' }
        , { type: 'h2', content: 'Toxic Cast: Yash के साथ कौन-कौन हैं?' }
        , { type: 'p', content: 'Toxic की स्टारकास्ट (Star Cast) पूरी तरह से पैन-इंडिया अपील वाली है। फिल्म में <strong>यश (Yash)</strong> \\'राया\\' (Raya) के साथ-साथ एक डबल रोल (Dual Role) में नजर आ सकते हैं। यश के अलावा बॉलीवुड और साउथ की बड़ी एक्ट्रेसेस इस फिल्म का हिस्सा हैं, जिनमें <strong>Kiara Advani, Nayanthara, Huma Qureshi, Tara Sutaria, Rukmini Vasanth</strong> और <strong>Akshay Oberoi</strong> शामिल हैं। यह एन्सेम्बल कास्ट (Ensemble Cast) यह सुनिश्चित करती है कि फिल्म पूरे भारत में भारी कमाई करेगी।' }
        , { type: 'p', content: 'इतने सारे बड़े स्टार्स को साइन करना मेकर्स के लिए एक बड़ा रिस्क भी है और तगड़ा इन्वेस्टमेंट भी। सही इन्वेस्टमेंट हमेशा अच्छे रिटर्न देता है, चाहे वह फिल्मों में हो या शेयर मार्केट में। अपने पैसों को सही जगह ग्रो करने के लिए <a href="https://moneycal.in/tools/sip-calculator">SIP Calculator</a> का इस्तेमाल करके 15 साल की प्लानिंग आज ही करें।' }
        , { type: 'h2', content: 'Toxic Release Date: 26 August 2026' }
        , { type: 'p', content: 'फिल्म की रिलीज डेट (Release Date) कई बार बदली गई है। पहले इसे मार्च 2026, फिर 4 जून 2026 को रिलीज करने का प्लान था। लेकिन हॉलीवुड (Hollywood) जैसी इंटरनेशनल डिस्ट्रीब्यूशन स्ट्रैटेजी और ग्लोबल रिलीज के लिए फिल्म की आधिकारिक रिलीज डेट अब <strong>26 अगस्त 2026 (August 26, 2026)</strong> तय कर दी गई है। यश का कहना है कि यह देरी जानबूझकर की गई है ताकि फिल्म इंटरनेशनल स्टैंडर्ड्स पर खरी उतर सके।' }
        , { type: 'p', content: 'फिल्म देखने का प्लान बनाने के साथ-साथ अपना टैक्स बचाने का प्लान भी जरूर बनाएं। <a href="https://moneycal.in/tools/income-tax-calculator">Income Tax Calculator</a> आपको आपकी सैलरी पर सही टैक्स और डिडक्शन (Deductions) समझने में मदद करेगा।' }
        , { type: 'h2', content: 'FAQ: Toxic Movie Important Updates' }
        , { type: 'p', content: '<strong>Q1: Toxic movie release date 2024 या 2025 में क्यों नहीं है?</strong><br>Ans: फिल्म का VFX और पोस्ट-प्रोडक्शन का काम बहुत भारी है, इसलिए इसे 26 अगस्त 2026 (August 26, 2026) को ग्लोबली रिलीज किया जाएगा।' }
        , { type: 'p', content: '<strong>Q2: Toxic movie cast में कौन-कौन है?</strong><br>Ans: यश (Yash), कियारा आडवाणी (Kiara Advani), नयनतारा (Nayanthara), हुमा कुरैशी (Huma Qureshi), तारा सुतारिया और रुक्मिणी वसंत फिल्म की मुख्य स्टारकास्ट हैं।' }
        , { type: 'p', content: '<strong>Q3: Toxic का डायरेक्टर (Director) कौन है?</strong><br>Ans: इस फिल्म का निर्देशन Geetu Mohandas (गीतू मोहनदास) कर रही हैं, जो अपनी हार्ड-हिटिंग और रियलिस्टिक फिल्मों के लिए मशहूर हैं।' }
        , { type: 'p', content: '<strong>Q4: फिल्म की कहानी किस पर आधारित है?</strong><br>Ans: यह एक पीरियड गैंगस्टर (Period Gangster) क्राइम थ्रिलर है, जिसकी कहानी गोवा (Goa) के ड्रग कार्टेल (Drug cartel) के इर्द-गिर्द घूमती है।' }
        , { type: 'p', content: '<strong>Q5: Toxic movie का बजट क्या है?</strong><br>Ans: आधिकारिक रिपोर्ट्स के अनुसार, यह भारत की सबसे महंगी फिल्मों में से एक है जिसका बजट ₹500 करोड़ से ₹1,000 करोड़ के बीच है।' }
        , { type: 'p', content: 'यकीन मानिए, Toxic भारतीय सिनेमा का चेहरा बदलने वाली है। यह सिर्फ एक फिल्म नहीं, बल्कि ग्लोबल लेवल पर भारतीय सिनेमा की धाक जमाने का एक बड़ा प्रोजेक्ट है। तब तक, अपने फाइनेंस को सही रखें और <a href="https://moneycal.in/tools/home-loan-emi-calculator">Home Loan EMI Calculator</a> के जरिए अपनी बचत को ट्रैक करते रहें।' }
    ]
};
`;

const files = [
    'yash-toxic-movie-raya-release-date-box-office.ts',
    'toxic-movie-tabaahi-song-yash-kiara-chemistry.ts',
    'toxic-movie-box-office-collection-1200-crore-budget.ts',
    'toxic-movie-yash-double-role-theory-villain.ts',
    'toxic-movie-gun-scene-controversy-a-rating.ts',
    'toxic-movie-raya-to-ravan-ramayan-nitesh-tiwari.ts',
    'toxic-movie-hollywood-action-director-jj-perry.ts',
    'toxic-movie-release-date-4-festivals-strategy.ts',
    'toxic-movie-1970-goa-underworld-aesthetic.ts',
    'toxic-movie-cast-nayanthara-kiara-huma.ts'
];

function processFile(filePath) {
    const fullPath = path.resolve(__dirname, 'src/data/discover', filePath);
    if (!fs.existsSync(fullPath)) return;
    
    let content = fs.readFileSync(fullPath, 'utf8');
    
    // Check if it's already expanded to avoid double expansion
    if (content.includes('Toxic Movie Real Facts')) {
        console.log('Already expanded:', filePath);
        return;
    }
    
    content = content.replace(/\n\s*\]\n\};/g, additionalContent);
    fs.writeFileSync(fullPath, content, 'utf8');
    console.log('Successfully expanded:', filePath);
}

files.forEach(processFile);
