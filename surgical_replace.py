
import sys

def surgical_replace(file_path, start_line, end_line, new_content_file):
    with open(file_path, 'r', encoding='utf-8') as f:
        lines = f.readlines()
    
    with open(new_content_file, 'r', encoding='utf-8') as f:
        new_content = f.read()
    
    # Lines are 1-indexed, so start_line-1 is the first line to replace
    # end_line is inclusive
    before = lines[:start_line-1]
    after = lines[end_line:]
    
    with open(file_path, 'w', encoding='utf-8') as f:
        f.writelines(before)
        f.write(new_content)
        f.writelines(after)

if __name__ == "__main__":
    if len(sys.argv) != 5:
        print("Usage: python surgical_replace.py <file_path> <start_line> <end_line> <new_content_file>")
        sys.exit(1)
    
    surgical_replace(sys.argv[1], int(sys.argv[2]), int(sys.argv[3]), sys.argv[4])
    print("Replacement complete.")
