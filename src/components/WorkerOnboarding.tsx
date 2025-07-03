
import { useState } from "react";
import { UserPlus, Upload, CheckCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const WorkerOnboarding = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    aadhar: "",
    employer: "",
  });
  const { toast } = useToast();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    }
  };

  const handleSubmit = () => {
    // Simulate DID creation
    toast({
      title: "DID Created Successfully!",
      description: "Your digital identity has been registered on CORD blockchain",
    });
    setStep(4);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                placeholder="Enter your phone number"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                placeholder="Enter your address"
                value={formData.address}
                onChange={(e) => handleInputChange("address", e.target.value)}
              />
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="aadhar">Aadhar Number</Label>
              <Input
                id="aadhar"
                placeholder="Enter your Aadhar number"
                value={formData.aadhar}
                onChange={(e) => handleInputChange("aadhar", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="employer">Select Employer</Label>
              <Select onValueChange={(value) => handleInputChange("employer", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose your employer" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="security-plus">Security Plus Services</SelectItem>
                  <SelectItem value="guard-pro">Guard Pro Solutions</SelectItem>
                  <SelectItem value="safe-watch">SafeWatch Security</SelectItem>
                  <SelectItem value="elite-security">Elite Security Services</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Review Your Information</h3>
            <div className="bg-gray-50 p-4 rounded-lg space-y-2">
              <p><strong>Name:</strong> {formData.name}</p>
              <p><strong>Phone:</strong> {formData.phone}</p>
              <p><strong>Address:</strong> {formData.address}</p>
              <p><strong>Aadhar:</strong> {formData.aadhar}</p>
              <p><strong>Employer:</strong> {formData.employer}</p>
            </div>
            <div className="text-sm text-gray-600">
              By proceeding, you agree to create a DID on the CORD blockchain network.
              This will be your permanent digital identity.
            </div>
          </div>
        );
      case 4:
        return (
          <div className="text-center space-y-4">
            <CheckCircle className="h-16 w-16 text-green-600 mx-auto" />
            <h3 className="text-xl font-semibold text-green-600">Welcome to UpandUp!</h3>
            <p className="text-gray-600">
              Your DID has been successfully created and registered on the CORD blockchain.
              You can now start uploading your credentials and building your trust score.
            </p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <UserPlus className="h-6 w-6 text-primary" />
          <span>Worker Onboarding</span>
        </CardTitle>
        <div className="flex items-center space-x-2 mt-4">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                i <= step ? "bg-primary text-white" : "bg-gray-200 text-gray-600"
              }`}
            >
              {i}
            </div>
          ))}
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {renderStep()}
        
        {step < 4 && (
          <div className="flex justify-between">
            {step > 1 && (
              <Button variant="outline" onClick={() => setStep(step - 1)}>
                Previous
              </Button>
            )}
            <Button 
              onClick={step === 3 ? handleSubmit : handleNext}
              className="ml-auto"
            >
              {step === 3 ? "Create DID" : "Next"}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default WorkerOnboarding;
