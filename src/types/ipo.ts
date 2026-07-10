export interface IpoFinancial {
    year: string;
    revenue: string;
    profit: string;
    assets: string;
}

export interface IpoSubscription {
    qib: number;
    nii: number;
    retail: number;
    total: number;
}

export interface IpoSwot {
    strengths: string[];
    weaknesses: string[];
}

export interface IpoDetails {
    id: string;
    name: string;
    slug: string;
    symbol: string;
    type: 'Mainboard' | 'SME';
    status: 'Open' | 'Upcoming' | 'Closed';
    companyDescription: string;
    aboutCompany: string[];
    priceBand: string;
    issueSize: string;
    lotSize: number;
    openDate: string;
    closeDate: string;
    allotmentDate: string;
    listingDate: string;
    expectedGmp: number;
    expectedGmpPercentage: number;
    subscriptionStatus: IpoSubscription;
    financials: IpoFinancial[];
    swotAnalysis: IpoSwot;
    sector: string;
    registrar: string;
    listingExchange: string;
    shareReservation?: {
        qib: string;
        nii: string;
        retail: string;
    };
    promoterHoldings?: {
        preIssue: string;
        postIssue: string;
    };
    objectsOfIssue?: string[];
    technicalMetrics?: {
        peRatio: string;
        eps: string;
        roce: string;
    };
    contentSections?: {
        title: string;
        content: string;
    }[];
    featuredImage?: string;
}

export interface IpoResponse {
    open: IpoDetails[];
    upcoming: IpoDetails[];
    closed: IpoDetails[];
    lastUpdated: string;
}
