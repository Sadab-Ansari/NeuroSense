import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Mic, Camera, ArrowRight, CheckCircle, Star, Zap } from "lucide-react";
import { Link } from "react-router-dom";

const inputMethods = [
  {
    id: "text",
    title: "Text Analysis",
    description: "Share your thoughts through written text. Our AI analyzes linguistic patterns, sentiment, and emotional indicators in your writing.",
    icon: MessageSquare,
    accuracy: "92%",
    time: "2-3 minutes",
    features: ["Sentiment analysis", "Emotion detection", "Language patterns", "Stress indicators"],
    color: "from-blue-500 to-blue-600",
    recommended: false
  },
  {
    id: "voice",
    title: "Voice Analysis",
    description: "Speak naturally and let our AI analyze vocal patterns, tone, pace, and emotional cues in your speech.",
    icon: Mic,
    accuracy: "95%",
    time: "3-5 minutes", 
    features: ["Vocal emotion detection", "Stress analysis", "Tone patterns", "Speech rhythm"],
    color: "from-green-500 to-green-600",
    recommended: false
  },
  {
    id: "webcam",
    title: "Facial Expression Analysis",
    description: "Our advanced computer vision analyzes micro-expressions and facial cues to detect emotional states with high precision.",
    icon: Camera,
    accuracy: "98%",
    time: "1-2 minutes",
    features: ["Micro-expression detection", "Real-time analysis", "Emotion mapping", "Stress visualization"],
    color: "from-purple-500 to-purple-600",
    recommended: true
  }
];

export default function ModelSelection() {
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fade-in">
      {/* Header */}
      <div className="text-center space-y-4">
        <Badge className="bg-gradient-to-r from-blue-50 to-green-50 text-blue-700 border border-blue-200 dark:from-blue-900/20 dark:to-green-900/20 dark:text-blue-300 dark:border-blue-700">
          <Zap className="w-3 h-3 mr-1" />
          AI-Powered Analysis
        </Badge>
        <h1 className="text-4xl font-bold gradient-text">Choose Your Assessment Method</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Select how you'd like to share your emotional state. Our AI will analyze your input to provide personalized insights.
        </p>
      </div>

      {/* Method Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-6">
        {inputMethods.map((method, index) => (
          <Card 
            key={method.id} 
            className={`glass-card cursor-pointer transition-all duration-300 hover:shadow-2xl hover:scale-105 animate-scale-in h-full flex flex-col ${
              selectedMethod === method.id ? 'ring-2 ring-blue-500 shadow-2xl border-blue-200 dark:ring-blue-400 dark:border-blue-600 scale-105' : 'hover:shadow-lg'
            } ${method.recommended ? 'glow-card' : ''}`}
            style={{ animationDelay: `${index * 0.1}s` }}
            onClick={() => setSelectedMethod(method.id)}
          >
            <CardHeader className="relative pt-8 pb-6">
              {method.recommended && (
                <Badge className="absolute top-0 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-yellow-400 to-green-500 text-white font-bold shadow-xl border-2 border-white dark:border-gray-800 px-3 py-1 text-xs z-10">
                  <Star className="w-3 h-3 mr-1 fill-current" />
                  RECOMMENDED
                </Badge>
              )}
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${method.color} flex items-center justify-center mx-auto mb-4`}>
                <method.icon className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-center text-xl">{method.title}</CardTitle>
              <CardDescription className="text-center text-sm leading-relaxed">
                {method.description}
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-4 flex-grow flex flex-col">
              {/* Stats */}
              <div className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
                <div className="text-center flex-1">
                  <p className="text-sm text-muted-foreground">Accuracy</p>
                  <p className="font-bold text-primary">{method.accuracy}</p>
                </div>
                <div className="w-px h-8 bg-border"></div>
                <div className="text-center flex-1">
                  <p className="text-sm text-muted-foreground">Time</p>
                  <p className="font-bold">{method.time}</p>
                </div>
              </div>

              {/* Features */}
              <div className="space-y-2 flex-grow">
                <p className="text-sm font-medium text-muted-foreground">Key Features:</p>
                <ul className="space-y-1">
                  {method.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Selection Button */}
              <div className="mt-auto pt-4">
                <Button 
                  className={`w-full transition-all duration-300 font-medium transform hover:scale-105 ${
                    selectedMethod === method.id 
                      ? 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-md hover:shadow-lg dark:from-blue-500 dark:to-blue-600 dark:hover:from-blue-600 dark:hover:to-blue-700 scale-105' 
                      : 'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 hover:from-blue-100 hover:to-green-100 hover:text-blue-700 border border-gray-300 shadow-sm hover:shadow-md dark:from-gray-700 dark:to-gray-800 dark:text-gray-200 dark:hover:from-blue-900/30 dark:hover:to-green-900/30 dark:hover:text-blue-300 dark:border-gray-600'
                  }`}
                  onClick={() => setSelectedMethod(method.id)}
                >
                  {selectedMethod === method.id ? (
                    <>
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Selected
                    </>
                  ) : (
                    'Select Method'
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Continue Button */}
      {selectedMethod && (
        <div className="text-center animate-slide-up">
          <div className="inline-flex flex-col items-center gap-4 p-6 bg-gradient-to-r from-blue-50/50 to-green-50/50 rounded-2xl border border-blue-200 dark:from-blue-900/10 dark:to-green-900/10 dark:border-blue-700">
            <p className="text-muted-foreground">
              Ready to start your mental health assessment using{" "}
              <span className="font-semibold text-foreground">
                {inputMethods.find(m => m.id === selectedMethod)?.title}
              </span>
            </p>
            <Link to="/test" state={{ method: selectedMethod }}>
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg hover:shadow-xl text-lg px-8 py-6 transform hover:scale-105 transition-all duration-300 dark:from-blue-500 dark:to-blue-600 dark:hover:from-blue-600 dark:hover:to-blue-700">
                Begin Assessment
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      )}

      {/* Info Section */}
      <Card className="glass-card bg-gradient-to-r from-muted/30 to-muted/10">
        <CardContent className="p-8 text-center space-y-4">
          <h3 className="text-2xl font-bold">Why Multiple Methods?</h3>
          <p className="text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Different people express emotions differently. By offering multiple analysis methods, we can provide 
            the most accurate and personalized mental health insights. Our AI combines multiple data points 
            to create a comprehensive emotional profile.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="space-y-2">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500/10 to-blue-600/10 rounded-xl flex items-center justify-center mx-auto">
                <MessageSquare className="h-6 w-6 text-blue-500" />
              </div>
              <h4 className="font-semibold">Text Analysis</h4>
              <p className="text-sm text-muted-foreground">Perfect for reflective, detailed emotional expression</p>
            </div>
            <div className="space-y-2">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500/10 to-green-600/10 rounded-xl flex items-center justify-center mx-auto">
                <Mic className="h-6 w-6 text-green-500" />
              </div>
              <h4 className="font-semibold">Voice Analysis</h4>
              <p className="text-sm text-muted-foreground">Captures vocal emotions and stress patterns</p>
            </div>
            <div className="space-y-2">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500/10 to-purple-600/10 rounded-xl flex items-center justify-center mx-auto">
                <Camera className="h-6 w-6 text-purple-500" />
              </div>
              <h4 className="font-semibold">Facial Analysis</h4>
              <p className="text-sm text-muted-foreground">Detects micro-expressions and unconscious cues</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}