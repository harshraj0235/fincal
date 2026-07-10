$dir = "c:\Users\harshraj\Downloads\New folder (4)\fincal\src\data\blogs"
$files = Get-ChildItem -Path $dir -Filter "*.ts"
$utf8NoBOM = New-Object System.Text.UTF8Encoding($false)

foreach ($file in $files) {
    $content = [System.IO.File]::ReadAllText($file.FullName)
    $original = $content
    
    # fix ]} followed by { type: or searchMetadata: or featuredImage:
    $content = [Regex]::Replace($content, "(?m)\]},\s*\r?\n(\s*)(?={ type:|searchMetadata:|featuredImage:|schema:|faqSchema:|openGraph:|discoverOptimized:|publishedDate:|lastModified:|readingTime:)", ",`n$1")
    
    # fix ]} followed by };
    $content = [Regex]::Replace($content, "(?m) predict[^']*'\s*}\s*]\s*}\s*;", " predict$1`n    }`n  ]`n};")

    if ($content -ne $original) {
        [System.IO.File]::WriteAllText($file.FullName, $content, $utf8NoBOM)
        Write-Host "Fixed syntax in $($file.Name)"
    }
}
Write-Host "Final syntax fix completed."
