
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar } from '@/components/ui/avatar';
import { Card } from '@/components/ui/card';
import { Send } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'agent';
  timestamp: Date;
}

interface ChatInterfaceProps {
  onUpdateItinerary: (preferences: string) => void;
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({ onUpdateItinerary }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi there! I'm your WanderWise AI travel assistant for Sri Lanka. I'll help you create the perfect itinerary. What kind of experience are you looking for?",
      sender: 'agent',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const agentResponses = [
    "I've noted your preferences. How many days are you planning to stay in Sri Lanka?",
    "That sounds exciting! Are you more interested in beaches, cultural sites, wildlife, or tea country?",
    "Got it. Would you like to include any specific activities like surfing, hiking, or safari?",
    "I'll factor that in. What's your preferred accommodation style - luxury hotels, boutique stays, or budget options?",
    "Perfect! I'm creating your personalized Sri Lanka itinerary now. You can see it updating on the right."
  ];
  
  const sendMessage = () => {
    if (!inputText.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    
    // Pass user input to parent component to update itinerary
    onUpdateItinerary(inputText);
    
    // Simulate agent response after a short delay
    setTimeout(() => {
      const randomResponse = agentResponses[Math.floor(Math.random() * agentResponses.length)];
      const agentMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: randomResponse,
        sender: 'agent',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, agentMessage]);
    }, 1000);
  };
  
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };
  
  return (
    <Card className="flex flex-col h-full overflow-hidden rounded-2xl glass-panel">
      <div className="p-4 border-b bg-travel-sky/10">
        <h2 className="font-semibold">Chat with WanderWise AI</h2>
        <p className="text-sm text-muted-foreground">Tell me about your dream Sri Lanka trip</p>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div 
            key={message.id} 
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`flex ${message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'} items-start gap-2 max-w-[80%]`}>
              <Avatar className={`${message.sender === 'agent' ? 'bg-travel-sky' : 'bg-travel-sunset'} h-8 w-8`}>
                <div className="text-xs font-bold text-white">
                  {message.sender === 'agent' ? 'AI' : 'You'}
                </div>
              </Avatar>
              
              <div 
                className={`rounded-xl px-4 py-2 ${
                  message.sender === 'user' 
                    ? 'bg-travel-sunset text-white rounded-tr-none' 
                    : 'bg-muted rounded-tl-none'
                } animate-fade-in`}
              >
                <p className="text-sm">{message.text}</p>
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      
      <div className="p-4 border-t">
        <div className="flex gap-2">
          <Input
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Type your travel preferences..."
            className="flex-1"
          />
          <Button 
            onClick={sendMessage} 
            size="icon" 
            className="bg-travel-sky hover:bg-travel-sky/90"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
};
