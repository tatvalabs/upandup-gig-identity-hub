
import { Shield, Menu, Bell, User, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <Link to="/" className="flex items-center space-x-2">
              <Shield className="h-8 w-8 text-primary" />
              <span className="font-bold text-xl text-gray-900">UpandUp</span>
              <Badge variant="secondary" className="text-xs">
                CORD Network
              </Badge>
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            <Link to="/docs">
              <Button 
                variant={location.pathname === "/docs" ? "default" : "ghost"} 
                size="sm"
              >
                <BookOpen className="h-4 w-4 mr-2" />
                Documentation
              </Button>
            </Link>
            <Button variant="ghost" size="sm">
              <Bell className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="sm">
              <User className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="sm" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
