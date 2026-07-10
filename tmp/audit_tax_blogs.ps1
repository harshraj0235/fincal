
$blogDataPath = "c:\Users\harshraj\Downloads\fincal-main (7)\fincal-main\src\data\blogData.ts"
$content = Get-Content $blogDataPath -Raw

$matches = [regex]::Matches($content, '\{[\s\S]*?\}')

$results = @()
foreach ($m in $matches) {
    $block = $m.Value
    if ($block -match '"id":\s*(\d+)') {
        $id = $Matches[1]
        
        $titleMatch = [regex]::Match($block, '"title":\s*"([^"]+)"')
        $title = if ($titleMatch.Success) { $titleMatch.Groups[1].Value } else { "N/A" }
        
        $categoriesMatch = [regex]::Match($block, '"categories":\s*\[([^\]]+)\]')
        $categories = if ($categoriesMatch.Success) { $categoriesMatch.Groups[1].Value } else { "N/A" }
        
        # Calculate content length
        $sections = [regex]::Matches($block, '"content":\s*\[([\s\S]*?)\]')
        $contentStr = if ($sections.Count -gt 0) { $sections[0].Groups[1].Value } else { "" }
        
        $results += [PSCustomObject]@{
            Id         = $id
            Title      = $title
            Categories = $categories
            Length     = $contentStr.Length
        }
    }
}

$results | Where-Object { $_.Categories -like "*Tax*" } | Format-Table -AutoSize
