import React, { useState } from 'react';
import { Download, Plus, FileSpreadsheet, ArrowRight, ArrowLeft, Settings, Star } from 'lucide-react';
import SEOHelmet from '../components/SEOHelmet';
import WhatsAppBanner from '../components/WhatsAppBanner';
import AstroFinanceButton from '../components/AstroFinanceButton';
// SheetJS for Excel export
import * as XLSX from 'xlsx';

const templates = [
  {
    name: 'Monthly Budget',
    fields: [
      { label: 'Date', type: 'date' },
      { label: 'Category', type: 'text' },
      { label: 'Description', type: 'text' },
      { label: 'Amount', type: 'number' },
    ],
  },
  {
    name: 'Invoice',
    fields: [
      { label: 'Item', type: 'text' },
      { label: 'Quantity', type: 'number' },
      { label: 'Unit Price', type: 'number' },
      { label: 'Total', type: 'formula', formula: 'Quantity*Unit Price' },
    ],
  },
  {
    name: 'Expense Tracker',
    fields: [
      { label: 'Date', type: 'date' },
      { label: 'Expense Type', type: 'text' },
      { label: 'Amount', type: 'number' },
      { label: 'Notes', type: 'text' },
    ],
  },
  {
    name: 'Attendance Sheet',
    fields: [
      { label: 'Date', type: 'date' },
      { label: 'Name', type: 'text' },
      { label: 'Present', type: 'text' },
    ],
  },
  {
    name: 'Inventory List',
    fields: [
      { label: 'Item Name', type: 'text' },
      { label: 'SKU', type: 'text' },
      { label: 'Quantity', type: 'number' },
      { label: 'Location', type: 'text' },
    ],
  },
  {
    name: 'Simple CRM',
    fields: [
      { label: 'Client Name', type: 'text' },
      { label: 'Contact', type: 'text' },
      { label: 'Status', type: 'text' },
      { label: 'Last Contacted', type: 'date' },
    ],
  },
  {
    name: 'Project Planner',
    fields: [
      { label: 'Task', type: 'text' },
      { label: 'Owner', type: 'text' },
      { label: 'Deadline', type: 'date' },
      { label: 'Status', type: 'text' },
    ],
  },
  {
    name: 'Custom',
    fields: [],
  },
];

const defaultField = { label: '', type: 'text' };

const fieldTypes = [
  { value: 'text', label: 'Text' },
  { value: 'number', label: 'Number' },
  { value: 'date', label: 'Date' },
  { value: 'formula', label: 'Formula' },
];

type Template = { name: string; fields: Field[] };
type Field = { label: string; type: string; formula?: string };

