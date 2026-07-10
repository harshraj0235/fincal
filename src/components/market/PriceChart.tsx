import React from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { HistoricalRate } from '../../services/marketApi';

interface PriceChartProps {
    data: HistoricalRate[];
    color?: string;
    title?: string;
}

export const PriceChart: React.FC<PriceChartProps> = ({ data, color = '#facc15', title }) => {
    return (
        <div className="w-full bg-white rounded-2xl p-6 border border-amber-100 shadow-sm">
            {title && <h3 className="text-lg font-bold text-gray-800 mb-4">{title}</h3>}
            <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                        <defs>
                            <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor={color} stopOpacity={0.3} />
                                <stop offset="95%" stopColor={color} stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                        <XAxis
                            dataKey="date"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fontSize: 12, fill: '#9ca3af' }}
                            dy={10}
                        />
                        <YAxis
                            hide
                            domain={['dataMin - 100', 'dataMax + 100']}
                        />
                        <Tooltip
                            contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                            formatter={(value: number) => [`₹${value.toLocaleString('en-IN')}`, 'Price']}
                        />
                        <Area
                            type="monotone"
                            dataKey="price"
                            stroke={color}
                            strokeWidth={3}
                            fillOpacity={1}
                            fill="url(#colorPrice)"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
            <div className="mt-4 flex justify-between text-xs text-gray-400">
                <span>Last 10 Days</span>
                <span>Values in INR (₹)</span>
            </div>
        </div>
    );
};
