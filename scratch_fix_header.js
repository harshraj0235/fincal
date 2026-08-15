const fs = require('fs');

let code = fs.readFileSync('src/components/Header.tsx', 'utf8');

// Ensure usePathname is imported
if (!code.includes("import { usePathname }")) {
  code = code.replace("import Link from 'next/link';", "import Link from 'next/link';\nimport { usePathname } from 'next/navigation';");
}

// Add the hook inside the component
if (!code.includes("const pathname = usePathname()")) {
  code = code.replace("const [expandedMobileSection, setExpandedMobileSection] = useState<string | null>(null);", "const [expandedMobileSection, setExpandedMobileSection] = useState<string | null>(null);\n  const pathname = usePathname() || '';");
}

// Replace location.pathname with pathname
code = code.replace(/location\.pathname/g, "pathname");

fs.writeFileSync('src/components/Header.tsx', code);
console.log("Header fixed!");
