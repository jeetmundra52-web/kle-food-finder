import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { 
  Store, 
  Search, 
  Clock, 
  Star, 
  Tag, 
  ShoppingCart,
  User,
  LogOut
} from "lucide-react";

// Mock data for 7 shops
const shops = [
  {
    id: 1,
    name: "South Indian Express",
    location: "Ground Floor, Building A",
    rating: 4.5,
    reviews: 234,
    isOpen: true,
    prepTime: "15-20 min",
    offers: "20% off on orders above ₹200",
    image: "https://images.unsplash.com/photo-1630383249896-424e482df921?w=400",
    tags: ["Dosa", "Idli", "Vada"]
  },
  {
    id: 2,
    name: "Burger Junction",
    location: "Food Court, Level 1",
    rating: 4.3,
    reviews: 189,
    isOpen: true,
    prepTime: "10-15 min",
    offers: "Buy 1 Get 1 Free on weekends",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400",
    tags: ["Burgers", "Fries", "Shakes"]
  },
  {
    id: 3,
    name: "Chai & Snacks Corner",
    location: "Near Library",
    rating: 4.7,
    reviews: 412,
    isOpen: true,
    prepTime: "5-10 min",
    offers: "₹10 off on chai combos",
    image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400",
    tags: ["Tea", "Coffee", "Samosa"]
  },
  {
    id: 4,
    name: "Pizza Paradise",
    location: "Food Court, Level 1",
    rating: 4.4,
    reviews: 278,
    isOpen: false,
    prepTime: "20-25 min",
    offers: "Flat 30% off on large pizzas",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400",
    tags: ["Pizza", "Pasta", "Garlic Bread"]
  },
  {
    id: 5,
    name: "Fresh Juice Bar",
    location: "Ground Floor, Building B",
    rating: 4.6,
    reviews: 156,
    isOpen: true,
    prepTime: "5-8 min",
    offers: "Free energy shot with smoothies",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400",
    tags: ["Juice", "Smoothies", "Shakes"]
  },
  {
    id: 6,
    name: "North Indian Dhaba",
    location: "Main Canteen",
    rating: 4.5,
    reviews: 345,
    isOpen: true,
    prepTime: "15-20 min",
    offers: "Thali special at ₹99",
    image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400",
    tags: ["Roti", "Dal", "Paneer"]
  },
  {
    id: 7,
    name: "Chinese Wok",
    location: "Food Court, Level 1",
    rating: 4.2,
    reviews: 198,
    isOpen: true,
    prepTime: "12-18 min",
    offers: "Free spring rolls on orders above ₹300",
    image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=400",
    tags: ["Noodles", "Fried Rice", "Manchurian"]
  }
];

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-card border-b backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Store className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">The Hub</span>
            </div>
            
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon">
                <ShoppingCart className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" onClick={() => navigate("/student/profile")}>
                <User className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" onClick={() => navigate("/")}>
                <LogOut className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          {/* Hero Section */}
          <div className="space-y-4">
            <h1 className="text-3xl font-bold text-foreground">
              What's on your mind today?
            </h1>
            
            {/* Search Bar */}
            <div className="relative max-w-2xl">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input 
                placeholder="Search for shops, dishes, or cuisines..." 
                className="pl-10"
              />
            </div>
          </div>

          {/* Shops Grid */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-foreground">All Shops</h2>
              <p className="text-sm text-muted-foreground">{shops.length} shops available</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {shops.map((shop) => (
                <Card 
                  key={shop.id}
                  className="overflow-hidden hover:shadow-lg transition-all cursor-pointer group"
                  onClick={() => navigate(`/student/shop/${shop.id}`)}
                >
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={shop.image} 
                      alt={shop.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {!shop.isOpen && (
                      <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                        <Badge variant="secondary" className="text-base">
                          Closed
                        </Badge>
                      </div>
                    )}
                    {shop.offers && shop.isOpen && (
                      <Badge className="absolute top-2 right-2 bg-accent">
                        <Tag className="h-3 w-3 mr-1" />
                        Offer
                      </Badge>
                    )}
                  </div>
                  
                  <div className="p-4 space-y-3">
                    <div className="space-y-1">
                      <h3 className="font-bold text-lg text-foreground">{shop.name}</h3>
                      <p className="text-sm text-muted-foreground">{shop.location}</p>
                    </div>
                    
                    <div className="flex flex-wrap gap-1">
                      {shop.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-1 text-yellow-500">
                        <Star className="h-4 w-4 fill-current" />
                        <span className="font-semibold text-foreground">{shop.rating}</span>
                        <span className="text-muted-foreground">({shop.reviews})</span>
                      </div>
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        <span>{shop.prepTime}</span>
                      </div>
                    </div>
                    
                    {shop.offers && shop.isOpen && (
                      <div className="pt-2 border-t">
                        <p className="text-xs text-accent font-medium">{shop.offers}</p>
                      </div>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
