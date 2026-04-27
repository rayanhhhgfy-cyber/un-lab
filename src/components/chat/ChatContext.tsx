import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { generateChemPhysicsResponse, abortCurrentRequest } from '@/lib/google-ai';
import { useToast } from '@/components/ui/use-toast';
import { useTranslation } from 'react-i18next';

type Message = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
};

type Action = 
  | { type: 'ADD_MESSAGE'; payload: Message }
  | { type: 'UPDATE_MESSAGE'; payload: { id: string; content: string } }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'CLEAR_CHAT' };

const ChatContext = createContext<any>(null);

const chatReducer = (state: any, action: Action) => {
  switch (action.type) {
    case 'ADD_MESSAGE':
      return { ...state, messages: [...state.messages, action.payload], loading: false };
    case 'UPDATE_MESSAGE':
      return {
        ...state,
        messages: state.messages.map((msg: Message) =>
          msg.id === action.payload.id ? { ...msg, content: msg.content + action.payload.content } : msg
        ),
      };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'CLEAR_CHAT':
      return { ...state, messages: [], loading: false };
    default:
      return state;
  }
};

export const ChatProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(chatReducer, { messages: [], loading: false });
  const { toast } = useToast();
  const { t } = useTranslation();

  const addMessage = (role: Message['role'], content: string) => {
    const id = Date.now().toString();
    dispatch({ type: 'ADD_MESSAGE', payload: { id, role, content } });
  };

  const handleSend = async (content: string) => {
    // Cancel any previous request
    abortCurrentRequest();
    
    addMessage('user', content);
    const assistantId = `${Date.now()}-${Math.random().toString(36).slice(2)}`;
    dispatch({ type: 'SET_LOADING', payload: true });

    let messageAdded = false;

    try {
      const response = await generateChemPhysicsResponse(content, (chunk) => {
        if (!messageAdded) {
          dispatch({ type: 'ADD_MESSAGE', payload: { id: assistantId, role: 'assistant', content: '' } });
          dispatch({ type: 'SET_LOADING', payload: false });
          messageAdded = true;
        }
        dispatch({ type: 'UPDATE_MESSAGE', payload: { id: assistantId, content: chunk } });
      });

      if (!response) {
        if (!messageAdded) {
          dispatch({ type: 'ADD_MESSAGE', payload: { id: assistantId, role: 'assistant', content: '' } });
          dispatch({ type: 'SET_LOADING', payload: false });
        }
        dispatch({ type: 'UPDATE_MESSAGE', payload: { id: assistantId, content: t('chat.errorMessage', 'Sorry, I encountered an error. Please try again.') } });
        toast({ 
          variant: 'destructive', 
          title: t('chat.error', 'AI Error'), 
          description: t('chat.errorDescription', 'Could not connect to the AI service. Please check your settings.')
        });
      }
    } catch (error) {
      console.error('Chat error:', error);
      if (!messageAdded) {
        dispatch({ type: 'ADD_MESSAGE', payload: { id: assistantId, role: 'assistant', content: '' } });
        dispatch({ type: 'SET_LOADING', payload: false });
      }
      dispatch({ type: 'UPDATE_MESSAGE', payload: { id: assistantId, content: t('chat.errorMessage', 'Sorry, I encountered an error. Please try again.') } });
      toast({ 
        variant: 'destructive', 
        title: t('chat.error', 'Connection Error'), 
        description: t('chat.errorDescription', 'Could not connect to the AI service. Please try again later.')
      });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const clearChat = () => {
    dispatch({ type: 'CLEAR_CHAT' });
  };

  return (
    <ChatContext.Provider value={{ ...state, addMessage, handleSend, clearChat }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) throw new Error('useChat must be inside ChatProvider');
  return context;
};


