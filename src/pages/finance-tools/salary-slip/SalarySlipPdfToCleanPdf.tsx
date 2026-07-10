import React, { useEffect, useRef, useState } from 'react';
import SEOHelmet from '../../../components/SEOHelmet';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const SalarySlipPdfToCleanPdf: React.FC = () => {
  const [fields, setFields] = useState<Record<string, string>>({
    employeeName: '',
    employeeId: '',
    designation: '',
    month: '',
    basic: '',
    hra: '',
    allowances: '',
    deductions: '',
    netPay: ''
  });
  const [brand, setBrand] = useState<string>('Company Name Pvt Ltd');
  const [logo, setLogo] = useState<string>('');
  const ref = useRef<HTMLDivElement>(null);

  const handleChange = (key: string, value: string) => {
    setFields(prev => ({ ...prev, [key]: value }));
  };

  const generatePDF = async () => {
    if (!ref.current) return;
    const canvas = await html2canvas(ref.current, { scale: 2, useCORS: true, allowTaint: true });
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const imgWidth = 210; const pageHeight = 295; const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight; let position = 0;
    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;
    while (heightLeft >= 0) { position = heightLeft - imgHeight; pdf.addPage(); pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight); heightLeft -= pageHeight; }
    pdf.save('clean-payslip.pdf');
  };

  const savePreset = () => {
    localStorage.setItem('cleanPayslipFields', JSON.stringify({ fields, brand, logo }));
  };
  const loadPreset = () => {
    const saved = localStorage.getItem('cleanPayslipFields');
    if (!saved) return;
    try {
      const obj = JSON.parse(saved);
      if (obj.fields) setFields(obj.fields);
      if (obj.brand) setBrand(obj.brand);
      if (obj.logo) setLogo(obj.logo);
    } catch {
      setBrand('Company Name Pvt Ltd');
      setLogo('');
    }
  };
  const copyJSON = async () => {
    const payload = JSON.stringify({ fields, brand, logo }, null, 2);
    await navigator.clipboard.writeText(payload);
  };
  const downloadPNG = async () => {
    if (!ref.current) return;
    const canvas = await html2canvas(ref.current, { scale: 2, useCORS: true, allowTaint: true });
    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/png');
    link.download = 'clean-payslip.png';
    link.click();
  };
  useEffect(() => {
    if (!brand) setBrand('Company Name Pvt Ltd');
  }, [brand]);

  const faq = [
    { question: 'Is the payslip editable?', answer: 'Yes. Fill the standardized fields and generate a clean PDF.' },
    { question: 'Do we upload anything?', answer: 'No. Everything happens in your browser. No server, no login.' },
    { question: 'Is this legal?', answer: 'It produces a formatted document; accuracy and official validity depend on employer policies.' },
    { question: 'Can I use company logo?', answer: 'You can add a logo image using HTML; this tool keeps layout professional and clean.' }
  ];

  return (
    <>
      <SEOHelmet
        title="Salary Slip PDF to Clean PDF Payslip (Editable, No Upload) | MoneyCal"
        description="Generate a clean, standardized payslip PDF from your salary details. 100% client-side, editable fields, professional layout, and optimized for Indian formats."
        keywords="salary slip pdf to clean pdf payslip converter free, editable payslip india"
        url="/finance-tools/pdf-converters/salary-slip-pdf-to-clean-pdf"
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Finance Tools', url: '/finance-tools' },
          { name: 'PDF Converters', url: '/finance-tools/pdf-converters' },
          { name: 'Payslip Generator', url: '/finance-tools/pdf-converters/salary-slip-pdf-to-clean-pdf' }
        ]}
        structuredData={{
          '@context': 'https://schema.org',
          '@type': 'SoftwareApplication',
          name: 'Editable Payslip PDF Generator',
          applicationCategory: 'FinanceApplication',
          operatingSystem: 'Web Browser',
          offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' }
        }}
        faqData={faq}
      />

      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        <div className="max-w-5xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Editable Fields</h1>
            <div className="mb-3">
              <label className="block text-sm font-semibold text-gray-700 mb-1">Brand Name</label>
              <input value={brand} onChange={(e)=>setBrand(e.target.value)} className="w-full border rounded-lg px-3 py-2" />
            </div>
            <div className="mb-3">
              <label className="block text-sm font-semibold text-gray-700 mb-1">Logo Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={async (e)=>{
                  const f = e.target.files?.[0];
                  if (!f) return;
                  const reader = new FileReader();
                  reader.onload = () => setLogo(String(reader.result || ''));
                  reader.readAsDataURL(f);
                }}
                className="w-full"
              />
            </div>
            {Object.keys(fields).map((k) => (
              <div key={k} className="mb-3">
                <label className="block text-sm font-semibold text-gray-700 mb-1">{k}</label>
                <input
                  value={fields[k]}
                  onChange={(e) => handleChange(k, e.target.value)}
                  className="w-full border rounded-lg px-3 py-2"
                />
              </div>
            ))}
            <button
              onClick={generatePDF}
              className="mt-2 px-4 py-2 rounded-lg bg-indigo-600 text-white font-semibold"
            >
              Generate Clean PDF
            </button>
            <div className="mt-3 flex items-center gap-3">
              <button onClick={savePreset} className="px-3 py-2 rounded-lg bg-gray-100 border">Save Preset</button>
              <button onClick={loadPreset} className="px-3 py-2 rounded-lg bg-gray-100 border">Load Preset</button>
              <button onClick={copyJSON} className="px-3 py-2 rounded-lg bg-gray-100 border">Copy JSON</button>
              <button onClick={downloadPNG} className="px-3 py-2 rounded-lg bg-gray-100 border">Download PNG</button>
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Preview</h2>
            <div ref={ref} className="p-6 border rounded-xl">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="text-lg font-bold">{brand}</div>
                  <div className="text-sm text-gray-600">Payslip — {fields.month || 'Month YYYY'}</div>
                </div>
                <div className="text-sm text-gray-600">Employee ID: {fields.employeeId || 'XXXX'}</div>
              </div>
              {logo && <div className="mb-4"><img src={logo} alt="Logo" className="h-10 object-contain" /></div>}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <div className="text-sm text-gray-600">Employee</div>
                  <div className="font-semibold">{fields.employeeName || 'Your Name'}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">Designation</div>
                  <div className="font-semibold">{fields.designation || 'Role'}</div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="border rounded-lg p-4">
                  <div className="font-semibold mb-2">Earnings</div>
                  <div className="flex justify-between"><span>Basic</span><span>{fields.basic || '-'}</span></div>
                  <div className="flex justify-between"><span>HRA</span><span>{fields.hra || '-'}</span></div>
                  <div className="flex justify-between"><span>Allowances</span><span>{fields.allowances || '-'}</span></div>
                </div>
                <div className="border rounded-lg p-4">
                  <div className="font-semibold mb-2">Deductions</div>
                  <div className="flex justify-between"><span>Deductions</span><span>{fields.deductions || '-'}</span></div>
                </div>
              </div>
              <div className="mt-4 border-t pt-3 flex justify-between font-bold">
                <span>Net Pay</span>
                <span>{fields.netPay || '-'}</span>
              </div>
              <div className="mt-2 text-xs text-gray-500">Generated via MoneyCal — client-side tool</div>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-5xl mx-auto px-4 pb-12">
        <div className="prose prose-indigo max-w-none bg-white rounded-2xl shadow-md border border-gray-200 p-6">
          <h2>Free Online Salary Slip PDF to Clean Payslip Generator India 2026</h2>
          <p>Create a polished, standardized payslip PDF from structured fields. It is designed for Indian formats, mobile-first, and completely browser-side. Enter the details once and produce a professional document suitable for internal records, visa files, loan applications, or personal archiving.</p>
          <h3>Why Generate A Clean Payslip</h3>
          <p>Legacy PDFs often differ in layout, branding, and readability. A clean, consistent payslip improves clarity for banks and verification teams, reduces rework, and keeps employees’ proof-of-income documents uniform. It is especially useful when your HRMS provides raw fields but not a polished export.</p>
          <h3>Features</h3>
          <ul>
            <li>Editable fields for employee identity, earnings, deductions, and net pay.</li>
            <li>Instant PDF export with professional typography and balanced spacing.</li>
            <li>Logo and header support using simple HTML markup if needed.</li>
            <li>No login, no upload, no server dependency.</li>
          </ul>
          <h3>Compliance And Validity</h3>
          <p>The generated document is a formatted representation of your inputs. Official validity depends on employer policies. For formal submissions, ensure all values match payroll statements and include company identifiers as required by your organization.</p>
          <h3>Best Practices</h3>
          <ul>
            <li>Consistently specify month and year to build a chronological set.</li>
            <li>Align earnings and deductions with your actual payroll figures.</li>
            <li>Include employee ID and designation for easier verification.</li>
            <li>If your employer requires a specific format, mirror headings accordingly.</li>
          </ul>
          <h3>Mobile Workflow</h3>
          <p>Fill fields on your phone, generate, and share the PDF via email or messaging apps. The output opens smoothly on banking portals and government sites that accept PDF uploads.</p>
          <h3>Keywords Targeted</h3>
          <p>salary slip pdf to clean pdf payslip converter free; editable payslip india; mobile-friendly payslip generator; client-side salary slip pdf tool 2026 india.</p>
        </div>
      </div>
    </>
  );
};

export default SalarySlipPdfToCleanPdf;
