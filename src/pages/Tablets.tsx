import { useState } from "react";
import Tablets from "@/components/Tablets";
import { Button } from "@/components/ui/button";
import { Shield } from "lucide-react";

const TabletsPage = () => {
  const [showAdmin, setShowAdmin] = useState(false);
  const [keyInput, setKeyInput] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const ADMIN_KEY = "admin123"; // Same key used in the Tablets component

  const handleAdminAccess = () => {
    if (keyInput === ADMIN_KEY) {
      setIsAuthenticated(true);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
          <div className="flex justify-center">
            {/* <Button 
              onClick={() => setShowAdmin(true)}
              className="flex items-center gap-2"
            >
              <Shield className="h-4 w-4" />
              Admin Access
            </Button> */}
          </div>
            <Tablets />
      </div>
    </div>
  );
};

export default TabletsPage;