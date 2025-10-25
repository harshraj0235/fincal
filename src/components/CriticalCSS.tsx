// Extract and inline critical CSS for faster FCP
export const criticalStyles = `
/* Critical above-the-fold styles only */
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;line-height:1.5;color:#1a202c;background:#fff}
#root{min-height:100vh}
header{min-height:64px;contain:layout style}
footer{min-height:650px;contain:layout style}
main{contain:layout style paint}
nav{position:sticky;top:0;z-index:40;backdrop-filter:blur(12px)}
.container{max-width:1280px;margin:0 auto;padding:0 1rem}
.skeleton{background:linear-gradient(90deg,#f0f0f0 25%,#e0e0e0 50%,#f0f0f0 75%);background-size:200% 100%;animation:loading 1.5s ease-in-out infinite}
@keyframes loading{0%{background-position:200% 0}100%{background-position:-200% 0}}
.btn{padding:0.75rem 1.5rem;border-radius:0.5rem;font-weight:600;transition:transform 0.2s;cursor:pointer}
.btn:active{transform:scale(0.95)}
img{max-width:100%;height:auto;display:block}
a{text-decoration:none;color:inherit}
.bg-gradient-primary{background:linear-gradient(135deg,#667eea 0%,#764ba2 100%)}
`;

// Component to inject critical CSS
export const CriticalCSS = () => {
  return null; // CSS is injected in HTML head
};

export default CriticalCSS;

