
import React, { useState, useRef, useEffect } from 'react';
import type { PageId } from '../types';
import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface RichTextProps {
  content: string;
  onNavigate?: (page: PageId) => void;
}

/**
 * A specialized parser that converts Markdown and internal route paths into high-fidelity UI elements.
 */
const RichText: React.FC<RichTextProps> = ({ content, onNavigate }) => {
  const lines = content.split('\n');

  return (
    <div className="space-y-3">
      {lines.map((line, lineIdx) => {
        const trimmed = line.trim();
        if (!trimmed) return <div key={lineIdx} className="h-2" />;

        // Handle specific "Route to:" pattern for high-impact CTA buttons
        if (trimmed.toLowerCase().startsWith('route to: /') || trimmed.startsWith('/')) {
          const pathString = (trimmed.includes('/') ? trimmed.substring(trimmed.indexOf('/')) : '').split(' ')[0];
          const cleanPath = pathString.replace(/[^a-zA-Z-]/g, '') as PageId;
          
          return (
            <button
              key={lineIdx}
              onClick={() => onNavigate?.(cleanPath)}
              className="group flex items-center gap-3 w-full p-3 sm:p-4 bg-green-50 border border-green-200 rounded-2xl text-left hover:bg-green-600 hover:border-green-600 transition-all shadow-sm active:scale-[0.98]"
            >
              <div className="w-8 h-8 rounded-xl bg-white flex items-center justify-center text-green-600 group-hover:scale-110 transition-transform shadow-sm shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[8px] sm:text-[9px] font-black uppercase tracking-widest text-green-600 group-hover:text-white/80">Navigation Action</span>
                <span className="text-xs sm:text-sm font-black text-slate-900 group-hover:text-white tracking-tight truncate">Navigate to {cleanPath.replace('-', ' ')}</span>
              </div>
            </button>
          );
        }

        // Handle Bullet Points
        const isBullet = trimmed.startsWith('* ') || trimmed.startsWith('- ');
        const cleanLine = isBullet ? trimmed.substring(2) : line;

        // Inline parsing for Bold (**) and Italic (*)
        const parts = cleanLine.split(/(\*\*.*?\*\*|\*.*?\*)/g);
        const formattedLine = parts.map((part, partIdx) => {
          if (part.startsWith('**') && part.endsWith('**')) {
            return <strong key={partIdx} className="font-black text-slate-900">{part.slice(2, -2)}</strong>;
          }
          if (part.startsWith('*') && part.endsWith('*')) {
            return <em key={partIdx} className="italic text-slate-800 font-medium">{part.slice(1, -1)}</em>;
          }
          return part;
        });

        if (isBullet) {
          return (
            <div key={lineIdx} className="flex gap-2 sm:gap-3 pl-1 items-start">
              <span className="mt-1.5 w-1.5 h-1.5 bg-green-500 rounded-full shrink-0 shadow-sm" />
              <p className="flex-1 text-slate-600 leading-relaxed text-sm sm:text-[15px]">{formattedLine}</p>
            </div>
          );
        }

        return <p key={lineIdx} className="leading-relaxed text-slate-600 text-sm sm:text-[15px]">{formattedLine}</p>;
      })}
    </div>
  );
};

interface ChatWidgetProps {
  onNavigate?: (page: PageId) => void;
}

