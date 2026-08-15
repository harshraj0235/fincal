const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '../src/app/gst-tools');

const files = fs.readdirSync(dir);
for (const file of files) {
  const pagePath = path.join(dir, file, 'page.tsx');
  if (fs.existsSync(pagePath)) {
    let content = fs.readFileSync(pagePath, 'utf8');

    // Fix canonical URL
    // e.g. https://moneycal.in/gst-tools/g-s-t-calculator -> https://moneycal.in/gst-tools/gst-calculator
    content = content.replace(/canonical:\s*'https:\/\/moneycal\.in\/gst-tools\/([^']+)'/, (match, slug) => {
      const fixedSlug = slug.replace(/^g-s-t-/, 'gst-')
                            .replace(/-page$/, '')
                            .replace(/-r-3b-/, '-r3b-')
                            .replace(/-h-s-n-s-a-c-/, '-hsn-sac-')
                            .replace(/^h-s-n-s-a-c-/, 'hsn-sac-')
                            .replace(/^r-c-m-/, 'rcm-')
                            .replace(/^i-t-c-/, 'itc-')
                            .replace(/-q-r-/, '-qr-')
                            .replace(/-e-way-/, '-eway-')
                            .replace(/-i-t-c-/, '-itc-')
                            .replace(/-r-c-m-/, '-rcm-')
                            .replace(/reverse-g-s-t-/, 'reverse-gst-');
      return `canonical: 'https://moneycal.in/gst-tools/${fixedSlug}'`;
    });

    // Fix Title (e.g. G S T -> GST)
    content = content.replace(/title:\s*'([^']+)'/, (match, title) => {
        let fixedTitle = title.replace(/G S T/g, 'GST')
                              .replace(/I T C/g, 'ITC')
                              .replace(/R C M/g, 'RCM')
                              .replace(/H S N/g, 'HSN')
                              .replace(/S A C/g, 'SAC')
                              .replace(/R 3 B/g, 'R3B')
                              .replace(/ Page/g, '');
        return `title: '${fixedTitle}'`;
    });

    // Fix description
    content = content.replace(/description:\s*'([^']+)'/, (match, desc) => {
        let fixedDesc = desc.replace(/G S T/g, 'GST')
                              .replace(/I T C/g, 'ITC')
                              .replace(/R C M/g, 'RCM')
                              .replace(/H S N/g, 'HSN')
                              .replace(/S A C/g, 'SAC')
                              .replace(/R 3 B/g, 'R3B')
                              .replace(/ Page/g, '');
        return `description: '${fixedDesc}'`;
    });

    fs.writeFileSync(pagePath, content, 'utf8');
  }
}

console.log('Fixed page.tsx metadata across all GST tools!');
