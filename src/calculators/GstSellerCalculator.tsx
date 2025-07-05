import React, { useState, useEffect } from 'react';
import { formatCurrency } from '../utils/calculatorUtils';
import { Calculator, ArrowDown, ArrowUp, FileText, Copy, Check } from 'lucide-react';

export const GstSellerCalculator: React.FC = () => {
  const [calculationType, setCalculationType] = useState<'exclusive' | 'inclusive'>('exclusive');
  const [productType, setProductType] = useState<'goods' | 'services'>('goods');
  const [businessType, setBusinessType] = useState<'b2b' | 'b2c'>('b2b');
  const [amount, setAmount] = useState<number>(1000);
  const [gstRate, setGstRate] = useState<number>(18);
  const [hsnCode, setHsnCode] = useState<string>('');
  const [sacCode, setSacCode] = useState<string>('');
  const [state, setState] = useState<'same' | 'different'>('same');
  const [invoiceFormat, setInvoiceFormat] = useState<string>('');
  const [copiedText, setCopiedText] = useState<boolean>(false);
  
  // Calculated values
  const [baseAmount, setBaseAmount] = useState<number>(0);
  const [gstAmount, setGstAmount] = useState<number>(0);
  const [cgst, setCgst] = useState<number>(0);
  const [sgst, setSgst] = useState<number>(0);
  const [igst, setIgst] = useState<number>(0);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  
  useEffect(() => {
    if (calculationType === 'exclusive') {
      // Add GST to base amount
      const gstAmt = amount * (gstRate / 100);
      setBaseAmount(amount);
      setGstAmount(gstAmt);
      setTotalAmount(amount + gstAmt);
    } else {
      // Remove GST from inclusive amount
      const baseAmt = amount / (1 + gstRate / 100);
      const gstAmt = amount - baseAmt;
      setBaseAmount(baseAmt);
      setGstAmount(gstAmt);
      setTotalAmount(amount);
    }
    
    // Calculate CGST, SGST, IGST
    if (state === 'same') {
      setCgst(gstAmount / 2);
      setSgst(gstAmount / 2);
      setIgst(0);
    } else {
      setCgst(0);
      setSgst(0);
      setIgst(gstAmount);
    }
    
    // Generate invoice format
    generateInvoiceFormat();
  }, [amount, gstRate, calculationType, state, gstAmount, productType, businessType]);
  
  const generateInvoiceFormat = () => {
    const date = new Date().toLocaleDateString('en-IN');
    const invoiceNumber = `INV-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`;
    
    let format = `INVOICE\n`;
    format += `Invoice Number: ${invoiceNumber}\n`;
    format += `Date: ${date}\n\n`;
    format += `Item Description: Sample ${productType === 'goods' ? 'Product' : 'Service'}\n`;
    if (productType === 'goods') {
      format += `HSN Code: ${hsnCode || 'XXXX'}\n`;
    } else {
      format += `SAC Code: ${sacCode || 'XXXX'}\n`;
    }
    format += `Quantity: 1\n\n`;
    format += `Base Amount: ${formatCurrency(baseAmount)}\n`;
    
    if (state === 'same') {
      format += `CGST (${gstRate/2}%): ${formatCurrency(cgst)}\n`;
      format += `SGST (${gstRate/2}%): ${formatCurrency(sgst)}\n`;
    } else {
      format += `IGST (${gstRate}%): ${formatCurrency(igst)}\n`;
    }
    
    format += `\nTotal Amount: ${formatCurrency(totalAmount)}\n\n`;
    
    if (businessType === 'b2b') {
      format += `Receiver's GSTIN: XXXXXXXXXXXX\n`;
    }
    
    format += `Place of Supply: ${state === 'same' ? 'Same State' : 'Different State'}\n`;
    format += `Whether tax is payable on reverse charge basis: No\n`;
    
    setInvoiceFormat(format);
  };
  
  const handleCopy = () => {
    navigator.clipboard.writeText(invoiceFormat);
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2000);
  };
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-neutral-900 flex items-center">
          <Calculator className="w-5 h-5 mr-2 text-[--primary-600]" />
          GST Calculation for Sellers
        </h2>
        
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-neutral-700 mb-2 block">
              Calculation Type
            </label>
            <div className="flex space-x-4">
              <button
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  calculationType === 'exclusive'
                    ? 'bg-[--primary-100] text-[--primary-800]'
                    : 'bg-neutral-100 text-neutral-600'
                }`}
                onClick={() => setCalculationType('exclusive')}
              >
                Add GST (Exclusive)
              </button>
              <button
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  calculationType === 'inclusive'
                    ? 'bg-[--primary-100] text-[--primary-800]'
                    : 'bg-neutral-100 text-neutral-600'
                }`}
                onClick={() => setCalculationType('inclusive')}
              >
                Remove GST (Inclusive)
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-neutral-700 mb-2 block">
                Product Type
              </label>
              <div className="flex space-x-4">
                <button
                  className={`px-4 py-2 rounded-lg text-sm font-medium ${
                    productType === 'goods'
                      ? 'bg-[--primary-100] text-[--primary-800]'
                      : 'bg-neutral-100 text-neutral-600'
                  }`}
                  onClick={() => setProductType('goods')}
                >
                  Goods
                </button>
                <button
                  className={`px-4 py-2 rounded-lg text-sm font-medium ${
                    productType === 'services'
                      ? 'bg-[--primary-100] text-[--primary-800]'
                      : 'bg-neutral-100 text-neutral-600'
                  }`}
                  onClick={() => setProductType('services')}
                >
                  Services
                </button>
              </div>
            </div>
            
            <div>
              <label className="text-sm font-medium text-neutral-700 mb-2 block">
                Business Type
              </label>
              <div className="flex space-x-4">
                <button
                  className={`px-4 py-2 rounded-lg text-sm font-medium ${
                    businessType === 'b2b'
                      ? 'bg-[--primary-100] text-[--primary-800]'
                      : 'bg-neutral-100 text-neutral-600'
                  }`}
                  onClick={() => setBusinessType('b2b')}
                >
                  B2B
                </button>
                <button
                  className={`px-4 py-2 rounded-lg text-sm font-medium ${
                    businessType === 'b2c'
                      ? 'bg-[--primary-100] text-[--primary-800]'
                      : 'bg-neutral-100 text-neutral-600'
                  }`}
                  onClick={() => setBusinessType('b2c')}
                >
                  B2C
                </button>
              </div>
            </div>
          </div>
          
          <div>
            <label htmlFor="amount" className="block text-sm font-medium text-neutral-700 mb-2">
              {calculationType === 'exclusive' ? 'Base Amount (₹)' : 'Total Amount (₹)'}
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-neutral-500 sm:text-sm">₹</span>
              </div>
              <input
                type="number"
                id="amount"
                className="input pl-8"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                min="0"
              />
            </div>
          </div>
          
          <div>
            <label className="text-sm font-medium text-neutral-700 mb-2 block">
              GST Rate (%)
            </label>
            <div className="grid grid-cols-4 gap-2">
              {[5, 12, 18, 28].map(rate => (
                <button
                  key={rate}
                  onClick={() => setGstRate(rate)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium ${
                    gstRate === rate
                      ? 'bg-[--primary-100] text-[--primary-800]'
                      : 'bg-neutral-100 text-neutral-600'
                  }`}
                >
                  {rate}%
                </button>
              ))}
            </div>
          </div>
          
          <div>
            <label className="text-sm font-medium text-neutral-700 mb-2 block">
              Place of Supply
            </label>
            <div className="flex space-x-4">
              <button
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  state === 'same'
                    ? 'bg-[--primary-100] text-[--primary-800]'
                    : 'bg-neutral-100 text-neutral-600'
                }`}
                onClick={() => setState('same')}
              >
                Within Same State
              </button>
              <button
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  state === 'different'
                    ? 'bg-[--primary-100] text-[--primary-800]'
                    : 'bg-neutral-100 text-neutral-600'
                }`}
                onClick={() => setState('different')}
              >
                Interstate
              </button>
            </div>
          </div>
          
          {productType === 'goods' ? (
            <div>
              <label htmlFor="hsn-code" className="block text-sm font-medium text-neutral-700 mb-2">
                HSN Code (Optional)
              </label>
              <input
                type="text"
                id="hsn-code"
                className="input"
                placeholder="Enter HSN Code"
                value={hsnCode}
                onChange={(e) => setHsnCode(e.target.value)}
              />
            </div>
          ) : (
            <div>
              <label htmlFor="sac-code" className="block text-sm font-medium text-neutral-700 mb-2">
                SAC Code (Optional)
              </label>
              <input
                type="text"
                id="sac-code"
                className="input"
                placeholder="Enter SAC Code"
                value={sacCode}
                onChange={(e) => setSacCode(e.target.value)}
              />
            </div>
          )}
        </div>
        
        <div className="mt-8 p-6 bg-[--primary-50] rounded-lg border border-[--primary-100]">
          <h3 className="text-lg font-semibold text-[--primary-900] mb-4">GST Calculation Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-white rounded-lg shadow-sm">
              <p className="text-sm text-neutral-500 mb-1">Base Amount</p>
              <p className="text-xl font-bold text-neutral-900">{formatCurrency(baseAmount)}</p>
            </div>
            <div className="p-4 bg-white rounded-lg shadow-sm">
              <p className="text-sm text-neutral-500 mb-1">Total Amount</p>
              <p className="text-xl font-bold text-neutral-900">{formatCurrency(totalAmount)}</p>
            </div>
          </div>
          
          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            {state === 'same' ? (
              <>
                <div className="p-4 bg-white rounded-lg shadow-sm">
                  <p className="text-sm text-neutral-500 mb-1">CGST ({gstRate/2}%)</p>
                  <p className="text-xl font-bold text-[--primary-600]">{formatCurrency(cgst)}</p>
                </div>
                <div className="p-4 bg-white rounded-lg shadow-sm">
                  <p className="text-sm text-neutral-500 mb-1">SGST ({gstRate/2}%)</p>
                  <p className="text-xl font-bold text-[--primary-600]">{formatCurrency(sgst)}</p>
                </div>
              </>
            ) : (
              <div className="p-4 bg-white rounded-lg shadow-sm md:col-span-2">
                <p className="text-sm text-neutral-500 mb-1">IGST ({gstRate}%)</p>
                <p className="text-xl font-bold text-[--primary-600]">{formatCurrency(igst)}</p>
              </div>
            )}
            <div className="p-4 bg-white rounded-lg shadow-sm">
              <p className="text-sm text-neutral-500 mb-1">Total GST</p>
              <p className="text-xl font-bold text-[--primary-600]">{formatCurrency(gstAmount)}</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="space-y-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-neutral-900 flex items-center">
              <FileText className="w-5 h-5 mr-2 text-[--primary-600]" />
              Invoice Format
            </h3>
            <button 
              onClick={handleCopy}
              className="text-neutral-500 hover:text-neutral-700"
              title="Copy to clipboard"
            >
              {copiedText ? <Check className="h-5 w-5 text-[--success-500]" /> : <Copy className="h-5 w-5" />}
            </button>
          </div>
          <pre className="bg-neutral-50 p-4 rounded-lg text-sm text-neutral-800 whitespace-pre-wrap font-mono">
            {invoiceFormat}
          </pre>
        </div>
        
        <div className="bg-neutral-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-neutral-900 flex items-center mb-4">
            <Calculator className="w-5 h-5 mr-2 text-[--primary-600]" />
            GST Guidelines for Sellers
          </h2>
          
          <div className="space-y-4">
            <div className="p-4 bg-white rounded-lg">
              <h3 className="text-lg font-medium text-neutral-900 mb-2">Invoice Requirements</h3>
              <ul className="list-disc list-inside space-y-2 text-sm text-neutral-600">
                <li>Name, address, and GSTIN of the supplier</li>
                <li>A consecutive serial number (max 16 characters)</li>
                <li>Date of issue</li>
                <li>Name, address, and GSTIN of the recipient (for B2B)</li>
                <li>Description of goods/services</li>
                <li>HSN code for goods or SAC code for services</li>
                <li>Quantity and unit</li>
                <li>Total value of supply</li>
                <li>Taxable value of supply</li>
                <li>Tax rate (CGST, SGST/UTGST, IGST)</li>
                <li>Place of supply</li>
                <li>Whether tax is payable on reverse charge basis</li>
                <li>Signature of the supplier or authorized representative</li>
              </ul>
            </div>
            
            <div className="p-4 bg-white rounded-lg">
              <h3 className="text-lg font-medium text-neutral-900 mb-2">GST Filing Requirements</h3>
              <ul className="list-disc list-inside space-y-2 text-sm text-neutral-600">
                <li><strong>GSTR-1:</strong> Monthly/quarterly return for outward supplies</li>
                <li><strong>GSTR-3B:</strong> Monthly/quarterly summary return</li>
                <li><strong>GSTR-9:</strong> Annual return</li>
                <li>Maintain proper books of accounts and records</li>
                <li>Preserve invoices and records for at least 72 months</li>
              </ul>
            </div>
            
            <div className="p-4 bg-[--accent-50] rounded-lg">
              <h3 className="text-lg font-medium text-[--accent-900] mb-2">Important Notes</h3>
              <ul className="list-disc list-inside space-y-2 text-sm text-[--accent-700]">
                <li>E-invoicing is mandatory for businesses with turnover above ₹10 crore</li>
                <li>Composition scheme available for small businesses with turnover up to ₹1.5 crore</li>
                <li>Different GST rates apply to different goods and services</li>
                <li>Reverse charge mechanism applies in specific cases</li>
                <li>Late filing fees and interest apply for delayed returns</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-medium text-neutral-900 mb-4">Common HSN/SAC Codes</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium text-neutral-800 mb-2">HSN Codes (Goods)</h4>
              <ul className="text-sm space-y-1 text-neutral-600">
                <li><span className="font-medium">1001-1008:</span> Cereals</li>
                <li><span className="font-medium">2201-2209:</span> Beverages</li>
                <li><span className="font-medium">3001-3006:</span> Pharmaceutical products</li>
                <li><span className="font-medium">6101-6117:</span> Apparel and clothing</li>
                <li><span className="font-medium">8471:</span> Computers and data processing units</li>
                <li><span className="font-medium">8517:</span> Telephones and communication devices</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-neutral-800 mb-2">SAC Codes (Services)</h4>
              <ul className="text-sm space-y-1 text-neutral-600">
                <li><span className="font-medium">9954:</span> Construction services</li>
                <li><span className="font-medium">9963:</span> Accommodation, food and beverage</li>
                <li><span className="font-medium">9983:</span> IT and software services</li>
                <li><span className="font-medium">9964:</span> Passenger transport services</li>
                <li><span className="font-medium">9971:</span> Financial and related services</li>
                <li><span className="font-medium">9982:</span> Legal and accounting services</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GstSellerCalculator;