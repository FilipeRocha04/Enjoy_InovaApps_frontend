import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { ArrowLeft, Send, Paperclip, Phone, Video } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  timestamp: Date;
  sender: 'me' | 'other';
  attachment?: {
    type: 'image' | 'document';
    url: string;
    name: string;
  };
}

interface Chat {
  id: string;
  memberName: string;
  memberPhoto: string;
  lastMessage: string;
  timestamp: Date;
  unread: number;
}

// Mock data
const mockChats: Chat[] = [
  {
    id: '1',
    memberName: 'Carlos Eduardo Silva',
    memberPhoto: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos',
    lastMessage: 'Vamos conversar sobre a proposta de parceria',
    timestamp: new Date(2024, 0, 15, 14, 30),
    unread: 2
  },
  {
    id: '2',
    memberName: 'Marina Santos',
    memberPhoto: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Marina',
    lastMessage: 'Obrigada pela indicação!',
    timestamp: new Date(2024, 0, 15, 9, 15),
    unread: 0
  },
  {
    id: '3',
    memberName: 'Roberto Fernandes',
    memberPhoto: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Roberto',
    lastMessage: 'Quando podemos marcar uma reunião?',
    timestamp: new Date(2024, 0, 14, 16, 45),
    unread: 1
  }
];

const mockMessages: Message[] = [
  {
    id: '1',
    text: 'Olá! Vi seu perfil e gostaria de conversar sobre uma oportunidade de negócio.',
    timestamp: new Date(2024, 0, 15, 14, 20),
    sender: 'other'
  },
  {
    id: '2',
    text: 'Olá Carlos! Fico feliz com seu interesse. Pode me contar mais detalhes?',
    timestamp: new Date(2024, 0, 15, 14, 25),
    sender: 'me'
  },
  {
    id: '3',
    text: 'Vamos conversar sobre a proposta de parceria',
    timestamp: new Date(2024, 0, 15, 14, 30),
    sender: 'other'
  }
];

interface ChatScreenProps {
  onBack: () => void;
}

export const ChatScreen = ({ onBack }: ChatScreenProps) => {
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>(mockMessages);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const message: Message = {
      id: Date.now().toString(),
      text: newMessage,
      timestamp: new Date(),
      sender: 'me'
    };

    setMessages([...messages, message]);
    setNewMessage('');
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('pt-BR', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const formatDate = (date: Date) => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return formatTime(date);
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Ontem';
    } else {
      return date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
    }
  };

  if (selectedChat) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        {/* Chat Header */}
        <div className="bg-surface border-b border-border p-4">
          <div className="flex items-center space-x-4">
            <Button
              onClick={() => setSelectedChat(null)}
              variant="ghost"
              size="sm"
              className="text-text-secondary hover:text-foreground"
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            
            <img
              src={selectedChat.memberPhoto}
              alt={selectedChat.memberName}
              className="w-10 h-10 rounded-lg object-cover"
            />
            
            <div className="flex-1">
              <h2 className="font-semibold text-foreground">
                {selectedChat.memberName}
              </h2>
              <p className="text-xs text-text-muted">Online</p>
            </div>

            <div className="flex space-x-2">
              <Button variant="ghost" size="sm" className="text-copper">
                <Phone className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" className="text-copper">
                <Video className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 p-4 space-y-4 overflow-y-auto">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                  message.sender === 'me'
                    ? 'chat-bubble-sent'
                    : 'chat-bubble-received'
                }`}
              >
                <p className="text-sm">{message.text}</p>
                <p className={`text-xs mt-1 ${
                  message.sender === 'me' ? 'text-black/70' : 'text-text-muted'
                }`}>
                  {formatTime(message.timestamp)}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Message Input */}
        <div className="bg-surface border-t border-border p-4">
          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="sm" className="text-copper">
              <Paperclip className="w-4 h-4" />
            </Button>
            
            <div className="flex-1 flex space-x-2">
              <Input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Digite sua mensagem..."
                className="input-dark"
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              />
              <Button
                onClick={handleSendMessage}
                className="btn-copper"
                disabled={!newMessage.trim()}
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 bg-background border-b border-border p-4">
        <div className="flex items-center space-x-4">
          <Button
            onClick={onBack}
            variant="ghost"
            size="sm"
            className="text-text-secondary hover:text-foreground"
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <h1 className="text-xl font-playfair text-foreground font-semibold">
            Mensagens
          </h1>
        </div>
      </div>

      {/* Chat List */}
      <div className="p-4 space-y-2">
        {mockChats.map((chat) => (
          <Card
            key={chat.id}
            className="card-member cursor-pointer hover:bg-surface-elevated transition-colors"
            onClick={() => setSelectedChat(chat)}
          >
            <div className="flex items-center space-x-4 p-4">
              <div className="relative">
                <img
                  src={chat.memberPhoto}
                  alt={chat.memberName}
                  className="w-12 h-12 rounded-lg object-cover"
                />
                {chat.unread > 0 && (
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-copper rounded-full flex items-center justify-center">
                    <span className="text-xs font-bold text-black">
                      {chat.unread}
                    </span>
                  </div>
                )}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-foreground truncate">
                    {chat.memberName}
                  </h3>
                  <span className="text-xs text-text-muted">
                    {formatDate(chat.timestamp)}
                  </span>
                </div>
                <p className="text-sm text-text-secondary truncate">
                  {chat.lastMessage}
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};