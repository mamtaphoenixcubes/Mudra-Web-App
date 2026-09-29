"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../../context/ThemeContext";

// ─── Config ─────────────────────────────────────────────────────────────────
const AGENT = {
  name: "Meera",
  role: "Support",
  avatar: "🧘‍♀️",
};

const QUICK_REPLIES = [
  "I have a billing question",
  "Help with my session",
  "Report a bug",
];

const AUTO_REPLIES = [
  "Thanks for reaching out — I'm looking into that for you now.",
  "Got it. Could you tell me a bit more about what you're experiencing?",
  "I've noted that down. Someone from our team will follow up shortly if needed.",
];

function timeNow() {
  return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

// ─── Breathing Ring ─────────────────────────────────────────────────────────
function BreathingRing({ textColor }) {
  return (
    <motion.span
      className="absolute inset-0 rounded-full border motion-reduce:animate-none"
      style={{
        borderColor: textColor + "40",
      }}
      animate={{
        scale: [0.85, 1.35, 0.85],
        opacity: [0.55, 0, 0.55],
      }}
      transition={{
        duration: 3.6,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      aria-hidden="true"
    />
  );
}

// ─── Chat Bubble ────────────────────────────────────────────────────────────
function Bubble({ msg, textColor, index }) {
  const isUser = msg.from === "user";
  
  const bubbleVariants = {
    hidden: { opacity: 0, y: 15, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.3,
        delay: index * 0.05,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <motion.div 
      className={`flex ${isUser ? "justify-end" : "justify-start"} px-1`}
      variants={bubbleVariants}
      initial="hidden"
      animate="visible"
    >
      <div className={`flex items-end gap-2 max-w-[80%] ${isUser ? "flex-row-reverse" : ""}`}>
        {!isUser && (
          <motion.span 
            className="w-7 h-7 rounded-full flex items-center justify-center text-sm flex-shrink-0 ring-1" 
            style={{
              backgroundColor: "#EFE7DA",
              ringColor: "#2F4A3F/10",
            }}
            whileHover={{
              scale: 1.1,
              rotate: 5,
              transition: { duration: 0.2 }
            }}
          >
            {AGENT.avatar}
          </motion.span>
        )}
        <div>
          {msg.attachment && (
            <motion.div
              className={`mb-1 flex items-center gap-2 px-3 py-2 rounded-2xl text-xs border ${
                isUser
                  ? "bg-[#EFE0D5] border-[#DEC7B4] text-[#8A4A2C]"
                  : "bg-[#F3F0E9] border-[#E4DECE] text-[#5C574C]"
              }`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48" />
              </svg>
              <span className="truncate max-w-[140px]">{msg.attachment}</span>
            </motion.div>
          )}
          {msg.text && (
            <motion.div
              className={`px-4 py-2.5 leading-relaxed shadow-sm ${
                isUser
                  ? "rounded-[18px] rounded-br-[6px] text-[#FBF7EF]"
                  : "rounded-[18px] rounded-bl-[6px] border border-[#E9E3D6]"
              }`}
              style={{
                backgroundColor: isUser ? textColor : "#F3F0E9",
                color: isUser ? "#FBF7EF" : "#3A362E",
                fontSize: "13.5px",
              }}
              whileHover={{
                scale: 1.02,
                transition: { duration: 0.2 }
              }}
            >
              {msg.text}
            </motion.div>
          )}
          <p className={`text-[10px] text-[#A39D8E] mt-1 tracking-wide ${isUser ? "text-right" : "text-left"}`}>
            {msg.time}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Typing Indicator ───────────────────────────────────────────────────────
function TypingIndicator({ textColor }) {
  return (
    <motion.div 
      className="flex items-end gap-2 px-1"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <span className="w-7 h-7 rounded-full bg-[#EFE7DA] flex items-center justify-center text-sm flex-shrink-0 ring-1 ring-[#2F4A3F]/10">
        {AGENT.avatar}
      </span>
      <div className="px-4 py-3 rounded-[18px] rounded-bl-[6px] bg-[#F3F0E9] border border-[#E9E3D6] flex items-center gap-1">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="w-1.5 h-1.5 rounded-full"
            style={{
              backgroundColor: textColor + "80",
            }}
            animate={{
              y: [0, -6, 0],
            }}
            transition={{
              duration: 0.6,
              repeat: Infinity,
              delay: i * 0.15,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </motion.div>
  );
}

// ─── Live Support Chat ──────────────────────────────────────────────────────
export function LiveSupportChat() {
  const { dark, textColor } = useTheme();
  const [open, setOpen] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [messages, setMessages] = useState([
    {
      from: "agent",
      text: `Hi, I'm ${AGENT.name} from support. How can I help with your practice today?`,
      time: timeNow(),
    },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [unread, setUnread] = useState(0);
  const [attachment, setAttachment] = useState(null);

  const scrollRef = useRef(null);
  const fileInputRef = useRef(null);
  const replyIndex = useRef(0);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, typing, open, minimized]);

  function pushMessage(msg) {
    setMessages((prev) => [...prev, msg]);
  }

  function simulateAgentReply() {
    setTyping(true);
    const delay = 900 + Math.random() * 900;
    setTimeout(() => {
      setTyping(false);
      const reply = AUTO_REPLIES[replyIndex.current % AUTO_REPLIES.length];
      replyIndex.current += 1;
      pushMessage({ from: "agent", text: reply, time: timeNow() });
      if (!open || minimized) setUnread((u) => u + 1);
    }, delay);
  }

  function sendMessage(text) {
    const trimmed = text.trim();
    if (!trimmed && !attachment) return;
    pushMessage({
      from: "user",
      text: trimmed || null,
      attachment: attachment || null,
      time: timeNow(),
    });
    setInput("");
    setAttachment(null);
    simulateAgentReply();
  }

  function handleFileChange(e) {
    const file = e.target.files?.[0];
    if (file) setAttachment(file.name);
    e.target.value = "";
  }

  function handleOpen() {
    setOpen(true);
    setMinimized(false);
    setUnread(0);
  }

  function handleKeyDown(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  }

  const panelBg = dark ? "#1f2937" : "#FBF7EF";
  const panelBorder = dark ? "#374151" : "#E9E3D6";

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end">
      <AnimatePresence>
        {open && (
          <motion.div
            className={`mb-3 w-[340px] max-w-[calc(100vw-2.5rem)] rounded-[26px] border shadow-[0_20px_50px_-12px_rgba(47,74,63,0.35)] overflow-hidden flex flex-col transition-all duration-300 ease-out ${
              minimized ? "h-[68px]" : "h-[480px] max-h-[calc(100vh-8rem)]"
            }`}
            style={{
              backgroundColor: panelBg,
              borderColor: panelBorder,
            }}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ 
              type: "spring",
              stiffness: 300,
              damping: 25,
              duration: 0.4
            }}
          >
            {/* Header */}
            <motion.div
              className="relative flex items-center justify-between px-4 py-3.5 flex-shrink-0 cursor-pointer overflow-hidden"
              style={{
                background: `linear-gradient(to right, ${textColor}, ${textColor}dd)`,
                color: "#FBF7EF",
              }}
              onClick={() => setMinimized((m) => !m)}
              whileHover={{
                scale: 1.01,
                transition: { duration: 0.2 }
              }}
            >
              <span className="pointer-events-none absolute -right-6 -top-8 w-28 h-28 rounded-full bg-[#C4744E]/10" aria-hidden="true" />

              <div className="relative flex items-center gap-2.5 min-w-0">
                <span className="relative w-9 h-9 flex items-center justify-center flex-shrink-0">
                  <BreathingRing textColor="#FBF7EF" />
                  <span className="relative w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-base ring-1 ring-white/20">
                    {AGENT.avatar}
                  </span>
                  <motion.span 
                    className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-[#8FBF9F] border-2 border-[#2F4A3F]"
                    animate={{
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                </span>
                <div className="min-w-0">
                  <p className="font-serif text-[15px] leading-none truncate tracking-wide" style={{ color: "#FBF7EF" }}>
                    {AGENT.name}
                  </p>
                  <p className="text-[10.5px] text-[#D7C9B8] mt-1.5 leading-none tracking-[0.08em] uppercase">
                    Online · {AGENT.role}
                  </p>
                </div>
              </div>
              <div className="relative flex items-center gap-1 flex-shrink-0">
                <motion.button
                  onClick={(e) => { e.stopPropagation(); setMinimized((m) => !m); }}
                  className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-white/10 active:scale-95 transition-all"
                  aria-label={minimized ? "Expand" : "Minimize"}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" style={{ stroke: "#FBF7EF" }}>
                    {minimized ? <polyline points="18 15 12 9 6 15" /> : <polyline points="6 9 12 15 18 9" />}
                  </svg>
                </motion.button>
                <motion.button
                  onClick={(e) => { e.stopPropagation(); setOpen(false); }}
                  className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-white/10 active:scale-95 transition-all"
                  aria-label="Close"
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" style={{ stroke: "#FBF7EF" }}>
                    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </motion.button>
              </div>
            </motion.div>

            {!minimized && (
              <>
                {/* Messages */}
                <div
                  ref={scrollRef}
                  className="flex-1 overflow-y-auto px-3 py-4 space-y-3"
                  style={{
                    backgroundImage: "radial-gradient(circle at 1px 1px, rgba(47,74,63,0.05) 1px, transparent 0)",
                    backgroundSize: "16px 16px",
                    backgroundColor: panelBg,
                  }}
                >
                  {messages.map((m, i) => (
                    <Bubble key={i} msg={m} textColor={textColor} index={i} />
                  ))}
                  {typing && <TypingIndicator textColor={textColor} />}

                  {messages.length <= 1 && !typing && (
                    <motion.div 
                      className="flex flex-wrap gap-2 pt-2 px-1"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3, duration: 0.4 }}
                    >
                      {QUICK_REPLIES.map((q, idx) => (
                        <motion.button
                          key={q}
                          onClick={() => sendMessage(q)}
                          className="text-[12px] px-3.5 py-1.5 rounded-full border transition-colors duration-200"
                          style={{
                            borderColor: textColor + "40",
                            color: textColor,
                            backgroundColor: dark ? "#ffffff" : "#ffffff",
                          }}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: idx * 0.05 + 0.4, duration: 0.3 }}
                          whileHover={{
                            scale: 1.05,
                            backgroundColor: dark ? "#374151" : "#f0f0f0",
                            color: dark ? "#ffffff" : textColor,
                            borderColor: textColor,
                          }}
                          whileTap={{ scale: 0.95 }}
                        >
                          {q}
                        </motion.button>
                      ))}
                    </motion.div>
                  )}
                </div>

                {/* Attachment preview */}
                {attachment && (
                  <motion.div 
                    className="px-3 pt-2 flex-shrink-0"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex items-center justify-between gap-2 px-3 py-1.5 rounded-full border text-xs" style={{
                      backgroundColor: dark ? "#374151" : "#F3F0E9",
                      borderColor: dark ? "#4b5563" : "#E9E3D6",
                      color: dark ? "#e5e7eb" : "#5C574C",
                    }}>
                      <span className="truncate">{attachment}</span>
                      <motion.button 
                        onClick={() => setAttachment(null)} 
                        className="hover:opacity-70 transition-colors" 
                        style={{ color: dark ? "#9ca3af" : "#A39D8E" }}
                        whileHover={{ scale: 1.2, rotate: 90 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" style={{ stroke: dark ? "#9ca3af" : "#A39D8E" }}>
                          <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                      </motion.button>
                    </div>
                  </motion.div>
                )}

                {/* Input */}
                <motion.div 
                  className="flex items-end gap-2 px-3 py-3 border-t flex-shrink-0" 
                  style={{
                    borderColor: dark ? "#374151" : "#E9E3D6",
                    backgroundColor: panelBg,
                  }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1, duration: 0.3 }}
                >
                  <input ref={fileInputRef} type="file" className="hidden" onChange={handleFileChange} />
                  <motion.button
                    onClick={() => fileInputRef.current?.click()}
                    className="w-9 h-9 rounded-full flex items-center justify-center active:scale-95 transition-all flex-shrink-0"
                    style={{ color: dark ? "#9ca3af" : "#A39D8E" }}
                    whileHover={{
                      scale: 1.1,
                      backgroundColor: dark ? "#374151" : "#F3F0E9",
                      color: textColor,
                    }}
                    whileTap={{ scale: 0.9 }}
                    aria-label="Attach file"
                  >
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ stroke: dark ? "#9ca3af" : "#A39D8E" }}>
                      <path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48" />
                    </svg>
                  </motion.button>
                  <motion.textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Type a message..."
                    rows={1}
                    className="flex-1 resize-none max-h-24 px-4 py-2.5 rounded-full border text-[13px] leading-tight transition-shadow"
                    style={{
                      backgroundColor: dark ? "#374151" : "#ffffff",
                      borderColor: dark ? "#4b5563" : "#E9E3D6",
                      color: dark ? "#e5e7eb" : "#3A362E",
                    }}
                    whileFocus={{
                      scale: 1.02,
                      borderColor: textColor + "50",
                      boxShadow: `0 0 0 3px ${textColor}20`,
                    }}
                  />
                  <motion.button
                    onClick={() => sendMessage(input)}
                    disabled={!input.trim() && !attachment}
                    className="w-9 h-9 rounded-full flex items-center justify-center active:scale-95 transition-all flex-shrink-0"
                    style={{
                      backgroundColor: (!input.trim() && !attachment) ? (dark ? "#374151" : "#E9E3D6") : textColor,
                      color: (!input.trim() && !attachment) ? (dark ? "#6b7280" : "#B7B0A0") : "#FBF7EF",
                      cursor: (!input.trim() && !attachment) ? "default" : "pointer",
                    }}
                    whileHover={{
                      scale: 1.1,
                      boxShadow: `0 4px 20px ${textColor}40`,
                    }}
                    whileTap={{ scale: 0.9 }}
                    aria-label="Send"
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" style={{ color: (!input.trim() && !attachment) ? (dark ? "#6b7280" : "#B7B0A0") : "#FBF7EF" }}>
                      <path d="M2 21l21-9L2 3v7l15 2-15 2v7z" />
                    </svg>
                  </motion.button>
                </motion.div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Launcher button */}
      {!open && (
        <motion.button
          onClick={handleOpen}
          className="relative w-14 h-14 rounded-full text-[#FBF7EF] shadow-[0_10px_30px_-8px_rgba(47,74,63,0.55)] flex items-center justify-center hover:scale-105 active:scale-95 transition-transform"
          style={{
            background: `linear-gradient(to bottom right, ${textColor}, ${textColor}dd)`,
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Open support chat"
        >
          <BreathingRing textColor="#FBF7EF" />
          <svg width="23" height="23" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ stroke: "#FBF7EF" }}>
            <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
          </svg>
          {unread > 0 && (
            <motion.span 
              className="absolute -top-1 -right-1 min-w-[20px] h-5 px-1 rounded-full text-white text-[10px] font-medium flex items-center justify-center border-2 border-[#FBF7EF]" 
              style={{
                backgroundColor: "#C4744E",
              }}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 500, damping: 20 }}
            >
              {unread}
            </motion.span>
          )}
        </motion.button>
      )}
    </div>
  );
}

export default LiveSupportChat;