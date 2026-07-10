import React from 'react';
import { Share2, Bookmark, Heart } from 'lucide-react';

interface ArticleShareSidebarProps {
    title: string;
    description: string;
}

export const ArticleShareSidebar: React.FC<ArticleShareSidebarProps> = ({ title, description }) => {
    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title,
                text: description,
                url: window.location.href,
            }).catch(console.error);
        } else {
            // Fallback for browsers that don't support navigator.share
            const shareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(title + ' ' + window.location.href)}`;
            window.open(shareUrl, '_blank');
        }
    };

    return (
        <div className="bg-white rounded-[2rem] p-8 border border-neutral-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50/30 blur-3xl pointer-events-none group-hover:bg-blue-100/30 transition-colors duration-700" />

            <div className="relative z-10">
                <div className="flex items-center gap-2 mb-4">
                    <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
                    <h3 className="text-lg font-black text-neutral-900 tracking-tight">Loved this tool?</h3>
                </div>

                <p className="text-sm font-medium text-neutral-500 leading-relaxed mb-8">
                    Share it with family and friends to help them plan better.
                </p>

                <div className="flex flex-col gap-3">
                    <button
                        onClick={handleShare}
                        className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black hover:bg-black transition-all flex items-center justify-center gap-2 shadow-lg active:scale-[0.98]"
                    >
                        <Share2 className="w-5 h-5" />
                        Share Story
                    </button>

                    <button className="w-full py-4 bg-white border-2 border-neutral-100 text-neutral-900 rounded-2xl font-black hover:bg-neutral-50 transition-all flex items-center justify-center gap-2 active:scale-[0.98]">
                        <Bookmark className="w-5 h-5" />
                        Save for Later
                    </button>
                </div>

                <div className="mt-6 pt-6 border-t border-neutral-50">
                    <div className="flex items-center justify-center gap-4">
                        <button
                            onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, '_blank')}
                            className="w-10 h-10 rounded-xl bg-neutral-50 text-neutral-400 hover:text-[#1877F2] hover:bg-blue-50 flex items-center justify-center transition-all border border-transparent hover:border-blue-100"
                        >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
                        </button>
                        <button
                            onClick={() => window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(title)}`, '_blank')}
                            className="w-10 h-10 rounded-xl bg-neutral-50 text-neutral-400 hover:text-[#1DA1F2] hover:bg-sky-50 flex items-center justify-center transition-all border border-transparent hover:border-sky-100"
                        >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.84 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" /></svg>
                        </button>
                        <button
                            onClick={() => window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(title + ' ' + window.location.href)}`, '_blank')}
                            className="w-10 h-10 rounded-xl bg-neutral-50 text-neutral-400 hover:text-[#25D366] hover:bg-emerald-50 flex items-center justify-center transition-all border border-transparent hover:border-emerald-100"
                        >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.399-4.368 9.792-9.767 9.792" /></svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
