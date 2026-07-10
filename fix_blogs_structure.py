import os
import re

directory = r'c:\Users\harshraj\Downloads\New folder (4)\fincal\src\data\blogs'

# Pattern 1: Find the stray comma before the nested sections
# Search for: a comma on its own line after a string, followed by a { type: 'heading'
# We want to replace the ',' with '] \n    },'
pattern_start = re.compile(r"(\s+),\s*\n\s*{\s*type:\s*'heading',\s*content:\s*'Expanded In-Depth Guide'", re.MULTILINE)

# Pattern 2: Find the trailing ']' and '},' that now close nothing (or rather, they were closing the items array)
# Since we un-nested the sections, we need to remove the extra closing braces at the end of that sequence.
# They usually appear after the paragraph content talking about 'predictable and auditable'.
pattern_end = re.compile(r"Across the site\.'\s*\n\s*}\s*\n\s*]\s*\n\s*},", re.MULTILINE)
# Wait, let's look at 686.ts line 70-72:
# 70: ]
# 71:     },
# 72:     {

for filename in os.listdir(directory):
    if filename.endswith('.ts'):
        path = os.path.join(directory, filename)
        with open(path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Repair the nesting
        # Replace:
        #       ,
        # { type: 'heading', content: 'Expanded In-Depth Guide' }
        # With:
        #       ]
        #     },
        #     { type: 'heading', content: 'Expanded In-Depth Guide' }
        
        new_content = re.sub(
            r"(?P<indent>\s+),\s*\n(?P<nested>\s*{\s*type:\s*'heading',\s*content:\s*'Expanded In-Depth Guide')",
            r"\g<indent>]\n    },\n\g<nested>",
            content
        )
        
        # Now remove the extra closing braces that were at the end of the nested block
        # They look like:
        # ]
        #     },
        #     {
        
        # Wait, if I un-nested them, the original closing braces at the end of the block 
        # (which were supposed to close the list section) are now redundant if I'm not careful.
        
        # Let's see:
        # BEFORE fix:
        # items: [ 'item', { section } ] }, { next section }
        # AFTER fix part 1:
        # items: [ 'item' ] }, { section } ] }, { next section }
        # So we need to remove the ' ] },' after the section.
        
        new_content = re.sub(
            r"}\s*\n\s*]\s*\n\s*},\s*\n\s*{",
            r"},\n    {",
            new_content
        )
        
        if new_content != content:
            with open(path, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f"Fixed {filename}")

print("Batch fix complete.")
