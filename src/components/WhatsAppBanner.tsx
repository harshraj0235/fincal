import React from 'react';
import { MessageCircle } from 'lucide-react';

const WhatsAppBanner: React.FC = () => {
  return (
    <div className="bg-green-500 text-white py-3 px-4 text-center">
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-2">
        <MessageCircle className="h-5 w-5" />
        <span className="font-medium">
          Join our WhatsApp channel for latest updates: 
        </span>
        <a 
          href="https://whatsapp.com/channel/0029Va4h1t39Gv7TgnHsR31j" 
          target="_blank" 
          rel="noopener noreferrer"
          className="font-bold underline hover:text-green-100 transition-colors"
        >
          Click here to join
        </a>
      </div>
    </div>
  );
};

export default WhatsAppBanner; 