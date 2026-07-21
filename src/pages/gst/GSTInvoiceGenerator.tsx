import React, { useMemo, useRef, useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import SEOHelmet from '../../components/SEOHelmet';
import WhatsAppBanner from '../../components/WhatsAppBanner';

import { ArrowLeft, FileText, Plus, Trash2, Download, Info, Link as LinkIcon } from 'lucide-react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

interface ItemRow {
  description: string;
  hsn: string;
  qty: number;
  rate: number;
  gstRate: number;
  discountPercent?: number;
}

const GSTInvoiceGenerator: React.FC = () => {
  const navigate = useNavigate();
  const invoiceRef = useRef<HTMLDivElement>(null);

  const [seller, setSeller] = useState({ name: '', gstin: '', address: '' });
  const [buyer, setBuyer] = useState({ name: '', gstin: '', address: '' });
  const [invoiceMeta, setInvoiceMeta] = useState({ number: 'INV-001', date: new Date().toISOString().slice(0, 10), placeOfSupply: 'Maharashtra', isIGST: false });
  const [roundOff, setRoundOff] = useState<number>(0);
  const [notes, setNotes] = useState<string>('Thank you for your business.');
  const [items, setItems] = useState<ItemRow[]>([
    { description: 'Product/Service', hsn: '', qty: 1, rate: 0, gstRate: 18, discountPercent: 0 }
  ]);

  const totals = useMemo(() => {
    const subTotal = items.reduce((sum, i) => {
      const line = i.qty * i.rate;
      const discount = (line * (i.discountPercent || 0)) / 100;
      return sum + (line - discount);
    }, 0);
    const tax = items.reduce((sum, i) => {
      const line = i.qty * i.rate;
      const discount = (line * (i.discountPercent || 0)) / 100;
      const taxable = line - discount;
      return sum + (taxable * (i.gstRate || 0)) / 100;
    }, 0);
    const cgst = invoiceMeta.isIGST ? 0 : tax / 2;
    const sgst = invoiceMeta.isIGST ? 0 : tax / 2;
    const igst = invoiceMeta.isIGST ? tax : 0;
    const grand = subTotal + tax + (Number(roundOff) || 0);
    return { subTotal, tax, cgst, sgst, igst, grand };
  }, [items, invoiceMeta.isIGST, roundOff]);

  const addItem = () => setItems(prev => [...prev, { description: '', hsn: '', qty: 1, rate: 0, gstRate: 18, discountPercent: 0 }]);
  const removeItem = (idx: number) => setItems(prev => prev.filter((_, i) => i !== idx));
  const updateItem = (idx: number, patch: Partial<ItemRow>) => setItems(prev => prev.map((row, i) => (i === idx ? { ...row, ...patch } : row)));

  const downloadPDF = async () => {
    if (!invoiceRef.current) return;
    const canvas = await html2canvas(invoiceRef.current, { scale: 2, useCORS: true, allowTaint: true });
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const imgWidth = 210;
    const pageHeight = 295;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;
    let position = 0;
    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;
    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }
    pdf.save(`gst-invoice-${invoiceMeta.number}.pdf`);
  };

  return (
    <>
      <SEOHelmet
        title="GST Invoice Generator India 2026 | Create GST-Compliant Invoice PDF | MoneyCal"
        description="Create GST-compliant invoices with item-level rates, discount support, tax split, and downloadable PDF for Indian businesses."
        keywords="gst invoice generator india, gst bill maker with hsn code, cgst sgst igst invoice creator, gst invoice pdf generator free, business gst invoice tool india"
        url="/tools/gst-invoice-generator"
        type="website"
        image="/images/gst-invoice-generator.jpg"
        tags={["gst", "invoice", "pdf", "billing"]}
      />
      <WhatsAppBanner />

      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-yellow-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-6">
            <button onClick={() => navigate(-1)} className="flex items-center text-neutral-600 hover:text-neutral-900">
              <ArrowLeft className="h-4 w-4 mr-1" /> Back
            </button>
          </div>

          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <FileText className="h-12 w-12 text-amber-600 mr-2" />
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800">GST Invoice Generator</h1>
            </div>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Enter seller/buyer details, add items, and generate a compliant GST invoice with CGST/SGST/IGST. Export to PDF in one click.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-white rounded-xl shadow p-4 border">
              <h3 className="font-semibold mb-3">Seller Details</h3>
              <div className="space-y-3">
                <input className="w-full px-3 py-2 rounded-lg border" placeholder="Seller Name" value={seller.name} onChange={(e) => setSeller({ ...seller, name: e.target.value })} />
                <input className="w-full px-3 py-2 rounded-lg border" placeholder="Seller GSTIN" value={seller.gstin} onChange={(e) => setSeller({ ...seller, gstin: e.target.value })} />
                <textarea className="w-full px-3 py-2 rounded-lg border" placeholder="Seller Address" rows={3} value={seller.address} onChange={(e) => setSeller({ ...seller, address: e.target.value })} />
              </div>
            </div>
            <div className="bg-white rounded-xl shadow p-4 border">
              <h3 className="font-semibold mb-3">Buyer Details</h3>
              <div className="space-y-3">
                <input className="w-full px-3 py-2 rounded-lg border" placeholder="Buyer Name" value={buyer.name} onChange={(e) => setBuyer({ ...buyer, name: e.target.value })} />
                <input className="w-full px-3 py-2 rounded-lg border" placeholder="Buyer GSTIN" value={buyer.gstin} onChange={(e) => setBuyer({ ...buyer, gstin: e.target.value })} />
                <textarea className="w-full px-3 py-2 rounded-lg border" placeholder="Buyer Address" rows={3} value={buyer.address} onChange={(e) => setBuyer({ ...buyer, address: e.target.value })} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow p-4 border mb-6">
            <h3 className="font-semibold mb-3">Invoice Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <input className="w-full px-3 py-2 rounded-lg border" placeholder="Invoice Number" value={invoiceMeta.number} onChange={(e) => setInvoiceMeta({ ...invoiceMeta, number: e.target.value })} />
              <input type="date" className="w-full px-3 py-2 rounded-lg border" value={invoiceMeta.date} onChange={(e) => setInvoiceMeta({ ...invoiceMeta, date: e.target.value })} />
              <input className="w-full px-3 py-2 rounded-lg border" placeholder="Place of Supply" value={invoiceMeta.placeOfSupply} onChange={(e) => setInvoiceMeta({ ...invoiceMeta, placeOfSupply: e.target.value })} />
              <label className="flex items-center gap-2 text-sm text-gray-700 bg-amber-50 p-3 rounded-lg border border-amber-100">
                <input type="checkbox" checked={invoiceMeta.isIGST} onChange={(e) => setInvoiceMeta({ ...invoiceMeta, isIGST: e.target.checked })} />
                Apply IGST (inter-state)
              </label>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div>
                <label className="block text-sm text-gray-700 mb-1">Round Off (INR)</label>
                <input type="number" className="w-full px-3 py-2 rounded-lg border" value={roundOff} onChange={(e) => setRoundOff(Number(e.target.value))} />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-1">Invoice Notes</label>
                <input className="w-full px-3 py-2 rounded-lg border" value={notes} onChange={(e) => setNotes(e.target.value)} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow p-4 border mb-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold">Items</h3>
              <button onClick={addItem} className="inline-flex items-center px-3 py-2 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700"><Plus className="h-4 w-4 mr-1" /> Add Item</button>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-3 py-2 text-left">Description</th>
                    <th className="px-3 py-2 text-left">HSN/SAC</th>
                    <th className="px-3 py-2 text-right">Qty</th>
                    <th className="px-3 py-2 text-right">Rate</th>
                    <th className="px-3 py-2 text-right">Disc%</th>
                    <th className="px-3 py-2 text-right">GST %</th>
                    <th className="px-3 py-2 text-right">Amount</th>
                    <th className="px-3 py-2"></th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((row, idx) => {
                    const amount = row.qty * row.rate * (1 - (row.discountPercent || 0) / 100);
                    return (
                      <tr key={idx} className="border-t">
                        <td className="px-3 py-2"><input className="w-full border rounded px-2 py-1" value={row.description} onChange={(e) => updateItem(idx, { description: e.target.value })} /></td>
                        <td className="px-3 py-2"><input className="w-full border rounded px-2 py-1" value={row.hsn} onChange={(e) => updateItem(idx, { hsn: e.target.value })} /></td>
                        <td className="px-3 py-2 text-right"><input type="number" min={0} className="w-24 text-right border rounded px-2 py-1" value={row.qty} onChange={(e) => updateItem(idx, { qty: Number(e.target.value) })} /></td>
                        <td className="px-3 py-2 text-right"><input type="number" min={0} className="w-28 text-right border rounded px-2 py-1" value={row.rate} onChange={(e) => updateItem(idx, { rate: Number(e.target.value) })} /></td>
                        <td className="px-3 py-2 text-right"><input type="number" min={0} max={100} className="w-20 text-right border rounded px-2 py-1" value={row.discountPercent || 0} onChange={(e) => updateItem(idx, { discountPercent: Number(e.target.value) })} /></td>
                        <td className="px-3 py-2 text-right">
                          <select className="w-24 text-right border rounded px-2 py-1" value={row.gstRate} onChange={(e) => updateItem(idx, { gstRate: Number(e.target.value) })}>
                            {[0, 5, 12, 18, 28].map(r => <option key={r} value={r}>{r}%</option>)}
                          </select>
                        </td>
                        <td className="px-3 py-2 text-right">₹{amount.toLocaleString(undefined, { maximumFractionDigits: 2 })}</td>
                        <td className="px-3 py-2 text-right">
                          {items.length > 1 && (
                            <button onClick={() => removeItem(idx)} className="text-red-600 hover:text-red-800"><Trash2 className="h-4 w-4" /></button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          <div ref={invoiceRef} className="bg-white rounded-xl shadow p-6 border">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold">Tax Invoice</h2>
                <div className="text-sm text-gray-600">Invoice No: {invoiceMeta.number} | Date: {invoiceMeta.date}</div>
                <div className="text-sm text-gray-600">Place of Supply: {invoiceMeta.placeOfSupply}</div>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-600">Mode: {invoiceMeta.isIGST ? 'IGST' : 'CGST/SGST'}</div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="p-4 rounded-lg bg-gray-50 border">
                <div className="font-semibold">Seller</div>
                <div className="text-sm">{seller.name || '—'}</div>
                <div className="text-sm">GSTIN: {seller.gstin || '—'}</div>
                <div className="text-sm whitespace-pre-wrap">{seller.address || '—'}</div>
              </div>
              <div className="p-4 rounded-lg bg-gray-50 border">
                <div className="font-semibold">Buyer</div>
                <div className="text-sm">{buyer.name || '—'}</div>
                <div className="text-sm">GSTIN: {buyer.gstin || '—'}</div>
                <div className="text-sm whitespace-pre-wrap">{buyer.address || '—'}</div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-3 py-2 text-left">Description</th>
                    <th className="px-3 py-2 text-left">HSN/SAC</th>
                    <th className="px-3 py-2 text-right">Qty</th>
                    <th className="px-3 py-2 text-right">Rate</th>
                    <th className="px-3 py-2 text-right">Disc%</th>
                    <th className="px-3 py-2 text-right">GST%</th>
                    <th className="px-3 py-2 text-right">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((row, idx) => (
                    <tr key={idx} className="border-t">
                      <td className="px-3 py-2">{row.description || '—'}</td>
                      <td className="px-3 py-2">{row.hsn || '—'}</td>
                      <td className="px-3 py-2 text-right">{row.qty}</td>
                      <td className="px-3 py-2 text-right">₹{row.rate.toLocaleString()}</td>
                      <td className="px-3 py-2 text-right">{row.discountPercent || 0}%</td>
                      <td className="px-3 py-2 text-right">{row.gstRate}%</td>
                      <td className="px-3 py-2 text-right">₹{(row.qty * row.rate * (1 - (row.discountPercent || 0) / 100)).toLocaleString(undefined, { maximumFractionDigits: 2 })}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div className="text-xs text-gray-600">
                <div>• Prices in INR. • No reverse charge unless stated. • E.&O.E.</div>
              </div>
              <div className="text-sm">
                <div className="flex justify-between border-b py-1"><span>Sub Total</span><span>₹{totals.subTotal.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span></div>
                {!invoiceMeta.isIGST && (
                  <>
                    <div className="flex justify-between border-b py-1"><span>CGST</span><span>₹{totals.cgst.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span></div>
                    <div className="flex justify-between border-b py-1"><span>SGST</span><span>₹{totals.sgst.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span></div>
                  </>
                )}
                {invoiceMeta.isIGST && (
                  <div className="flex justify-between border-b py-1"><span>IGST</span><span>₹{totals.igst.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span></div>
                )}
                {roundOff !== 0 && (
                  <div className="flex justify-between border-b py-1"><span>Round Off</span><span>₹{roundOff.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span></div>
                )}
                <div className="flex justify-between font-semibold py-1"><span>Grand Total</span><span>₹{totals.grand.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span></div>
              </div>
            </div>
            <div className="mt-3 text-sm text-gray-700 border-t pt-3">{notes}</div>
          </div>

          <div className="mt-4 flex justify-end">
            <button onClick={downloadPDF} className="inline-flex items-center px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700">
              <Download className="h-4 w-4 mr-2" /> Download Invoice PDF
            </button>
          </div>

          <div className="mt-10 prose prose-amber max-w-none">
            <h2>How to use the GST Invoice Generator</h2>
            <ol>
              <li>Fill seller and buyer details with GSTINs.</li>
              <li>Add line items with HSN/SAC, quantities, rates, and GST rates.</li>
              <li>Toggle IGST for inter-state supplies, otherwise CGST/SGST is applied.</li>
              <li>Download the invoice as a PDF for sharing and records.</li>
            </ol>
            <p className="text-sm text-gray-600">Disclaimer: This is a generic template and not a substitute for statutory requirements. Verify with your accountant.</p>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
            <h4 className="font-semibold text-blue-900 mb-2 flex items-center">
              <LinkIcon className="h-4 w-4 mr-2" /> Related GST Tools
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
              <RouterLink to="/tools/gst-einvoice-qr-validator" className="text-blue-600 hover:text-blue-800 underline">E-Invoice QR Validator</RouterLink>
              <RouterLink to="/tools/gst-liability-calculator" className="text-blue-600 hover:text-blue-800 underline">GST Liability Calculator</RouterLink>
              <RouterLink to="/tools/rcm-applicability-checker" className="text-blue-600 hover:text-blue-800 underline">RCM Applicability Checker</RouterLink>
              <RouterLink to="/tools/gst-slab-finder" className="text-blue-600 hover:text-blue-800 underline">GST Slab Finder</RouterLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GSTInvoiceGenerator;


