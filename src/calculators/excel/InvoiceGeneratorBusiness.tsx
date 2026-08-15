import React, { useState } from 'react';
import * as XLSX from 'xlsx';

interface InvoiceItem {
  description: string;
  quantity: number;
  rate: number;
  gst: number;
}

interface Invoice {
  invoiceNumber: number;
  date: string;
  clientName: string;
  clientAddress: string;
  items: InvoiceItem[];
  notes: string;
}

const initialInvoice: Invoice = {
  invoiceNumber: 1,
  date: new Date().toISOString().slice(0, 10),
  clientName: '',
  clientAddress: '',
  items: [{ description: '', quantity: 1, rate: 0, gst: 18 }],
  notes: '',
};

const InvoiceGeneratorBusiness: React.FC = () => {
  const [invoice, setInvoice] = useState<Invoice>(initialInvoice);

  const handleItemChange = (idx: number, field: keyof InvoiceItem, value: string | number) => {
    const items = [...invoice.items];
    items[idx] = { ...items[idx], [field]: value };
    setInvoice({ ...invoice, items });
  };

  const addItem = () => {
    setInvoice({ ...invoice, items: [...invoice.items, { description: '', quantity: 1, rate: 0, gst: 18 }] });
  };

  const removeItem = (idx: number) => {
    const items = invoice.items.filter((_, i: number) => i !== idx);
    setInvoice({ ...invoice, items });
  };

  const handleChange = (field: keyof Invoice, value: string | number) => {
    setInvoice({ ...invoice, [field]: value });
  };

  const getSubtotal = () => invoice.items.reduce((sum: number, item: InvoiceItem) => sum + item.quantity * item.rate, 0);
  const getGST = () => invoice.items.reduce((sum: number, item: InvoiceItem) => sum + (item.quantity * item.rate * (item.gst || 0)) / 100, 0);
  const getTotal = () => getSubtotal() + getGST();

  const handleDownload = () => {
    const wsData = [
      ['Invoice Number', invoice.invoiceNumber],
      ['Date', invoice.date],
      ['Client Name', invoice.clientName],
      ['Client Address', invoice.clientAddress],
      [],
      ['Description', 'Quantity', 'Rate', 'GST (%)', 'Amount', 'GST Amount', 'Total'],
      ...invoice.items.map((item: InvoiceItem) => [
        item.description,
        item.quantity,
        item.rate,
        item.gst,
        item.quantity * item.rate,
        ((item.quantity * item.rate * (item.gst || 0)) / 100).toFixed(2),
        (item.quantity * item.rate + (item.quantity * item.rate * (item.gst || 0)) / 100).toFixed(2),
      ]),
      [],
      ['Subtotal', getSubtotal().toFixed(2)],
      ['Total GST', getGST().toFixed(2)],
      ['Grand Total', getTotal().toFixed(2)],
      [],
      ['Notes', invoice.notes],
    ];
    const ws = XLSX.utils.aoa_to_sheet(wsData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Invoice');
    XLSX.writeFile(wb, 'invoice-generator-business.xlsx');
  };

  return (
    <div className="max-w-2xl mx-auto p-4 bg-white rounded-xl shadow-lg mt-6 mb-8">
      <h1 className="text-2xl font-bold mb-4 text-blue-700">Invoice Generator (Business)</h1>
      <div className="grid gap-4">
        <div className="flex flex-col md:flex-row gap-2">
          <label className="font-medium">Invoice Number</label>
          <input type="number" className="input" value={invoice.invoiceNumber} onChange={e => handleChange('invoiceNumber', Number(e.target.value))} />
        </div>
        <div className="flex flex-col md:flex-row gap-2">
          <label className="font-medium">Date</label>
          <input type="date" className="input" value={invoice.date} onChange={e => handleChange('date', e.target.value)} />
        </div>
        <div className="flex flex-col md:flex-row gap-2">
          <label className="font-medium">Client Name</label>
          <input type="text" className="input" value={invoice.clientName} onChange={e => handleChange('clientName', e.target.value)} />
        </div>
        <div className="flex flex-col md:flex-row gap-2">
          <label className="font-medium">Client Address</label>
          <input type="text" className="input" value={invoice.clientAddress} onChange={e => handleChange('clientAddress', e.target.value)} />
        </div>
        <div>
          <label className="font-medium">Invoice Items</label>
          <div className="space-y-2">
            {invoice.items.map((item: InvoiceItem, idx: number) => (
              <div key={idx} className="flex flex-wrap gap-2 items-center bg-blue-50 p-2 rounded">
                <input type="text" placeholder="Description" className="input w-32" value={item.description} onChange={e => handleItemChange(idx, 'description', e.target.value)} />
                <input type="number" placeholder="Qty" className="input w-16" value={item.quantity} min={1} onChange={e => handleItemChange(idx, 'quantity', Number(e.target.value))} />
                <input type="number" placeholder="Rate" className="input w-20" value={item.rate} min={0} onChange={e => handleItemChange(idx, 'rate', Number(e.target.value))} />
                <input type="number" placeholder="GST %" className="input w-16" value={item.gst} min={0} max={28} onChange={e => handleItemChange(idx, 'gst', Number(e.target.value))} />
                <button className="text-red-500 font-bold" onClick={() => removeItem(idx)} disabled={invoice.items.length === 1}>×</button>
              </div>
            ))}
            <button className="bg-blue-600 text-white px-4 py-1 rounded" onClick={addItem}>+ Add Item</button>
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-2">
          <label className="font-medium">Notes</label>
          <textarea className="input" value={invoice.notes} onChange={e => handleChange('notes', e.target.value)} />
        </div>
        <div className="bg-blue-100 p-4 rounded flex flex-col gap-2">
          <div>Subtotal: <span className="font-bold">₹{getSubtotal().toFixed(2)}</span></div>
          <div>Total GST: <span className="font-bold">₹{getGST().toFixed(2)}</span></div>
          <div>Grand Total: <span className="font-bold">₹{getTotal().toFixed(2)}</span></div>
        </div>
        <button className="bg-green-600 text-white px-6 py-2 rounded-lg font-bold text-lg mt-2" onClick={handleDownload}>Download Excel</button>
      </div>
    </div>
  );
};

export default InvoiceGeneratorBusiness; 
