import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

const InjectAdSense = () => {
  useEffect(() => {
    const adsenseScript = document.createElement('script');
    adsenseScript.async = true;
    adsenseScript.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4446717165665089';
    adsenseScript.crossOrigin = 'anonymous';
    document.head.appendChild(adsenseScript);
    return () => {
      if (document.head.contains(adsenseScript)) document.head.removeChild(adsenseScript);
    };
  }, []);
  return null;
};

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    <InjectAdSense />
    <App />
  </React.StrictMode>
);
