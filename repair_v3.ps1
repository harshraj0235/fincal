
$path = "src/data/blogData.ts"
$lines = [System.IO.File]::ReadAllLines($path, [System.Text.Encoding]::UTF8)

$post21_new = [System.IO.File]::ReadAllText("new_post_21_content_hindi.txt", [System.Text.Encoding]::UTF8)
$post22_new = [System.IO.File]::ReadAllText("new_post_22_content_hindi.txt", [System.Text.Encoding]::UTF8)

# Post 21/22 was 3576 to 3862 (index 3575 to 3861)
# Checking Post 23 start at index 3862
if ($lines[3862] -ne "    {") {
    Write-Host "ERROR: Post 23 start line mismatch! Line 3863 is: $($lines[3862])"
    # Search for id: 23 instead
    for ($i = 3800; $i -lt $lines.Count; $i++) {
        if ($lines[$i] -match "id: 23,") {
            $post23_start_index = $i - 1
            Write-Host "Found Post 23 start at index $post23_start_index"
            break
        }
    }
}
else {
    $post23_start_index = 3862
}

$part1 = $lines[0..3574] # Before Post 21
$part2 = $lines[$post23_start_index..($lines.Count - 1)] # Post 23 onwards

$finalLines = New-Object System.Collections.Generic.List[string]
foreach ($l in $part1) { $null = $finalLines.Add($l) }
$null = $finalLines.Add($post21_new)
$null = $finalLines.Add("  // Blog Post ID: 22 - Health Insurance")
$null = $finalLines.Add($post22_new)
foreach ($l in $part2) { $null = $finalLines.Add($l) }

$utf8NoBom = New-Object System.Text.UTF8Encoding($false)
[System.IO.File]::WriteAllLines($path, $finalLines, $utf8NoBom)

Write-Host "REPAIR V3 SUCCESSFUL"
