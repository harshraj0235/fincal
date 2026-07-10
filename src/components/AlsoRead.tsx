import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, ArrowRight } from 'lucide-react';

interface AlsoReadItem {
    title: string;
    link: string;
}

interface AlsoReadProps {
    items: AlsoReadItem[];
    title?: string;
}

export const AlsoRead: React.FC<AlsoReadProps> = ({ items, title = "Also Read" }) => {
    if (!items || items.length === 0) return null;

    return (
        <div className="my-10 bg-slate-50 border-l-4 border-blue-600 rounded-r-2xl p-6 shadow-sm group hover:shadow-md transition-all">
            <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
                    <BookOpen className="w-4 h-4 text-blue-600" />
                </div>
                <span className="text-xs font-black uppercase tracking-widest text-slate-400">
                    {title}
                </span>
            </div>
            <div className="space-y-4">
                {items.map((item, index) => (
                    <Link
                        key={index}
                        to={item.link}
                        className="flex items-center justify-between group/link transition-all"
                    >
                        <span className="text-lg font-black text-slate-800 group-hover/link:text-blue-600 leading-snug">
                            {item.title}
                        </span>
                        <ArrowRight className="w-5 h-5 text-slate-300 group-hover/link:text-blue-600 group-hover/link:translate-x-1 transition-all shrink-0 ml-4" />
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default AlsoRead;
