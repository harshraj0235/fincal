import React from 'react';
import { useTranslation } from 'react-i18next';

export const LanguageSwitcher: React.FC<{ className?: string }> = ({ className = '' }) => {
  const { i18n } = useTranslation();
  const currentLang = i18n.language || 'en';

  const toggleLanguage = () => {
    const isCurrentlyHindi = currentLang === 'hi';
    const newLang = isCurrentlyHindi ? 'en' : 'hi';
    
    // We use window.location to properly change the basename
    const pathname = window.location.pathname;
    const search = window.location.search;
    
    let newPath = pathname;
    if (isCurrentlyHindi) {
      // Remove /hi from start
      newPath = pathname.replace(/^\/hi(\/|$)/, '/');
    } else {
      // Add /hi to start
      newPath = `/hi${pathname === '/' ? '' : pathname}`;
    }
    
    window.location.href = `${newPath}${search}`;
  };

  return (
    <button
      onClick={toggleLanguage}
      className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-blue-200 bg-blue-50 shadow-sm hover:bg-blue-100 hover:border-blue-300 transition-all active:scale-95 ${className}`}
      aria-label={currentLang === 'hi' ? 'Switch to English' : 'हिंदी में पढ़ें'}
      title={currentLang === 'hi' ? 'Read in English' : 'हिंदी में पढ़ें'}
    >
      {currentLang === 'hi' ? (
        <>
          <span className="text-[16px] leading-none" aria-hidden="true">🇮🇳</span>
          <span className="text-[13px] font-bold text-blue-800 tracking-wide mt-0.5">
            English
          </span>
        </>
      ) : (
        <>
          <span className="text-[16px] leading-none" aria-hidden="true">🇮🇳</span>
          <span className="text-[14px] font-bold text-blue-800 tracking-wide mt-0.5">
            हिंदी
          </span>
        </>
      )}
    </button>
  );
};
