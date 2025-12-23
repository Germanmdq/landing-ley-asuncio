
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const refineSectionCopy = async (sectionId: string, currentCopy: any, feedback: string) => {
  const prompt = `
    Refine the following landing page section copy based on the feedback.
    Section Type: ${sectionId}
    Current Copy: ${JSON.stringify(currentCopy)}
    Feedback: ${feedback}
    
    Maintain the high-converting framework principles:
    - Benefit-driven
    - Emphasize 'being' over 'wanting'
    - Remove friction (anxiety, doubt)
    - Tone: Empathetic, practical, urgent.
    
    Return the refined JSON object only.
  `;

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: prompt,
    config: {
      responseMimeType: "application/json",
    }
  });

  return JSON.parse(response.text);
};
