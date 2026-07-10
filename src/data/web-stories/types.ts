export interface WebStoryPage {
    id: string;
    image: string;
    heading: string;
    text: string;
}

export interface WebStory {
    id: string;
    slug: string;
    title: string;
    coverImage: string;
    publisherLogo: string;
    publisherName: string;
    pages: WebStoryPage[];
}
