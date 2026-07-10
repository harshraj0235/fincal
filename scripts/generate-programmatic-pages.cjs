/**
 * generate-programmatic-pages.cjs
 * 
 * Generates massive scale static HTML pages for long-tail SEO keywords.
 */

const fs = require('fs');
const path = require('path');

const PUBLIC_DIR = path.resolve(__dirname, '../public');
const AD_CLIENT = 'ca-pub-6815277662449747';

const SIP_AMOUNTS = [
    500, 1000, 1500, 2000, 2500, 3000, 4000, 5000, 7500, 10000, 15000, 20000, 25000, 50000, 100000
];

const LOAN_AMOUNTS = [
    1, 2, 3, 5, 10, 15, 20, 25, 30, 40, 50, 75, 100
]; // In Lakhs

const BANKS = [
    { name: "SBI", slug: "sbi", rate: "7.10%" },
    { name: "HDFC Bank", slug: "hdfc", rate: "7.25%" },
    { name: "ICICI Bank", slug: "icici", rate: "7.20%" },
    { name: "Punjab National Bank (PNB)", slug: "pnb", rate: "7.25%" },
    { name: "Axis Bank", slug: "axis", rate: "7.20%" },
    { name: "Kotak Mahindra Bank", slug: "kotak", rate: "7.40%" },
    { name: "Canara Bank", slug: "canara", rate: "7.25%" },
    { name: "Bank of Baroda", slug: "bob", rate: "7.15%" },
    { name: "Union Bank of India", slug: "union", rate: "7.25%" }
];

const SALARY_AMOUNTS = [
    3, 5, 6, 7, 8, 10, 12, 15, 20, 25, 30, 40, 50, 100
]; // In Lakhs

let generatedUrls = [];

