import { GoogleGenerativeAI } from "@google/generative-ai";
import { create } from "zustand";

interface Message {
  sender: string;
  text: string;
}

interface ApiState {
  messages: Message[];
  input: string;
  loading: boolean;
  setInput: (input: string) => void;
  sendMessage: () => void;
  fetchGeminiResponse: (userMessage: string) => Promise<void>;
}

export const useApiStore = create<ApiState>((set, get) => ({
  messages: [],
  input: "",
  loading: false,

  setInput: (input: string) => set({ input }),

  // Async fetch operation
  fetchGeminiResponse: async (userMessage: string) => {
    set({ loading: true });
    try {
      const genAI = new GoogleGenerativeAI(
        import.meta.env.VITE_GEMINI_AI_API_KEY
      );
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const prompt = userMessage;
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = await response.text();

      set((state) => ({
        messages: [...state.messages, { sender: "ai", text }],
        loading: false,
      }));
    } catch (error) {
      console.error("Error fetching AI response:", error);
      set((state) => ({
        messages: [
          ...state.messages,
          { sender: "ai", text: "Error: Could not reach the AI service." },
        ],
        loading: false,
      }));
    }
  },

  sendMessage: () => {
    const { input, fetchGeminiResponse, messages } = get();
    if (!input.trim()) return;

    set({ messages: [...messages, { sender: "user", text: input }] });

    fetchGeminiResponse(input);

    set({ input: "" });
  },
}));
