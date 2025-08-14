# PowerShell script to fix malformed blog files
$blogFiles = Get-ChildItem -Path "src/data/blogs" -Filter "*.ts" -Recurse

foreach ($file in $blogFiles) {
    $content = Get-Content $file.FullName -Raw
    
    # Fix template literals in canonicalUrl
    $content = $content -replace 'canonicalUrl: `https://moneycal\.in/blog/(\d+)`,', "canonicalUrl: 'https://moneycal.in/blog/`$1',"
    
    # Fix malformed structured data section
    $content = $content -replace '      },', '   },'
    $content = $content -replace '      "publisher": {', '   structuredData: {'
    $content = $content -replace '        "@type": "Organization",', '     "@context": "https://schema.org",'
    $content = $content -replace '        "name": "MoneyCal India",', '     "@type": "BlogPosting",'
    $content = $content -replace '        "logo": {', '     "headline": "Blog Title",'
    $content = $content -replace '          "@type": "ImageObject",', '     "description": "Blog description",'
    $content = $content -replace '          "url": "https://moneycal\.in/logo\.png"', '     "author": {'
    $content = $content -replace '        }', '       "@type": "Person",'
    $content = $content -replace '      },', '       "name": "MoneyCal India"'
    $content = $content -replace '      "datePublished": "2025-08-14",', '     },'
    $content = $content -replace '      "dateModified": "2025-08-15",', '     "publisher": {'
    $content = $content -replace '      "mainEntityOfPage": {', '       "@type": "Organization",'
    $content = $content -replace '        "@type": "WebPage",', '       "name": "MoneyCal India",'
    $content = $content -replace '        "@id": "https://moneycal\.in/blog/\d+"', '       "logo": {'
    $content = $content -replace '      }', '         "@type": "ImageObject",'
    $content = $content -replace '    }', '         "url": "https://moneycal.in/logo.png"'
    $content = $content -replace '  }', '       }'
    $content = $content -replace '};', '     },'
    $content = $content -replace '     "datePublished": "2025-08-14",'
    $content = $content -replace '     "dateModified": "2025-08-15",'
    $content = $content -replace '     "mainEntityOfPage": {'
    $content = $content -replace '       "@type": "WebPage",'
    $content = $content -replace '       "@id": "https://moneycal.in/blog/\d+"'
    $content = $content -replace '     }'
    $content = $content -replace '   }'
    $content = $content -replace ' };'
    
    # Remove any duplicate or malformed closing braces
    $content = $content -replace '}\s*}\s*}\s*};', '};'
    
    # Write the fixed content back to the file
    Set-Content -Path $file.FullName -Value $content -Encoding UTF8
}

Write-Host "Fixed all blog files!"
