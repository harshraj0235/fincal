export interface DiscoverArticleSection {
    type: 'h2' | 'h3' | 'p' | 'ul' | 'image' | 'callout' | 'quiz';
    content: string;
    alt?: string;
}

export interface DiscoverArticle {
    id: string;
    slug: string;
    title: string;
    snippet: string;
    coverImage: string;
    author: string;
    date: string;
    category?: string;
    sections: DiscoverArticleSection[];
}
