import React, { useState, useCallback } from 'react';
import { Plus, Edit, Trash2, Download, FileText, FileSpreadsheet, FileHtml } from 'lucide-react';

const initialRow = { item: '', type: 'Asset', amount: '' };

const BalanceSheet: React.FC = () => {
  const [rows, setRows] = useState([ { ...initialRow } ]);
  const [editingIdx, setEditingIdx] = useState<number | null>(null);
  const [formData, setFormData] = useState({ ...initialRow });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingIdx !== null) {
      const updated = [...rows];
      updated[editingIdx] = { ...formData };
      setRows(updated);
      setEditingIdx(null);
    } else {
      setRows([...rows, { ...formData }]);
    }
    setFormData({ ...initialRow });
  };

  const handleEdit = (idx: number) => {
    setEditingIdx(idx);
    setFormData({ ...rows[idx] });
  };

  const handleDelete = (idx: number) => {
    setRows(rows.filter((_, i) => i !== idx));
    if (editingIdx === idx) setEditingIdx(null);
  };

  // Excel download
  const handleExcel = useCallback(() => {
    if (typeof window.XLSX === 'undefined') {
      alert('Excel export not ready. Please ensure the XLSX library script is loaded.');
      return;
    }
    const ws = window.XLSX.utils.json_to_sheet(rows);
    const wb = window.XLSX.utils.book_new();
    window.XLSX.utils.book_append_sheet(wb, ws, 'BalanceSheet');
    window.XLSX.writeFile(wb, 'balance-sheet.xlsx');
  }, [rows]);

  // PDF download
  const handlePDF = useCallback(() => {
    if (typeof window.jsPDF === 'undefined') {
      alert('PDF export not ready. Please ensure the jsPDF library script is loaded.');
      return;
    }
    const doc = new window.jsPDF();
    doc.text('Balance Sheet', 10, 10);
    let y = 20;
    rows.forEach((row, idx) => {
      doc.text(`${idx+1}. ${row.item} | ${row.type} | ${row.amount}`, 10, y);
      y += 10;
    });
    doc.save('balance-sheet.pdf');
  }, [rows]);

  // HTML download
  const handleHTML = useCallback(() => {
    const html = `<!DOCTYPE html><html><head><title>Balance Sheet</title></head><body>${document.getElementById('balance-sheet-table')?.outerHTML}</body></html>`;
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'balance-sheet.html';
    a.click();
    URL.revokeObjectURL(url);
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-4 bg-white rounded-xl shadow-lg mt-6 mb-8">
      <h1 className="text-2xl font-bold mb-4 text-blue-700">Balance Sheet</h1>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-4">
        <input type="text" name="item" placeholder="Item" className="input" value={formData.item} onChange={handleChange} required />
        <select name="type" className="input" value={formData.type} onChange={handleChange}>
          <option value="Asset">Asset</option>
          <option value="Liability">Liability</option>
          <option value="Equity">Equity</option>
        </select>
        <input type="number" name="amount" placeholder="Amount" className="input" value={formData.amount} onChange={handleChange} required min={0} />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded col-span-1 md:col-span-3 mt-2 flex items-center gap-2 justify-center">
          {editingIdx !== null ? <Edit size={18} /> : <Plus size={18} />} {editingIdx !== null ? 'Update' : 'Add'}
        </button>
      </form>
      <div className="flex gap-2 mb-4">
        <button onClick={handleExcel} className="bg-green-600 text-white px-4 py-2 rounded flex items-center gap-2"><FileSpreadsheet size={18}/> Excel</button>
        <button onClick={handlePDF} className="bg-red-600 text-white px-4 py-2 rounded flex items-center gap-2"><FileText size={18}/> PDF</button>
        <button onClick={handleHTML} className="bg-yellow-500 text-white px-4 py-2 rounded flex items-center gap-2"><FileHtml size={18}/> HTML</button>
      </div>
      <div className="overflow-x-auto">
        <table id="balance-sheet-table" className="min-w-full border border-gray-200 rounded">
          <thead className="bg-blue-50">
            <tr>
              <th className="px-2 py-1">Item</th>
              <th className="px-2 py-1">Type</th>
              <th className="px-2 py-1">Amount</th>
              <th className="px-2 py-1">Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, idx) => (
              <tr key={idx} className={row.type === 'Asset' ? 'bg-green-50' : row.type === 'Liability' ? 'bg-red-50' : 'bg-blue-50'}>
                <td className="px-2 py-1">{row.item}</td>
                <td className="px-2 py-1">{row.type}</td>
                <td className="px-2 py-1">{row.amount}</td>
                <td className="px-2 py-1 flex gap-1">
                  <button onClick={() => handleEdit(idx)} className="text-blue-600 hover:underline"><Edit size={16}/></button>
                  <button onClick={() => handleDelete(idx)} className="text-red-600 hover:underline"><Trash2 size={16}/></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BalanceSheet; 