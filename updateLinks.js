const fs = require('fs');
const path = require('path');
const file1 = path.join(__dirname, 'src', 'data', 'blogData.ts');
const file2 = path.join(__dirname, 'src', 'data', 'blogData1.ts');

function replaceLink(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    let changed = false;

    const replacements = [
        { oldStr: "<a href='/calculators/income-tax-calculator'>Budgeting Tools</a>", newStr: "<a href='/calculators/income-tax-calculator'>Income Tax Calculator</a>" },
        { oldStr: '<a href="/calculators/income-tax-calculator">Budgeting Tools</a>', newStr: '<a href="/calculators/income-tax-calculator">Income Tax Calculator</a>' },
        { oldStr: "<a href='/calculators/sip-calculator'>Investment Calculators</a>", newStr: "<a href='/calculators/sip-calculator'>SIP Calculator</a>" },
        { oldStr: '<a href="/calculators/sip-calculator">Investment Calculators</a>', newStr: '<a href="/calculators/sip-calculator">SIP Calculator</a>' },
        { oldStr: "<a href='/calculators/home-loan-emi-calculator'>Home Loan Calculators</a>", newStr: "<a href='/calculators/home-loan-emi-calculator'>Home Loan EMI Calculator</a>" },
        { oldStr: '<a href="/calculators/home-loan-emi-calculator">Home Loan Calculators</a>', newStr: '<a href="/calculators/home-loan-emi-calculator">Home Loan EMI Calculator</a>' },
        { oldStr: "<a href='/calculators/nps-calculator'>Retirement Planning</a>", newStr: "<a href='/calculators/nps-calculator'>NPS Calculator</a>" },
        { oldStr: '<a href="/calculators/nps-calculator">Retirement Planning</a>', newStr: '<a href="/calculators/nps-calculator">NPS Calculator</a>' }
    ];

    for (let rep of replacements) {
        if (content.includes(rep.oldStr)) {
            content = content.split(rep.oldStr).join(rep.newStr);
            changed = true;
        }
    }

    if (changed) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log('Updated:', filePath);
    }
}

try {
    replaceLink(file1);
    replaceLink(file2);
} catch (err) {
    console.error(err);
}
