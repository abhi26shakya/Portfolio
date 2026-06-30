"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Sparkles, Bot, SendHorizonal } from "lucide-react";
import { personalInfo, research, skills, projects } from "@/data/profile";

interface Message {
  sender: "user" | "bot";
  text: string;
  timestamp: Date;
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputVal, setInputVal] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);
  const feedRef = useRef<HTMLDivElement>(null);

  // Initialize with welcome message
  useEffect(() => {
    setMessages([
      {
        sender: "bot",
        text: `Hi there! I'm Abhishek's AI Assistant. 🌟 Ask me about my research, projects, skills, or leave a direct message for me!`,
        timestamp: new Date(),
      },
    ]);
  }, []);

  // Auto scroll to bottom
  useEffect(() => {
    if (feedRef.current) {
      feedRef.current.scrollTop = feedRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleOpenToggle = () => {
    setIsOpen(!isOpen);
    setHasUnread(false);
  };

  const saveMessageToLocal = (msg: string) => {
    try {
      const existing = localStorage.getItem("portfolio_visitor_messages");
      const messagesArray = existing ? JSON.parse(existing) : [];
      messagesArray.push({
        text: msg,
        timestamp: new Date().toISOString(),
      });
      localStorage.setItem("portfolio_visitor_messages", JSON.stringify(messagesArray));
    } catch (e) {
      console.error("Local storage error:", e);
    }
  };

  const generateBotReply = (userMsg: string): string => {
    const text = userMsg.toLowerCase();

    if (text.includes("research") || text.includes("connectome") || text.includes("brain") || text.includes("fractional")) {
      return `Abhishek is conducting research on the <strong>${research.title}</strong> in collaboration with <strong>${research.collaborators.join(" & ")}</strong> at USC and Transilvania University of Brasov. He is focusing on predictively mapping brain age using connectomes and brain microstructural features.`;
    }

    if (text.includes("skill") || text.includes("programming") || text.includes("language") || text.includes("code") || text.includes("tech") || text.includes("java") || text.includes("python")) {
      return `Abhishek's technical toolkit includes:
      <br/>• <strong>Languages:</strong> ${skills.Programming.join(", ")}
      <br/>• <strong>AI / ML:</strong> ${skills["AI / ML"].join(", ")}
      <br/>• <strong>Simulation:</strong> ${skills.Simulation.join(", ")}
      <br/>• <strong>Hardware:</strong> ${skills.Hardware.join(", ")}`;
    }

    if (text.includes("project") || text.includes("design") || text.includes("esim") || text.includes("admission") || text.includes("churn")) {
      const topProjects = projects.slice(0, 3).map(p => `<strong>${p.title}</strong>: ${p.description}`).join("<br/><br/>");
      return `Here are some of Abhishek's top projects:<br/><br/>${topProjects}`;
    }

    if (text.includes("contact") || text.includes("email") || text.includes("phone") || text.includes("linkedin") || text.includes("github") || text.includes("touch") || text.includes("connect")) {
      return `You can connect with Abhishek directly through:
      <br/>• <strong>Email:</strong> <a href="mailto:${personalInfo.email}" class="text-accent hover:underline">${personalInfo.email}</a>
      <br/>• <strong>LinkedIn:</strong> <a href="${personalInfo.linkedin}" target="_blank" class="text-accent hover:underline">abhishek-shakya</a>
      <br/>• <strong>GitHub:</strong> <a href="${personalInfo.github}" target="_blank" class="text-accent hover:underline">abhi26shakya</a>`;
    }

    // Default contact submission handler
    saveMessageToLocal(userMsg);
    return `Thank you for the message! 📝 I have saved your message to local session storage. Abhishek is currently busy at MMMUT research lab, but you can also drop a line directly at <a href="mailto:${personalInfo.email}" class="text-accent hover:underline">${personalInfo.email}</a> or connect via LinkedIn!`;
  };

  const handleSend = (textToSend: string) => {
    if (!textToSend.trim()) return;

    // Add user message
    const userMessage: Message = {
      sender: "user",
      text: textToSend,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInputVal("");
    setIsTyping(true);

    // Simulate bot typing delay
    setTimeout(() => {
      const botReplyText = generateBotReply(textToSend);
      const botMessage: Message = {
        sender: "bot",
        text: botReplyText,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 1200);
  };

  const quickPrompts = [
    { label: "Brain Research 🧠", query: "Tell me about your Connectome research" },
    { label: "Technical Skills 💻", query: "What programming languages and AI/ML skills do you have?" },
    { label: "Core Projects 🚀", query: "Show me your main projects" },
    { label: "Direct Contact 📧", query: "How can I contact or get in touch with you?" },
  ];

  return (
    <>
      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-6 z-50 select-none">
        <button
          onClick={handleOpenToggle}
          className="relative flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-tr from-accent2 to-accent text-white shadow-[0_0_20px_rgba(139,92,246,0.4)] hover:shadow-[0_0_30px_rgba(56,189,248,0.6)] border border-white/20 transition-all duration-300 transform hover:scale-105 active:scale-95"
        >
          {isOpen ? (
            <X className="w-6 h-6 transition-transform duration-300" />
          ) : (
            <MessageSquare className="w-6 h-6 transition-transform duration-300" />
          )}

          {/* Pulsing Unread Notification dot */}
          {hasUnread && !isOpen && (
            <span className="absolute top-0 right-0 flex h-3.5 w-3.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border-2 border-slate-950"></span>
            </span>
          )}
        </button>
      </div>

      {/* Expandable Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed bottom-24 right-6 w-[360px] sm:w-[400px] h-[520px] rounded-2xl z-50 overflow-hidden flex flex-col glass border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.5)] bg-slate-950/85 backdrop-blur-md"
          >
            {/* Header */}
            <div className="p-4 bg-gradient-to-r from-accent2/20 to-accent/20 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative flex items-center justify-center w-9 h-9 rounded-full bg-accent2/20 border border-accent2/30">
                  <Bot className="w-5 h-5 text-accent" />
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border border-slate-950"></span>
                </div>
                <div>
                  <h4 className="font-mono text-sm font-semibold text-textPrimary tracking-wide">
                    Abhishek's Assistant
                  </h4>
                  <p className="text-[10px] text-textSecondary uppercase tracking-widest flex items-center gap-1">
                    <Sparkles className="w-2.5 h-2.5 text-accent animate-pulse" /> Virtual Agent
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg text-white/50 hover:text-white hover:bg-white/5 transition-colors duration-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Chat Feed */}
            <div
              ref={feedRef}
              className="flex-1 p-4 overflow-y-auto space-y-4 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent"
            >
              {messages.map((m, idx) => (
                <div
                  key={idx}
                  className={`flex ${
                    m.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm ${
                      m.sender === "user"
                        ? "bg-accent2/20 border border-accent2/30 text-white rounded-tr-none"
                        : "bg-white/5 border border-white/5 text-textPrimary/90 rounded-tl-none"
                    }`}
                  >
                    <p
                      className="leading-relaxed whitespace-pre-line"
                      dangerouslySetInnerHTML={{ __html: m.text }}
                    />
                    <span className="block text-[9px] text-white/30 text-right mt-1.5 font-mono">
                      {m.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white/5 border border-white/5 rounded-2xl rounded-tl-none px-4 py-3 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-accent animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-2 h-2 rounded-full bg-accent animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-2 h-2 rounded-full bg-accent animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              )}
            </div>

            {/* Quick Prompts Panel */}
            {messages.length === 1 && !isTyping && (
              <div className="px-4 py-2.5 bg-white/5 border-t border-b border-white/5 flex flex-wrap gap-2">
                {quickPrompts.map((p, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSend(p.query)}
                    className="text-[10px] font-mono text-white/70 hover:text-white bg-white/5 hover:bg-accent/10 border border-white/10 hover:border-accent/30 px-2.5 py-1.5 rounded-full transition-all duration-300"
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            )}

            {/* Input Panel */}
            <div className="p-4 bg-slate-950 border-t border-white/10">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend(inputVal);
                }}
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  placeholder="Ask a question or leave a message..."
                  className="flex-1 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 focus:border-accent focus:bg-white/5 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none transition-all duration-300"
                />
                <button
                  type="submit"
                  disabled={!inputVal.trim() || isTyping}
                  className="flex items-center justify-center w-10 h-10 rounded-xl bg-accent2 hover:bg-accent text-white disabled:opacity-50 disabled:hover:bg-accent2 transition-all duration-300 shadow-[0_0_12px_rgba(139,92,246,0.3)] disabled:shadow-none"
                >
                  <SendHorizonal className="w-5 h-5" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
