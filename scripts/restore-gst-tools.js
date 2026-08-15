const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, '../src/app/gst');
const destDir = path.join(__dirname, '../src/app/gst-tools');

if (fs.existsSync(srcDir)) {
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }

  const files = fs.readdirSync(srcDir);
  for (const file of files) {
    if (file === 'page.tsx') continue; // skip the redirect page

    const srcPath = path.join(srcDir, file);
    if (fs.statSync(srcPath).isDirectory()) {
      let newName = file;
      // Re-apply the cleanup
      newName = newName.replace(/^gstamount-/, 'gst-amount-')
                       .replace(/^gstcalculator$/, 'gst-calculator')
                       .replace(/^gstcomposition-/, 'gst-composition-')
                       .replace(/^gstdue-/, 'gst-due-')
                       .replace(/^gsteinvoice-/, 'gst-e-invoice-')
                       .replace(/^gsteway-/, 'gst-eway-')
                       .replace(/^gsthsnsac/, 'gst-hsn-sac-')
                       .replace(/^gstinvoice-/, 'gst-invoice-')
                       .replace(/^gstitc/, 'gst-itc-')
                       .replace(/^gstliability-/, 'gst-liability-')
                       .replace(/^gstpenalty-/, 'gst-penalty-')
                       .replace(/^gstr3b/, 'gst-r3b-')
                       .replace(/^gstrate-/, 'gst-rate-')
                       .replace(/^gstrcm/, 'gst-rcm-')
                       .replace(/^gstrefund-/, 'gst-refund-')
                       .replace(/^gstslab-/, 'gst-slab-')
                       .replace(/^gsttool-/, 'gst-tool-')
                       .replace(/^gstturnover-/, 'gst-turnover-')
                       .replace(/^hsnsac/, 'hsn-sac-')
                       .replace(/^itceligibility-/, 'itc-eligibility-')
                       .replace(/^rcmapplicability-/, 'rcm-applicability-')
                       .replace(/^reverse-gstcalculator/, 'reverse-gst-calculator')
                       .replace(/-page$/, '');
                       
      // fix any double hyphens
      newName = newName.replace(/--/g, '-');

      const destPath = path.join(destDir, newName);
      
      console.log(`Copying ${file} -> ${newName}`);
      fs.cpSync(srcPath, destPath, { recursive: true, force: true });
    }
  }
  console.log('Restored tools to src/app/gst-tools');
} else {
  console.log('src/app/gst not found');
}
