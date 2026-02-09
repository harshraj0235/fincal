import React, { useState, useEffect } from 'react';
import { getChartJs } from '../lib/clientOnlyLibs';

interface LoanCalculatorChartsProps {
  pieChartData: {
    labels: string[];
    datasets: Array<{ data: number[]; backgroundColor: string[]; borderColor: string[]; borderWidth: number }>;
  };
  lineChartData: {
    labels: string[];
    datasets: Array<{ label: string; data: number[]; borderColor: string; backgroundColor: string; fill: boolean; tension: number }>;
  };
}

export const LoanCalculatorCharts: React.FC<LoanCalculatorChartsProps> = ({ pieChartData, lineChartData }) => {
  const [ChartLib, setChartLib] = useState<Awaited<ReturnType<typeof getChartJs>> | null>(null);

  useEffect(() => {
    getChartJs().then((lib) => {
      lib.ChartJS.register(
        lib.ArcElement,
        lib.Tooltip,
        lib.Legend,
        lib.CategoryScale,
        lib.LinearScale,
        lib.PointElement,
        lib.LineElement,
        lib.Title
      );
      setChartLib(lib);
    });
  }, []);

  if (!ChartLib) {
    return (
      <div className="grid md:grid-cols-2 gap-8 min-h-[200px] items-center justify-center text-gray-500">
        Loading charts...
      </div>
    );
  }

  const { Pie, Line } = ChartLib;

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <div>
        <h4 className="text-sm font-semibold text-gray-700 mb-3 text-center">Payment Breakdown</h4>
        <Pie
          data={pieChartData}
          options={{
            responsive: true,
            maintainAspectRatio: true,
            plugins: { legend: { position: 'bottom' } },
          }}
        />
      </div>
      <div>
        <h4 className="text-sm font-semibold text-gray-700 mb-3 text-center">Loan Repayment Progress</h4>
        <Line
          data={lineChartData}
          options={{
            responsive: true,
            maintainAspectRatio: true,
            plugins: { legend: { position: 'bottom' } },
            scales: {
              y: {
                beginAtZero: true,
                ticks: {
                  callback: (value: unknown) => '₹' + (Number(value) / 100000).toFixed(0) + 'L',
                },
              },
            },
          }}
        />
      </div>
    </div>
  );
};
