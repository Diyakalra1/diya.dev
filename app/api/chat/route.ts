import { NextResponse } from "next/server";

import { ai } from "@/lib/gemini";
import { portfolioContext } from "@/data/portfolio-context";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const message =
      typeof body.message === "string"
        ? body.message.trim()
        : "";

    const history: ChatMessage[] = Array.isArray(body.history)
      ? body.history.slice(-8)
      : [];

    if (!message) {
      return NextResponse.json(
        {
          error: "Message is required",
        },
        {
          status: 400,
        }
      );
    }

    if (message.length > 1000) {
      return NextResponse.json(
        {
          error: "Message is too long",
        },
        {
          status: 400,
        }
      );
    }

    const conversationHistory = history
      .filter(
        (item) =>
          item &&
          typeof item.content === "string" &&
          (item.role === "user" ||
            item.role === "assistant")
      )
      .map(
        (item) =>
          `${item.role === "user" ? "Visitor" : "Diya AI"}: ${
            item.content
          }`
      )
      .join("\n");

    const prompt = `
${portfolioContext}

================================
RECENT CONVERSATION
================================

${conversationHistory || "No previous conversation."}

================================
CURRENT VISITOR QUESTION
================================

${message}

Answer the current visitor question as Diya's portfolio assistant.
`;

    const response = await ai.models.generateContent({
      model: "gemini-3.1-flash-lite-preview",
      contents: prompt,
    });

    const reply =
      response.text?.trim() ||
      "I don't have that information about Diya yet.";

    return NextResponse.json({
      reply,
    });
  } catch (error) {
    console.error("Portfolio chat error:", error);

    return NextResponse.json(
      {
        error:
          "Diya AI is temporarily unavailable. Please try again.",
      },
      {
        status: 500,
      }
    );
  }
}