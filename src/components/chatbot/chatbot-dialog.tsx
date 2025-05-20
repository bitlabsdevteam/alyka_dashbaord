
// src/components/chatbot/chatbot-dialog.tsx
'use client';

import * as React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useLanguage } from '@/context/language-context';
import { SendHorizonal } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar'; // Removed AvatarImage

interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface ChatbotDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

export function ChatbotDialog({ isOpen, onOpenChange }: ChatbotDialogProps) {
  const { t } = useLanguage();
  const [messages, setMessages] = React.useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = React.useState('');
  const [isBotTyping, setIsBotTyping] = React.useState(false);
  const scrollAreaRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          id: 'initial-bot-message',
          text: t('chatbot.greeting'),
          sender: 'bot',
          timestamp: new Date(),
        },
      ]);
    }
  }, [isOpen, t, messages.length]);

  React.useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({ top: scrollAreaRef.current.scrollHeight, behavior: 'smooth' });
    }
  }, [messages, isBotTyping]);


  const handleSendMessage = () => {
    if (inputValue.trim() === '') return;

    const newUserMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      text: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prevMessages) => [...prevMessages, newUserMessage]);
    setIsBotTyping(true);
    
    const lowerCaseInput = inputValue.toLowerCase();
    let botResponseText = t('chatbot.simulatedResponse'); // Default response

    if (lowerCaseInput.includes('smartregi') || (lowerCaseInput.includes('connect') && (lowerCaseInput.includes('pos') || lowerCaseInput.includes('smartregi')))) {
      botResponseText = t('chatbot.smartregiConnectResponse');
    }

    setInputValue('');

    // Simulate bot response
    setTimeout(() => {
      const botResponse: ChatMessage = {
        id: `bot-${Date.now()}`,
        text: botResponseText,
        sender: 'bot',
        timestamp: new Date(),
      };
      setIsBotTyping(false);
      setMessages((prevMessages) => [...prevMessages, botResponse]);
    }, 1500); // Increased delay to make typing indicator more visible
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] md:max-w-[550px] lg:max-w-[40vw] h-[70vh] flex flex-col p-0">
        <DialogHeader className="p-6 pb-2">
          <DialogTitle>{t('chatbot.title')}</DialogTitle>
          <DialogDescription>{t('chatbot.description')}</DialogDescription>
        </DialogHeader>
        <ScrollArea className="flex-grow p-6 pt-0" ref={scrollAreaRef}>
          <div className="space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex items-end gap-2 ${
                  msg.sender === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                {msg.sender === 'bot' && (
                  <Avatar className="h-8 w-8">
                    {/* <AvatarImage src="https://picsum.photos/seed/alyka-bot/100/100" alt="Bot Avatar" data-ai-hint="robot face"/> */}
                    <AvatarFallback>B</AvatarFallback>
                  </Avatar>
                )}
                <div
                  className={`max-w-[70%] rounded-lg px-3 py-2 text-sm ${
                    msg.sender === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground'
                  }`}
                >
                  <p className="whitespace-pre-wrap">{msg.text}</p>
                  <p className={`text-xs mt-1 ${msg.sender === 'user' ? 'text-primary-foreground/70 text-right' : 'text-muted-foreground/70'}`}>
                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
                 {msg.sender === 'user' && (
                  <Avatar className="h-8 w-8">
                    {/* <AvatarImage src="https://picsum.photos/seed/alyka-user/100/100" alt="User Avatar" data-ai-hint="person silhouette"/> */}
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}
            {isBotTyping && (
              <div className="flex items-end gap-2 justify-start">
                <Avatar className="h-8 w-8">
                  {/* <AvatarImage src="https://picsum.photos/seed/alyka-bot/100/100" alt="Bot Avatar" data-ai-hint="robot face"/> */}
                  <AvatarFallback>B</AvatarFallback>
                </Avatar>
                <div className="max-w-[70%] rounded-lg px-3 py-2 text-sm bg-muted text-muted-foreground">
                  <div className="flex space-x-1 items-center h-5">
                    <span className="animate-bounce [animation-delay:-0.3s] inline-block h-2 w-2 rounded-full bg-current opacity-75"></span>
                    <span className="animate-bounce [animation-delay:-0.15s] inline-block h-2 w-2 rounded-full bg-current opacity-75"></span>
                    <span className="animate-bounce inline-block h-2 w-2 rounded-full bg-current opacity-75"></span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
        <DialogFooter className="p-6 pt-2 border-t">
          <div className="flex w-full items-center space-x-2">
            <Input
              id="chatbot-input"
              placeholder={t('chatbot.inputPlaceholder')}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter' && !isBotTyping) { // Prevent sending while bot is typing
                  handleSendMessage();
                }
              }}
              className="flex-grow"
              disabled={isBotTyping}
            />
            <Button type="submit" size="icon" onClick={handleSendMessage} aria-label={t('chatbot.sendButton')} disabled={isBotTyping}>
              <SendHorizonal className="h-4 w-4" />
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
