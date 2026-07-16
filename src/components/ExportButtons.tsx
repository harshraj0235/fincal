import React from 'react';
import { Download } from 'lucide-react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { formatCurrency } from '../utils/calculatorUtils';

interface ExportButtonsProps {
  data: any[];
  filename: string;
  title: string;
  columns: { header: string; dataKey: string; isCurrency?: boolean }[];
}

export const ExportButtons: React.FC<ExportButtonsProps> = ({ data, filename, title, columns }) => {

  const handleExportPDF = () => {
    const doc = new jsPDF();
    
    // Add Title
    doc.setFontSize(18);
    doc.text(title, 14, 22);
    
    // Add Date
    doc.setFontSize(11);
    doc.setTextColor(100);
    doc.text(`Generated on: ${new Date().toLocaleDateString('en-IN')}`, 14, 30);

    // Prepare Table Data
    const tableBody = data.map(row => {
      return columns.map(col => {
        const val = row[col.dataKey];
        if (col.isCurrency && typeof val === 'number') {
          return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(val);
        }
        return val;
      });
    });

    autoTable(doc, {
      head: [columns.map(col => col.header)],
      body: tableBody,
      startY: 35,
      theme: 'grid',
      headStyles: { fillColor: [37, 99, 235], textColor: 255 }, // blue-600
      alternateRowStyles: { fillColor: [248, 250, 252] }, // slate-50
      styles: { fontSize: 10, cellPadding: 4 },
    });

    doc.save(`${filename}.pdf`);
  };

  const handleExportExcel = () => {
    // Format data for Excel
    const excelData = data.map(row => {
      const newRow: any = {};
      columns.forEach(col => {
        newRow[col.header] = row[col.dataKey];
      });
      return newRow;
    });

    const worksheet = XLSX.utils.json_to_sheet(excelData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Schedule');
    
    // Auto-size columns slightly
    const wscols = columns.map(() => ({ wch: 15 }));
    worksheet['!cols'] = wscols;

    XLSX.writeFile(workbook, `${filename}.xlsx`);
  };

  return (
    <div className="flex flex-wrap items-center gap-3 mt-4 mb-6">
      <span className="text-sm text-gray-600 font-medium">Export Schedule:</span>
      <button 
        onClick={handleExportPDF}
        className="inline-flex items-center gap-2 px-4 py-2 bg-red-50 text-red-700 border border-red-200 rounded-lg hover:bg-red-100 transition-colors text-sm font-semibold"
      >
        <Download className="w-4 h-4" />
        PDF Report
      </button>
      <button 
        onClick={handleExportExcel}
        className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-lg hover:bg-emerald-100 transition-colors text-sm font-semibold"
      >
        <Download className="w-4 h-4" />
        Excel Data
      </button>
    </div>
  );
};
