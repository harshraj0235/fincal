$dir = "c:\Users\harshraj\Downloads\New folder (4)\fincal\src\data\blogs"
$files = Get-ChildItem -Path $dir -Filter "*.ts"

foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw -Encoding UTF8
    
    # Pattern 1: Repair the nesting start
    # Match a comma on its own line followed by the expanded guide section
    $newContent = $content -replace "(\s+),\s*\n(\s*{\s*type:\s*'heading',\s*content:\s*'Expanded In-Depth Guide')", "`$1]`n    },`n`$2"
    
    # Pattern 2: Remove the extra closing braces at the end of the block
    $newContent = $newContent -replace "}\s*\n\s*]\s*\n\s*},\s*\n\s*{", "},`n    {"
    
    if ($newContent -ne $content) {
        Set-Content -Path $file.FullName -Value $newContent -Encoding UTF8
        Write-Host "Fixed $($file.Name)"
    }
}
Write-Host "Batch fix complete."
