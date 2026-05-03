import React, { useState, useEffect, useRef } from 'react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { DialogTitle } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Loader2, Send, MessageCircle, Bot, Sparkles, Copy, Check, X, ArrowLeft } from 'lucide-react';
import { useChat } from './ChatContext';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import ReactMarkdown from 'react-markdown';

const MessageBubble = ({ role, content }: { role: 'user' | 'assistant'; content: string }) => {
  const [copied, setCopied] = useState(false);
  const isUser = role === 'user';

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={`flex gap-3 mb-6 group ${isUser ? 'justify-end' : 'justify-start'}`}
    >
      {!isUser && (
        <Avatar className="w-8 h-8 flex-shrink-0 mt-1 ring-2 ring-cyan-400/30">
          <AvatarImage src="/school-logo.png" />
          <AvatarFallback className="bg-gradient-to-br from-cyan-500 via-blue-500 to-purple-600 text-white shadow-lg">
            <Bot className="w-4 h-4" />
          </AvatarFallback>
        </Avatar>
      )}
      <div
        className={`max-w-[80%] px-4 py-3 rounded-2xl transition-all duration-300 hover:scale-[1.02] ${
          isUser
            ? 'bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-500 text-white rounded-br-md shadow-xl shadow-blue-500/25 border border-blue-400/30'
            : 'bg-gradient-to-br from-white/10 via-white/5 to-transparent backdrop-blur-xl border border-white/20 hover:border-white/30 shadow-2xl'
        }`}
      >
        {isUser ? (
          <p className="text-sm leading-relaxed break-words text-white">{content}</p>
        ) : (
          <div className="text-sm leading-relaxed break-words text-gray-100 markdown-content">
            <ReactMarkdown
              components={{
                p: ({node, ...props}) => <p className="mb-2 last:mb-0" {...props} />,
                strong: ({node, ...props}) => <strong className="font-semibold text-cyan-300" {...props} />,
                em: ({node, ...props}) => <em className="italic text-blue-200" {...props} />,
                ul: ({node, ...props}) => <ul className="list-disc list-inside mb-2 space-y-1" {...props} />,
                ol: ({node, ...props}) => <ol className="list-decimal list-inside mb-2 space-y-1" {...props} />,
                li: ({node, ...props}) => <li className="text-sm" {...props} />,
                code: ({ node, className, children, ...props }) =>
                  !className ? (
                    <code className="bg-white/10 px-1.5 py-0.5 rounded text-cyan-300 font-mono text-xs" {...props}>
                      {children}
                    </code>
                  ) : (
                    <code className="block bg-black/30 px-3 py-2 rounded my-2 font-mono text-xs overflow-x-auto" {...props}>
                      {children}
                    </code>
                  ),
                h1: ({node, ...props}) => <h1 className="text-lg font-bold text-cyan-300 mt-2 mb-1" {...props} />,
                h2: ({node, ...props}) => <h2 className="text-base font-bold text-blue-300 mt-2 mb-1" {...props} />,
                h3: ({node, ...props}) => <h3 className="text-sm font-semibold text-purple-300 mt-1 mb-0.5" {...props} />,
              }}
            >
              {content}
            </ReactMarkdown>
          </div>
        )}
        {!isUser && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            whileHover={{ scale: 1.05 }}
            onClick={handleCopy}
            className="mt-3 text-xs opacity-60 hover:opacity-100 transition-all flex items-center gap-1.5 text-cyan-300 hover:text-cyan-200 px-2 py-1 rounded-lg hover:bg-white/10"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5" /> <span className="font-medium">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" /> <span>Copy</span>
              </>
            )}
          </motion.button>
        )}
      </div>
      {isUser && (
        <Avatar className="w-8 h-8 flex-shrink-0 mt-1 ring-2 ring-purple-400/30">
          <AvatarFallback className="bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 text-white shadow-lg">
            👤
          </AvatarFallback>
        </Avatar>
      )}
    </motion.div>
  );
};

