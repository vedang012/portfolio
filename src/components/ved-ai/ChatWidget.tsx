"use client";

import { Bot, X } from "lucide-react";
import { useEffect, useState } from "react";

import {
  Conversation,
  ConversationContent,
  ConversationEmptyState,
  ConversationScrollButton,
} from "@/components/ai-elements/conversation";
import {
  Message,
  MessageContent,
  MessageResponse,
} from "@/components/ai-elements/message";
import {
  PromptInput,
  type PromptInputMessage,
  PromptInputFooter,
  PromptInputSubmit,
  PromptInputTextarea,
} from "@/components/ai-elements/prompt-input";

const STORAGE_KEY = "vai-messages";

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  text: string;
}

function loadMessages(): ChatMessage[] {
  if (typeof window === "undefined") return [];
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (!saved) return [];
    return JSON.parse(saved) as ChatMessage[];
  } catch {
    return [];
  }
}

function saveMessages(messages: ChatMessage[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
}

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [status, setStatus] = useState<"ready" | "submitted">("ready");

  useEffect(() => {
    const saved = loadMessages();
    if (saved.length === 0) {
      saveMessages([
        {
          id: "welcome",
          role: "assistant",
          text: "Hey, I'm vAi — Vedang's portfolio assistant. Ask me anything about his skills, projects, or experience.",
        },
      ]);
      setMessages(loadMessages());
    } else {
      setMessages(saved);
    }
    setLoaded(true);
  }, []);

  const handleSend = async (message: PromptInputMessage) => {
    const text = message.text.trim();
    if (!text || status === "submitted") return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      text,
    };

    setStatus("submitted");
    const nextMessages = [...messages, userMsg];
    setMessages(nextMessages);

    // Simulate a brief thinking state for the interface demo.
    await new Promise((resolve) => setTimeout(resolve, 600));

    const reply: ChatMessage = {
      id: `vai-${Date.now()}`,
      role: "assistant",
      text: "vAi backend isn't wired up yet — this is just the interface preview.",
    };

    const finalMessages = [...nextMessages, reply];
    setMessages(finalMessages);
    saveMessages(finalMessages);
    setStatus("ready");
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label={isOpen ? "Close chat" : "Open chat with vAi"}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-primary font-mono text-sm font-bold text-primary-foreground shadow-lg transition-transform hover:scale-105 active:scale-95"
      >
        {isOpen ? <X className="h-5 w-5" /> : <span>vAi</span>}
      </button>

      {isOpen && loaded && (
        <div className="fixed bottom-24 right-4 z-50 flex h-[500px] w-[calc(100vw-2rem)] max-w-[360px] flex-col overflow-hidden rounded-xl border border-border bg-card shadow-2xl md:bottom-28 md:right-6">
          <div className="flex items-center justify-between border-b border-border bg-card px-4 py-3">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent-tech/20 font-mono text-xs font-bold text-accent-tech">
                vAi
              </div>
              <div>
                <p className="text-sm font-medium text-card-foreground">vAi</p>
                <p className="text-xs text-muted-foreground">Vedang&apos;s portfolio assistant</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Close chat"
              className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <Conversation className="flex-1">
            <ConversationContent>
              {messages.length === 0 ? (
                <ConversationEmptyState
                  icon={<Bot className="h-6 w-6" />}
                  title="No messages yet"
                  description="Ask vAi anything about Vedang's skills and projects."
                />
              ) : (
                messages.map((message) => (
                  <Message key={message.id} from={message.role}>
                    <MessageContent>
                      <MessageResponse>{message.text}</MessageResponse>
                    </MessageContent>
                  </Message>
                ))
              )}
            </ConversationContent>
            <ConversationScrollButton />
          </Conversation>

          <div className="border-t border-border bg-card p-3">
            <PromptInput onSubmit={handleSend}>
              <PromptInputTextarea
                placeholder="Ask about Vedang..."
                className="min-h-16"
              />
              <PromptInputFooter className="justify-end pt-2">
                <PromptInputSubmit
                  status={status}
                  disabled={status === "submitted"}
                  className="bg-primary text-primary-foreground hover:bg-primary/90"
                />
              </PromptInputFooter>
            </PromptInput>
          </div>
        </div>
      )}
    </>
  );
}
