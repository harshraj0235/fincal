
$blogDataPath = "c:\Users\harshraj\Downloads\fincal-main (7)\fincal-main\src\data\blogData.ts"
$content = Get-Content $blogDataPath -Raw

# This is a bit tricky with Regex but let's try to extract blog posts
# We'll look for blocks between { and } that contain "categories": [ ... "Tax" ... ]

$matches = [regex]::Matches($content, '\{[\s\S]*?\}')

$taxBlogs = @()
foreach ($m in $matches) {
    $block = $m.Value
    if ($block -match '"categories":\s*\[[^\]]*"Tax Planning"[^\]]*\]') {
        $idMatch = [regex]::Match($block, '"id":\s*(\d+)')
        $titleMatch = [regex]::Match($block, '"title":\s*"([^"]+)"')
        $id = if ($idMatch.Success) { $idMatch.Groups[1].Value } else { "N/A" }
        $title = if ($titleMatch.Success) { $titleMatch.Groups[1].Value } else { "N/A" }
        
        # Calculate content length
        $sections = [regex]::Matches($block, '"content":\s*"([^"]+)"')
        $totalLength = 0
        foreach ($s in $sections) {
            $totalLength += $s.Groups[1].Value.Length
        }
        
        $taxBlogs += [PSCustomObject]@{
            Id = $id
            Title = $title
            ContentLength = $totalLength
        }
    }
}

$taxBlogs | Format-Table -AutoSize
Write-Host "Total Tax Blogs found: $($taxBlogs.Count)"
