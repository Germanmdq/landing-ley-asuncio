export interface LibraryItem {
    id: string;
    type: 'lecture' | 'book';
    title_es: string;
    title_en: string;
    year: string;
    duration?: string; // Only for lectures
    pages?: number; // Only for books
    difficulty: 'foundational' | 'intermediate' | 'advanced';
    main_themes: string[];
    author?: string;
}

// Keeping Lecture alias for backward compatibility if needed, but LibraryItem is preferred
export type Lecture = LibraryItem;

export interface Concept {
    concept: string;
    category: string;
    keywords: string[];
    explanation: string;
    quote_original: string;
    related_concepts: string[];
    difficulty_level: string;
}

export interface Technique {
    technique_id: string;
    name: string;
    name_es: string;
    when_to_use: string;
    difficulty: string;
    steps: string[];
    key_points: string[];
    common_mistakes: string[];
    neville_quote: string;
}

export interface Testimony {
    testimony_id: string;
    category: string;
    problem: string;
    technique_used: string;
    what_they_did: string;
    timeline: string;
    outcome: string;
    key_lesson: string;
    neville_commentary: string;
}

export interface DailyPlan {
    day: number;
    title: string;
    description: string;
    lectureId?: string;
    techniqueId?: string;
    completed: boolean;
}

export interface Message {
    id: string;
    role: 'user' | 'neville';
    content: string;
    timestamp: Date;
    isStreaming?: boolean;
}
