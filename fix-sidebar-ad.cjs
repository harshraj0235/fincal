const fs = require('fs');
let content = fs.readFileSync('src/components/Sidebar.tsx', 'utf-8');

// The BannerAd is currently like this:
// {/* 160x600 AdSense Banner */}
// <div className="mt-6 flex justify-center">
//   <BannerAd width={160} height={600} />
// </div>

const oldAdRegex = /\{\/\*\ 160x600 AdSense Banner \*\/\}\n\s*<div className="mt-6 flex justify-center">\n\s*<BannerAd width=\{160\} height=\{600\} \/>\n\s*<\/div>/m;

const newAd = `{/* 160x600 AdSense Banner (Hidden on homepage to prevent hidden ad requests) */}
          {location.pathname !== '/' && (
            <div className="mt-6 flex justify-center">
              <BannerAd width={160} height={600} />
            </div>
          )}`;

if (oldAdRegex.test(content)) {
  content = content.replace(oldAdRegex, newAd);
  fs.writeFileSync('src/components/Sidebar.tsx', content);
  console.log('Sidebar ad conditional rendering updated.');
} else {
  console.log('Sidebar ad regex failed.');
}
