const fs = require('fs');
let content = fs.readFileSync('src/components/Layout.tsx', 'utf-8');

// Replace top ad
const oldTopAdRegex = /<div className={`hidden sm:flex w-full justify-center border-b border-gray-100 bg-gray-50\/50 pt-4 pb-2 mb-4 \$\{isHomePage \? '!hidden' : ''\}`}>\s*<BannerAd width=\{728\} height=\{90\} \/>\s*<\/div>/m;
const newTopAd = `{!isHomePage && (
              <div className="hidden sm:flex w-full justify-center border-b border-gray-100 bg-gray-50/50 pt-4 pb-2 mb-4">
                <BannerAd width={728} height={90} />
              </div>
            )}`;

if (oldTopAdRegex.test(content)) {
  content = content.replace(oldTopAdRegex, newTopAd);
  console.log('Top ad conditional rendering updated.');
} else {
  console.log('Top ad regex failed.');
}

// Replace bottom ad
const oldBottomAdRegex = /<div className={`w-full flex justify-center border-t border-gray-100 bg-gray-50\/50 py-6 mt-8 \$\{isHomePage \? 'hidden' : ''\}`}>\s*<BannerAd width=\{300\} height=\{250\} \/>\s*<\/div>/m;
const newBottomAd = `{!isHomePage && (
              <div className="w-full flex justify-center border-t border-gray-100 bg-gray-50/50 py-6 mt-8">
                <BannerAd width={300} height={250} />
              </div>
            )}`;

if (oldBottomAdRegex.test(content)) {
  content = content.replace(oldBottomAdRegex, newBottomAd);
  console.log('Bottom ad conditional rendering updated.');
} else {
  console.log('Bottom ad regex failed.');
}

fs.writeFileSync('src/components/Layout.tsx', content);
