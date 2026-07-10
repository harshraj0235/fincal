import React from 'react';
import { CheckCircle, Calendar } from 'lucide-react';

interface ArticleExpertReviewProps {
    reviewer: {
        name: string;
        role: string;
        bio?: string;
        image?: string;
    };
    reviewedDate: string;
}

export const ArticleExpertReview: React.FC<ArticleExpertReviewProps> = ({ reviewer, reviewedDate }) => {
    return (
        <div className="bg-white rounded-3xl p-8 border border-neutral-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-300">
            <div className="flex items-center gap-2 mb-6">
                <div className="flex -space-x-1">
                    <CheckCircle className="w-4 h-4 text-emerald-500 fill-emerald-50" />
                </div>
                <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">Accuracy Verified</span>
            </div>

            <div className="flex items-start gap-4 mb-5">
                <div className="relative flex-shrink-0">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-neutral-50 to-neutral-100 border border-neutral-100 flex items-center justify-center text-2xl font-black text-neutral-400 overflow-hidden shadow-inner">
                        {reviewer.image ? (
                            <img src={reviewer.image} alt={reviewer.name} className="w-full h-full object-cover" />
                        ) : (
                            reviewer.name.charAt(0)
                        )}
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full border-2 border-white flex items-center justify-center">
                        <CheckCircle className="w-3 h-3 text-white" />
                    </div>
                </div>
                <div>
                    <h4 className="font-black text-neutral-900 leading-none mb-1.5">{reviewer.name}</h4>
                    <p className="text-[11px] font-bold text-neutral-400 uppercase tracking-widest">{reviewer.role}</p>
                </div>
            </div>

            <p className="text-sm text-neutral-600 leading-relaxed italic mb-6">
                "{reviewer.bio || 'Financial expert with years of experience.'}"
            </p>

            <div className="pt-5 border-t border-neutral-50 flex items-center justify-between text-[10px] font-black text-neutral-400 uppercase tracking-widest">
                <div className="flex items-center gap-1.5">
                    <Calendar className="w-3 h-3" />
                    Last Reviewed: {reviewedDate}
                </div>
            </div>
        </div>
    );
};
