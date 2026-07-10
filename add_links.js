const fs = require('fs');
const path = require('path');

const files = [
  'cred-gets-900m-investment-meta-fintech.ts',
  'tata-communications-data-centre-fire-google-cloud.ts',
  'reliance-infrastructure-sebi-investigation-fund-diversion.ts',
  'icici-bank-leads-market-cap-surge-wealth.ts',
  'lic-cfo-resigns-ipo-strategy-investors.ts',
  'next-big-ipo-startup-raises-millions-quietly-udaan.ts',
  'fintech-crash-zestmoney-startup-shutting-down.ts',
  'experts-bullish-bajaj-finance-growth.ts',
  'india-most-valuable-unlisted-company-nse.ts',
  'tata-sons-ipo-controversy-markets-impact.ts'
];

const linksHtml = `    {
      type: "h2",
      content: "Related Financial Tools 🔧"
    },
    {
      type: "ul",
      content: "<li>अपने लॉन्ग-टर्म निवेश की प्लानिंग के लिए <a href=\\"/tools/sip-calculator\\">SIP Calculator</a> का इस्तेमाल करें।</li><li>अपने बिज़नेस या होम लोन की किश्त जानने के लिए <a href=\\"/tools/emi-calculator\\">EMI Calculator</a> देखें।</li><li>टैक्स बचाने और सुरक्षित रिटर्न के लिए <a href=\\"/tools/ppf-calculator\\">PPF Calculator</a> आज़माएं।</li>"
    }
  ]
};`;

for (const file of files) {
  const filePath = path.join(__dirname, 'src', 'data', 'discover', file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    // Ensure we don't duplicate
    if (!content.includes('Related Financial Tools')) {
      content = content.replace(/  \]\r?\n\};\s*$/, linksHtml);
      fs.writeFileSync(filePath, content);
      console.log(`Updated ${file}`);
    } else {
      console.log(`Skipped ${file} (Already updated)`);
    }
  } else {
    console.log(`File not found: ${file}`);
  }
}
