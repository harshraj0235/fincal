import React, { useState } from 'react';
import { formatCurrency } from '../utils/calculatorUtils';
import { CreditCard, Shield, RefreshCw, Clock, Check, X, Copy, Eye, EyeOff } from 'lucide-react';

export const VirtualCardIssuer: React.FC = () => {
  const [cardType, setCardType] = useState<'shopping' | 'subscription' | 'travel'>('shopping');
  const [cardLimit, setCardLimit] = useState<number>(10000);
  const [cardValidity, setCardValidity] = useState<number>(30);
  const [isCardCreated, setIsCardCreated] = useState<boolean>(false);
  const [showCardDetails, setShowCardDetails] = useState<boolean>(false);
  const [copiedText, setCopiedText] = useState<string | null>(null);
  
  // Virtual card details
  const [cardNumber, setCardNumber] = useState<string>('');
  const [cardExpiry, setCardExpiry] = useState<string>('');
  const [cardCvv, setCardCvv] = useState<string>('');
  const [cardName, setCardName] = useState<string>('');
  
  const generateCard = () => {
    // Generate random card details
    const generateRandomNumber = (length: number) => {
      return Array.from({ length }, () => Math.floor(Math.random() * 10)).join('');
    };
    
    // Generate card number (16 digits with spaces)
    const number = `4${generateRandomNumber(3)} ${generateRandomNumber(4)} ${generateRandomNumber(4)} ${generateRandomNumber(4)}`;
    
    // Generate expiry date (MM/YY format)
    const today = new Date();
    const expiryDate = new Date(today);
    expiryDate.setDate(today.getDate() + cardValidity);
    const month = (expiryDate.getMonth() + 1).toString().padStart(2, '0');
    const year = expiryDate.getFullYear().toString().slice(-2);
    const expiry = `${month}/${year}`;
    
    // Generate CVV (3 digits)
    const cvv = generateRandomNumber(3);
    
    // Generate card name based on type
    const name = `VIRTUAL ${cardType.toUpperCase()} CARD`;
    
    setCardNumber(number);
    setCardExpiry(expiry);
    setCardCvv(cvv);
    setCardName(name);
    setIsCardCreated(true);
  };
  
  const resetCard = () => {
    setIsCardCreated(false);
    setShowCardDetails(false);
    setCardNumber('');
    setCardExpiry('');
    setCardCvv('');
    setCardName('');
  };
  
  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(type);
    setTimeout(() => setCopiedText(null), 2000);
  };
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-neutral-900 flex items-center">
          <CreditCard className="w-5 h-5 mr-2 text-[--primary-600]" />
          Virtual Card Generator
        </h2>
        
        {!isCardCreated ? (
          <div className="space-y-6">
            <div>
              <label className="text-sm font-medium text-neutral-700 mb-2 block">
                Card Purpose
              </label>
              <div className="grid grid-cols-3 gap-3">
                <button
                  className={`px-4 py-3 rounded-lg text-sm font-medium ${
                    cardType === 'shopping'
                      ? 'bg-[--primary-100] text-[--primary-800] border-2 border-[--primary-300]'
                      : 'bg-neutral-100 text-neutral-600 border border-neutral-200'
                  }`}
                  onClick={() => setCardType('shopping')}
                >
                  <div className="flex flex-col items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mb-1">
                      <circle cx="8" cy="21" r="1"></circle>
                      <circle cx="19" cy="21" r="1"></circle>
                      <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"></path>
                    </svg>
                    <span>Shopping</span>
                  </div>
                </button>
                <button
                  className={`px-4 py-3 rounded-lg text-sm font-medium ${
                    cardType === 'subscription'
                      ? 'bg-[--primary-100] text-[--primary-800] border-2 border-[--primary-300]'
                      : 'bg-neutral-100 text-neutral-600 border border-neutral-200'
                  }`}
                  onClick={() => setCardType('subscription')}
                >
                  <div className="flex flex-col items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mb-1">
                      <path d="M4 10c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h4c1.1 0 2 .9 2 2"></path>
                      <path d="M10 16c-1.1 0-2-.9-2-2v-4c0-1.1.9-2 2-2h4c1.1 0 2 .9 2 2"></path>
                      <rect width="6" height="6" x="16" y="16" rx="2"></rect>
                    </svg>
                    <span>Subscription</span>
                  </div>
                </button>
                <button
                  className={`px-4 py-3 rounded-lg text-sm font-medium ${
                    cardType === 'travel'
                      ? 'bg-[--primary-100] text-[--primary-800] border-2 border-[--primary-300]'
                      : 'bg-neutral-100 text-neutral-600 border border-neutral-200'
                  }`}
                  onClick={() => setCardType('travel')}
                >
                  <div className="flex flex-col items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mb-1">
                      <path d="M2 22h20"></path>
                      <path d="M6.36 17.4 4 17l-2-4 1.1-1.1 4.35 4.35a1 1 0 0 1 .29.7l-.38 4.05-1 1"></path>
                      <path d="m4.47 12.11 4.36 4.36"></path>
                      <path d="M22 5c0 9-4 12-4 12s-1.33-1-2.67-2c-1.33-1-2.67-2-2.67-2"></path>
                      <path d="M22 5c-9 0-12 4-12 4s1 1.33 2 2.67c1 1.33 2 2.67 2 2.67"></path>
                    </svg>
                    <span>Travel</span>
                  </div>
                </button>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between mb-2">
                <label htmlFor="card-limit" className="text-sm font-medium text-neutral-700">
                  Card Limit (₹)
                </label>
                <span className="text-sm text-neutral-500">
                  {formatCurrency(cardLimit)}
                </span>
              </div>
              <input 
                type="range" 
                id="card-limit"
                min="1000" 
                max="100000" 
                step="1000" 
                value={cardLimit} 
                onChange={(e) => setCardLimit(Number(e.target.value))}
                className="slider"
              />
            </div>
            
            <div>
              <div className="flex justify-between mb-2">
                <label htmlFor="card-validity" className="text-sm font-medium text-neutral-700">
                  Card Validity (Days)
                </label>
                <span className="text-sm text-neutral-500">
                  {cardValidity} days
                </span>
              </div>
              <input 
                type="range" 
                id="card-validity"
                min="1" 
                max="90" 
                step="1" 
                value={cardValidity} 
                onChange={(e) => setCardValidity(Number(e.target.value))}
                className="slider"
              />
            </div>
            
            <div className="pt-4">
              <button
                onClick={generateCard}
                className="w-full py-3 px-4 bg-[--primary-600] text-white rounded-lg font-medium hover:bg-[--primary-700] transition-colors"
              >
                Generate Virtual Card
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-[--primary-600] to-[--primary-800] rounded-xl p-6 text-white shadow-lg relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4">
                <button
                  onClick={() => setShowCardDetails(!showCardDetails)}
                  className="text-white/80 hover:text-white"
                >
                  {showCardDetails ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              
              <div className="mb-6">
                <div className="flex items-center space-x-2">
                  <CreditCard className="h-6 w-6" />
                  <h3 className="text-lg font-semibold">Virtual Card</h3>
                </div>
                <p className="text-sm text-white/70">{cardName}</p>
              </div>
              
              <div className="space-y-4">
                <div>
                  <p className="text-xs text-white/70 mb-1">Card Number</p>
                  <div className="flex items-center justify-between">
                    <p className="font-mono text-lg font-medium">
                      {showCardDetails ? cardNumber : '•••• •••• •••• ••••'}
                    </p>
                    <button
                      onClick={() => handleCopy(cardNumber.replace(/\s/g, ''), 'number')}
                      className="text-white/70 hover:text-white"
                      title="Copy card number"
                    >
                      {copiedText === 'number' ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
                
                <div className="flex justify-between">
                  <div>
                    <p className="text-xs text-white/70 mb-1">Expiry Date</p>
                    <p className="font-mono font-medium">{showCardDetails ? cardExpiry : '••/••'}</p>
                  </div>
                  <div>
                    <p className="text-xs text-white/70 mb-1">CVV</p>
                    <div className="flex items-center">
                      <p className="font-mono font-medium mr-2">{showCardDetails ? cardCvv : '•••'}</p>
                      <button
                        onClick={() => handleCopy(cardCvv, 'cvv')}
                        className="text-white/70 hover:text-white"
                        title="Copy CVV"
                      >
                        {copiedText === 'cvv' ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="absolute bottom-0 right-0 p-4">
                <div className="flex items-center space-x-1 text-xs text-white/70">
                  <Clock className="h-3 w-3" />
                  <span>Valid for {cardValidity} days</span>
                </div>
              </div>
              
              <div className="absolute top-0 left-0 w-full h-full opacity-10">
                <svg width="300" height="200" viewBox="0 0 300 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="150" cy="100" r="80" stroke="white" strokeWidth="40" strokeLinecap="round" />
                  <circle cx="250" cy="50" r="40" stroke="white" strokeWidth="20" strokeLinecap="round" />
                  <circle cx="50" cy="150" r="30" stroke="white" strokeWidth="15" strokeLinecap="round" />
                </svg>
              </div>
            </div>
            
            <div className="p-4 bg-[--success-50] rounded-lg border border-[--success-200]">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <Check className="h-5 w-5 text-[--success-600]" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-[--success-800]">Virtual Card Created Successfully</h3>
                  <p className="mt-1 text-sm text-[--success-700]">
                    Your virtual card has been generated with a limit of {formatCurrency(cardLimit)} and is valid for {cardValidity} days.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-neutral-50 rounded-lg">
                <span className="text-sm text-neutral-700">Card Type</span>
                <span className="text-sm font-medium text-neutral-900 capitalize">{cardType}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-neutral-50 rounded-lg">
                <span className="text-sm text-neutral-700">Card Limit</span>
                <span className="text-sm font-medium text-neutral-900">{formatCurrency(cardLimit)}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-neutral-50 rounded-lg">
                <span className="text-sm text-neutral-700">Validity</span>
                <span className="text-sm font-medium text-neutral-900">{cardValidity} days</span>
              </div>
            </div>
            
            <div className="pt-4 flex space-x-4">
              <button
                onClick={resetCard}
                className="flex-1 py-3 px-4 bg-neutral-100 text-neutral-700 rounded-lg font-medium hover:bg-neutral-200 transition-colors flex items-center justify-center"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Generate New Card
              </button>
            </div>
          </div>
        )}
      </div>
      
      <div className="space-y-6">
        <div className="bg-neutral-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-neutral-900 flex items-center mb-4">
            <Shield className="w-5 h-5 mr-2 text-[--primary-600]" />
            Virtual Card Benefits
          </h2>
          
          <div className="space-y-4">
            <div className="p-4 bg-white rounded-lg">
              <h3 className="text-lg font-medium text-neutral-900 mb-2">Enhanced Security</h3>
              <ul className="list-disc list-inside space-y-2 text-sm text-neutral-600">
                <li>Use a unique card for each merchant or purpose</li>
                <li>Set spending limits to control expenses</li>
                <li>Limit validity period to reduce exposure</li>
                <li>Protect your primary card details from data breaches</li>
                <li>Easily cancel or freeze cards if suspicious activity is detected</li>
              </ul>
            </div>
            
            <div className="p-4 bg-white rounded-lg">
              <h3 className="text-lg font-medium text-neutral-900 mb-2">Use Cases</h3>
              <div className="space-y-3">
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-8 w-8 rounded-full bg-[--primary-100] flex items-center justify-center mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[--primary-600]">
                      <circle cx="8" cy="21" r="1"></circle>
                      <circle cx="19" cy="21" r="1"></circle>
                      <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"></path>
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-neutral-900">Online Shopping</h4>
                    <p className="text-xs text-neutral-600 mt-1">
                      Create a card for each online retailer to limit exposure and track spending by merchant.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-8 w-8 rounded-full bg-[--primary-100] flex items-center justify-center mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[--primary-600]">
                      <path d="M4 10c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h4c1.1 0 2 .9 2 2"></path>
                      <path d="M10 16c-1.1 0-2-.9-2-2v-4c0-1.1.9-2 2-2h4c1.1 0 2 .9 2 2"></path>
                      <rect width="6" height="6" x="16" y="16" rx="2"></rect>
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-neutral-900">Subscriptions</h4>
                    <p className="text-xs text-neutral-600 mt-1">
                      Set up cards with exact subscription amounts to avoid unexpected charges or price increases.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-8 w-8 rounded-full bg-[--primary-100] flex items-center justify-center mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[--primary-600]">
                      <path d="M2 22h20"></path>
                      <path d="M6.36 17.4 4 17l-2-4 1.1-1.1 4.35 4.35a1 1 0 0 1 .29.7l-.38 4.05-1 1"></path>
                      <path d="m4.47 12.11 4.36 4.36"></path>
                      <path d="M22 5c0 9-4 12-4 12s-1.33-1-2.67-2c-1.33-1-2.67-2-2.67-2"></path>
                      <path d="M22 5c-9 0-12 4-12 4s1 1.33 2 2.67c1 1.33 2 2.67 2 2.67"></path>
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-neutral-900">Travel Bookings</h4>
                    <p className="text-xs text-neutral-600 mt-1">
                      Create temporary cards for hotel bookings and travel expenses with specific limits.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-4 bg-[--accent-50] rounded-lg">
              <h3 className="text-lg font-medium text-[--accent-900] mb-2">Security Tips</h3>
              <ul className="list-disc list-inside space-y-2 text-sm text-[--accent-700]">
                <li>Never share your virtual card details over unsecured channels</li>
                <li>Use a different virtual card for each merchant when possible</li>
                <li>Set the lowest spending limit necessary for your purchase</li>
                <li>Choose the shortest validity period needed</li>
                <li>Regularly check your transaction history for unauthorized charges</li>
                <li>Delete or freeze unused virtual cards</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-medium text-neutral-900 mb-4">Frequently Asked Questions</h3>
          
          <div className="space-y-4">
            <details className="group">
              <summary className="flex justify-between items-center cursor-pointer p-3 rounded-lg bg-neutral-50 hover:bg-neutral-100">
                <h4 className="text-neutral-900 font-medium text-sm">How secure are virtual cards?</h4>
                <span className="transition-transform duration-300 group-open:rotate-180">
                  <svg className="w-5 h-5 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </span>
              </summary>
              <div className="p-3 text-neutral-600 text-sm">
                <p>Virtual cards are generally more secure than physical cards because:</p>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li>They can be limited to specific amounts, preventing overcharges</li>
                  <li>They have limited validity periods, reducing exposure time</li>
                  <li>If compromised, they can be instantly deleted without affecting your primary card</li>
                  <li>Your actual card details remain protected even if the merchant experiences a data breach</li>
                </ul>
              </div>
            </details>
            
            <details className="group">
              <summary className="flex justify-between items-center cursor-pointer p-3 rounded-lg bg-neutral-50 hover:bg-neutral-100">
                <h4 className="text-neutral-900 font-medium text-sm">Where can I use virtual cards?</h4>
                <span className="transition-transform duration-300 group-open:rotate-180">
                  <svg className="w-5 h-5 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </span>
              </summary>
              <div className="p-3 text-neutral-600 text-sm">
                <p>Virtual cards can be used for most online transactions where physical cards aren't required, including:</p>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li>E-commerce websites and online shopping</li>
                  <li>Subscription services like Netflix, Spotify, etc.</li>
                  <li>Food delivery apps</li>
                  <li>Online travel bookings</li>
                  <li>Digital services and software purchases</li>
                </ul>
                <p className="mt-2">They typically cannot be used for in-person transactions that require a physical card, though some can be added to mobile wallets for contactless payments.</p>
              </div>
            </details>
            
            <details className="group">
              <summary className="flex justify-between items-center cursor-pointer p-3 rounded-lg bg-neutral-50 hover:bg-neutral-100">
                <h4 className="text-neutral-900 font-medium text-sm">Are there fees for using virtual cards?</h4>
                <span className="transition-transform duration-300 group-open:rotate-180">
                  <svg className="w-5 h-5 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </span>
              </summary>
              <div className="p-3 text-neutral-600 text-sm">
                <p>Fee structures vary by provider:</p>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li>Many banks offer virtual cards as a free feature with existing accounts</li>
                  <li>Some fintech apps charge a monthly subscription fee for unlimited virtual cards</li>
                  <li>Business virtual card providers may charge per-card or per-transaction fees</li>
                  <li>Premium services might charge for advanced features like higher limits or extended validity</li>
                </ul>
                <p className="mt-2">Always check the fee structure with your specific provider before using virtual cards extensively.</p>
              </div>
            </details>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VirtualCardIssuer;