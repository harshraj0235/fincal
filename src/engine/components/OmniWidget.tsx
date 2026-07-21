import React from 'react';
import { CalculatorConfig } from '../types';
import { useOmniEngine } from '../useOmniEngine';
import { Calculator, RotateCcw, CheckCircle2, PieChart as PieChartIcon } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

interface OmniWidgetProps {
  config: CalculatorConfig;
  engine: ReturnType<typeof useOmniEngine>;
}

export const OmniWidget: React.FC<OmniWidgetProps> = ({ config, engine }) => {
  const { state, updateVariable, updateUnit } = engine;

  // Group variables
  const groups = config.variables.reduce((acc, variable) => {
    const groupName = variable.group || 'Default';
    if (!acc[groupName]) acc[groupName] = [];
    acc[groupName].push(variable);
    return acc;
  }, {} as Record<string, typeof config.variables>);

  return (
    <div className="w-full max-w-3xl mx-auto bg-white dark:bg-[#1e2330] rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.4)] overflow-hidden border border-gray-100 dark:border-gray-800 transition-colors duration-200">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-800 to-slate-900 dark:from-indigo-900 dark:to-slate-900 p-6 sm:px-8 sm:py-7 flex items-center gap-4">
        <div className="p-3 bg-white/10 rounded-xl">
          <Calculator className="w-6 h-6 text-blue-400" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">{config.title}</h2>
          {config.description && <p className="mt-1 text-slate-400 text-sm font-medium">{config.description}</p>}
        </div>
      </div>

      {/* Body */}
      <div className="p-6 sm:p-8 space-y-8">
        {Object.entries(groups).map(([groupName, variables]) => (
          <div key={groupName} className="space-y-5">
            {groupName !== 'Default' && (
              <h3 className="text-sm font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-2">
                {groupName}
              </h3>
            )}
            
            <div className="space-y-4">
              {variables.map(variable => {
                const varState = state[variable.id];
                const isCalculated = !varState?.isUserProvided && varState?.value !== null && varState?.value !== '';
                
                return (
                  <div 
                    key={variable.id} 
                    className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl border transition-all duration-200 ${
                      isCalculated 
                        ? 'bg-blue-50/50 dark:bg-blue-900/10 border-blue-100 dark:border-blue-900/30' 
                        : 'bg-white dark:bg-[#1e2330] border-gray-100 dark:border-gray-800 hover:border-gray-200 dark:hover:border-gray-700'
                    }`}
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                         <label className="block text-[15px] font-semibold text-slate-800 dark:text-slate-200">
                           {variable.name}
                         </label>
                         {isCalculated && (
                            <span className="flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-400 text-[10px] font-bold uppercase tracking-wide">
                               <CheckCircle2 className="w-3 h-3" /> Result
                            </span>
                         )}
                      </div>
                      {variable.description && (
                        <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400 font-medium">{variable.description}</p>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-2 w-full sm:w-auto mt-2 sm:mt-0">
                      <input
                        type={variable.type === 'number' ? 'number' : 'text'}
                        value={varState?.value !== null ? varState.value : ''}
                        onChange={(e) => updateVariable(variable.id, e.target.value)}
                        className={`w-full sm:w-36 px-4 py-2.5 text-right font-semibold rounded-lg border focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-colors ${
                          isCalculated 
                            ? 'bg-white dark:bg-[#171a23] border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-400' 
                            : 'bg-slate-50 dark:bg-[#171a23] border-slate-200 dark:border-gray-700 text-slate-900 dark:text-white hover:bg-white dark:hover:bg-[#1a1d27]'
                        }`}
                        placeholder="0"
                      />
                      
                      {variable.units && variable.units.length > 0 ? (
                        <select
                          value={varState?.unit || ''}
                          onChange={(e) => updateUnit(variable.id, e.target.value)}
                          className="w-24 px-3 py-2.5 bg-slate-50 dark:bg-[#171a23] border border-slate-200 dark:border-gray-700 rounded-lg text-sm font-semibold text-slate-700 dark:text-slate-300 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-colors cursor-pointer hover:bg-white dark:hover:bg-[#1a1d27]"
                        >
                          {variable.units.map(unit => (
                            <option key={unit.id} value={unit.id}>{unit.name}</option>
                          ))}
                        </select>
                      ) : (
                        <div className="w-24" /> // Spacer for alignment
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
      
      {/* Visualizations / Charts */}
      {config.charts && config.charts.length > 0 && (
         <div className="px-6 pb-6 sm:px-8 sm:pb-8">
            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-[#171a23] border border-slate-200 dark:border-gray-800">
               <div className="flex items-center gap-2 mb-6">
                  <PieChartIcon className="w-5 h-5 text-indigo-500" />
                  <h3 className="text-base font-bold text-slate-800 dark:text-slate-200">
                     Visualizations
                  </h3>
               </div>
               
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {config.charts.map((chart, idx) => {
                     // Transform state data into chart data
                     const chartData = chart.dataPoints.map(dp => {
                        const val = state[dp.valueVariable]?.value;
                        return {
                           name: dp.label,
                           value: typeof val === 'number' && val > 0 && !isNaN(val) ? val : 0,
                           color: dp.color
                        };
                     });
                     
                     // Only show chart if there is data
                     const hasData = chartData.some(d => d.value > 0);
                     
                     return (
                        <div key={idx} className="flex flex-col items-center">
                           <h4 className="text-sm font-semibold text-slate-600 dark:text-slate-400 mb-4">{chart.title}</h4>
                           {hasData ? (
                              <div className="w-full h-64">
                                 <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                       <Pie
                                          data={chartData}
                                          cx="50%"
                                          cy="50%"
                                          innerRadius={chart.type === 'doughnut' ? 60 : 0}
                                          outerRadius={80}
                                          paddingAngle={chart.type === 'doughnut' ? 5 : 0}
                                          dataKey="value"
                                       >
                                          {chartData.map((entry, index) => (
                                             <Cell key={`cell-${index}`} fill={entry.color} />
                                          ))}
                                       </Pie>
                                       <Tooltip 
                                          formatter={(value: number) => new Intl.NumberFormat('en-IN', { maximumFractionDigits: 2 }).format(value)}
                                          contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                       />
                                       <Legend verticalAlign="bottom" height={36}/>
                                    </PieChart>
                                 </ResponsiveContainer>
                              </div>
                           ) : (
                              <div className="flex items-center justify-center w-full h-64 border-2 border-dashed border-slate-200 dark:border-gray-800 rounded-xl">
                                 <span className="text-sm text-slate-400">Enter values to see chart</span>
                              </div>
                           )}
                        </div>
                     );
                  })}
               </div>
            </div>
         </div>
      )}
      
      {/* Footer */}
      <div className="bg-slate-50 dark:bg-[#171a23] px-6 py-4 border-t border-gray-100 dark:border-gray-800 flex justify-between items-center">
         <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Fincal Omni Engine
         </span>
         <button 
            className="flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors rounded-lg hover:bg-slate-200 dark:hover:bg-gray-800"
            onClick={() => {
               config.variables.forEach(v => updateVariable(v.id, null));
            }}
         >
            <RotateCcw className="w-4 h-4" />
            Reset All
         </button>
      </div>
    </div>
  );
};
