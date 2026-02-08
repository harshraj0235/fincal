import React, { useState, useEffect } from 'react';
import { getRecharts } from '../lib/clientOnlyLibs';

interface AmortizationData {
  principal: number;
  interest: number;
}

interface AmortizationChartProps {
  data: AmortizationData[];
}

export const AmortizationChart: React.FC<AmortizationChartProps> = ({ data }) => {
  const [Recharts, setRecharts] = useState<typeof import('recharts') | null>(null);

  useEffect(() => {
    getRecharts().then(setRecharts);
  }, []);

  const chartData = data.slice(0, 12).map((item, index) => ({
    month: `Month ${index + 1}`,
    principal: Math.round(item.principal),
    interest: Math.round(item.interest),
  }));

  if (!Recharts) {
    return (
      <div className="w-full h-64 flex items-center justify-center bg-gray-50 rounded">
        <div className="text-gray-500 text-sm">Loading chart...</div>
      </div>
    );
  }

  const { BarChart: RBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } = Recharts;

  return (
    <div className="w-full h-64">
      <h4 className="text-sm font-medium text-gray-700 mb-2">Monthly Payment Breakdown (First 12 Months)</h4>
      <ResponsiveContainer width="100%" height="100%">
        <RBarChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip 
            formatter={(value: number) => [`₹${value.toLocaleString()}`, '']}
            labelFormatter={(label: string) => label}
          />
          <Legend />
          <Bar dataKey="principal" fill="#3b82f6" name="Principal" />
          <Bar dataKey="interest" fill="#ef4444" name="Interest" />
        </RBarChart>
      </ResponsiveContainer>
    </div>
  );
}; 