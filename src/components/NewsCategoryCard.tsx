import React from 'react';
import { Link } from 'react-router-dom';
import * as Icons from 'lucide-react';

interface NewsCategoryCardProps {
    slug: string;
    name: string;
    icon?: string;
    count: number;
    isSelected: boolean;
}

const NewsCategoryCard: React.FC<NewsCategoryCardProps> = ({
    slug,
    name,
    icon,
    count,
    isSelected
}) => {
    // Dynamically resolve icon if provided, fallback to LayoutGrid
    const IconComponent = icon && (Icons as any)[icon] ? (Icons as any)[icon] : Icons.LayoutGrid;

    return (
        <Link
            to={slug === 'all' ? '/news' : `/news?category=${slug}`}
            className={`flex-shrink-0 snap-start flex flex-col items-center justify-center p-4 rounded-2xl min-w-[120px] transition-all duration-300 border-2 ${isSelected
                    ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-200 scale-105'
                    : 'bg-white border-slate-100 text-slate-600 hover:border-blue-200 hover:bg-blue-50/30'
                }`}
        >
            <div className={`p-3 rounded-xl mb-3 ${isSelected ? 'bg-white/20' : 'bg-slate-50 text-blue-600'
                }`}>
                <IconComponent className="w-6 h-6" />
            </div>
            <span className="text-sm font-bold truncate w-full text-center">{name}</span>
            <span className={`text-[10px] font-black mt-1 px-2 py-0.5 rounded-full uppercase tracking-widest ${isSelected ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-400'
                }`}>
                {count} {count === 1 ? 'Post' : 'Posts'}
            </span>
        </Link>
    );
};

export default NewsCategoryCard;
