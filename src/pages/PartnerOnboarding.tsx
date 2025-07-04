
import PartnerOnboarding from "@/components/PartnerOnboarding";

const PartnerOnboardingPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Partner with UpandUp
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join the future of workforce identity management. Enable your gig workers 
            with blockchain-verified credentials and build a trusted workforce ecosystem.
          </p>
        </div>
        <PartnerOnboarding />
      </div>
    </div>
  );
};

export default PartnerOnboardingPage;
