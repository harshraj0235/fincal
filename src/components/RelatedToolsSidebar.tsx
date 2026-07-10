import React from 'react';
import { Link } from 'react-router-dom';
import { IndianRupee, ChevronRight } from 'lucide-react';
import { getCalculatorById } from '../data/calculatorData';

interface RelatedToolsSidebarProps {
    relatedIds: string[];
}

export const RelatedToolsSidebar: React.FC<RelatedToolsSidebarProps> = ({ relatedIds }) => {
    return (
        <div className="bg-white rounded-[2rem] p-8 border border-neutral-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)]">
            <h3 className="text-xl font-black text-neutral-900 mb-6 tracking-tight">Related Tools</h3>
            <div className="space-y-4">
                {relatedIds.slice(0, 4).map(id => {
                    const related = getCalculatorById(id);
                    if (!related) return null;
                    return (
                        <Link
                            key={id}
                            to={`/calculators/${id}`}
                            className="flex items-center group p-3 rounded-2xl hover:bg-blue-50/50 transition-all border border-transparent hover:border-blue-100"
                        >
                            <div className="w-10 h-10 rounded-xl bg-neutral-50 text-neutral-400 group-hover:bg-slate-900 group-hover:text-white flex items-center justify-center transition-all shadow-sm">
                                <IndianRupee className="w-5 h-5" />
                            </div>
                            <div className="ml-3 flex-1 min-w-0">
                                <div className="text-sm font-bold text-neutral-700 group-hover:text-neutral-900 transition-colors truncate">{related.name}</div>
                                <div className="text-[10px] font-black text-neutral-400 uppercase tracking-[0.15em] mt-0.5">{related.category}</div>
                            </div>
                            <ChevronRight className="w-4 h-4 text-neutral-300 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                        </Link>
                    );
                })}
            </div>
            <Link
                to="/calculators"
                className="flex items-center justify-center gap-2 mt-8 py-3.5 bg-neutral-50 hover:bg-neutral-100 rounded-2xl text-neutral-600 font-black text-sm transition-all active:scale-[0.98]"
            >
                View All Tools
                <ChevronRight className="w-4 h-4" />
            </Link>
        </div>
    );
};
