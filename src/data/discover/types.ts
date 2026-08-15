export interface DiscoverArticleSection {
    type: 'h2' | 'h3' | 'p' | 'ul' | 'image' | 'callout' | 'quiz';
    content: string;
    alt?: string;
}
export interface DiscoverEntity {
    name: string;
    url: string;
}

export interface DiscoverArticle {
    id: string;
    slug: string;
    title: string;
    seoTitle?: string;
    snippet: string;
    coverImage: string;
    author: string;
    date: string;
    publishedAt?: string;
    category?: string;
    tags?: string[];
    sections: DiscoverArticleSection[];
    entities?: DiscoverEntity[];
}
