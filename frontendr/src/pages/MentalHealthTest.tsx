import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { 
  MessageSquare, 
  Mic, 
  Camera, 
  ArrowRight, 
  ArrowLeft,
  Play,
  Pause,
  Square,
  Video,
  VideoOff,
  CheckCircle
} from "lucide-react";

const questions = [
  {
    id: 1,
    text: "How would you describe your overall mood today?",
    category: "mood",
    type: "open"
  },
  {
    id: 2,
    text: "What has been causing you stress lately?",
    category: "stress",
    type: "open"
  },
  {
    id: 3,
    text: "How well have you been sleeping recently?",
    category: "sleep",
    type: "scale",
    options: ["Very Poor", "Poor", "Fair", "Good", "Excellent"]
  },
  {
    id: 4,
    text: "Describe a recent situation that made you feel anxious or worried.",
    category: "anxiety",
    type: "open"
  },
  {
    id: 5,
    text: "How would you rate your energy levels this week?",
    category: "energy",
    type: "scale",
    options: ["Very Low", "Low", "Moderate", "High", "Very High"]
  },
  {
    id: 6,
    text: "What activities or thoughts bring you joy and positivity?",
    category: "positivity",
    type: "open"
  },
  {
    id: 7,
    text: "How connected do you feel to your friends and family right now?",
    category: "social",
    type: "scale",
    options: ["Not at all", "Slightly", "Moderately", "Very", "Extremely"]
  },
  {
    id: 8,
    text: "Share any physical symptoms you've been experiencing (headaches, fatigue, etc.)",
    category: "physical",
    type: "open"
  }
];

