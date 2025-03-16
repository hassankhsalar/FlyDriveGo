import React, { useState, useEffect, useRef } from 'react';
import { generateAIContent } from '../../api/generativeAI';
import { toast } from 'react-hot-toast';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { materialDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { motion, AnimatePresence } from 'framer-motion';
import { useCopyToClipboard } from 'react-use';

const Chatbot = () => {
  const [input, setInput] = useState('');
  const [conversation, setConversation] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [state, copyToClipboard] = useCopyToClipboard();
  const conversationEndRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { text: input, sender: 'user' };
    setConversation(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const botResponse = await generateAIContent(input);
      const botMessage = { text: botResponse, sender: 'bot' };
      setConversation(prev => [...prev, botMessage]);
    } catch (error) {
      toast.error('Failed to get response from AI');
    } finally {
      setIsLoading(false);
    }

    setInput('');
  };

  const handleCopyCode = (code) => {
    copyToClipboard(code);
    toast.success('Copied to clipboard');
  };

  const scrollToBottom = () => {
    conversationEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [conversation, isLoading]);

  const messageVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, x: 100 },
  };

  const buttonVariants = {
    hover: { scale: 1.05 },
    tap: { scale: 0.95 },
    float: {
      y: [-5, 5],
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: 'reverse',
      },
    },
  };

  return (
    <div className="relative font-red-rose">
      <motion.button
        variants={buttonVariants}
        animate="float"
        whileHover="hover"
        whileTap="tap"
        className="fixed bottom-5 left-5 bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 rounded-full shadow-xl hover:shadow-2xl transition-all"
        onClick={() => setIsModalOpen(true)}
      >
        <span className="block text-sm font-semibold">Ask AI</span>
        <span className="block text-xs opacity-75">Click to chat</span>
      </motion.button>

      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm z-40"
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              className="fixed bottom-5 left-5 bg-white w-full max-w-lg p-6 rounded-xl shadow-2xl z-50 md:max-w-md"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  AI Assistant
                </h2>
                <button
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                  onClick={() => setIsModalOpen(false)}
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="chatbot">
                <div className="conversation h-96 overflow-y-auto p-4 bg-gray-50 rounded-xl mb-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
                  <AnimatePresence>
                    {conversation.map((msg, index) => (
                      <motion.div
                        key={index}
                        variants={messageVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} mb-3`}
                      >
                        <div
                          className={`max-w-[85%] p-3 rounded-2xl ${
                            msg.sender === 'user'
                              ? 'bg-blue-600 text-white'
                              : 'bg-white border border-gray-200 shadow-sm'
                          }`}
                        >
                          <ReactMarkdown
                            children={msg.text}
                            components={{
                              code({ node, inline, className, children, ...props }) {
                                const match = /language-(\w+)/.exec(className || '');
                                return !inline && match ? (
                                  <div className="relative">
                                    <button
                                      onClick={() => handleCopyCode(String(children))}
                                      className="absolute right-2 top-2 bg-gray-700 px-2 py-1 rounded text-white text-xs hover:bg-gray-600"
                                    >
                                      Copy
                                    </button>
                                    <SyntaxHighlighter
                                      children={String(children).replace(/\n$/, '')}
                                      style={materialDark}
                                      language={match[1]}
                                      PreTag="div"
                                      {...props}
                                    />
                                  </div>
                                ) : (
                                  <code className={className} {...props}>
                                    {children}
                                  </code>
                                );
                              },
                            }}
                          />
                        </div>
                      </motion.div>
                    ))}
                    {isLoading && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex items-center space-x-2 text-gray-500"
                      >
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
                        </div>
                        <span className="text-sm">AI is typing...</span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  <div ref={conversationEndRef} />
                </div>

                <form onSubmit={handleSubmit} className="flex gap-2">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask me anything..."
                    className="flex-grow p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="submit"
                    disabled={!input.trim() || isLoading}
                    className="px-6 py-3 bg-blue-600 text-white rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors"
                  >
                    Send
                  </motion.button>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Chatbot;