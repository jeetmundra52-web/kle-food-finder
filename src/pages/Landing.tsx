import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Store, User, TrendingUp, Clock } from "lucide-react";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-muted via-background to-muted">
      {/* Header */}
      <header className="border-b bg-card/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Store className="h-8 w-8 text-primary" />
              <div>
                <h1 className="text-2xl font-bold text-foreground">The Hub</h1>
                <p className="text-xs text-muted-foreground">KLE Campus Canteen</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <h2 className="text-5xl font-bold text-foreground">
              Campus Cravings,
              <span className="bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">
                {" "}Delivered Fast
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Order from 7 amazing shops on campus. Quick pickup or delivery right to your location.
            </p>
          </div>

          {/* Role Selection Cards */}
          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto pt-8">
            <Card 
              className="p-8 hover:shadow-xl transition-all cursor-pointer border-2 hover:border-primary group"
              onClick={() => navigate("/auth/student")}
            >
              <div className="space-y-4 text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto group-hover:bg-primary/20 transition-colors">
                  <User className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-foreground">Order as Student</h3>
                <p className="text-muted-foreground">
                  Browse shops, place orders, track delivery, and rate your favorites
                </p>
                <Button className="w-full mt-4" size="lg">
                  Get Started
                </Button>
              </div>
            </Card>

            <Card 
              className="p-8 hover:shadow-xl transition-all cursor-pointer border-2 hover:border-secondary group"
              onClick={() => navigate("/auth/vendor")}
            >
              <div className="space-y-4 text-center">
                <div className="w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center mx-auto group-hover:bg-secondary/20 transition-colors">
                  <Store className="h-8 w-8 text-secondary" />
                </div>
                <h3 className="text-2xl font-bold text-foreground">Vendor Login</h3>
                <p className="text-muted-foreground">
                  Manage your shop, update menus, view orders, and grow your business
                </p>
                <Button variant="secondary" className="w-full mt-4" size="lg">
                  Vendor Portal
                </Button>
              </div>
            </Card>
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-6 pt-16 max-w-3xl mx-auto">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mx-auto">
                <Store className="h-6 w-6 text-accent" />
              </div>
              <h4 className="font-semibold text-foreground">7 Amazing Shops</h4>
              <p className="text-sm text-muted-foreground">Variety of cuisines and options</p>
            </div>
            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <h4 className="font-semibold text-foreground">Quick Delivery</h4>
              <p className="text-sm text-muted-foreground">Fast pickup or campus delivery</p>
            </div>
            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center mx-auto">
                <TrendingUp className="h-6 w-6 text-secondary" />
              </div>
              <h4 className="font-semibold text-foreground">Live Offers</h4>
              <p className="text-sm text-muted-foreground">Daily discounts and deals</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;