export default function MentalHealthTest() {
  const location = useLocation();
  const navigate = useNavigate();
  const method = location.state?.method || "text";
  
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [isRecording, setIsRecording] = useState(false);
  const [isVideoRecording, setIsVideoRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);

  // Mock recording timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRecording || isVideoRecording) {
      interval = setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);
    } else {
      setRecordingTime(0);
    }
    return () => clearInterval(interval);
  }, [isRecording, isVideoRecording]);

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const question = questions[currentQuestion];

  const handleAnswer = (answer: string) => {
    setAnswers({ ...answers, [question.id]: answer });
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Navigate to results page with answers
      navigate("/results", { 
        state: { 
          method, 
          answers,
          completed: true 
        } 
      });
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getMethodIcon = () => {
    switch (method) {
      case "voice": return Mic;
      case "webcam": return Camera;
      default: return MessageSquare;
    }
  };

  const getMethodColor = () => {
    switch (method) {
      case "voice": return "from-green-500 to-green-600";
      case "webcam": return "from-purple-500 to-purple-600";
      default: return "from-blue-500 to-blue-600";
    }
  };

  const MethodIcon = getMethodIcon();

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3">
          <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${getMethodColor()} flex items-center justify-center`}>
            <MethodIcon className="h-6 w-6 text-white" />
          </div>
          <div className="text-left">
            <h1 className="text-2xl font-bold">Mental Health Assessment</h1>
            <p className="text-muted-foreground capitalize">{method} Analysis Method</p>
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Question {currentQuestion + 1} of {questions.length}</span>
            <span>{Math.round(progress)}% Complete</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </div>

      {/* Question Card */}
      <Card className="glass-card animate-slide-up">
        <CardHeader>
          <div className="flex items-center justify-between">
            <Badge className="bg-gradient-to-r from-primary/10 to-accent/10 text-primary capitalize">
              {question.category}
            </Badge>
            <Badge variant="outline">
              {question.type === "open" ? "Open Response" : "Scale Response"}
            </Badge>
          </div>
          <CardTitle className="text-xl leading-relaxed">{question.text}</CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Input based on method */}
          {method === "text" && (
            <div className="space-y-4">
              {question.type === "open" ? (
                <Textarea
                  placeholder="Share your thoughts here..."
                  value={answers[question.id] || ""}
                  onChange={(e) => handleAnswer(e.target.value)}
                  className="min-h-[120px] bg-muted/30 border-border/50 focus:bg-background transition-all duration-200"
                />
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {question.options?.map((option) => (
                    <Button
                      key={option}
                      variant={answers[question.id] === option ? "default" : "outline"}
                      className={`p-4 h-auto text-left justify-start transition-all duration-200 ${
                        answers[question.id] === option 
                          ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-md hover:from-blue-700 hover:to-blue-800 dark:from-blue-500 dark:to-blue-600" 
                          : "hover:bg-muted/50"
                      }`}
                      onClick={() => handleAnswer(option)}
                    >
                      {answers[question.id] === option && (
                        <CheckCircle className="h-4 w-4 mr-2" />
                      )}
                      {option}
                    </Button>
                  ))}
                </div>
              )}
            </div>
          )}

          {method === "voice" && (
            <div className="space-y-4">
              <div className="text-center p-8 bg-gradient-to-r from-green-500/5 to-green-600/5 rounded-xl border border-green-500/20">
                <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center">
                  <Mic className="h-12 w-12 text-white" />
                </div>
                <p className="text-lg font-medium mb-2">Voice Recording</p>
                <p className="text-muted-foreground mb-4">
                  Click the button below and speak your response naturally
                </p>
                {isRecording && (
                  <div className="mb-4">
                    <Badge className="bg-red-500 text-white animate-pulse">
                      Recording: {formatTime(recordingTime)}
                    </Badge>
                  </div>
                )}
                <div className="flex justify-center gap-2">
                  <Button
                    size="lg"
                    className={`${
                      isRecording 
                        ? "bg-red-500 hover:bg-red-600" 
                        : "bg-gradient-to-r from-green-500 to-green-600 hover:opacity-90"
                    }`}
                    onClick={() => {
                      setIsRecording(!isRecording);
                      if (!isRecording) {
                        handleAnswer(`Voice recording for question ${question.id}`);
                      }
                    }}
                  >
                    {isRecording ? (
                      <>
                        <Square className="mr-2 h-4 w-4" />
                        Stop Recording
                      </>
                    ) : (
                      <>
                        <Play className="mr-2 h-4 w-4" />
                        Start Recording
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          )}

          {method === "webcam" && (
            <div className="space-y-4">
              <div className="text-center p-8 bg-gradient-to-r from-purple-500/5 to-purple-600/5 rounded-xl border border-purple-500/20">
                <div className="w-32 h-24 mx-auto mb-4 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <Camera className="h-8 w-8 text-white" />
                </div>
                <p className="text-lg font-medium mb-2">Facial Expression Analysis</p>
                <p className="text-muted-foreground mb-4">
                  Look at the camera and think about the question for a few moments
                </p>
                {isVideoRecording && (
                  <div className="mb-4">
                    <Badge className="bg-red-500 text-white animate-pulse">
                      Analyzing: {formatTime(recordingTime)}
                    </Badge>
                  </div>
                )}
                <div className="flex justify-center gap-2">
                  <Button
                    size="lg"
                    className={`${
                      isVideoRecording 
                        ? "bg-red-500 hover:bg-red-600" 
                        : "bg-gradient-to-r from-purple-500 to-purple-600 hover:opacity-90"
                    }`}
                    onClick={() => {
                      setIsVideoRecording(!isVideoRecording);
                      if (!isVideoRecording) {
                        handleAnswer(`Facial analysis for question ${question.id}`);
                      }
                    }}
                  >
                    {isVideoRecording ? (
                      <>
                        <VideoOff className="mr-2 h-4 w-4" />
                        Stop Analysis
                      </>
                    ) : (
                      <>
                        <Video className="mr-2 h-4 w-4" />
                        Start Analysis
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between items-center pt-4">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Previous
            </Button>

            <Button
              onClick={handleNext}
              disabled={!answers[question.id]}
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-md hover:shadow-lg dark:from-blue-500 dark:to-blue-600 dark:hover:from-blue-600 dark:hover:to-blue-700 flex items-center gap-2"
            >
              {currentQuestion === questions.length - 1 ? "Complete Assessment" : "Next Question"}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Progress Info */}
      <Card className="glass-card bg-gradient-to-r from-muted/30 to-muted/10">
        <CardContent className="p-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Assessment Progress</span>
            <div className="flex items-center gap-4">
              <span>{currentQuestion + 1}/{questions.length} questions</span>
              <Badge className="bg-gradient-to-r from-blue-50 to-green-50 text-blue-700 border border-blue-200 dark:from-blue-900/20 dark:to-green-900/20 dark:text-blue-300 dark:border-blue-700">
                {Math.round(progress)}% complete
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}