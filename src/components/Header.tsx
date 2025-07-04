import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const Header = () => {
  const navigate = useNavigate();
  
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <Link to="/" className="flex items-center">
              <img src="/upandup-logo.svg" alt="UpandUp Logo" className="h-8 w-auto" />
              <span className="font-bold text-xl ml-2">UpandUp</span>
            </Link>
            <nav className="hidden md:flex space-x-6">
              <button
                onClick={() => navigate('/')}
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                Home
              </button>
              <button
                onClick={() => navigate('/partner-onboarding')}
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                Partner Onboarding
              </button>
              <button
                onClick={() => navigate('/partner-dashboard')}
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                Partner Dashboard
              </button>
              <button
                onClick={() => navigate('/documentation')}
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                Documentation
              </button>
            </nav>
          </div>
          
          <div className="flex items-center space-x-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>Support</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
