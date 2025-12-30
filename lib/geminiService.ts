import { researchTopicAction, ResearchResult } from '@/app/actions';

export type { ResearchResult };

export interface GeneratedImage {
    imageUrl: string;
    prompt: string;
}

export const researchTopic = async (
    topic: string,
    perspective: string,
    aesthetic: string,
    language: string
): Promise<ResearchResult> => {
    return await researchTopicAction(topic, perspective, aesthetic, language);
};

export const generateImage = async (prompt: string): Promise<GeneratedImage> => {
    // TODO: Integrate with real Image Generation API (e.g., Vertex AI Imagen, DALL-E 3)
    // For now, we return a high-quality placeholder or a random Unsplash image related to "technology" or "abstract"

    // Simulating API delay
    await new Promise(resolve => setTimeout(resolve, 3000));

    return {
        imageUrl: `https://source.unsplash.com/1600x900/?${encodeURIComponent('futuristic technology abstract')}`,
        prompt
    };
};
