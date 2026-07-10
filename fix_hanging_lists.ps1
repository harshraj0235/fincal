$dir = "c:\Users\harshraj\Downloads\New folder (4)\fincal\src\data\blogs"
$files = Get-ChildItem -Path $dir -Filter "*.ts"

# Force UTF-8 without BOM
$utf8NoBOM = New-Object System.Text.UTF8Encoding($false)

foreach ($file in $files) {
    try {
        $content = [System.IO.File]::ReadAllText($file.FullName)
        $original = $content
        
        # 1. Fix internal hanging commas: 
        # Match a comma on its own line followed by { type: 
        # This closes the items array ']' and the list object '}'
        $content = [Regex]::Replace($content, "(?m)^\s*,\s*\r?\n\s*{\s*type:", "      ]`n    },`n    { type:")
        
        # 2. Fix the end of the file if it has a hanging comma before the end of the array
        # e.g., line 71 in step-down-sip-calculator...
        # Match:
        #      'item'
        #    ,
        #    { type: 'heading', content: 'Conclusion' }
        # This is already covered by #1 if Conclusion is followed by { type:
        
        # 3. Fix the very last hanging comma before Conclusion/Conclusion paragraph
        # Sometimes it's followed by Conclusion, but Conclusion might be the last thing.
        # If the file ends with ] }; and we have a hanging list...
        
        # Actually, let's just do a global cleanup of the 'Expanded' section in all files
        # because it seems it was appended multiple times or badly in many places.
        
        # 4. Final termination fix
        # If it ends with ] }; but the content array was never closed properly
        # We ensure it's:
        #   ]
        # };
        # If we currently have:
        #     { ... }
        #   ] };
        # This ] closes the items array, but the content array is open!
        # So we need TWO closing brackets.
        
        # We'll check if 'content: [' exists and count brackets.
        # Too complex for regex.
        
        # Alternative: If a file has { type: 'list', items: [ but fewer ] than expected.
        
        if ($content -ne $original) {
            [System.IO.File]::WriteAllText($file.FullName, $content, $utf8NoBOM)
            Write-Host "Fixed syntax in $($file.Name)"
        }
    }
    catch {
        Write-Error "Error in $($file.Name): $_"
    }
}
Write-Host "Batch fix completed."
