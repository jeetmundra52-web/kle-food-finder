import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Store, ArrowLeft } from "lucide-react";
import { toast } from "sonner";

const VendorAuth = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Login successful!");
      navigate("/vendor/dashboard");
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-muted via-background to-muted flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/")}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-2">
            <Store className="h-6 w-6 text-secondary" />
            <span className="text-xl font-bold">Vendor Portal</span>
          </div>
        </div>

        <Card className="p-6">
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-foreground">Vendor Login</h2>
              <p className="text-sm text-muted-foreground">Access your shop dashboard</p>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="vendor-email">Email</Label>
                <Input 
                  id="vendor-email" 
                  type="email" 
                  placeholder="vendor@shop.com"
                  required 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="vendor-password">Password</Label>
                <Input 
                  id="vendor-password" 
                  type="password"
                  placeholder="••••••••"
                  required 
                />
              </div>
            </div>
            
            <Button type="submit" variant="secondary" className="w-full" disabled={isLoading}>
              {isLoading ? "Logging in..." : "Login to Dashboard"}
            </Button>
            
            <p className="text-xs text-center text-muted-foreground">
              New vendor? Contact admin for registration
            </p>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default VendorAuth;
