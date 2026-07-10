
$path = "src/data/blogData.ts"
$lines = [System.IO.File]::ReadAllLines($path, [System.Text.Encoding]::UTF8)

$post23_new = [System.IO.File]::ReadAllText("new_post_23_content_hindi.txt", [System.Text.Encoding]::UTF8)
$post24_new = [System.IO.File]::ReadAllText("new_post_24_content_hindi.txt", [System.Text.Encoding]::UTF8)

# Post 23/24 starts at 3863 (index 3862)
# Post 25 starts at 4122 (index 4121)
# Checking Post 25 start
if ($lines[4121] -ne "    {") {
    Write-Host "ERROR: Post 25 start line mismatch! Line 4122 is: $($lines[4121])"
    for ($i = 4000; $i -lt $lines.Count; $i++) {
        if ($lines[$i] -match "id: 25,") {
            $post25_start_index = $i - 1
            Write-Host "Found Post 25 start at index $post25_start_index"
            break
        }
    }
}
else {
    $post25_start_index = 4121
}

$part1 = $lines[0..3861] # Before Post 23
$part2 = $lines[$post25_start_index..($lines.Count - 1)] # Post 25 onwards

$finalLines = New-Object System.Collections.Generic.List[string]
foreach ($l in $part1) { $null = $finalLines.Add($l) }
$null = $finalLines.Add($post23_new)
$null = $finalLines.Add("  // Blog Post ID: 24 - RERA")
$null = $finalLines.Add($post24_new)
foreach ($l in $part2) { $null = $finalLines.Add($l) }

$utf8NoBom = New-Object System.Text.UTF8Encoding($false)
[System.IO.File]::WriteAllLines($path, $finalLines, $utf8NoBom)

Write-Host "REPAIR V4 SUCCESSFUL"
