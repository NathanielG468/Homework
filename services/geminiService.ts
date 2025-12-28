
import { GoogleGenAI, Type } from "@google/genai";
import { Course } from "../types";

const API_KEY = process.env.API_KEY || '';

export class GeminiService {
  private ai: GoogleGenAI;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: API_KEY });
  }

  async generateCourse(topic: string): Promise<Course> {
    const response = await this.ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Generate a detailed professional course syllabus for the topic: "${topic}". 
      Make it feel like a high-quality Coursera course.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            instructor: { type: Type.STRING },
            description: { type: Type.STRING },
            category: { type: Type.STRING },
            level: { type: Type.STRING, enum: ['Beginner', 'Intermediate', 'Advanced'] },
            modules: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  title: { type: Type.STRING },
                  lessons: {
                    type: Type.ARRAY,
                    items: {
                      type: Type.OBJECT,
                      properties: {
                        title: { type: Type.STRING },
                        duration: { type: Type.STRING },
                        content: { type: Type.STRING, description: "A brief summary of what will be taught in this lesson" }
                      },
                      required: ["title", "duration"]
                    }
                  }
                },
                required: ["title", "lessons"]
              }
            }
          },
          required: ["title", "instructor", "description", "category", "level", "modules"]
        }
      }
    });

    const data = JSON.parse(response.text);
    return {
      ...data,
      id: `ai-${Date.now()}`,
      image: `https://picsum.photos/seed/${encodeURIComponent(topic)}/800/450`,
      rating: 5.0,
      students: 1,
      isAIGenerated: true
    };
  }

  async getTutorAdvice(courseTitle: string, userQuestion: string, context?: string): Promise<string> {
    const response = await this.ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `You are an expert AI tutor for the course "${courseTitle}". 
      Current lesson context: ${context || 'General course discussion'}.
      
      User asks: ${userQuestion}
      
      Provide a helpful, encouraging, and clear explanation.`,
    });
    return response.text;
  }
}

export const geminiService = new GeminiService();