export default function ChatWidget() {
  const [input, setInput] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { messages, loading, handleSend } = useChat();
  const { t, i18n } = useTranslation();
  const { toast } = useToast();
  const hasMessages = messages.length > 0;
  const isRTL = i18n.language === 'ar';
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  }, [messages, loading]);

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !loading) {
      handleSend(input.trim());
      setInput('');
    }
  };

  const suggestedQuestions = [
    t('chat.suggestionChemistry', 'How does photosynthesis work?'),
    t('chat.suggestionPhysics', 'What is quantum mechanics?'),
    t('chat.suggestionFormula', 'Help me solve this formula'),
  ];

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <motion.button
          whileHover={{ scale: 1.1, rotate: 5 }}
          whileTap={{ scale: 0.95 }}
          className="fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 text-white shadow-2xl flex items-center justify-center hover:shadow-cyan-400/50 transition-all duration-300 group border-2 border-white/20 backdrop-blur-sm"
          aria-label={t('chat.openChat', 'Open AI Tutor Chat')}
        >
          <motion.div
            animate={{ y: [0, -2, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="relative"
          >
            <MessageCircle className="w-7 h-7 drop-shadow-lg" />
            {!hasMessages && (
              <motion.div
                animate={{ scale: [1, 1.2, 1], opacity: [1, 0.5, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute inset-0 rounded-full border-2 border-white/80"
              />
            )}
          </motion.div>

          {/* Simple glow effect */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400/30 to-purple-500/30 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </motion.button>
      </SheetTrigger>
      <SheetContent
        side={isRTL ? 'left' : 'right'}
        className="p-0 w-full sm:w-[90vw] md:w-[520px] glass-strong border-l sm:border-l border-white/10 flex flex-col h-screen bg-black backdrop-blur-xl"
        aria-describedby="chat-description"
      >
        <DialogTitle className="sr-only">AI Science Tutor Chat</DialogTitle>
        {/* Header */}
        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="sticky top-0 z-10 p-4 border-b border-white/10 bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-purple-500/20 backdrop-blur-xl shadow-2xl"
        >
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {isMobile && (
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-200 mr-2 border border-white/20"
                  aria-label="Back to main page"
                >
                  <ArrowLeft className="w-5 h-5 text-white" />
                </motion.button>
              )}
              <div className="relative">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 flex items-center justify-center ring-2 ring-cyan-400/50 shadow-2xl">
                  <Sparkles className="w-6 h-6 text-white drop-shadow-lg" />
                </div>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 rounded-2xl border-2 border-gradient-to-r from-cyan-400/50 via-blue-500/50 to-purple-600/50"
                />
              </div>
              <div>
                <h2 className="font-bold text-white text-xl bg-gradient-to-r from-cyan-300 via-blue-300 to-purple-300 bg-clip-text text-transparent">
                  {t('chat.title', 'Science AI Tutor')}
                </h2>
                <p className="text-sm text-white/70 font-medium">{t('chat.subtitle', 'Chemistry & Physics Expert')}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {hasMessages && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="relative"
                >
                  <Badge variant="secondary" className="text-xs bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-cyan-300 border border-cyan-400/30 shadow-lg">
                    {messages.length}
                  </Badge>
                  <div className="absolute inset-0 rounded-full bg-cyan-400/30 blur-sm animate-pulse" />
                </motion.div>
              )}
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-200 border border-white/20"
                aria-label="Close chat"
              >
                <X className="w-5 h-5 text-white" />
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Messages Area */}
        <ScrollArea ref={scrollAreaRef} className="flex-1 p-4 overflow-hidden">
          <AnimatePresence>
            {!hasMessages && !loading && (
              <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -30, scale: 0.95 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="flex flex-col items-center justify-center h-full space-y-6 py-8"
              >

                <div className="relative z-10">
                  <motion.div 
                    className="w-28 h-28 rounded-3xl bg-gradient-to-br from-cyan-400/30 via-blue-500/30 to-purple-600/30 flex items-center justify-center ring-4 ring-cyan-400/40 shadow-2xl relative overflow-hidden"
                    animate={{ 
                      boxShadow: [
                        "0 0 20px rgba(34, 211, 238, 0.3)",
                        "0 0 40px rgba(34, 211, 238, 0.6)",
                        "0 0 20px rgba(34, 211, 238, 0.3)"
                      ]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                      className="absolute inset-0 rounded-3xl border-2 border-gradient-to-r from-cyan-400/50 to-purple-500/50"
                    />
                    <Sparkles className="w-12 h-12 text-cyan-300 drop-shadow-2xl relative z-10" />
                    
                    {/* Inner glow effect */}
                    <div className="absolute inset-4 rounded-2xl bg-gradient-to-br from-cyan-300/20 to-purple-500/20 blur-sm" />
                  </motion.div>
                </div>
                
                <div className="text-center space-y-3">
                  <motion.h3 
                    className="font-bold text-white text-2xl bg-gradient-to-r from-cyan-300 via-blue-300 to-purple-300 bg-clip-text text-transparent"
                    animate={{ 
                      textShadow: [
                        "0 0 10px rgba(34, 211, 238, 0.5)",
                        "0 0 20px rgba(34, 211, 238, 0.8)",
                        "0 0 10px rgba(34, 211, 238, 0.5)"
                      ]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    {t('chat.welcome', 'Welcome! 🧪')}
                  </motion.h3>
                  <p className="text-gray-300 text-base leading-relaxed max-w-sm font-medium">
                    {t('chat.askAnything', 'Ask me anything about Chemistry or Physics')}
                  </p>
                </div>
                
                <div className="w-full space-y-4 max-w-sm">
                  {suggestedQuestions.map((q, i) => (
                    <motion.button
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.15 + 0.3 }}
                      whileHover={{ 
                        scale: 1.02, 
                        x: 8,
                        boxShadow: "0 0 25px rgba(34, 211, 238, 0.3)"
                      }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleSend(q)}
                      className="w-full text-left p-4 rounded-2xl bg-gradient-to-r from-white/10 via-white/5 to-transparent hover:from-cyan-500/20 hover:via-blue-500/10 hover:to-purple-500/20 border border-white/20 hover:border-cyan-400/40 text-sm text-gray-200 transition-all duration-300 group shadow-xl hover:shadow-cyan-500/20 relative overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                      <span className="opacity-80 group-hover:opacity-100 font-medium relative z-10">{q}</span>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}
            {messages.map((msg: any) => (
              <MessageBubble key={msg.id} role={msg.role} content={msg.content} />
            ))}
            {loading && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                className="flex items-center gap-3 p-4 glass-strong rounded-2xl bg-gradient-to-r from-cyan-500/10 via-blue-500/5 to-purple-500/10 border border-cyan-400/20 shadow-lg mb-6 relative overflow-hidden"
              >
                {/* Animated background */}
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/5 via-blue-500/5 to-purple-600/5 animate-pulse" />
                
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-8 h-8 rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 flex items-center justify-center shadow relative z-10"
                >
                  <Loader2 className="w-4 h-4 text-white drop-shadow" />
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-300/50 to-purple-500/50 blur-sm animate-pulse" />
                </motion.div>
                
                <div className="relative z-10">
                  <span className="text-white text-sm font-semibold bg-gradient-to-r from-cyan-300 to-purple-300 bg-clip-text text-transparent">
                    {t('chat.thinking', 'AI thinking...')}
                  </span>
                  <div className="flex gap-1 mt-2">
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        animate={{ 
                          scale: [1, 1.5, 1],
                          opacity: [0.5, 1, 0.5]
                        }}
                        transition={{ 
                          duration: 1, 
                          repeat: Infinity, 
                          delay: i * 0.2,
                          ease: "easeInOut"
                        }}
                        className="w-3 h-3 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 shadow-lg"
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </ScrollArea>

        {/* Input Area */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="sticky bottom-0 p-4 border-t border-white/10 bg-black/95 backdrop-blur-xl"
        >

          <form onSubmit={sendMessage} className="flex gap-3">
            <div className="flex-1 relative group">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={t('chat.placeholder', 'Ask a question...')}
                disabled={loading}
                className="w-full bg-gradient-to-r from-white/10 via-white/5 to-transparent border-2 border-white/20 hover:border-cyan-400/50 focus:border-cyan-400/70 text-white placeholder:text-gray-400 text-base rounded-2xl px-4 py-3 pr-16 transition-all duration-300 focus:ring-4 focus:ring-cyan-400/20 shadow-2xl hover:shadow-cyan-400/10 relative z-10"
                maxLength={1000}
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-gray-400 font-medium bg-black/50 px-2 py-1 rounded-lg border border-white/10">
                {input.length}/1000
              </div>
              
              {/* Focus glow effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-400/0 via-blue-500/0 to-purple-600/0 group-focus-within:from-cyan-400/10 group-focus-within:via-blue-500/5 group-focus-within:to-purple-600/10 transition-all duration-300 blur-sm" />
            </div>
            
            <motion.div 
              whileHover={{ scale: 1.05, rotate: 5 }} 
              whileTap={{ scale: 0.95 }}
              className="relative"
            >
              <Button
                type="submit"
                size="lg"
                disabled={!input.trim() || loading}
                className="bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 hover:from-cyan-600 hover:via-blue-600 hover:to-purple-700 text-white shadow-2xl hover:shadow-cyan-500/50 disabled:opacity-50 disabled:cursor-not-allowed px-6 py-3 rounded-2xl transition-all duration-300 border-2 border-white/20 relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin relative z-10" />
                ) : (
                  <Send className="w-5 h-5 relative z-10 drop-shadow-lg" />
                )}
              </Button>
              
              {/* Button glow effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-400/50 to-purple-500/50 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.div>
          </form>
        </motion.div>

        <div id="chat-description" className="sr-only">
          {t('chat.description', 'Chat with an AI science tutor about chemistry and physics topics')}
        </div>
      </SheetContent>
    </Sheet>
  );
}

