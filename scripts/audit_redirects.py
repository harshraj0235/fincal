import re

def extract_routes(app_tsx_path):
    routes = set()
    try:
        with open(app_tsx_path, 'r', encoding='utf-8') as f:
            content = f.read()
            # Finer regex to capture path="..." from <Route ... />
            matches = re.findall(r'path=["\']([^"\']+)["\']', content)
            for m in matches:
                routes.add(m)
    except Exception as e:
        print(f"Error reading {app_tsx_path}: {e}")
    return routes

def parse_netlify_toml(toml_path):
    redirects = []
    current_redirect = {}
    try:
        with open(toml_path, 'r', encoding='utf-8') as f:
            for line in f:
                line = line.strip()
                if line.startswith('[[redirects]]'):
                    if current_redirect:
                        redirects.append(current_redirect)
                    current_redirect = {}
                elif '=' in line:
                    key, val = line.split('=', 1)
                    key = key.strip()
                    val = val.strip().strip('"')
                    current_redirect[key] = val
            if current_redirect:
                redirects.append(current_redirect)
    except Exception as e:
        print(f"Error reading {toml_path}: {e}")
    return redirects

def audit_redirects(routes, redirects):
    conflicts = []
    redundant = []
    
    for r in redirects:
        from_path = r.get('from', '')
        to_path = r.get('to', '')
        force = r.get('force', 'false').lower() == 'true'
        
        # Strip trailing slash for comparison
        clean_from = from_path.rstrip('/')
        
        if clean_from in routes:
            if force:
                conflicts.append(f"FORCE REDIRECT on valid route: {from_path} -> {to_path}")
            else:
                redundant.append(f"SOFT REDIRECT on valid route: {from_path} -> {to_path}")
        
        if from_path == to_path and r.get('status', '301') != '200':
            redundant.append(f"SELF REDIRECT: {from_path}")

    return conflicts, redundant

if __name__ == "__main__":
    app_path = r"C:\Users\harshraj\Downloads\fincal-main (9)\fincal-main\src\App.tsx"
    toml_path = r"C:\Users\harshraj\Downloads\fincal-main (9)\fincal-main\netlify.toml"
    
    routes = extract_routes(app_path)
    redirects = parse_netlify_toml(toml_path)
    
    conflicts, redundant = audit_redirects(routes, redirects)
    
    print(f"Total Routes found in App.tsx: {len(routes)}")
    print(f"Total Redirects found in netlify.toml: {len(redirects)}")
    
    print("\n--- CONFLICTS (Force redirects on existing routes) ---")
    for c in conflicts[:20]: # Limit output
        print(c)
    if len(conflicts) > 20:
        print(f"... and {len(conflicts) - 20} more")
        
    print("\n--- REDUNDANT/SOFT REDIRECTS ---")
    for r in redundant[:20]:
        print(r)
    if len(redundant) > 20:
        print(f"... and {len(redundant) - 20} more")
