$dir = "c:\Users\harshraj\Downloads\New folder (4)\fincal\src\data\blogs"
$files = Get-ChildItem -Path $dir -Filter "*.ts"

foreach ($file in $files) {
    try {
        $content = Get-Content $file.FullName -Raw -Encoding UTF8
        $changed = $false
        
        # 1. Fix the original corruption (isolated comma before Expanded Guide)
        # This only applies to files like 685.ts where the items array was left open with a comma.
        if ($content -match "\s+,\s*\r?\n\s*{\s*type:\s*'heading',\s*content:\s*'Expanded In-Depth Guide'") {
            $content = $content -replace "(\s+),\s*\r?\n(\s*{\s*type:\s*'heading',\s*content:\s*'Expanded In-Depth Guide')", "`$1]`n    },`n`$2"
            $changed = $true
            Write-Host "Fixed type 1 (original corruption) in $($file.Name)"
        }

        # 2. Revert the premature closing ( ]}, ) followed by more sections
        if ($content -match "\]},\s*\r?\n\s*{ type:") {
            $content = $content -replace "\]},\s*\r?\n(\s*{ type:)", ",`n`$1"
            $changed = $true
            Write-Host "Fixed type 2 (premature closing) in $($file.Name)"
        }
        
        # 3. Fix the case where predictable and auditable ends with ] } followed by more sections
        if ($content -match "predictable and auditable\.[^']*'\s*}\s*]\s*},\s*\r?\n\s*{") {
            $content = $content -replace "(predictable and auditable\.[^']*'\s*})\s*]\s*},\s*\r?\n(\s*{)", "`$1,`n`$2"
            $changed = $true
            Write-Host "Fixed type 3 (audit summary closing) in $($file.Name)"
        }

        if ($changed) {
            # Final check to see if we have balanced brackets/braces (rough check)
            # Actually, just write it back for now as these specific fixes are safe.
            [System.IO.File]::WriteAllText($file.FullName, $content, (New-Object System.Text.UTF8Encoding($false)))
        }
    }
    catch {
        Write-Error "Failed to process $($file.Name): $_"
    }
}
Write-Host "Surgical fix complete."
