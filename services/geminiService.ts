
import { GoogleGenAI } from "@google/genai";

// Helper for summarizing email content using Gemini
export const summarizeEmail = async (content: string): Promise<string> => {
  try {
    // Initializing ai instance with apiKey from process.env.API_KEY
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Summarize the following email content concisely, highlighting the main action item or key info: \n\n${content}`,
    });

    // The text property directly returns the string output from GenerateContentResponse
    return response.text || "Could not generate summary.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Error generating summary.";
  }
};

// Helper for generating new blog posts about privacy and security
export const generateNewBlogPost = async (topic: string = "digital privacy and disposable emails"): Promise<{title: string, excerpt: string, content: string}> => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Generate a short blog post title, a 1-sentence excerpt, and a 2-paragraph body about '${topic}'. Format the output clearly.`,
    });

    const text = response.text || "";
    const lines = text.split('\n').filter(l => l.trim().length > 0);
    
    return {
      title: lines[0]?.replace('Title: ', '') || 'Privacy Insights',
      excerpt: lines[1]?.replace('Excerpt: ', '') || 'Learn about your digital footprint.',
      content: lines.slice(2).join('\n\n')
    };
  } catch (error) {
    console.error("Gemini Error:", error);
    throw error;
  }
};

// Fix: Added missing export for generateMonetizationTips as required by MonetizationSection component
export const generateMonetizationTips = async (): Promise<string> => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: "Generate a detailed business strategy for a temporary email service, focusing on monetization methods like ads, premium tiers, and API access. Provide the answer in a few paragraphs.",
    });

    return response.text || "Could not generate monetization tips.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Error generating monetization tips.";
  }
};
