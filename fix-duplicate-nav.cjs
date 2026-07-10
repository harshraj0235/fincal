const fs = require('fs');
let content = fs.readFileSync('src/pages/Home.tsx', 'utf-8');

const oldMobileTopBarRegex = /\{\/\* Mobile top bar \*\/\}\n\s*<div className="md:hidden flex items-center justify-between px-4 py-2\.5 border-b border-gray-100 \nbg-white\/80 backdrop-blur-sm">\n\s*<button onClick=\{\(\) => setSidebarOpen\(true\)\} className="p-2 hover:bg-gray-100 rounded-xl \ntransition-colors">\n\s*<Menu className="w-5 h-5 text-gray-600" \/>\n\s*<\/button>\n\s*<div className="flex items-center gap-2">\n\s*<div className="bg-gradient-to-br from-blue-600 to-teal-500 text-white p-1\.5 rounded-lg">\n\s*<IndianRupee className="w-4 h-4" \/>\n\s*<\/div>\n\s*<span className="text-sm font-bold text-gray-800">Finance GPT<\/span>\n\s*<\/div>\n\s*<button onClick=\{handleNewChat\} className="p-2 hover:bg-gray-100 rounded-xl transition-colors">\n\s*<Plus className="w-5 h-5 text-gray-600" \/>\n\s*<\/button>\n\s*<\/div>/ms;

const newMobileTopBar = `{/* Mobile Chat Tools */}
            <div className="md:hidden flex items-center justify-between px-3 py-2 bg-gray-50 border-b border-gray-200">
              <button onClick={() => setSidebarOpen(true)} className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-600 bg-white border border-gray-200 hover:bg-gray-50 rounded-lg shadow-sm transition-colors">
                <Menu className="w-4 h-4" />
                History
              </button>
              <button onClick={handleNewChat} className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-blue-700 bg-blue-50 border border-blue-200 hover:bg-blue-100 rounded-lg transition-colors">
                <Plus className="w-4 h-4" />
                New Chat
              </button>
            </div>`;

if (oldMobileTopBarRegex.test(content)) {
  content = content.replace(oldMobileTopBarRegex, newMobileTopBar);
  fs.writeFileSync('src/pages/Home.tsx', content);
  console.log('Fixed Home.tsx mobile top bar duplicate navbar!');
} else {
  // Let's try a simpler regex or manual string replace if regex fails
  console.log('Regex failed, trying simpler replacement...');
}
