import React, { useState } from 'react';
import SEOHelmet from '../components/SEOHelmet';

export const SalarySlipGenerator: React.FC = () => {
  // Company & Employee Details
  const [companyName, setCompanyName] = useState('Acme Corp Ltd.');
  const [companyAddress, setCompanyAddress] = useState('123 Business Park, Tech City');
  const [employeeName, setEmployeeName] = useState('John Doe');
  const [designation, setDesignation] = useState('Software Engineer');
  const [monthYear, setMonthYear] = useState('July 2026');
  const [employeeId, setEmployeeId] = useState('EMP-1024');
  const [pan, setPan] = useState('ABCDE1234F');
  const [uan, setUan] = useState('100012345678');
  const [bankAccount, setBankAccount] = useState('XXXX-XXXX-1234');

  // Earnings
  const [basic, setBasic] = useState<number>(30000);
  const [hra, setHra] = useState<number>(15000);
  const [lta, setLta] = useState<number>(5000);
  const [specialAllowance, setSpecialAllowance] = useState<number>(10000);

  // Deductions
  const [pf, setPf] = useState<number>(3600);
  const [pt, setPt] = useState<number>(200);
  const [tds, setTds] = useState<number>(2500);

  const totalEarnings = basic + hra + lta + specialAllowance;
  const totalDeductions = pf + pt + tds;
  const netPay = totalEarnings - totalDeductions;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <SEOHelmet 
        title="Free Salary Slip Generator (Payslip Maker) India" 
        description="Generate professional salary slips and payslips online for free. Print or save as PDF instantly. Includes standard Indian salary components like Basic, HRA, PF, PT, and TDS."
        canonicalUrl="https://moneycal.in/tools/salary-slip-generator"
      />

      {/* Hide controls when printing */}
      <div className="print:hidden mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Salary Slip Generator</h1>
        <p className="text-gray-600 mb-6">Create a professional payslip instantly. Fill in the details below and click "Print / Save as PDF".</p>
        
        <div className="bg-[#f9fafb] border border-gray-200 rounded-lg p-5 mb-8 shadow-sm">
          <h2 className="text-xl font-semibold mb-4 text-[#2c3e50] border-b pb-2">Enter Details</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Column: Details */}
            <div>
              <h3 className="font-semibold text-gray-700 mb-3 bg-gray-100 p-2 rounded">Company & Employee Info</h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
                  <input type="text" value={companyName} onChange={e => setCompanyName(e.target.value)} className="w-full p-2 border rounded focus:border-blue-500 focus:outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Company Address</label>
                  <input type="text" value={companyAddress} onChange={e => setCompanyAddress(e.target.value)} className="w-full p-2 border rounded focus:border-blue-500 focus:outline-none" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Employee Name</label>
                    <input type="text" value={employeeName} onChange={e => setEmployeeName(e.target.value)} className="w-full p-2 border rounded focus:border-blue-500 focus:outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Employee ID</label>
                    <input type="text" value={employeeId} onChange={e => setEmployeeId(e.target.value)} className="w-full p-2 border rounded focus:border-blue-500 focus:outline-none" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Designation</label>
                    <input type="text" value={designation} onChange={e => setDesignation(e.target.value)} className="w-full p-2 border rounded focus:border-blue-500 focus:outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Month & Year</label>
                    <input type="text" value={monthYear} onChange={e => setMonthYear(e.target.value)} className="w-full p-2 border rounded focus:border-blue-500 focus:outline-none" />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">PAN</label>
                    <input type="text" value={pan} onChange={e => setPan(e.target.value)} className="w-full p-2 border rounded focus:border-blue-500 focus:outline-none uppercase" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">UAN</label>
                    <input type="text" value={uan} onChange={e => setUan(e.target.value)} className="w-full p-2 border rounded focus:border-blue-500 focus:outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">A/C No.</label>
                    <input type="text" value={bankAccount} onChange={e => setBankAccount(e.target.value)} className="w-full p-2 border rounded focus:border-blue-500 focus:outline-none" />
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Numbers */}
            <div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold text-gray-700 mb-3 bg-gray-100 p-2 rounded">Earnings (₹)</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Basic Pay</label>
                      <input type="number" value={basic} onChange={e => setBasic(Number(e.target.value) || 0)} className="w-full p-2 border rounded focus:border-blue-500 focus:outline-none" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">HRA</label>
                      <input type="number" value={hra} onChange={e => setHra(Number(e.target.value) || 0)} className="w-full p-2 border rounded focus:border-blue-500 focus:outline-none" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Leave Travel Allowance (LTA)</label>
                      <input type="number" value={lta} onChange={e => setLta(Number(e.target.value) || 0)} className="w-full p-2 border rounded focus:border-blue-500 focus:outline-none" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Special Allowance</label>
                      <input type="number" value={specialAllowance} onChange={e => setSpecialAllowance(Number(e.target.value) || 0)} className="w-full p-2 border rounded focus:border-blue-500 focus:outline-none" />
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-700 mb-3 bg-gray-100 p-2 rounded">Deductions (₹)</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Provident Fund (PF)</label>
                      <input type="number" value={pf} onChange={e => setPf(Number(e.target.value) || 0)} className="w-full p-2 border rounded focus:border-blue-500 focus:outline-none" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Professional Tax (PT)</label>
                      <input type="number" value={pt} onChange={e => setPt(Number(e.target.value) || 0)} className="w-full p-2 border rounded focus:border-blue-500 focus:outline-none" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Income Tax (TDS)</label>
                      <input type="number" value={tds} onChange={e => setTds(Number(e.target.value) || 0)} className="w-full p-2 border rounded focus:border-blue-500 focus:outline-none" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-6 flex justify-center">
            <button 
              onClick={handlePrint}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg shadow-md transition-colors"
            >
              Print / Save as PDF
            </button>
          </div>
        </div>
      </div>

      {/* Payslip Preview / Print Area */}
      {/* 
        This is the actual slip that will be printed. 
        Tailwind 'print:block' handles print visibility.
      */}
      <div className="bg-white border-2 border-gray-300 p-8 w-full max-w-4xl mx-auto shadow-sm">
        
        <div className="text-center mb-6 border-b-2 border-gray-800 pb-4">
          <h2 className="text-2xl font-bold uppercase tracking-wide text-gray-900">{companyName}</h2>
          <p className="text-gray-600 text-sm mt-1">{companyAddress}</p>
          <h3 className="text-xl font-bold mt-4 text-gray-800">Payslip for the month of {monthYear}</h3>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6 text-sm border-b border-gray-300 pb-4">
          <div>
            <table className="w-full">
              <tbody>
                <tr><td className="py-1 font-semibold w-1/3">Employee Name</td><td className="py-1">: {employeeName}</td></tr>
                <tr><td className="py-1 font-semibold">Employee ID</td><td className="py-1">: {employeeId}</td></tr>
                <tr><td className="py-1 font-semibold">Designation</td><td className="py-1">: {designation}</td></tr>
              </tbody>
            </table>
          </div>
          <div>
            <table className="w-full">
              <tbody>
                <tr><td className="py-1 font-semibold w-1/3">PAN</td><td className="py-1 uppercase">: {pan}</td></tr>
                <tr><td className="py-1 font-semibold">UAN</td><td className="py-1">: {uan}</td></tr>
                <tr><td className="py-1 font-semibold">Bank A/C No.</td><td className="py-1">: {bankAccount}</td></tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="flex flex-col md:flex-row border border-gray-800 mb-6">
          {/* Earnings Table */}
          <div className="w-full md:w-1/2 border-b md:border-b-0 md:border-r border-gray-800">
            <div className="bg-gray-100 font-bold p-2 text-center border-b border-gray-800">EARNINGS</div>
            <table className="w-full text-sm">
              <tbody>
                <tr>
                  <td className="p-2 border-b border-gray-200">Basic Pay</td>
                  <td className="p-2 border-b border-gray-200 text-right">{formatCurrency(basic)}</td>
                </tr>
                <tr>
                  <td className="p-2 border-b border-gray-200">House Rent Allowance</td>
                  <td className="p-2 border-b border-gray-200 text-right">{formatCurrency(hra)}</td>
                </tr>
                <tr>
                  <td className="p-2 border-b border-gray-200">Leave Travel Allowance</td>
                  <td className="p-2 border-b border-gray-200 text-right">{formatCurrency(lta)}</td>
                </tr>
                <tr>
                  <td className="p-2 border-b border-gray-200">Special Allowance</td>
                  <td className="p-2 border-b border-gray-200 text-right">{formatCurrency(specialAllowance)}</td>
                </tr>
                {/* Empty rows for layout balance */}
                <tr><td className="p-2 text-transparent">-</td><td></td></tr>
              </tbody>
            </table>
            <div className="font-bold p-2 flex justify-between border-t border-gray-800 bg-gray-50">
              <span>Total Earnings (A)</span>
              <span>{formatCurrency(totalEarnings)}</span>
            </div>
          </div>

          {/* Deductions Table */}
          <div className="w-full md:w-1/2">
            <div className="bg-gray-100 font-bold p-2 text-center border-b border-gray-800">DEDUCTIONS</div>
            <table className="w-full text-sm">
              <tbody>
                <tr>
                  <td className="p-2 border-b border-gray-200">Provident Fund (PF)</td>
                  <td className="p-2 border-b border-gray-200 text-right">{formatCurrency(pf)}</td>
                </tr>
                <tr>
                  <td className="p-2 border-b border-gray-200">Professional Tax (PT)</td>
                  <td className="p-2 border-b border-gray-200 text-right">{formatCurrency(pt)}</td>
                </tr>
                <tr>
                  <td className="p-2 border-b border-gray-200">Income Tax (TDS)</td>
                  <td className="p-2 border-b border-gray-200 text-right">{formatCurrency(tds)}</td>
                </tr>
                {/* Empty rows for layout balance */}
                <tr><td className="p-2 border-b border-gray-200 text-transparent">-</td><td className="border-b border-gray-200"></td></tr>
                <tr><td className="p-2 text-transparent">-</td><td></td></tr>
              </tbody>
            </table>
            <div className="font-bold p-2 flex justify-between border-t border-gray-800 bg-gray-50">
              <span>Total Deductions (B)</span>
              <span>{formatCurrency(totalDeductions)}</span>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center bg-gray-100 p-4 border-2 border-gray-800 font-bold text-lg mb-8">
          <span>NET PAY (A - B)</span>
          <span>{formatCurrency(netPay)}</span>
        </div>

        <div className="text-center text-xs text-gray-500 mt-12 italic border-t pt-4">
          This is a computer generated document. No signature is required.
        </div>

      </div>

      {/* SEO Content Section - Hidden when printing */}
      <div className="print:hidden mt-12 prose max-w-none text-gray-800 border-t pt-8">
        <h2>How to Generate a Salary Slip online?</h2>
        <p>
          A salary slip (or payslip) is a crucial financial document issued by employers to employees every month. It acts as proof of income and employment. Using our free online salary slip generator, you can instantly create professional payslips and save them as PDFs.
        </p>
        
        <h3>Why do you need a Salary Slip?</h3>
        <ul>
          <li><strong>Loan & Credit Card Approvals:</strong> Banks mandate the latest 3 to 6 months of salary slips before approving Home Loans, Personal Loans, or Credit Cards.</li>
          <li><strong>Visa Applications:</strong> Foreign embassies require payslips as proof of steady income and employment in your home country.</li>
          <li><strong>Job Switching & Salary Negotiation:</strong> When changing jobs, HR departments ask for your previous payslips to verify your current CTC and offer you a hike accordingly.</li>
          <li><strong>Income Tax Proof:</strong> Helps in verifying your TDS (Tax Deducted at Source) and filing your ITR (Income Tax Return).</li>
        </ul>

        <h3>Understanding Salary Slip Components</h3>
        <table className="w-full border-collapse border border-gray-300 my-4 text-left text-sm md:text-base">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 p-2">Earnings Component</th>
              <th className="border border-gray-300 p-2">Deductions Component</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-300 p-2"><strong>Basic Pay:</strong> Core salary, usually 40-50% of total pay. PF is calculated on this.</td>
              <td className="border border-gray-300 p-2"><strong>Provident Fund (EPF):</strong> 12% of Basic Pay is deducted for your retirement fund.</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-2"><strong>House Rent Allowance (HRA):</strong> Given to meet rental expenses. Can be tax-exempt under Sec 10(13A).</td>
              <td className="border border-gray-300 p-2"><strong>Professional Tax (PT):</strong> State-level tax, usually ₹200/month in states like Maharashtra, Karnataka, Telangana.</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-2"><strong>Special Allowance:</strong> The remaining balancing figure. Fully taxable.</td>
              <td className="border border-gray-300 p-2"><strong>Income Tax (TDS):</strong> Estimated tax deducted monthly by your employer based on your projected annual income.</td>
            </tr>
          </tbody>
        </table>

        <div className="bg-gray-100 p-4 rounded-lg my-4 border-l-4 border-blue-500">
          <strong>Tip:</strong> When saving this payslip as a PDF, most browsers will automatically hide the input form and only print the actual payslip design. Make sure "Background graphics" is enabled in your print settings for the best look.
        </div>
      </div>
    </div>
  );
};
