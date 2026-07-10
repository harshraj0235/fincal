
$path = "src/data/blogData.ts"
$lines = [System.IO.File]::ReadAllLines($path, [System.Text.Encoding]::UTF8)

$post19_new = [System.IO.File]::ReadAllText("new_post_19_content_hindi.txt", [System.Text.Encoding]::UTF8)
$post20_new = [System.IO.File]::ReadAllText("new_post_20_content_hindi.txt", [System.Text.Encoding]::UTF8)

# Post 19 was 3183 to 3328 (index 3182 to 3327)
# Post 20 was 3332 to 3575 (index 3331 to 3574)

$part1 = $lines[0..3181] # Before Post 19
$part2 = $lines[3329..3330] # Between 19 and 20 (The comments/spacing)
$part3 = $lines[3575..($lines.Count - 1)] # After Post 20

# Join everything
$finalLines = New-Object System.Collections.Generic.List[string]
foreach ($l in $part1) { $null = $finalLines.Add($l) }
$null = $finalLines.Add($post19_new)
foreach ($l in $part2) { $null = $finalLines.Add($l) }
$null = $finalLines.Add($post20_new)
foreach ($l in $part3) { $null = $finalLines.Add($l) }

# Write without BOM using .NET
$utf8NoBom = New-Object System.Text.UTF8Encoding($false)
[System.IO.File]::WriteAllLines($path, $finalLines, $utf8NoBom)

Write-Host "REPAIR V2 SUCCESSFUL"
