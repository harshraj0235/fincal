
$path = "src/data/blogData.ts"
$lines = Get-Content $path -Encoding UTF8
$newContent = Get-Content "new_post_19_content_hindi.txt" -Raw
$before = $lines[0..3181] # 1-indexed 3183 is index 3182. 0..3181 is 3182 lines.
$after = $lines[3418..($lines.Count - 1)] # 1-indexed 3418 is index 3417.
$final = ($before -join "`n") + "`n" + $newContent + "`n" + ($after -join "`n")
Set-Content $path $final -Encoding UTF8
Write-Host "REPAIR SUCCESSFUL"
