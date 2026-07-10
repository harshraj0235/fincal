import React from 'react';
import { CityRates } from '../../services/marketApi';
import { ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';

interface MarketTableProps {
    data: CityRates;
    isSilver?: boolean;
}

export const MarketTable: React.FC<MarketTableProps> = ({ data, isSilver = false }) => {
    const renderChange = (change: number) => {
        if (change > 0) return <span className="flex items-center text-emerald-600 font-bold"><ArrowUpRight className="w-4 h-4 mr-0.5" /> ₹{change.toLocaleString('en-IN')}</span>;
        if (change < 0) return <span className="flex items-center text-rose-600 font-bold"><ArrowDownRight className="w-4 h-4 mr-0.5" /> ₹{Math.abs(change).toLocaleString('en-IN')}</span>;
        return <span className="flex items-center text-gray-400 font-bold"><Minus className="w-4 h-4 mr-0.5" /> ₹0.00</span>;
    };

    return (
        <div className="overflow-hidden rounded-2xl border border-gray-100 shadow-sm bg-white">
            <table className="w-full text-left">
                <thead className="bg-gray-50/80">
                    <tr>
                        <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Type / Purity</th>
                        <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Unit</th>
                        <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Today's Price</th>
                        <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Change</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                    {!isSilver ? (
                        <>
                            <tr className="hover:bg-amber-50/30 transition-colors">
                                <td className="px-6 py-4 font-bold text-gray-900">24K Gold (99.9% Pure)</td>
                                <td className="px-6 py-4 text-gray-500 font-medium">1 Gram</td>
                                <td className="px-6 py-4 font-extrabold text-amber-600 text-lg">₹{data.gold24k.price.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</td>
                                <td className="px-6 py-4">{renderChange(data.gold24k.change)}</td>
                            </tr>
                            <tr className="hover:bg-amber-50/30 transition-colors">
                                <td className="px-6 py-4 font-bold text-gray-900">22K Gold (91.6% Pure)</td>
                                <td className="px-6 py-4 text-gray-500 font-medium">1 Gram</td>
                                <td className="px-6 py-4 font-extrabold text-amber-600 text-lg">₹{data.gold22k.price.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</td>
                                <td className="px-6 py-4">{renderChange(data.gold22k.change)}</td>
                            </tr>
                            <tr className="hover:bg-amber-50/30 transition-colors">
                                <td className="px-6 py-4 font-bold text-gray-900">18K Gold (75.0% Pure)</td>
                                <td className="px-6 py-4 text-gray-500 font-medium">1 Gram</td>
                                <td className="px-6 py-4 font-extrabold text-amber-600 text-lg">₹{data.gold18k.price.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</td>
                                <td className="px-6 py-4">{renderChange(data.gold18k.change)}</td>
                            </tr>
                            <tr className="hover:bg-amber-50/30 transition-colors">
                                <td className="px-6 py-4 font-bold text-gray-900 font-bold">24K Gold (99.9% Pure)</td>
                                <td className="px-6 py-4 text-gray-500 font-medium">10 Gram</td>
                                <td className="px-6 py-4 font-extrabold text-amber-600 text-lg">₹{(data.gold24k.price * 10).toLocaleString('en-IN', { maximumFractionDigits: 2 })}</td>
                                <td className="px-6 py-4">{renderChange(data.gold24k.change * 10)}</td>
                            </tr>
                        </>
                    ) : (
                        <>
                            <tr className="hover:bg-blue-50/30 transition-colors">
                                <td className="px-6 py-4 font-bold text-gray-900">Silver (99.9% Pure)</td>
                                <td className="px-6 py-4 text-gray-500 font-medium">1 Gram</td>
                                <td className="px-6 py-4 font-extrabold text-blue-600 text-lg">₹{(data.silver.price / 1000).toLocaleString('en-IN', { maximumFractionDigits: 2 })}</td>
                                <td className="px-6 py-4">{renderChange(data.silver.change / 1000)}</td>
                            </tr>
                            <tr className="hover:bg-blue-50/30 transition-colors">
                                <td className="px-6 py-4 font-bold text-gray-900">Silver (99.9% Pure)</td>
                                <td className="px-6 py-4 text-gray-500 font-medium">100 Gram</td>
                                <td className="px-6 py-4 font-extrabold text-blue-600 text-lg">₹{(data.silver.price / 10).toLocaleString('en-IN', { maximumFractionDigits: 2 })}</td>
                                <td className="px-6 py-4">{renderChange(data.silver.change / 10)}</td>
                            </tr>
                            <tr className="hover:bg-blue-50/30 transition-colors">
                                <td className="px-6 py-4 font-bold text-gray-900 font-bold">Silver (99.9% Pure)</td>
                                <td className="px-6 py-4 text-gray-500 font-medium">1 Kilogram</td>
                                <td className="px-6 py-4 font-extrabold text-blue-600 text-lg">₹{data.silver.price.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</td>
                                <td className="px-6 py-4">{renderChange(data.silver.change)}</td>
                            </tr>
                        </>
                    )}
                </tbody>
            </table>
        </div>
    );
};
