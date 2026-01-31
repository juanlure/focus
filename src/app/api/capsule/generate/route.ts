import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY || "");

export async function POST(req: Request) {
    try {
        const { content, tone = "Concise", customInstructions = "" } = await req.json();

        if (!content) {
            return NextResponse.json({ error: "Content is required" }, { status: 400 });
        }

        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const systemPrompt = `
      You are FocusBrief AI, an elite cognitive assistant. 
      Your goal is to transform messy input into a clean "Action Capsule".
      
      TONE: ${tone}
      CUSTOM INSTRUCTIONS: ${customInstructions}
      
      OUTPUT FORMAT (JSON ONLY):
      {
        "summary": "One or two impactful sentences maximum.",
        "actions": [
          {"id": "1", "text": "Actionable task 1", "isCompleted": false},
          {"id": "2", "text": "Actionable task 2", "isCompleted": false},
          {"id": "3", "text": "Actionable task 3", "isCompleted": false}
        ],
        "sentiment": "one word: insightful, urgent, reflective, or neutral",
        "timeToRead": "estimated reading time (e.g. 30s, 1m)"
      }
      
      Do not include any text outside the JSON block.
    `;

        const result = await model.generateContent([systemPrompt, content]);
        const response = await result.response;
        const text = response.text();

        // Clean up the response from any markdown code blocks
        const cleanJson = text.replace(/```json|```/gi, "").trim();
        const data = JSON.parse(cleanJson);

        return NextResponse.json(data);
    } catch (error) {
        console.error("AI Generation Error:", error);
        return NextResponse.json({ error: "Failed to generate capsule" }, { status: 500 });
    }
}
