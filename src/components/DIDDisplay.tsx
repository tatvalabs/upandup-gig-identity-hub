
import { Copy, QrCode, Shield, ExternalLink } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

interface DIDDisplayProps {
  did: string;
  blockchainStatus: "active" | "pending" | "error";
  createdDate: string;
}

const DIDDisplay = ({ did, blockchainStatus, createdDate }: DIDDisplayProps) => {
  const { toast } = useToast();

  const copyDID = () => {
    navigator.clipboard.writeText(did);
    toast({
      title: "DID Copied",
      description: "Your DID has been copied to clipboard",
    });
  };

  const getStatusColor = () => {
    switch (blockchainStatus) {
      case "active":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-red-100 text-red-800";
    }
  };

  return (
    <Card className="pulse-glow border-primary/20">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Shield className="h-6 w-6 text-primary" />
            <span>Your Digital Identity</span>
          </div>
          <Badge variant="secondary" className={getStatusColor()}>
            {blockchainStatus}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-sm text-gray-600 mb-2">DID (Decentralized Identifier)</p>
          <div className="flex items-center justify-between bg-white p-3 rounded border">
            <code className="text-sm font-mono text-primary truncate flex-1 mr-2">
              {did}
            </code>
            <Button variant="outline" size="sm" onClick={copyDID}>
              <Copy className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Created on CORD Network</span>
          <span className="font-medium">{createdDate}</span>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Button variant="outline" size="sm">
            <QrCode className="h-4 w-4 mr-2" />
            QR Code
          </Button>
          <Button variant="outline" size="sm">
            <ExternalLink className="h-4 w-4 mr-2" />
            View on Chain
          </Button>
        </div>

        <div className="text-xs text-gray-500 text-center">
          🔒 Secured by CORD Blockchain Network
        </div>
      </CardContent>
    </Card>
  );
};

export default DIDDisplay;
