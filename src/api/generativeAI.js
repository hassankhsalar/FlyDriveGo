import { GoogleGenerativeAI } from "@google/generative-ai";
const VITE_GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
async function generateAIContent(prompt) {
  const genAI = new GoogleGenerativeAI(VITE_GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

  try {
    const request = {
      contents: [
        {
          parts: [{ text: prompt }],
        },
      ],
    };

    const result = await model.generateContent(request);

    if (
      result &&
      result.response &&
      result.response.candidates &&
      result.response.candidates[0] &&
      result.response.candidates[0].content &&
      result.response.candidates[0].content.parts &&
      result.response.candidates[0].content.parts[0]
    ) {
      return result.response.candidates[0].content.parts[0].text;
    } else {
      throw new Error("Unexpected API response structure");
    }
  } catch (error) {
    console.error("Error generating content:", error);
    throw error;
  }
}

export { generateAIContent };
