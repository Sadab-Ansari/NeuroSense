import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  MessageSquare, 
  Send, 
  Mic, 
  MicOff,
  Bot,
  User,
  Heart,
  Brain,
  Lightbulb,
  Phone,
  Video,
  Calendar,
  FileText
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUser } from '@clerk/clerk-react';

interface Message {
  id: number;
  content: string;
  sender: "user" | "ai";
  timestamp: Date;
  type?: "text" | "voice" | "suggestion";
}

const initialMessages: Message[] = [
  {
    id: 1,
    content: "Hello! I'm Alex, your AI mental health companion. I'm here to listen, support, and help you navigate your emotional wellness journey. How are you feeling today?",
    sender: "ai",
    timestamp: new Date(),
    type: "text"
  }
];

const quickSuggestions = [
  "I'm feeling anxious about work",
  "Having trouble sleeping lately",
  "Feeling overwhelmed with daily tasks", 
  "Need help managing stress",
  "Dealing with relationship issues",
  "Experiencing low mood"
];

const aiResponses = [
  "I understand that you're going through a difficult time. It's completely normal to feel this way, and I'm here to help you work through it.",
  "Thank you for sharing that with me. Your feelings are valid, and it takes courage to open up about what you're experiencing.",
  "That sounds challenging. Let's explore some strategies that might help you feel more in control of the situation.",
  "I hear you, and I want you to know that you're not alone in this. Many people experience similar feelings, and there are effective ways to manage them.",
  "It's great that you're reaching out for support. That shows real strength and self-awareness on your part."
];

export default function AISupport() {
  const { user: clerkUser } = useUser();
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [newMessage, setNewMessage] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (content: string) => {
    if (!content.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      content,
      sender: "user",
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setNewMessage("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: Date.now() + 1,
        content: aiResponses[Math.floor(Math.random() * aiResponses.length)],
        sender: "ai",
        timestamp: new Date()
      };
      setIsTyping(false);
      setMessages(prev => [...prev, aiMessage]);
    }, 2000);
  };

  const handleVoiceToggle = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      // Start recording
      setTimeout(() => {
        setIsRecording(false);
        handleSendMessage("Voice message: I need some support with my anxiety today.");
      }, 3000);
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="max-w-4xl mx-auto h-[calc(100vh-8rem)] flex flex-col animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
              <Bot className="h-6 w-6 text-white" />
            </div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-background animate-pulse"></div>
          </div>
          <div>
            <h1 className="text-2xl font-bold gradient-text">AI Mental Health Support</h1>
            <p className="text-muted-foreground flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              Alex is online and ready to help
            </p>
          </div>
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Phone className="h-4 w-4 mr-2" />
            Voice Call
          </Button>
          <Button variant="outline" size="sm">
            <Video className="h-4 w-4 mr-2" />
            Video Call
          </Button>
        </div>
      </div>

      {/* Chat Container */}
      <Card className="glass-card flex-1 flex flex-col">
        {/* Messages */}
        <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-3 ${
                message.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {message.sender === "ai" && (
                <Avatar className="w-8 h-8">
                  <AvatarFallback className="bg-blue-500">
                    <Bot className="h-4 w-4 text-white" />
                  </AvatarFallback>
                </Avatar>
              )}
              
              <div
                className={`max-w-[70%] rounded-2xl p-4 ${
                  message.sender === "user"
                    ? "bg-gradient-to-r from-primary to-accent text-white"
                    : "bg-muted/50 border border-border/50"
                }`}
              >
                <p className="text-sm leading-relaxed">{message.content}</p>
                <p className={`text-xs mt-2 ${
                  message.sender === "user" ? "text-white/70" : "text-muted-foreground"
                }`}>
                  {formatTime(message.timestamp)}
                </p>
              </div>

              {message.sender === "user" && (
                <Avatar className="w-8 h-8">
                  <AvatarImage src={clerkUser?.imageUrl} />
                  <AvatarFallback className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                    {clerkUser?.firstName?.charAt(0) || clerkUser?.emailAddresses[0]?.emailAddress?.charAt(0)?.toUpperCase() || 'U'}
                  </AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="flex gap-3 justify-start">
              <Avatar className="w-8 h-8">
                <AvatarFallback className="bg-gradient-to-r from-primary to-accent">
                  <Bot className="h-4 w-4 text-white" />
                </AvatarFallback>
              </Avatar>
              <div className="bg-muted/50 border border-border/50 rounded-2xl p-4">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </CardContent>

        {/* Quick Suggestions */}
        <div className="p-4 border-t border-border/50">
          <div className="flex flex-wrap gap-2 mb-4">
            {quickSuggestions.map((suggestion, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                className="text-xs"
                onClick={() => handleSendMessage(suggestion)}
              >
                {suggestion}
              </Button>
            ))}
          </div>
        </div>

        {/* Message Input */}
        <div className="p-4 border-t border-border/50">
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <Input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Share what's on your mind..."
                className="pr-12 bg-muted/30 border-border/50 focus:bg-background"
                onKeyPress={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage(newMessage);
                  }
                }}
              />
              <Button
                size="sm"
                variant="ghost"
                className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 p-0"
                onClick={() => handleSendMessage(newMessage)}
                disabled={!newMessage.trim()}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
            
            <Button
              size="sm"
              variant="outline"
              className={`${
                isRecording 
                  ? "bg-red-500 hover:bg-red-600 text-white" 
                  : "bg-gradient-to-r from-green-500/10 to-green-600/10 text-green-600 border-green-500/20"
              }`}
              onClick={handleVoiceToggle}
            >
              {isRecording ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
            </Button>
          </div>
          
          {isRecording && (
            <div className="mt-2 text-center">
              <Badge className="bg-red-500 text-white animate-pulse">
                Recording... Speak now
              </Badge>
            </div>
          )}
        </div>
      </Card>

      {/* Support Resources */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <Card className="glass-card bg-gradient-to-r from-green-500/5 to-green-600/5 border-green-500/20">
          <CardContent className="p-4 text-center">
            <Heart className="h-6 w-6 text-green-500 mx-auto mb-2" />
            <h3 className="font-semibold text-sm">Crisis Support</h3>
            <p className="text-xs text-muted-foreground">24/7 emergency helpline</p>
          </CardContent>
        </Card>

        <Card className="glass-card bg-gradient-to-r from-blue-500/5 to-blue-600/5 border-blue-500/20">
          <CardContent className="p-4 text-center">
            <Calendar className="h-6 w-6 text-blue-500 mx-auto mb-2" />
            <h3 className="font-semibold text-sm">Schedule Session</h3>
            <p className="text-xs text-muted-foreground">Book with therapist</p>
          </CardContent>
        </Card>

        <Card className="glass-card bg-gradient-to-r from-purple-500/5 to-purple-600/5 border-purple-500/20">
          <CardContent className="p-4 text-center">
            <FileText className="h-6 w-6 text-purple-500 mx-auto mb-2" />
            <h3 className="font-semibold text-sm">Resources</h3>
            <p className="text-xs text-muted-foreground">Self-help guides</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}