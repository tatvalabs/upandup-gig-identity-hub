
import { useState } from "react";
import { Upload, File, X, CheckCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

interface UploadedFile {
  id: string;
  name: string;
  type: string;
  status: "uploading" | "uploaded" | "processing" | "completed";
  vcUrl?: string;
}

const DocumentUpload = () => {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [documentType, setDocumentType] = useState("");
  const { toast } = useToast();

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(event.target.files || []);
    
    selectedFiles.forEach((file) => {
      const newFile: UploadedFile = {
        id: Math.random().toString(36).substr(2, 9),
        name: file.name,
        type: documentType,
        status: "uploading",
      };
      
      setFiles(prev => [...prev, newFile]);
      
      // Simulate upload process
      setTimeout(() => {
        setFiles(prev =>
          prev.map(f =>
            f.id === newFile.id ? { ...f, status: "uploaded" } : f
          )
        );
        
        // Simulate VC creation
        setTimeout(() => {
          setFiles(prev =>
            prev.map(f =>
              f.id === newFile.id 
                ? { ...f, status: "processing" } 
                : f
            )
          );
          
          setTimeout(() => {
            setFiles(prev =>
              prev.map(f =>
                f.id === newFile.id 
                  ? { 
                      ...f, 
                      status: "completed",
                      vcUrl: `https://cord-vc.dhiway.com/credential/${newFile.id}`
                    } 
                  : f
              )
            );
            
            toast({
              title: "Credential Created!",
              description: "Your document has been converted to a Verifiable Credential",
            });
          }, 2000);
        }, 1500);
      }, 1000);
    });
  };

  const removeFile = (id: string) => {
    setFiles(prev => prev.filter(f => f.id !== id));
  };

  const getStatusIcon = (status: UploadedFile["status"]) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case "uploading":
      case "processing":
        return (
          <div className="h-5 w-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        );
      default:
        return <File className="h-5 w-5 text-gray-600" />;
    }
  };

  const getStatusText = (status: UploadedFile["status"]) => {
    switch (status) {
      case "uploading":
        return "Uploading...";
      case "uploaded":
        return "Uploaded";
      case "processing":
        return "Creating VC...";
      case "completed":
        return "VC Ready";
      default:
        return "Unknown";
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Upload className="h-6 w-6 text-primary" />
          <span>Upload Documents</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="docType">Document Type</Label>
            <Select onValueChange={setDocumentType}>
              <SelectTrigger>
                <SelectValue placeholder="Select document type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="voter-id">Voter ID</SelectItem>
                <SelectItem value="pan-card">PAN Card</SelectItem>
                <SelectItem value="driving-license">Driving License</SelectItem>
                <SelectItem value="10th-marksheet">10th Mark Sheet</SelectItem>
                <SelectItem value="12th-marksheet">12th Mark Sheet</SelectItem>
                <SelectItem value="diploma">Diploma Certificate</SelectItem>
                <SelectItem value="degree">Degree Certificate</SelectItem>
                <SelectItem value="skill-certificate">Skill Certificate</SelectItem>
                <SelectItem value="employer-appreciation">Employer Appreciation</SelectItem>
                <SelectItem value="training-certificate">Training Certificate</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="file">Choose Files</Label>
            <Input
              id="file"
              type="file"
              multiple
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={handleFileUpload}
              disabled={!documentType}
            />
            {!documentType && (
              <p className="text-sm text-gray-500">Please select document type first</p>
            )}
          </div>
        </div>

        {files.length > 0 && (
          <div className="space-y-3">
            <h3 className="font-semibold">Uploaded Documents</h3>
            {files.map((file) => (
              <div
                key={file.id}
                className="flex items-center justify-between p-3 border rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  {getStatusIcon(file.status)}
                  <div>
                    <p className="font-medium">{file.name}</p>
                    <p className="text-sm text-gray-600">
                      {file.type} • {getStatusText(file.status)}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  {file.vcUrl && (
                    <Button variant="outline" size="sm">
                      View VC
                    </Button>
                  )}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => removeFile(file.id)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DocumentUpload;