const ChatWidget: React.FC<ChatWidgetProps> = ({ onNavigate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: "Hi! I'm the FINISH Assistant. We help builders navigate the engineering lifecycle—from the first blueprint to scaling a production-ready product.\n\nHow can I help you today?\n\n* **Have an idea?** Let's talk about **The Blueprint** or MVP sprints (**FINISH Start**).\n* **Stuck mid-build?** We can unblock you using AI tools or custom surgical engineering.\n* **Ready to ship?** We handle the \"last mile\"—auth, payments, and deployment.\n\nRoute to: /diagnostic" }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatInstance = useRef<Chat | null>(null);

  useEffect(() => { 
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }); 
  }, [messages, isTyping]);

  const initChat = () => {
    if (!chatInstance.current) {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      chatInstance.current = ai.chats.create({
        model: 'gemini-3-flash-preview',
        config: {
          systemInstruction: `You are the FINISH Inc Assistant. 
          Your goal is to help users navigate our engineering service lifecycle.
          
          Critical Guidelines:
          - ALWAYS use interactive paths to suggest pages. 
          - Format paths on their own line as "Route to: /page-id".
          - Valid pages: /home, /how-it-works, /pricing, /why-finish, /faq, /diagnostic, /partner, /stories, /idea-stage.
          - Use Markdown: **bold** for emphasis, *italic* for notes.
          - Use bullet points (* Item) for service lists.
          - Tone: Professional, high-trust, technical, and concise.
          
          Logic:
          - New Ideas -> /idea-stage
          - Broken Apps -> /diagnostic
          - Agencies/VCs -> /partner
          - Success Proof -> /stories`,
        },
      });
    }
  };

  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputValue.trim() || isTyping) return;
    
    const userMessage = inputValue.trim();
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setInputValue('');
    setIsTyping(true);

    try {
      if (!chatInstance.current) initChat();
      const response: GenerateContentResponse = await chatInstance.current!.sendMessage({ message: userMessage });
      setMessages(prev => [...prev, { role: 'assistant', content: response.text || "I'm sorry, I couldn't process that request right now." }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'assistant', content: "Connection error. Please try again or contact hello@finishlab.app directly." }]);
      console.error('Chat error:', err);
    } finally { 
      setIsTyping(false); 
    }
  };

  return (
    <div className="fixed bottom-4 left-4 right-4 sm:right-auto sm:bottom-6 sm:left-6 z-[200] pointer-events-none">
      {/* Chat Window */}
      <div 
        className={`bg-white border border-slate-200 shadow-[0_32px_64px_-12px_rgba(0,0,0,0.14)] rounded-[2.5rem] w-full sm:w-[380px] md:w-[440px] flex flex-col transition-all duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] origin-bottom-left ${
          isOpen ? 'scale-100 opacity-100 pointer-events-auto translate-y-0' : 'scale-90 opacity-0 pointer-events-none translate-y-4'
        }`} 
        style={{ height: 'min(600px, 75vh)' }}
      >
        {/* Header */}
        <div className="bg-slate-900 text-white p-4 sm:p-6 rounded-t-[2.5rem] flex items-center justify-between border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse"></div>
              <div className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-25"></div>
            </div>
            <div>
              <h3 className="font-black text-[10px] sm:text-xs uppercase tracking-widest">FINISH Assistant</h3>
              <p className="text-[9px] sm:text-[10px] text-slate-400 font-mono uppercase tracking-tighter">Senior Architect Bot</p>
            </div>
          </div>
          <button 
            onClick={() => setIsOpen(false)} 
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
            aria-label="Close chat"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Messages */}
        <div className="flex-grow overflow-y-auto p-4 sm:p-6 space-y-5 sm:space-y-6 bg-slate-50/30 scrollbar-hide">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div 
                className={`max-w-[85%] sm:max-w-[90%] p-4 sm:p-6 rounded-[2rem] text-sm sm:text-[15px] shadow-sm ${
                  msg.role === 'user' 
                    ? 'bg-slate-900 text-white rounded-tr-sm font-bold' 
                    : 'bg-white border border-slate-100 rounded-tl-sm ring-1 ring-slate-100/50'
                }`}
              >
                {msg.role === 'user' ? (
                  <p className="leading-relaxed">{msg.content}</p>
                ) : (
                  <RichText content={msg.content} onNavigate={onNavigate} />
                )}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-white border border-slate-100 p-4 rounded-3xl rounded-tl-sm shadow-sm">
                <div className="flex gap-1.5">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce [animation-delay:0s]"></div>
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Footer/Input */}
        <form onSubmit={handleSend} className="p-4 sm:p-6 bg-white border-t border-slate-100 rounded-b-[2.5rem] shrink-0">
          <div className="relative">
            <input 
              value={inputValue} 
              onChange={(e) => setInputValue(e.target.value)} 
              placeholder="Ask about your project..." 
              className="w-full pl-5 pr-14 py-3 sm:py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-green-500/10 focus:border-green-500 transition-all font-bold placeholder:text-slate-300 text-slate-900 text-sm sm:text-base" 
            />
            <button 
              type="submit"
              disabled={!inputValue.trim() || isTyping}
              className="absolute right-1.5 top-1.5 bottom-1.5 w-10 sm:w-11 flex items-center justify-center bg-slate-900 text-white rounded-xl hover:bg-slate-800 disabled:bg-slate-200 transition-all shadow-lg active:scale-95 shrink-0"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
              </svg>
            </button>
          </div>
          <p className="text-center mt-3 sm:mt-4 text-[8px] sm:text-[9px] text-slate-400 font-mono uppercase tracking-[0.3em]">Architect Session Encrypted • 256-Bit SSL</p>
        </form>
      </div>

      {/* Toggle Button */}
      <button 
        onClick={() => { setIsOpen(!isOpen); if(!isOpen) initChat(); }} 
        className="w-14 h-14 sm:w-16 sm:h-16 rounded-[1.5rem] sm:rounded-[1.75rem] flex items-center justify-center shadow-2xl bg-green-600 text-white mt-4 sm:mt-6 hover:scale-110 active:scale-95 transition-all pointer-events-auto group relative z-10 border-none outline-none"
        aria-label={isOpen ? "Close chat" : "Open chat assistant"}
      >
        <div className="absolute inset-0 bg-green-500 rounded-[1.5rem] sm:rounded-[1.75rem] group-hover:animate-ping opacity-0 group-hover:opacity-20 pointer-events-none"></div>
        {isOpen ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 sm:h-7 sm:w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 sm:h-7 sm:w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        )}
      </button>
    </div>
  );
};

export default ChatWidget;
