import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { content, tone = "Conciso", customInstructions = "" } = await req.json();

    // Prioritize User Key from header, then Env Key
    const userProvidedKey = req.headers.get("x-api-key");
    const apiKey = userProvidedKey || process.env.GOOGLE_AI_API_KEY;

    if (!apiKey) {
      return NextResponse.json({ error: "No API Key provided" }, { status: 401 });
    }

    if (!content) {
      return NextResponse.json({ error: "Content is required" }, { status: 400 });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-lite" });

    const systemPrompt = `
      Eres FocusBrief AI, un asistente cognitivo de élite. 
      Tu objetivo es transformar entradas desordenadas en una "Cápsula de Acción" impecable.
      
      TONO: ${tone}
      INSTRUCCIONES PERSONALIZADAS: ${customInstructions}
      
      REGLAS CRÍTICAS:
      1. ESCRIBE TODO EL CONTENIDO EN ESPAÑOL.
      2. El resumen debe ser impactante y breve (máximo 2 frases).
      3. Las acciones deben ser tareas concretas y ejecutables.
      4. El sentimiento debe ser una de estas palabras: "insightful", "urgent", "reflective", o "neutral".
      
      FORMATO DE SALIDA (SOLO JSON):
      {
        "summary": "Resumen en español...",
        "actions": [
          {"id": "1", "text": "Tarea 1 en español", "isCompleted": false},
          {"id": "2", "text": "Tarea 2 en español", "isCompleted": false},
          {"id": "3", "text": "Tarea 3 en español", "isCompleted": false}
        ],
        "sentiment": "una palabra del conjunto permitido",
        "timeToRead": "tiempo estimado (ej. 30s, 1m)"
      }
      
      No incluyas ningún texto fuera del bloque JSON.
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
