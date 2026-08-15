import { MCQ } from '../gkData';
import { bestGkQuestions } from './bestGkQuestions';
import { generalGkQuestions } from './generalGkQuestions';
import { indiaGkQuestions } from './indiaGkQuestions';
import { schoolGkQuestions } from './schoolGkQuestions';
import { competitiveGkQuestions } from './competitiveGkQuestions';
import { subjectWiseGkQuestions } from './subjectWiseGkQuestions';
import { languageGkQuestions } from './languageGkQuestions';
import { bankingQuestions } from './bankingQuestions';
import { economyQuestions } from './economyQuestions';

const allQuestions: Record<string, MCQ[]> = {
    'best-gk-question-in-hindi-best-gk-in-hindi': bestGkQuestions,
    'general-knowledge-in-hindi': generalGkQuestions,
    'national-symbols-gk-in-hindi': indiaGkQuestions.slice(0, 200),
    'india-gk-questions-in-hindi': indiaGkQuestions.slice(0, 200),
    'kids-gk-in-hindi': schoolGkQuestions.slice(0, 200),
    'class-6-gk-questions-in-hindi': schoolGkQuestions.slice(0, 200),
    'class-7-gk-questions-in-hindi': schoolGkQuestions.slice(40, 240),
    'class-8-gk-questions-in-hindi': schoolGkQuestions.slice(0, 200),
    'class-9-gk-questions-in-hindi': schoolGkQuestions.slice(0, 200),
    'class-10-gk-questions-in-hindi': schoolGkQuestions.slice(0, 200),
    'competitive-exam-gk-in-hindi': competitiveGkQuestions.slice(0, 200),
    'ssc-gk-questions-in-hindi': competitiveGkQuestions.slice(0, 200),
    'railway-gk-questions-in-hindi': competitiveGkQuestions.slice(0, 200),
    'banking-gk-questions-in-hindi': bankingQuestions,
    'upsc-gk-questions-in-hindi': competitiveGkQuestions.slice(0, 200),
    'indian-polity-gk-in-hindi': subjectWiseGkQuestions.polity,
    'indian-history-gk-in-hindi': subjectWiseGkQuestions.history,
    'indian-geography-gk-in-hindi': subjectWiseGkQuestions.geography,
    'science-gk-questions-in-hindi': subjectWiseGkQuestions.science,
    'economy-gk-in-hindi': economyQuestions,
    'space-gk-and-isro-in-hindi': subjectWiseGkQuestions.space,
    'art-and-culture-gk-in-hindi': subjectWiseGkQuestions.artCulture,
    'literature-gk-in-hindi': subjectWiseGkQuestions.literature,
    'world-gk-questions-in-hindi': subjectWiseGkQuestions.world,
    'hindi-grammar-gk': languageGkQuestions,
};

export const getQuestionsForTopic = (topicSlug: string): MCQ[] => {
    return allQuestions[topicSlug] || [];
};
