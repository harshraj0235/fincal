import React from "react";

export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  category: string;
  date: string;
  slug?: string;
}

interface NewsListProps {
  news: NewsItem[];
  onNewsClick?: (slug: string) => void;
}

const NewsList: React.FC<NewsListProps> = ({ news, onNewsClick }) => {
  if (news.length === 0) {
    return <div className="text-gray-500 text-center py-8">कोई समाचार उपलब्ध नहीं है।</div>;
  }
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {news.map(item => {
        const clickable = !!onNewsClick && !!item.slug;
        return (
          <div
            key={item.id}
            className={`bg-white rounded-xl shadow p-5 flex flex-col justify-between hover:shadow-lg transition ${clickable ? "cursor-pointer hover:bg-green-50" : ""}`}
            onClick={clickable ? () => onNewsClick!(item.slug!) : undefined}
            tabIndex={clickable ? 0 : -1}
            role={clickable ? "button" : undefined}
            aria-label={clickable ? `${item.title} - और पढ़ें` : undefined}
          >
            <div>
              <span className="inline-block bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full mb-2">{item.category}</span>
              <h3 className="text-xl font-bold text-green-800 mb-2">{item.title}</h3>
              <p className="text-gray-700 mb-3">{item.summary}</p>
            </div>
            <div className="text-right text-xs text-gray-400">{item.date}</div>
          </div>
        );
      })}
    </div>
  );
};

export default NewsList; 