import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, AlertCircle, Pill } from "lucide-react";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hey there! 👋 Welcome to MediCare Assistant. I'm here 24/7 to help with:\n\n💊 Prescription refills\n📦 Order tracking\n🏥 Store locator\n🩺 Health info\n💰 Pricing & deals",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const quickPrompts = [
    { icon: "📦", label: "Track Order" },
    { icon: "🏥", label: "Find Store" },
    { icon: "💊", label: "Refill Rx" },
    { icon: "📋", label: "Product Info" },
    { icon: "💰", label: "Discounts" },
    { icon: "🩺", label: "Health Tips" },
  ];

  const botResponses: Record<string, string> = {
    "track": "📦 Perfect! To track your order, provide your order number. You can also check real-time updates on your dashboard. What's your order number?",
    "store": "🏥 We have 500+ locations nationwide! Share your location, and I'll find the nearest pharmacy for you.",
    "prescription": "💊 Easy! Just give me your prescription number, and we'll process your refill. You can also call 1-800-PHARMA or use our app.",
    "product": "📋 Great! I can help you find any medication or health product. What are you looking for?",
    "delivery": "🚚 We offer:\n• Standard (2-3 days) - Free\n• Express (1 day) - $5.99\n• Next-day - Premium members\n\nWhich works best for you?",
    "price": "💰 Amazing deals available!\n• 10% off with loyalty\n• $5 off first order\n• Bundle discounts\n• Generic alternatives\n\nWant details?",
    "insurance": "🛡️ We accept 99% of major insurance plans. Just provide details at checkout for instant verification!",
    "covid": "💉 Book COVID shots at any location! Online booking available or call us. Same-day appointments often available.",
    "urgent": "🚨 EMERGENCY? Call 911 NOW. For urgent pharmacy issues: 1-800-PHARMA (24/7 support).",
    "help": "📞 Here's what I can help with:\n✓ Orders & Delivery\n✓ Prescriptions\n✓ Store info\n✓ Products\n✓ Insurance\n✓ Health advice\n\nWhat do you need?",
    "discount": "🎉 Current offers:\n• New member: 10% off\n• Loyalty: 15% rewards\n• Bulk orders: 20% off\n• Seasonal sales this week!\n\nReady to save?",
    "health": "🩺 Health tips available:\n• Medication info\n• Wellness guides\n• Vitamin recommendations\n• Side effects info\n\nWhat health topic interests you?"
  };

  const getResponse = (input: string): string => {
    const lowerInput = input.toLowerCase();
    
    for (const [keyword, response] of Object.entries(botResponses)) {
      if (lowerInput.includes(keyword)) {
        return response;
      }
    }
    
    return "Thanks for reaching out! 💬 I've got your message. Our team will follow up shortly. Need something urgent? Call 1-800-PHARMA anytime!";
  };

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: getResponse(inputValue),
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsLoading(false);
    }, 800);
  };

  const handleQuickPrompt = (label: string) => {
    setInputValue(label);
    setTimeout(() => {
      const userMessage: Message = {
        id: Date.now().toString(),
        text: label,
        sender: "user",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, userMessage]);
      setInputValue("");
      setIsLoading(true);

      setTimeout(() => {
        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: getResponse(label),
          sender: "bot",
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, botMessage]);
        setIsLoading(false);
      }, 800);
    }, 100);
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  return (
    <>
      {/* Animated Chat Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 right-4 md:bottom-6 md:right-6 h-14 w-14 md:h-16 md:w-16 rounded-full bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:from-emerald-600 hover:via-teal-600 hover:to-cyan-600 text-white shadow-2xl hover:shadow-emerald-500/50 transition-all duration-300 flex items-center justify-center z-40 hover:scale-110 active:scale-95"
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        {isOpen ? (
          <X className="h-6 w-6 md:h-7 md:w-7" />
        ) : (
          <MessageCircle className="h-6 w-6 md:h-7 md:w-7" />
        )}
      </button>

      {/* Premium Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-all duration-300"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Modern Chat Window - Responsive */}
      {isOpen && (
        <div className="fixed inset-4 sm:inset-auto sm:bottom-24 sm:right-6 sm:w-96 md:w-[420px] sm:h-[600px] md:h-[700px] max-h-[80vh] bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border border-slate-700/50 rounded-2xl shadow-2xl flex flex-col z-50 animate-in fade-in slide-in-from-bottom-5 duration-400 overflow-hidden backdrop-blur-xl">
          
          {/* Premium Animated Header */}
          <div className="bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-white px-4 py-4 flex-shrink-0 relative overflow-hidden">
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 md:h-10 md:w-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/30">
                    <Pill className="h-4 w-4 md:h-5 md:w-5" />
                  </div>
                  <h3 className="font-bold text-base md:text-lg">MediCare Pro</h3>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="hover:bg-white/20 p-1.5 rounded-lg transition-colors"
                  aria-label="Close"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="flex items-center gap-2 text-xs md:text-sm opacity-95">
                <div className="h-2 w-2 bg-white rounded-full" />
                <span>Always online • Instant support</span>
              </div>
            </div>
          </div>

          {/* Messages Container */}
          <div 
            ref={scrollRef}
            className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-4 bg-gradient-to-b from-slate-800/50 via-slate-900 to-slate-900 scroll-smooth"
            style={{
              backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(16, 185, 129, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(34, 197, 94, 0.05) 0%, transparent 50%)',
            }}
          >
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"} animate-in fade-in slide-in-from-bottom-2 duration-300`}
                >
                  <div
                    className={`max-w-xs px-4 py-3 rounded-2xl break-words transition-all duration-300 text-sm ${
                      message.sender === "user"
                        ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-br-none shadow-lg shadow-emerald-500/30 border border-emerald-400/50"
                        : "bg-slate-700/60 text-slate-100 rounded-bl-none border border-slate-600/50 backdrop-blur-sm shadow-lg"
                    }`}
                  >
                    <p className="leading-relaxed whitespace-pre-wrap">{message.text}</p>
                    <span className={`text-xs opacity-70 mt-2 block ${
                      message.sender === "user" ? "opacity-90" : ""
                    }`}>
                      {message.timestamp.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                </div>
              ))}
              
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-slate-700/60 border border-slate-600/50 rounded-2xl rounded-bl-none px-4 py-3 backdrop-blur-sm">
                    <div className="flex gap-2">
                      <div className="w-2.5 h-2.5 bg-emerald-400 rounded-full animate-bounce" />
                      <div className="w-2.5 h-2.5 bg-teal-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                      <div className="w-2.5 h-2.5 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Quick Prompts Grid */}
          {messages.length === 1 && (
            <div className="px-3 sm:px-4 py-3 border-t border-slate-700/50 bg-slate-800/50 backdrop-blur-sm flex-shrink-0">
              <p className="text-xs text-slate-400 font-semibold mb-3 uppercase tracking-wider">Quick actions</p>
              <div className="grid grid-cols-3 gap-2">
                {quickPrompts.map((item) => (
                  <button
                    key={item.label}
                    onClick={() => handleQuickPrompt(item.label)}
                    className="text-xs px-2 py-2 sm:px-3 sm:py-2.5 bg-gradient-to-br from-slate-700/60 to-slate-800/60 hover:from-emerald-500/20 hover:to-teal-500/20 text-slate-200 hover:text-emerald-300 rounded-xl transition-all duration-200 border border-slate-600/50 hover:border-emerald-500/50 font-medium backdrop-blur-sm hover:shadow-lg hover:shadow-emerald-500/20 flex flex-col items-center gap-1"
                  >
                    <span className="text-lg">{item.icon}</span>
                    <span className="line-clamp-1">{item.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input Area */}
          <div className="p-3 sm:p-4 border-t border-slate-700/50 bg-slate-800/50 flex-shrink-0 space-y-3 backdrop-blur-sm">
            <div className="flex gap-2 items-center">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && !isLoading && handleSend()}
                placeholder="Ask me anything..."
                disabled={isLoading}
                className="flex-1 px-3 py-2.5 text-sm bg-slate-700/40 border border-slate-600/50 rounded-xl focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/30 text-slate-100 placeholder-slate-500 disabled:opacity-50 transition-all backdrop-blur-sm"
              />
              <button
                onClick={handleSend}
                disabled={isLoading || !inputValue.trim()}
                className="h-10 w-10 flex items-center justify-center bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-emerald-500/50 active:scale-95 flex-shrink-0"
                aria-label="Send message"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBot;