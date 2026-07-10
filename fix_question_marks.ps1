$blogDir = "C:\Users\harshraj\Downloads\New folder (4)\fincal\src\data\blogs"
$files = Get-ChildItem -Path $blogDir -Filter "*.ts" -File | Where-Object { $_.Name -ne 'index.ts' }

$count = 0

foreach ($file in $files) {
    # Read as UTF8 to preserve characters
    $content = Get-Content -Path $file.FullName -Raw -Encoding UTF8
    $newContent = $content
    
    # 1. Currency: ? followed by digits -> ₹
    $newContent = $newContent -replace '\?+(\d+[,0-9]*(\.[0-9]+)?[kKlLcC]?)', '₹$1'
    
    # 2. Clusters of 2 or more ?
    $newContent = $newContent -replace '\?{2,}', ' '
    
    # 3. Isolated ? surrounded by spaces
    $newContent = $newContent -replace '(?<= )\?(?= )', ' '
    
    if ($newContent -cne $content) {
        # Write back as UTF8
        Set-Content -Path $file.FullName -Value $newContent -Encoding UTF8
        Write-Host "Fixed: $($file.Name)"
        $count++
    }
}

Write-Host "Fixed question marks in $count files."
