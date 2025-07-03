import React, { useState } from 'react';
import * as XLSX from 'xlsx';

interface BudgetRow {
  category: string;
  planned: number;
  actual: number;
}

const initialRow: BudgetRow = { category: '', planned: 0, actual: 0 };

const MonthlyBudgetPlanner: React.FC = () => {
  const [rows, setRows] = useState<BudgetRow[]>([{ ...initialRow }]);

  const handleRowChange = (idx: number, field: keyof BudgetRow, value: string | number) => {
    const updated = [...rows];
    updated[idx] = { ...updated[idx], [field]: value };
    setRows(updated);
  };

  const addRow = () => setRows([...rows, { ...initialRow }]);
  const removeRow = (idx: number) => setRows(rows.length > 1 ? rows.filter((_, i) => i !== idx) : rows);
  const getPlannedTotal = () => rows.reduce((sum, row) => sum + (row.planned || 0), 0);
  const getActualTotal = () => rows.reduce((sum, row) => sum + (row.actual || 0), 0);
  const getVariance = () => getPlannedTotal() - getActualTotal();

  const handleDownload = () => {
    const wsData = [
      ['Category', 'Planned', 'Actual', 'Variance'],
      ...rows.map(row => [row.category, row.planned, row.actual, (row.planned - row.actual).toFixed(2)]),
      [],
      ['Total', getPlannedTotal().toFixed(2), getActualTotal().toFixed(2), getVariance().toFixed(2)],
    ];
    const ws = XLSX.utils.aoa_to_sheet(wsData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Budget');
    XLSX.writeFile(wb, 'monthly-budget-planner.xlsx');
  };

  return (
    <div className="max-w-2xl mx-auto p-4 bg-white rounded-xl shadow-lg mt-6 mb-8">
      <h1 className="text-2xl font-bold mb-4 text-blue-700">Monthly Budget Planner</h1>
      <div className="grid gap-4">
        {rows.map((row, idx) => (
          <div key={idx} className="flex flex-wrap gap-2 items-center bg-blue-50 p-2 rounded">
            <input type="text" placeholder="Category" className="input w-32" value={row.category} onChange={e => handleRowChange(idx, 'category', e.target.value)} />
            <input type="number" placeholder="Planned" className="input w-20" value={row.planned} min={0} onChange={e => handleRowChange(idx, 'planned', Number(e.target.value))} />
            <input type="number" placeholder="Actual" className="input w-20" value={row.actual} min={0} onChange={e => handleRowChange(idx, 'actual', Number(e.target.value))} />
            <span className="font-bold text-green-700">₹{(row.planned - row.actual).toFixed(2)}</span>
            <button className="text-red-500 font-bold" onClick={() => removeRow(idx)} disabled={rows.length === 1}>×</button>
          </div>
        ))}
        <button className="bg-blue-600 text-white px-4 py-1 rounded" onClick={addRow}>+ Add Category</button>
        <div className="bg-blue-100 p-4 rounded flex flex-col gap-2">
          <div>Planned Total: <span className="font-bold">₹{getPlannedTotal().toFixed(2)}</span></div>
          <div>Actual Total: <span className="font-bold">₹{getActualTotal().toFixed(2)}</span></div>
          <div>Variance: <span className="font-bold">₹{getVariance().toFixed(2)}</span></div>
        </div>
        <button className="bg-green-600 text-white px-6 py-2 rounded-lg font-bold text-lg mt-2" onClick={handleDownload}>Download Excel</button>
      </div>
    </div>
  );
};

export default MonthlyBudgetPlanner; 