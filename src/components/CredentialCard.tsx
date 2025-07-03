
import { Calendar, ExternalLink, CheckCircle, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface CredentialCardProps {
  title: string;
  issuer: string;
  issueDate: string;
  status: "verified" | "pending" | "expired";
  type: "document" | "skill" | "certification";
  vcUrl?: string;
}

const CredentialCard = ({ title, issuer, issueDate, status, type, vcUrl }: CredentialCardProps) => {
  const getStatusIcon = () => {
    switch (status) {
      case "verified":
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-600" />;
      default:
        return <Clock className="h-4 w-4 text-red-600" />;
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case "verified":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-red-100 text-red-800";
    }
  };

  const getTypeColor = () => {
    switch (type) {
      case "document":
        return "bg-blue-100 text-blue-800";
      case "skill":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Card className="slide-up hover:shadow-lg transition-shadow duration-200">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between text-lg">
          <span className="truncate">{title}</span>
          {getStatusIcon()}
        </CardTitle>
        <div className="flex items-center space-x-2">
          <Badge variant="secondary" className={getTypeColor()}>
            {type}
          </Badge>
          <Badge variant="secondary" className={getStatusColor()}>
            {status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div>
          <p className="text-sm text-gray-600 mb-1">Issued by</p>
          <p className="font-medium">{issuer}</p>
        </div>
        
        <div className="flex items-center text-sm text-gray-600">
          <Calendar className="h-4 w-4 mr-2" />
          {issueDate}
        </div>

        {vcUrl && (
          <Button variant="outline" size="sm" className="w-full">
            <ExternalLink className="h-4 w-4 mr-2" />
            View Credential
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default CredentialCard;
