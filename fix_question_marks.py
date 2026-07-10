import os
import re

def clean_text(text):
    # 1. First, replace ? followed by digits with ₹ symbol (for currency)
    # e.g. ?15,000 -> ₹15,000
    text = re.sub(r'\?+(\d+[,\d]*(\.\d+)?[kKlLcC]?)', r'₹\1', text)
    
    # 2. To avoid replacing code like `a ? b : c` or `post?.title`, 
    # we only replace ? that appear in clusters of 2 or more: `??+`
    text = re.sub(r'\?{2,}', ' ', text)
    
    # 3. There are still single ? replacing Hindi spaces/characters, like `quality stationery ?? ????? ????`. 
    # To target single ? that are clearly corruption: a ? surrounded by spaces or space and punctuation,
    # without touching valid English ? at the end of sentences like "What is SIP?"
    # We'll replace isolated ? with space if they have space around them.
    text = re.sub(r'(?<= )\?(?= )', ' ', text)

    # 4. Clean up multiple spaces left behind by removals
    text = re.sub(r' {2,}', ' ', text)
    
    return text

def process_file(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Apply only to text inside string literals (single or double quotes) to be completely safe
    # But since these TS files are almost completely data, we can apply globally, with caution.
    # To be extremely safe, let's just do a regex sub on strings:
    def repl_string(match):
        return match.group(0)[0] + clean_text(match.group(1)) + match.group(0)[-1]

    # match content inside '...' or "..." or `...`
    # Note: Regex parsing JS strings perfectly is hard due to escaping, 
    # but for simple data files, (['"`])((?:\\.|(?!\1).)*)\1 works well.
    new_content = re.sub(r'([\'"`])((?:\\.|(?!\1).)*)\1', repl_string, content, flags=re.DOTALL)

    if new_content != content:
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(new_content)
        return True
    return False

def main():
    blog_dir = r"c:\Users\harshraj\Downloads\New folder (4)\fincal\src\data\blogs"
    count = 0
    for root, dirs, files in os.walk(blog_dir):
        for file in files:
            if file.endswith('.ts') and file != 'index.ts':
                file_path = os.path.join(root, file)
                if process_file(file_path):
                    count += 1
    print(f"Fixed question marks in {count} files.")

if __name__ == "__main__":
    main()
