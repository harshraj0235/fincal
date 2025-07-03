import React, { useState, ChangeEvent } from 'react';
import * as XLSX from 'xlsx'; // SheetJS for Excel export

interface Employee {
  name: string;
  present: number;
  paidLeave: number;
  absent: number;
  salaryPerDay: number;
}

const initialEmployees: Employee[] = [
  { name: '', present: 0, paidLeave: 0, absent: 0, salaryPerDay: 0 },
];

const AttendanceSalarySheet: React.FC = () => {
  const [month, setMonth] = useState<string>('');
  const [totalDays, setTotalDays] = useState<number>(30);
  const [employees, setEmployees] = useState<Employee[]>(initialEmployees);
  const [paidLeaveAllowed, setPaidLeaveAllowed] = useState<number>(2);

  const handleEmployeeChange = (idx: number, field: keyof Employee, value: string | number) => {
    const updated = [...employees];
    updated[idx] = { ...updated[idx], [field]: value };
    setEmployees(updated);
  };

  const addEmployee = () => {
    setEmployees([...employees, { name: '', present: 0, paidLeave: 0, absent: 0, salaryPerDay: 0 }]);
  };

  const removeEmployee = (idx: number) => {
    setEmployees(employees.filter((_, i: number) => i !== idx));
  };

  const getSalary = (emp: Employee) => {
    const paidDays = emp.present + Math.min(emp.paidLeave, paidLeaveAllowed);
    return paidDays * emp.salaryPerDay;
  };

  const handleDownload = () => {
    const wsData = [
      ['Month', month],
      ['Total Days', totalDays],
      ['Paid Leave Allowed', paidLeaveAllowed],
      [],
      ['Employee Name', 'Present', 'Paid Leave', 'Absent', 'Salary/Day', 'Total Salary'],
      ...employees.map((emp: Employee) => [
        emp.name,
        emp.present,
        emp.paidLeave,
        emp.absent,
        emp.salaryPerDay,
        getSalary(emp).toFixed(2),
      ]),
    ];
    const ws = XLSX.utils.aoa_to_sheet(wsData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'AttendanceSalary');
    XLSX.writeFile(wb, 'attendance-salary-sheet.xlsx');
  };

  return (
    <div className="max-w-2xl mx-auto p-4 bg-white rounded-xl shadow-lg mt-6 mb-8">
      <h1 className="text-2xl font-bold mb-4 text-blue-700">Employee Attendance and Salary Sheet</h1>
      <div className="grid gap-4">
        <div className="flex flex-col md:flex-row gap-2">
          <label className="font-medium">Month</label>
          <input type="text" className="input" placeholder="e.g. June 2024" value={month} onChange={e => setMonth(e.target.value)} />
        </div>
        <div className="flex flex-col md:flex-row gap-2">
          <label className="font-medium">Total Days in Month</label>
          <input type="number" className="input" value={totalDays} min={1} max={31} onChange={e => setTotalDays(Number(e.target.value))} />
        </div>
        <div className="flex flex-col md:flex-row gap-2">
          <label className="font-medium">Paid Leave Allowed</label>
          <input type="number" className="input" value={paidLeaveAllowed} min={0} max={10} onChange={e => setPaidLeaveAllowed(Number(e.target.value))} />
        </div>
        <div>
          <label className="font-medium">Employees</label>
          <div className="space-y-2">
            {employees.map((emp: Employee, idx: number) => (
              <div key={idx} className="flex flex-wrap gap-2 items-center bg-blue-50 p-2 rounded">
                <input type="text" placeholder="Name" className="input w-32" value={emp.name} onChange={e => handleEmployeeChange(idx, 'name', e.target.value)} />
                <input type="number" placeholder="Present" className="input w-16" value={emp.present} min={0} max={totalDays} onChange={e => handleEmployeeChange(idx, 'present', Number(e.target.value))} />
                <input type="number" placeholder="Paid Leave" className="input w-16" value={emp.paidLeave} min={0} max={10} onChange={e => handleEmployeeChange(idx, 'paidLeave', Number(e.target.value))} />
                <input type="number" placeholder="Absent" className="input w-16" value={emp.absent} min={0} max={totalDays} onChange={e => handleEmployeeChange(idx, 'absent', Number(e.target.value))} />
                <input type="number" placeholder="Salary/Day" className="input w-20" value={emp.salaryPerDay} min={0} onChange={e => handleEmployeeChange(idx, 'salaryPerDay', Number(e.target.value))} />
                <span className="font-bold text-green-700">₹{getSalary(emp).toFixed(2)}</span>
                <button className="text-red-500 font-bold" onClick={() => removeEmployee(idx)} disabled={employees.length === 1}>×</button>
              </div>
            ))}
            <button className="bg-blue-600 text-white px-4 py-1 rounded" onClick={addEmployee}>+ Add Employee</button>
          </div>
        </div>
        <button className="bg-green-600 text-white px-6 py-2 rounded-lg font-bold text-lg mt-2" onClick={handleDownload}>Download Excel</button>
      </div>
    </div>
  );
};

export default AttendanceSalarySheet; 