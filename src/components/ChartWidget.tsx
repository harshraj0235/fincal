import React from 'react';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell
} from 'recharts';
import { BarChart3 } from 'lucide-react';

export interface ChartDataPayload {
  title: string;
  type: 'bar' | 'line';
  data: { name: string; value: number }[];
  yAxisFormatter?: 'currency' | 'percent' | 'number';
}

interface ChartWidgetProps {
  payloadStr: string;
}

export const ChartWidget: React.FC<ChartWidgetProps> = ({ payloadStr }) => {
  let payload: ChartDataPayload | null = null;
  
  try {
    payload = JSON.parse(payloadStr);
  } catch (e) {
    console.error("Failed to parse chart payload:", e);
    return null;
  }

  if (!payload || !payload.data || payload.data.length === 0) return null;

  const formatYAxis = (value: number) => {
    if (payload?.yAxisFormatter === 'currency' || value > 1000) {
      if (value >= 10000000) return `₹${(value / 10000000).toFixed(1)}Cr`;
      if (value >= 100000) return `₹${(value / 100000).toFixed(1)}L`;
      if (value >= 1000) return `₹${(value / 1000).toFixed(1)}K`;
      return `₹${value}`;
    }
    if (payload?.yAxisFormatter === 'percent') return `${value}%`;
    return value.toString();
  };

  const colors = ['#3b82f6', '#14b8a6', '#8b5cf6', '#f59e0b', '#ef4444'];

  return (
    <div className="w-full my-6 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="px-5 py-4 border-b border-gray-50 flex items-center gap-2">
        <div className="p-1.5 bg-blue-50 text-blue-600 rounded-lg">
          <BarChart3 className="w-4 h-4" />
        </div>
        <h3 className="font-semibold text-gray-800 text-sm">{payload.title || 'Chart Data'}</h3>
      </div>
      
      <div className="p-5 w-full h-[250px] sm:h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          {payload.type === 'line' ? (
            <LineChart data={payload.data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
              <XAxis 
                dataKey="name" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 12, fill: '#6b7280' }} 
                dy={10} 
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 12, fill: '#6b7280' }}
                tickFormatter={formatYAxis}
                width={50}
              />
              <Tooltip 
                cursor={{ fill: '#f9fafb' }}
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)' }}
                formatter={(val: number) => [formatYAxis(val), 'Value']}
              />
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke="#3b82f6" 
                strokeWidth={3} 
                dot={{ r: 4, fill: '#3b82f6', strokeWidth: 2, stroke: '#fff' }} 
                activeDot={{ r: 6, strokeWidth: 0 }}
              />
            </LineChart>
          ) : (
            <BarChart data={payload.data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
              <XAxis 
                dataKey="name" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 12, fill: '#6b7280' }} 
                dy={10} 
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 12, fill: '#6b7280' }}
                tickFormatter={formatYAxis}
                width={50}
              />
              <Tooltip 
                cursor={{ fill: '#f9fafb' }}
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)' }}
                formatter={(val: number) => [formatYAxis(val), 'Value']}
              />
              <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                {payload.data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                ))}
              </Bar>
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ChartWidget;