function generateSIPHtml(amount) {
    const formattedAmount = new Intl.NumberFormat('en-IN').format(amount);
    
    const rate = 12 / 100 / 12;
    const calculateReturn = (years) => {
        const months = years * 12;
        const maturity = amount * ((Math.pow(1 + rate, months) - 1) / rate) * (1 + rate);
        return Math.round(maturity);
    };
    
    const mat10 = new Intl.NumberFormat('en-IN').format(calculateReturn(10));
    const mat20 = new Intl.NumberFormat('en-IN').format(calculateReturn(20));
    const mat30 = new Intl.NumberFormat('en-IN').format(calculateReturn(30));

    const title = `SIP Calculator for ₹${formattedAmount} per Month - Calculate Returns`;
    const description = `Start a ₹${formattedAmount} monthly SIP? Calculate your expected returns in 10, 20, or 30 years. See how ₹${formattedAmount}/month can make you a crorepati.`;
    const canonicalUrl = `https://moneycal.in/sip-calculator-for-${amount}-rupees`;

    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title} | MoneyCal.in</title>
    <meta name="description" content="${description}">
    <link rel="canonical" href="${canonicalUrl}">
    
    <style>
        :root { --primary: #1a1a2e; --blue: #2563eb; --bg: #f8fafc; --text: #1e293b; --green: #059669; }
        body { font-family: system-ui, -apple-system, sans-serif; background: var(--bg); color: var(--text); line-height: 1.6; margin: 0; padding: 0; }
        .container { max-width: 800px; margin: 0 auto; padding: 24px; background: white; min-height: 100vh; box-shadow: 0 0 20px rgba(0,0,0,0.05); }
        h1 { color: var(--primary); font-size: 2rem; border-bottom: 2px solid var(--blue); padding-bottom: 10px; }
        h2 { color: var(--blue); margin-top: 30px; }
        .highlight { font-weight: bold; color: var(--green); font-size: 1.2rem; }
        .table-wrap { overflow-x: auto; margin: 20px 0; }
        table { width: 100%; border-collapse: collapse; }
        th, td { padding: 12px; border: 1px solid #e2e8f0; text-align: right; }
        th { background: var(--primary); color: white; text-align: center; }
        .cta-btn { display: inline-block; background: var(--blue); color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 1.1rem; text-align: center; width: 100%; box-sizing: border-box; margin: 20px 0; }
        .ad-unit { margin: 30px 0; text-align: center; background: #f1f5f9; padding: 10px; border-radius: 8px; }
    </style>

</head>
<body>
    <div class="container">
        <a href="/" style="text-decoration:none; color:var(--blue); font-weight:bold;">← Back to MoneyCal</a>
        
        <h1>SIP Calculator for ₹${formattedAmount} per Month</h1>
        
        <p>Are you planning to start a Systematic Investment Plan (SIP) of <strong>₹${formattedAmount} per month</strong>? You have made a great financial decision! This page will show you exactly how much wealth you can create over time with this investment amount.</p>
        
        <div class="ad-unit">
            <span style="font-size:10px; color:#94a3b8">ADVERTISEMENT</span>
            <ins class="adsbygoogle" style="display:block" data-ad-format="fluid" data-ad-layout-key="-6t+ed+2i-1n-4w" data-ad-client="${AD_CLIENT}"></ins>
            <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
        </div>

        <h2>Expected Returns for ₹${formattedAmount}/month SIP</h2>
        <p>Assuming a standard mutual fund return of 12% per annum, here is what your ₹${formattedAmount} monthly investment will grow into:</p>
        
        <div class="table-wrap">
            <table>
                <tr>
                    <th>Investment Period</th>
                    <th>Total Invested</th>
                    <th>Expected Wealth (Maturity)</th>
                </tr>
                <tr>
                    <td style="text-align:center">10 Years</td>
                    <td>₹${new Intl.NumberFormat('en-IN').format(amount * 12 * 10)}</td>
                    <td class="highlight">₹${mat10}</td>
                </tr>
                <tr>
                    <td style="text-align:center">20 Years</td>
                    <td>₹${new Intl.NumberFormat('en-IN').format(amount * 12 * 20)}</td>
                    <td class="highlight">₹${mat20}</td>
                </tr>
                <tr>
                    <td style="text-align:center">30 Years</td>
                    <td>₹${new Intl.NumberFormat('en-IN').format(amount * 12 * 30)}</td>
                    <td class="highlight" style="color:var(--blue); font-size:1.4rem;">₹${mat30}</td>
                </tr>
            </table>
        </div>

        <a href="/calculators/sip-calculator?amount=${amount}" class="cta-btn">Open Interactive ₹${formattedAmount} SIP Calculator</a>

        <div class="ad-unit">
            <ins class="adsbygoogle" style="display:block" data-ad-client="${AD_CLIENT}" data-ad-format="auto" data-full-width-responsive="true"></ins>
            <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
        </div>
        
        <footer style="margin-top:50px; border-top:1px solid #e2e8f0; padding-top:20px; text-align:center; font-size:0.9rem; color:#64748b;">
            <p>&copy; ${new Date().getFullYear()} MoneyCal.in</p>
            <p><a href="/calculators">More Calculators</a></p>
        </footer>
    </div>
    <!-- Deferred AdSense Loading for Core Web Vitals Optimization -->
    <script>
      window.addEventListener('load', () => {
        setTimeout(() => {
          if (!document.querySelector('script[src*="adsbygoogle.js"]')) {
            const script = document.createElement('script');
            script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${AD_CLIENT}';
            script.async = true;
            script.crossOrigin = 'anonymous';
            document.body.appendChild(script);
          }
        }, 1500);
      });
    </script>
</body>
</html>`;
}

function generateEMIHtml(amountInLakhs) {
    const principal = amountInLakhs * 100000;
    const formattedAmount = `${amountInLakhs} Lakh`;
    
    const rate = 8.5 / 100 / 12; // 8.5% p.a.
    const calculateEMI = (years) => {
        const months = years * 12;
        const emi = principal * rate * Math.pow(1 + rate, months) / (Math.pow(1 + rate, months) - 1);
        return Math.round(emi);
    };

    const emi10 = new Intl.NumberFormat('en-IN').format(calculateEMI(10));
    const emi15 = new Intl.NumberFormat('en-IN').format(calculateEMI(15));
    const emi20 = new Intl.NumberFormat('en-IN').format(calculateEMI(20));

    const title = `EMI Calculator for ₹${formattedAmount} Home Loan`;
    const description = `Calculate monthly EMI for ₹${formattedAmount} Home Loan at current interest rates. Check EMI for 10, 15, and 20 year tenure.`;
    const canonicalUrl = `https://moneycal.in/emi-calculator-for-${amountInLakhs}-lakh-loan`;

    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title} | MoneyCal.in</title>
    <meta name="description" content="${description}">
    <link rel="canonical" href="${canonicalUrl}">
    <style>
        :root { --primary: #1a1a2e; --blue: #2563eb; --bg: #f8fafc; --text: #1e293b; --red: #dc2626; }
        body { font-family: system-ui, -apple-system, sans-serif; background: var(--bg); color: var(--text); line-height: 1.6; margin: 0; padding: 0; }
        .container { max-width: 800px; margin: 0 auto; padding: 24px; background: white; min-height: 100vh; box-shadow: 0 0 20px rgba(0,0,0,0.05); }
        h1 { color: var(--primary); font-size: 2rem; border-bottom: 2px solid var(--blue); padding-bottom: 10px; }
        h2 { color: var(--blue); margin-top: 30px; }
        .highlight { font-weight: bold; color: var(--red); font-size: 1.2rem; }
        .table-wrap { overflow-x: auto; margin: 20px 0; }
        table { width: 100%; border-collapse: collapse; }
        th, td { padding: 12px; border: 1px solid #e2e8f0; text-align: right; }
        th { background: var(--primary); color: white; text-align: center; }
        .cta-btn { display: inline-block; background: var(--blue); color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 1.1rem; text-align: center; width: 100%; box-sizing: border-box; margin: 20px 0; }
        .ad-unit { margin: 30px 0; text-align: center; background: #f1f5f9; padding: 10px; border-radius: 8px; }
    </style>

</head>
<body>
    <div class="container">
        <a href="/" style="text-decoration:none; color:var(--blue); font-weight:bold;">← Back to MoneyCal</a>
        
        <h1>EMI for ₹${formattedAmount} Home Loan</h1>
        
        <p>Planning to take a Home Loan of <strong>₹${formattedAmount}</strong>? It is crucial to know your monthly EMI burden before taking the loan. This page breaks down the expected EMI at an average interest rate of 8.5% p.a.</p>
        
        <div class="ad-unit">
            <span style="font-size:10px; color:#94a3b8">ADVERTISEMENT</span>
            <ins class="adsbygoogle" style="display:block" data-ad-format="fluid" data-ad-layout-key="-6t+ed+2i-1n-4w" data-ad-client="${AD_CLIENT}"></ins>
            <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
        </div>

        <h2>Monthly EMI for ₹${formattedAmount} Loan (at 8.5%)</h2>
        
        <div class="table-wrap">
            <table>
                <tr>
                    <th>Loan Tenure</th>
                    <th>Monthly EMI</th>
                    <th>Total Interest Payable</th>
                </tr>
                <tr>
                    <td style="text-align:center">10 Years</td>
                    <td class="highlight">₹${emi10}</td>
                    <td>₹${new Intl.NumberFormat('en-IN').format((calculateEMI(10) * 120) - principal)}</td>
                </tr>
                <tr>
                    <td style="text-align:center">15 Years</td>
                    <td class="highlight">₹${emi15}</td>
                    <td>₹${new Intl.NumberFormat('en-IN').format((calculateEMI(15) * 180) - principal)}</td>
                </tr>
                <tr>
                    <td style="text-align:center">20 Years</td>
                    <td class="highlight" style="color:var(--blue); font-size:1.4rem;">₹${emi20}</td>
                    <td>₹${new Intl.NumberFormat('en-IN').format((calculateEMI(20) * 240) - principal)}</td>
                </tr>
            </table>
        </div>

        <a href="/calculators/home-loan-calculator?amount=${principal}" class="cta-btn">Open Interactive ₹${formattedAmount} Loan Calculator</a>

        <div class="ad-unit">
            <ins class="adsbygoogle" style="display:block" data-ad-client="${AD_CLIENT}" data-ad-format="auto" data-full-width-responsive="true"></ins>
            <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
        </div>
        <footer style="margin-top:50px; border-top:1px solid #e2e8f0; padding-top:20px; text-align:center; font-size:0.9rem; color:#64748b;">
            <p>&copy; ${new Date().getFullYear()} MoneyCal.in</p>
            <p><a href="/calculators">More Calculators</a></p>
        </footer>
    </div>
    <!-- Deferred AdSense Loading for Core Web Vitals Optimization -->
    <script>
      window.addEventListener('load', () => {
        setTimeout(() => {
          if (!document.querySelector('script[src*="adsbygoogle.js"]')) {
            const script = document.createElement('script');
            script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${AD_CLIENT}';
            script.async = true;
            script.crossOrigin = 'anonymous';
            document.body.appendChild(script);
          }
        }, 1500);
      });
    </script>
</body>
</html>`;
}

function generateBankFDHtml(bank) {
    const title = `${bank.name} FD Interest Rates 2025 Calculator`;
    const description = `Check latest ${bank.name} Fixed Deposit (FD) interest rates up to ${bank.rate} for Senior Citizens. Calculate maturity amount and interest earned on your ${bank.name} FD.`;
    const canonicalUrl = `https://moneycal.in/fd-rates/${bank.slug}-fd-interest-rates-calculator`;

    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title} | MoneyCal.in</title>
    <meta name="description" content="${description}">
    <link rel="canonical" href="${canonicalUrl}">
    <style>
        :root { --primary: #1a1a2e; --blue: #2563eb; --bg: #f8fafc; --text: #1e293b; --green: #059669; }
        body { font-family: system-ui, -apple-system, sans-serif; background: var(--bg); color: var(--text); line-height: 1.6; margin: 0; padding: 0; }
        .container { max-width: 800px; margin: 0 auto; padding: 24px; background: white; min-height: 100vh; box-shadow: 0 0 20px rgba(0,0,0,0.05); }
        h1 { color: var(--primary); font-size: 2rem; border-bottom: 2px solid var(--blue); padding-bottom: 10px; }
        h2 { color: var(--blue); margin-top: 30px; }
        .highlight { font-weight: bold; color: var(--green); font-size: 1.2rem; }
        .cta-btn { display: inline-block; background: var(--blue); color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 1.1rem; text-align: center; width: 100%; box-sizing: border-box; margin: 20px 0; }
        .ad-unit { margin: 30px 0; text-align: center; background: #f1f5f9; padding: 10px; border-radius: 8px; }
    </style>

</head>
<body>
    <div class="container">
        <a href="/" style="text-decoration:none; color:var(--blue); font-weight:bold;">← Back to MoneyCal</a>
        
        <h1>${bank.name} FD Interest Rates 2025</h1>
        
        <p>Are you planning to open a Fixed Deposit in <strong>${bank.name}</strong>? The bank currently offers attractive interest rates up to <strong class="highlight">${bank.rate}</strong> p.a. for Senior Citizens and special tenures.</p>
        
        <div class="ad-unit">
            <span style="font-size:10px; color:#94a3b8">ADVERTISEMENT</span>
            <ins class="adsbygoogle" style="display:block" data-ad-format="fluid" data-ad-layout-key="-6t+ed+2i-1n-4w" data-ad-client="${AD_CLIENT}"></ins>
            <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
        </div>

        <a href="/calculators/fd-calculator" class="cta-btn">Open Interactive ${bank.name} FD Calculator</a>

        <div class="ad-unit">
            <ins class="adsbygoogle" style="display:block" data-ad-client="${AD_CLIENT}" data-ad-format="auto" data-full-width-responsive="true"></ins>
            <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
        </div>
        <footer style="margin-top:50px; border-top:1px solid #e2e8f0; padding-top:20px; text-align:center; font-size:0.9rem; color:#64748b;">
            <p>&copy; ${new Date().getFullYear()} MoneyCal.in</p>
        </footer>
    </div>
    <!-- Deferred AdSense Loading for Core Web Vitals Optimization -->
    <script>
      window.addEventListener('load', () => {
        setTimeout(() => {
          if (!document.querySelector('script[src*="adsbygoogle.js"]')) {
            const script = document.createElement('script');
            script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${AD_CLIENT}';
            script.async = true;
            script.crossOrigin = 'anonymous';
            document.body.appendChild(script);
          }
        }, 1500);
      });
    </script>
</body>
</html>`;
}

function generateTaxHtml(amountInLakhs) {
    const principal = amountInLakhs * 100000;
    const formattedAmount = `${amountInLakhs} Lakh`;
    
    // Simple mock calculation for demonstration
    let estimatedTax = 0;
    if (principal > 700000) {
        estimatedTax = (principal - 700000) * 0.1; // 10% on amount above 7L (simplified)
    }

    const title = `Income Tax Calculator for ₹${formattedAmount} Salary (New Tax Regime)`;
    const description = `Calculate income tax on ₹${formattedAmount} salary under the New Tax Regime 2025. See standard deduction and net take-home salary.`;
    const canonicalUrl = `https://moneycal.in/income-tax-on-${amountInLakhs}-lakh-salary`;

    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title} | MoneyCal.in</title>
    <meta name="description" content="${description}">
    <link rel="canonical" href="${canonicalUrl}">
    <style>
        :root { --primary: #1a1a2e; --blue: #2563eb; --bg: #f8fafc; --text: #1e293b; --red: #dc2626; }
        body { font-family: system-ui, -apple-system, sans-serif; background: var(--bg); color: var(--text); line-height: 1.6; margin: 0; padding: 0; }
        .container { max-width: 800px; margin: 0 auto; padding: 24px; background: white; min-height: 100vh; box-shadow: 0 0 20px rgba(0,0,0,0.05); }
        h1 { color: var(--primary); font-size: 2rem; border-bottom: 2px solid var(--blue); padding-bottom: 10px; }
        h2 { color: var(--blue); margin-top: 30px; }
        .highlight { font-weight: bold; color: var(--red); font-size: 1.2rem; }
        .cta-btn { display: inline-block; background: var(--blue); color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 1.1rem; text-align: center; width: 100%; box-sizing: border-box; margin: 20px 0; }
        .ad-unit { margin: 30px 0; text-align: center; background: #f1f5f9; padding: 10px; border-radius: 8px; }
    </style>

</head>
<body>
    <div class="container">
        <a href="/" style="text-decoration:none; color:var(--blue); font-weight:bold;">← Back to MoneyCal</a>
        
        <h1>Income Tax on ₹${formattedAmount} Salary</h1>
        
        <p>If your annual salary is <strong>₹${formattedAmount}</strong>, your tax liability under the New Tax Regime is estimated to be around <strong class="highlight">₹${new Intl.NumberFormat('en-IN').format(estimatedTax)}</strong>. (Note: Up to ₹7 Lakhs is tax-free due to rebate under Section 87A).</p>
        
        <div class="ad-unit">
            <span style="font-size:10px; color:#94a3b8">ADVERTISEMENT</span>
            <ins class="adsbygoogle" style="display:block" data-ad-format="fluid" data-ad-layout-key="-6t+ed+2i-1n-4w" data-ad-client="${AD_CLIENT}"></ins>
            <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
        </div>

        <a href="/calculators/income-tax-calculator?salary=${principal}" class="cta-btn">Open Detailed ₹${formattedAmount} Income Tax Calculator</a>

        <div class="ad-unit">
            <ins class="adsbygoogle" style="display:block" data-ad-client="${AD_CLIENT}" data-ad-format="auto" data-full-width-responsive="true"></ins>
            <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
        </div>
        <footer style="margin-top:50px; border-top:1px solid #e2e8f0; padding-top:20px; text-align:center; font-size:0.9rem; color:#64748b;">
            <p>&copy; ${new Date().getFullYear()} MoneyCal.in</p>
        </footer>
    </div>
    <!-- Deferred AdSense Loading for Core Web Vitals Optimization -->
    <script>
      window.addEventListener('load', () => {
        setTimeout(() => {
          if (!document.querySelector('script[src*="adsbygoogle.js"]')) {
            const script = document.createElement('script');
            script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${AD_CLIENT}';
            script.async = true;
            script.crossOrigin = 'anonymous';
            document.body.appendChild(script);
          }
        }, 1500);
      });
    </script>
</body>
</html>`;
}

function main() {
    console.log('🚀 Generating Programmatic SEO Pages...');
    
    let count = 0;
    
    // Generate SIP Pages
    SIP_AMOUNTS.forEach(amount => {
        const slug = `sip-calculator-for-${amount}-rupees`;
        const dir = path.join(PUBLIC_DIR, slug);
        if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
        fs.writeFileSync(path.join(dir, 'index.html'), generateSIPHtml(amount));
        generatedUrls.push(`https://moneycal.in/${slug}`);
        count++;
    });
    
    // Generate EMI Pages
    LOAN_AMOUNTS.forEach(amount => {
        const slug = `emi-calculator-for-${amount}-lakh-loan`;
        const dir = path.join(PUBLIC_DIR, slug);
        if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
        fs.writeFileSync(path.join(dir, 'index.html'), generateEMIHtml(amount));
        generatedUrls.push(`https://moneycal.in/${slug}`);
        count++;
    });

    // Generate Bank FD Pages
    const fdDir = path.join(PUBLIC_DIR, 'fd-rates');
    if (!fs.existsSync(fdDir)) fs.mkdirSync(fdDir, { recursive: true });
    BANKS.forEach(bank => {
        const slug = `${bank.slug}-fd-interest-rates-calculator`;
        const dir = path.join(fdDir, slug);
        if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
        fs.writeFileSync(path.join(dir, 'index.html'), generateBankFDHtml(bank));
        generatedUrls.push(`https://moneycal.in/fd-rates/${slug}`);
        count++;
    });

    // Generate Tax Pages
    SALARY_AMOUNTS.forEach(amount => {
        const slug = `income-tax-on-${amount}-lakh-salary`;
        const dir = path.join(PUBLIC_DIR, slug);
        if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
        fs.writeFileSync(path.join(dir, 'index.html'), generateTaxHtml(amount));
        generatedUrls.push(`https://moneycal.in/${slug}`);
        count++;
    });

    // Generate Sitemap
    let sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;
    generatedUrls.forEach(url => {
        sitemap += `  <url>\n    <loc>${url}</loc>\n    <lastmod>${new Date().toISOString()}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.8</priority>\n  </url>\n`;
    });
    sitemap += `</urlset>`;
    
    fs.writeFileSync(path.join(PUBLIC_DIR, 'sitemap-programmatic.xml'), sitemap);

    console.log(`✅ Successfully generated ${count} programmatic SEO pages.`);
    console.log(`🗺️ Updated sitemaps with new programmatic URLs.`);
}

main();
