
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: "Hi! I'm the FINISH Assistant. Whether you have just an idea, a messy prototype, or a scaling product that needs help, I can route you to the right engineering solution." }
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
          Your goal is to help users navigate our engineering service lifecycle:
          - Idea Stage: "The Blueprint" and MVP sprints (FINISH Start) for pre-code projects.
          - Build Stage: Unblocking technical founders using AI (Cursor/Lovable) or custom code.
          - Finish Stage: Surgical engineering for auth, payments, and production deployment.
          - Scale Stage: Dedicated engineering reserve teams for growing startups.
          
          Audience Routing:
          - Solo Founders: Route to /for-founders or /idea-stage.
          - Established Startups: Route to /for-startups or /partner.
          - Technical Leads/Devs: Route to /for-developers.
          
          Tone: Professional, builder-to-builder, concise. 
          Pricing Context: $299 (Surgical Call), $995 (Stabilize & Ship), $2,995 (Full Refactor).`,
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
    } finally { 
      setIsTyping(false); 
    }
  };

  return (
    <div className="fixed bottom-6 left-6 z-[200] pointer-events-none">
      {/* Chat Window */}
      <div 
        className={`bg-white border border-slate-200 shadow-[0_32px_64px_-12px_rgba(0,0,0,0.14)] rounded-[2.5rem] w-[350px] md:w-[420px] flex flex-col transition-all duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] origin-bottom-left ${
          isOpen ? 'scale-100 opacity-100 pointer-events-auto translate-y-0' : 'scale-90 opacity-0 pointer-events-none translate-y-4'
        }`} 
        style={{ height: '550px' }}
      >
        <div className="bg-slate-900 text-white p-6 rounded-t-[2.5rem] flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse"></div>
              <div className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-25"></div>
            </div>
            <div>
              <h3 className="font-black text-xs uppercase tracking-widest">FINISH Assistant</h3>
              <p className="text-[10px] text-slate-400 font-mono uppercase tracking-tighter">Senior Architect Bot</p>
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

        <div className="flex-grow overflow-y-auto p-6 space-y-4 bg-slate-50/30 scrollbar-hide">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div 
                className={`max-w-[85%] p-4 rounded-3xl text-sm leading-relaxed shadow-sm ${
                  msg.role === 'user' 
                    ? 'bg-green-600 text-white rounded-tr-sm' 
                    : 'bg-white text-slate-700 border border-slate-100 rounded-tl-sm'
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-white border border-slate-100 p-4 rounded-3xl rounded-tl-sm shadow-sm">
                <div className="flex gap-1">
                  <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce"></div>
                  <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                  <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <form onSubmit={handleSend} className="p-6 bg-white border-t border-slate-100 rounded-b-[2.5rem]">
          <div className="relative">
            <input 
              value={inputValue} 
              onChange={(e) => setInputValue(e.target.value)} 
              placeholder="Ask about your project..." 
              className="w-full pl-6 pr-14 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-green-500/10 focus:border-green-500 transition-all font-bold placeholder:text-slate-300" 
            />
            <button 
              type="submit"
              disabled={!inputValue.trim() || isTyping}
              className="absolute right-2 top-2 bottom-2 w-10 flex items-center justify-center bg-slate-900 text-white rounded-xl hover:bg-slate-800 disabled:bg-slate-200 transition-all"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
              </svg>
            </button>
          </div>
          <p className="text-center mt-4 text-[9px] text-slate-400 font-mono uppercase tracking-widest">Powered by FINISH Intelligence</p>
        </form>
      </div>

      {/* Toggle Button */}
      <button 
        onClick={() => { setIsOpen(!isOpen); if(!isOpen) initChat(); }} 
        className="w-16 h-16 rounded-[1.75rem] flex items-center justify-center shadow-2xl bg-green-600 text-white mt-6 hover:scale-110 active:scale-95 transition-all pointer-events-auto group relative z-10 border-none outline-none"
        aria-label={isOpen ? "Close chat" : "Open chat assistant"}
      >
        <div className="absolute inset-0 bg-green-500 rounded-[1.75rem] group-hover:animate-ping opacity-0 group-hover:opacity-20 pointer-events-none"></div>
        {isOpen ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        )}
      </button>
    </div>
  );
};

export default ChatWidget;
