"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUp, Sparkles, X } from "lucide-react";

type PortfolioChatProps = {
  open: boolean;
  onClose: () => void;
};

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

const initialMessage: ChatMessage = {
  role: "assistant",
  content:
    "Hi! I'm Diya's AI assistant. Ask me about her projects, technical experience, achievements, or problem-solving journey.",
};

export default function PortfolioChat({
  open,
  onClose,
}: PortfolioChatProps) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    initialMessage,
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, isLoading]);

  async function sendMessage() {
    const trimmedMessage = message.trim();

    if (!trimmedMessage || isLoading) {
      return;
    }

    const userMessage: ChatMessage = {
      role: "user",
      content: trimmedMessage,
    };

    const previousMessages = messages;

    setMessages((currentMessages) => [
      ...currentMessages,
      userMessage,
    ]);

    setMessage("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          message: trimmedMessage,

          history: previousMessages.slice(-8),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "Unable to get an AI response"
        );
      }

      const assistantMessage: ChatMessage = {
        role: "assistant",
        content: data.reply,
      };

      setMessages((currentMessages) => [
        ...currentMessages,
        assistantMessage,
      ]);
    } catch (error) {
      console.error("Chat error:", error);

      const errorMessage: ChatMessage = {
        role: "assistant",
        content:
          "I'm having trouble responding right now. Please try again in a moment.",
      };

      setMessages((currentMessages) => [
        ...currentMessages,
        errorMessage,
      ]);
    } finally {
      setIsLoading(false);
    }
  }

  function handleKeyDown(
    event: React.KeyboardEvent<HTMLInputElement>
  ) {
    if (event.key === "Enter") {
      event.preventDefault();
      sendMessage();
    }
  }

  if (!open) {
    return null;
  }

  return (
    <div
      className="
        fixed
        bottom-6
        right-6
        z-[100]
        flex
        h-[520px]
        w-[390px]
        flex-col
        overflow-hidden
        rounded-[28px]
        border
        border-neutral-200
        bg-white
        shadow-[0_25px_80px_rgba(0,0,0,0.18)]
      "
    >
      {/* CHAT HEADER */}

      <div className="flex items-center justify-between border-b border-neutral-200 px-6 py-5">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-black text-white">
            <Sparkles className="h-4 w-4" />
          </div>

          <div>
            <p className="font-semibold text-black">
              Ask Diya AI
            </p>

            <p className="text-xs text-neutral-500">
              Portfolio assistant
            </p>
          </div>
        </div>

        <button
          onClick={onClose}
          aria-label="Close chat"
          className="
            flex
            h-9
            w-9
            items-center
            justify-center
            rounded-full
            transition-colors
            hover:bg-neutral-100
          "
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* CHAT MESSAGES */}

      <div className="flex-1 overflow-y-auto px-6 py-6">
        <div className="space-y-4">
          {messages.map((chatMessage, index) => {
            const isUser = chatMessage.role === "user";

            return (
              <div
                key={index}
                className={`flex ${
                  isUser
                    ? "justify-end"
                    : "justify-start"
                }`}
              >
                <div
                  className={`
                    max-w-[85%]
                    px-4
                    py-3
                    text-sm
                    leading-6
                    ${
                      isUser
                        ? `
                          rounded-2xl
                          rounded-tr-md
                          bg-black
                          text-white
                        `
                        : `
                          rounded-2xl
                          rounded-tl-md
                          bg-neutral-100
                          text-neutral-700
                        `
                    }
                  `}
                >
                  {chatMessage.content}
                </div>
              </div>
            );
          })}

          {/* AI THINKING STATE */}

          {isLoading && (
            <div className="flex justify-start">
              <div
                className="
                  flex
                  items-center
                  gap-1
                  rounded-2xl
                  rounded-tl-md
                  bg-neutral-100
                  px-4
                  py-4
                "
              >
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-neutral-400 [animation-delay:-0.3s]" />

                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-neutral-400 [animation-delay:-0.15s]" />

                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-neutral-400" />
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* CHAT INPUT */}

      <div className="border-t border-neutral-200 p-4">
        <div
          className="
            flex
            items-center
            gap-3
            rounded-2xl
            border
            border-neutral-200
            px-4
            py-2
            transition-colors
            focus-within:border-black
          "
        >
          <input
            type="text"
            value={message}
            onChange={(event) =>
              setMessage(event.target.value)
            }
            onKeyDown={handleKeyDown}
            placeholder="Ask something..."
            disabled={isLoading}
            className="
              flex-1
              bg-transparent
              py-2
              text-sm
              outline-none
              placeholder:text-neutral-400
              disabled:cursor-not-allowed
            "
          />

          <button
            onClick={sendMessage}
            disabled={
              isLoading || message.trim().length === 0
            }
            aria-label="Send message"
            className="
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-full
              bg-black
              text-white
              transition-all
              hover:scale-105
              disabled:cursor-not-allowed
              disabled:opacity-40
              disabled:hover:scale-100
            "
          >
            <ArrowUp className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}