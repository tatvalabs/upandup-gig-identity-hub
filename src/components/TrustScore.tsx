
import { Star, TrendingUp, Shield } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

interface TrustScoreProps {
  score: number;
  totalCredentials: number;
  verifiedCredentials: number;
  employerVerified: boolean;
}

const TrustScore = ({ score, totalCredentials, verifiedCredentials, employerVerified }: TrustScoreProps) => {
  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const getScoreBg = (score: number) => {
    if (score >= 80) return "bg-green-100";
    if (score >= 60) return "bg-yellow-100";
    return "bg-red-100";
  };

  return (
    <Card className="slide-up">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            <span>Trust Score</span>
          </div>
          <div className={`text-2xl font-bold ${getScoreColor(score)}`}>
            {score}/100
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className={`p-4 rounded-lg ${getScoreBg(score)}`}>
          <Progress value={score} className="mb-2" />
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Overall Rating</span>
            <div className="flex items-center space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < Math.floor(score / 20) ? "text-yellow-500 fill-yellow-500" : "text-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">{totalCredentials}</div>
            <div className="text-sm text-gray-600">Total Credentials</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{verifiedCredentials}</div>
            <div className="text-sm text-gray-600">Verified</div>
          </div>
        </div>
        
        {employerVerified && (
          <Badge variant="secondary" className="w-full justify-center">
            <Shield className="h-4 w-4 mr-1" />
            Employer Verified
          </Badge>
        )}
      </CardContent>
    </Card>
  );
};

export default TrustScore;