const ExcelToolBuilder: React.FC = () => {
  const [step, setStep] = useState(1);
  const [fields, setFields] = useState([...templates[0].fields]);
  const [rows, setRows] = useState<Array<Record<string, string | number>>>([{}]);
  const [newField, setNewField] = useState({ ...defaultField });
  const [formula, setFormula] = useState('');
  const [sheetName, setSheetName] = useState('MyExcelSheet');

  // SEO structured data
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "Excel Tool Builder - Create Custom Excel Sheets Online",
    "description": "Build your own Excel sheet online with a simple, step-by-step wizard. Add fields, formulas, and download your custom Excel file instantly.",
    "step": [
      { "@type": "HowToStep", "name": "Choose a template or start from scratch" },
      { "@type": "HowToStep", "name": "Add or remove fields and formulas" },
      { "@type": "HowToStep", "name": "Preview your sheet" },
      { "@type": "HowToStep", "name": "Download as Excel (.xlsx)" }
    ]
  };

  // Add new field
  const handleAddField = () => {
    if (!newField.label) return;
    setFields([...fields, { ...newField, formula: newField.type === 'formula' ? formula : undefined }]);
    setNewField({ ...defaultField });
    setFormula('');
  };

  // Remove field
  const handleRemoveField = (idx: number) => {
    setFields(fields.filter((_, i) => i !== idx));
  };

  // Handle template selection
  const handleTemplateSelect = (template: Template) => {
    setFields([...template.fields]);
    setStep(2);
  };

  // Add row for preview
  const handleAddRow = () => {
    setRows([...rows, {}]);
  };

  // Update row value
  const handleRowChange = (rowIdx: number, field: Field, value: string | number) => {
    const updatedRows = [...rows];
    updatedRows[rowIdx] = { ...updatedRows[rowIdx], [field.label]: value };
    setRows(updatedRows);
  };

  // Download Excel
  const handleDownload = () => {
    const wsData = [fields.map(f => f.label), ...rows.map(row => fields.map(f => row[f.label] || ''))];
    const ws = XLSX.utils.aoa_to_sheet(wsData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, sheetName);
    XLSX.writeFile(wb, `${sheetName}.xlsx`);
  };

  return (
    <>
      <WhatsAppBanner />
      <AstroFinanceButton />
      <SEOHelmet
        title="Excel Tool Builder - Create Custom Excel Sheets Online | FinanceGurus"
        description="Build your own Excel sheet online with a simple, step-by-step wizard. Add fields, formulas, and download your custom Excel file instantly. SEO optimized for Google 2025."
        keywords="excel tool builder, create excel sheet online, custom excel generator, no code excel builder, free excel template, download excel, financegurus"
        url="/excel-tool-builder"
        structuredData={structuredData}
        tags={["excel builder", "no code excel", "custom excel sheet", "excel generator"]}
      />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 py-8">
        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-6 md:p-10">
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-6 text-blue-800 flex items-center justify-center gap-2">
            <FileSpreadsheet className="w-8 h-8 text-blue-500" /> Excel Tool Builder
          </h1>
          <p className="text-center text-lg text-gray-600 mb-8">Anyone can create a custom Excel sheet in minutes. No coding required. SEO optimized, mobile-friendly, and easy to use for all ages!</p>

          {/* Onboarding Tooltip */}
          <div className="mb-6 bg-blue-50 border-l-4 border-blue-400 p-4 rounded flex items-center gap-3 animate-bounce" role="status" aria-live="polite">
            <svg className="w-6 h-6 text-blue-500 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path></svg>
            <span className="text-blue-900 font-medium">Tip: Add, reorder, and preview fields live. Download your custom Excel sheet instantly!</span>
          </div>

          {/* Stepper */}
          <div className="flex justify-center gap-2 mb-8">
            {[1,2,3,4].map(s => (
              <div key={s} className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${step === s ? 'bg-blue-600 text-white' : 'bg-blue-100 text-blue-600'}`}>{s}</div>
            ))}
          </div>

          {/* Step 1: Template Selection */}
          {step === 1 && (
            <div>
              <h2 className="text-xl font-semibold mb-4 text-blue-700">Choose a Template or Start from Scratch</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                {templates.map((template) => (
                  <button
                    key={template.name}
                    className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex flex-col items-center hover:bg-blue-100 focus:ring-2 focus:ring-blue-400"
                    onClick={() => handleTemplateSelect(template)}
                  >
                    <FileSpreadsheet className="w-8 h-8 mb-2 text-blue-600" />
                    <span className="font-medium text-blue-800">{template.name}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Add/Edit Fields */}
          {step === 2 && (
            <div>
              <h2 className="text-xl font-semibold mb-4 text-blue-700">Add or Edit Fields</h2>
              <div className="mb-4">
                <div className="flex flex-col md:flex-row gap-2 items-center">
                  <input
                    type="text"
                    placeholder="Field label (e.g. Amount)"
                    className="border px-3 py-2 rounded w-full md:w-1/3"
                    value={newField.label}
                    onChange={e => setNewField({ ...newField, label: e.target.value })}
                  />
                  <select
                    className="border px-3 py-2 rounded w-full md:w-1/4"
                    value={newField.type}
                    onChange={e => setNewField({ ...newField, type: e.target.value })}
                  >
                    {fieldTypes.map(ft => (
                      <option key={ft.value} value={ft.value}>{ft.label}</option>
                    ))}
                  </select>
                  {newField.type === 'formula' && (
                    <input
                      type="text"
                      placeholder="Formula (e.g. Quantity*Unit Price)"
                      className="border px-3 py-2 rounded w-full md:w-1/3"
                      value={formula}
                      onChange={e => setFormula(e.target.value)}
                    />
                  )}
                  {newField.type === 'formula' && formula && (
                    <div className="mt-2 text-sm text-blue-700 bg-blue-50 border-l-4 border-blue-300 p-2 rounded animate-fade-in">
                      <strong>Formula Preview:</strong> <span className="font-mono">{formula}</span>
                    </div>
                  )}
                  <button
                    className="bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-1 hover:bg-blue-700"
                    onClick={handleAddField}
                  >
                    <Plus className="w-4 h-4" /> Add Field
                  </button>
                </div>
              </div>
              <div className="mb-6">
                <h3 className="font-medium mb-2">Fields:</h3>
                <ul className="flex flex-wrap gap-2">
                  {fields.map((field, index) => (
                    <li key={field.label + '-' + index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full flex items-center gap-2">
                      {field.label} <span className="text-xs bg-blue-200 px-2 py-0.5 rounded">{field.type}</span>
                      {/* Up/Down buttons for ordering */}
                      <button onClick={() => index > 0 && setFields(fields => { const arr = [...fields]; [arr[index-1], arr[index]] = [arr[index], arr[index-1]]; return arr; })} className="ml-1 text-blue-500 hover:text-blue-700" aria-label="Move up">↑</button>
                      <button onClick={() => index < fields.length-1 && setFields(fields => { const arr = [...fields]; [arr[index+1], arr[index]] = [arr[index], arr[index+1]]; return arr; })} className="ml-1 text-blue-500 hover:text-blue-700" aria-label="Move down">↓</button>
                      <button onClick={() => handleRemoveField(index)} className="ml-1 text-red-500 hover:text-red-700" aria-label="Remove">&times;</button>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex justify-between">
                <button className="flex items-center gap-1 px-4 py-2 rounded bg-gray-100 hover:bg-gray-200" onClick={() => setStep(1)}><ArrowLeft className="w-4 h-4" /> Back</button>
                <button className="flex items-center gap-1 px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700" onClick={() => setStep(3)}>Next <ArrowRight className="w-4 h-4" /></button>
              </div>
            </div>
          )}

          {/* Step 3: Preview */}
          {step === 3 && (
            <div>
              <h2 className="text-xl font-semibold mb-4 text-blue-700">Preview Your Excel Sheet</h2>
              <div className="overflow-x-auto mb-4">
                <table className="min-w-full border rounded">
                  <thead>
                    <tr>
                      {fields.map((field) => (
                        <th key={field.label} className="border px-3 py-2 bg-blue-50 text-blue-800">{field.label}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((row, rowIdx) => (
                      <tr key={rowIdx}>
                        {fields.map((field) => (
                          <td key={field.label} className="border px-3 py-2">
                            <input
                              type={field.type === 'number' ? 'number' : field.type === 'date' ? 'date' : 'text'}
                              className="w-full px-2 py-1 rounded border"
                              value={row[field.label] || ''}
                              onChange={e => handleRowChange(rowIdx, field, e.target.value)}
                            />
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <button className="mb-4 px-4 py-2 bg-blue-100 text-blue-800 rounded hover:bg-blue-200" onClick={handleAddRow}>+ Add Row</button>
              <div className="flex justify-between">
                <button className="flex items-center gap-1 px-4 py-2 rounded bg-gray-100 hover:bg-gray-200" onClick={() => setStep(2)}><ArrowLeft className="w-4 h-4" /> Back</button>
                <button className="flex items-center gap-1 px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700" onClick={() => setStep(4)}>Next <ArrowRight className="w-4 h-4" /></button>
              </div>
            </div>
          )}

          {/* Step 4: Download */}
          {step === 4 && (
            <div>
              <h2 className="text-xl font-semibold mb-4 text-blue-700">Download Your Excel Sheet</h2>
              <div className="mb-4">
                <label className="block mb-2 font-medium">Sheet Name:</label>
                <input
                  type="text"
                  className="border px-3 py-2 rounded w-full"
                  value={sheetName}
                  onChange={e => setSheetName(e.target.value)}
                />
              </div>
              <button
                className="w-full bg-green-600 text-white px-6 py-3 rounded-lg font-bold text-lg flex items-center justify-center gap-2 hover:bg-green-700 mb-4"
                onClick={handleDownload}
              >
                <Download className="w-6 h-6" /> Download Excel (.xlsx)
              </button>
              <div className="flex justify-between">
                <button className="flex items-center gap-1 px-4 py-2 rounded bg-gray-100 hover:bg-gray-200" onClick={() => setStep(3)}><ArrowLeft className="w-4 h-4" /> Back</button>
                <button className="flex items-center gap-1 px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700" onClick={() => setStep(1)}>Start Over <Settings className="w-4 h-4" /></button>
              </div>
            </div>
          )}
        </div>
        <div className="absolute top-6 right-6 z-50">
          <button
            className="bg-gray-900 text-white px-4 py-2 rounded-full shadow hover:bg-gray-700 focus:ring-2 focus:ring-blue-400"
            aria-label="Toggle dark mode"
            onClick={() => {
              document.documentElement.classList.toggle('dark');
            }}
          >
            🌙 Dark Mode
          </button>
        </div>
        <a
          href="/excel-tools"
          className="fixed z-50 bottom-6 left-6 bg-gradient-to-br from-blue-400 to-green-400 text-white font-bold px-6 py-3 rounded-full shadow-2xl border-4 border-white hover:scale-105 transition-transform text-lg flex items-center gap-2 focus:ring-2 focus:ring-blue-300"
          aria-label="Back to Excel Tools"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7" /></svg>
          Back to Excel Tools
        </a>
      </div>
      <div className="max-w-3xl mx-auto mt-8 text-center text-gray-500 text-xs">
        <Star className="inline w-4 h-4 text-yellow-400 mr-1" /> Loved by users: Simple, fast, and free Excel sheet builder for everyone!
      </div>
    </>
  );
};

export default ExcelToolBuilder; 