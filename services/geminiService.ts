
import { GoogleGenAI } from "@google/genai";

export class GeminiService {
  private ai: GoogleGenAI;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  }

  async generateProductDescription(productName: string, category: string): Promise<string> {
    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Escreva uma descrição curta, vendedora e profissional para um produto de supermercado chamado "${productName}" na categoria "${category}". Máximo de 20 palavras.`,
        config: {
          temperature: 0.7,
        }
      });
      return response.text || "Descrição não disponível.";
    } catch (error) {
      console.error("Error generating description:", error);
      return "Um produto essencial para sua casa.";
    }
  }
}

export const geminiService = new GeminiService();
