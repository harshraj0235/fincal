import React, { useState } from 'react';
import * as XLSX from 'xlsx';

interface ExpenseRow {
  date: string;
  category: string;
  description: string;
  amount: number;
}

const initialRow: ExpenseRow = { date: '', category: '', description: '', amount: 0 };

const SimpleDailyExpenseTracker: React.FC = () => {
  const [rows, setRows] = useState<ExpenseRow[]>([{ ...initialRow }]);

  const handleRowChange = (idx: number, field: keyof ExpenseRow, value: string | number) => {
    const updated = [...rows];
    updated[idx] = { ...updated[idx], [field]: value };
    setRows(updated);
  };

  const addRow = () => setRows([...rows, { ...initialRow }]);
  const removeRow = (idx: number) => setRows(rows.length > 1 ? rows.filter((_, i) => i !== idx) : rows);
  const getTotal = () => rows.reduce((sum, row) => sum + (row.amount || 0), 0);

  const handleDownload = () => {
    const wsData = [
      ['Date', 'Category', 'Description', 'Amount'],
      ...rows.map(row => [row.date, row.category, row.description, row.amount]),
      [],
      ['Total', '', '', getTotal().toFixed(2)],
    ];
    const ws = XLSX.utils.aoa_to_sheet(wsData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Expenses');
    XLSX.writeFile(wb, 'daily-expense-tracker.xlsx');
  };

  return (
    <div className="max-w-2xl mx-auto p-4 bg-white rounded-xl shadow-lg mt-6 mb-8">
      <h1 className="text-2xl font-bold mb-4 text-blue-700">Simple Daily Expense Tracker</h1>
      <div className="grid gap-4">
        {rows.map((row, idx) => (
          <div key={idx} className="flex flex-wrap gap-2 items-center bg-blue-50 p-2 rounded">
            <input type="date" className="input w-28" value={row.date} onChange={e => handleRowChange(idx, 'date', e.target.value)} />
            <input type="text" placeholder="Category" className="input w-24" value={row.category} onChange={e => handleRowChange(idx, 'category', e.target.value)} />
            <input type="text" placeholder="Description" className="input w-32" value={row.description} onChange={e => handleRowChange(idx, 'description', e.target.value)} />
            <input type="number" placeholder="Amount" className="input w-20" value={row.amount} min={0} onChange={e => handleRowChange(idx, 'amount', Number(e.target.value))} />
            <button className="text-red-500 font-bold" onClick={() => removeRow(idx)} disabled={rows.length === 1}>×</button>
          </div>
        ))}
        <button className="bg-blue-600 text-white px-4 py-1 rounded" onClick={addRow}>+ Add Expense</button>
        <div className="bg-blue-100 p-4 rounded flex flex-col gap-2">
          <div>Total: <span className="font-bold">₹{getTotal().toFixed(2)}</span></div>
        </div>
        <button className="bg-green-600 text-white px-6 py-2 rounded-lg font-bold text-lg mt-2" onClick={handleDownload}>Download Excel</button>
      </div>
    </div>
  );
};

export default SimpleDailyExpenseTracker; 