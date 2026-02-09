import React, { useState } from 'react';
import { Mail, Check, AlertCircle } from 'lucide-react';

/**
 * Newsletter Subscription Component
 * Standard feature on major news websites for reader engagement
 */
export const NewsletterSubscribe: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    // Simulate subscription (integrate with your email service: Mailchimp, SendGrid, etc.)
    setSubscribed(true);
    setError('');
    setEmail('');
    
    // Reset after 5 seconds
    setTimeout(() => setSubscribed(false), 5000);
  };

  return (
    <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 rounded-2xl p-6 sm:p-8 shadow-2xl">
      <div className="flex items-start gap-4 mb-4">
        <div className="h-14 w-14 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
          <Mail className="h-7 w-7 text-white" />
        </div>
        <div>
          <h3 className="text-2xl font-black text-white mb-2">
            Stay Updated!
          </h3>
          <p className="text-white/90 text-sm sm:text-base leading-relaxed">
            Get the latest financial news, market insights, and analysis delivered to your inbox daily.
          </p>
        </div>
      </div>

      {subscribed ? (
        <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 border-2 border-white/30">
          <div className="flex items-center gap-3 text-white">
            <Check className="h-6 w-6 flex-shrink-0" />
            <div>
              <p className="font-bold">Successfully Subscribed!</p>
              <p className="text-sm text-white/90">Check your inbox for confirmation email.</p>
            </div>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubscribe} className="space-y-3">
          <div className="relative">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="w-full px-4 py-3.5 rounded-xl border-2 border-white/30 bg-white/10 backdrop-blur-sm text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/50 transition-all font-medium"
              required
            />
          </div>
          
          {error && (
            <div className="flex items-center gap-2 text-white/90 text-sm bg-red-500/20 backdrop-blur-sm rounded-lg p-3 border border-red-300/30">
              <AlertCircle className="h-4 w-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <button
            type="submit"
            className="w-full px-6 py-3.5 bg-white text-indigo-600 rounded-xl font-black hover:bg-neutral-100 active:scale-95 transition-all shadow-lg hover:shadow-xl uppercase tracking-wide text-sm sm:text-base"
          >
            Subscribe Now →
          </button>
          
          <p className="text-xs text-white/70 text-center">
            Join 50,000+ readers • Unsubscribe anytime • No spam guaranteed
          </p>
        </form>
      )}
    </div>
  );
};

export default NewsletterSubscribe;






