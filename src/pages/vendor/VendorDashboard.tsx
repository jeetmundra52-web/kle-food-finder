import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";
import { 
  Store, 
  Package, 
  Clock, 
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  LogOut
} from "lucide-react";

const VendorDashboard = () => {
  const navigate = useNavigate();

  // Mock orders data
  const pendingOrders = [
    {
      id: "ORD001",
      customer: "Rahul Kumar",
      items: ["2x Masala Dosa", "1x Filter Coffee"],
      total: 180,
      time: "2 mins ago",
      type: "pickup"
    },
    {
      id: "ORD002",
      customer: "Priya Sharma",
      items: ["1x Vada Plate", "1x Sambhar"],
      total: 90,
      time: "5 mins ago",
      type: "delivery"
    }
  ];

  const activeOrders = [
    {
      id: "ORD003",
      customer: "Amit Patel",
      items: ["3x Idli", "1x Chutney"],
      total: 120,
      status: "preparing",
      time: "15 mins ago"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-card border-b backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Store className="h-6 w-6 text-secondary" />
              <div>
                <h1 className="text-xl font-bold">South Indian Express</h1>
                <p className="text-xs text-muted-foreground">Vendor Dashboard</p>
              </div>
            </div>
            
            <Button variant="ghost" size="icon" onClick={() => navigate("/")}>
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          {/* Stats Overview */}
          <div className="grid md:grid-cols-4 gap-4">
            <Card className="p-4">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Today's Orders</p>
                <p className="text-3xl font-bold text-foreground">24</p>
                <div className="flex items-center gap-1 text-xs text-accent">
                  <TrendingUp className="h-3 w-3" />
                  <span>+12% from yesterday</span>
                </div>
              </div>
            </Card>
            
            <Card className="p-4">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Revenue</p>
                <p className="text-3xl font-bold text-foreground">₹3,240</p>
                <p className="text-xs text-muted-foreground">Last 24 hours</p>
              </div>
            </Card>
            
            <Card className="p-4">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Pending</p>
                <p className="text-3xl font-bold text-primary">{pendingOrders.length}</p>
                <p className="text-xs text-muted-foreground">Needs attention</p>
              </div>
            </Card>
            
            <Card className="p-4">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Completed</p>
                <p className="text-3xl font-bold text-accent">18</p>
                <p className="text-xs text-muted-foreground">Today</p>
              </div>
            </Card>
          </div>

          {/* Orders Management */}
          <Card className="p-6">
            <Tabs defaultValue="pending" className="w-full">
              <TabsList className="grid w-full max-w-md grid-cols-3">
                <TabsTrigger value="pending">
                  Pending ({pendingOrders.length})
                </TabsTrigger>
                <TabsTrigger value="active">
                  Active ({activeOrders.length})
                </TabsTrigger>
                <TabsTrigger value="completed">
                  Completed
                </TabsTrigger>
              </TabsList>

              <TabsContent value="pending" className="space-y-4 mt-6">
                {pendingOrders.length === 0 ? (
                  <div className="text-center py-12">
                    <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">No pending orders</p>
                  </div>
                ) : (
                  pendingOrders.map((order) => (
                    <Card key={order.id} className="p-4">
                      <div className="space-y-4">
                        <div className="flex items-start justify-between">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <h3 className="font-bold text-lg">#{order.id}</h3>
                              <Badge variant={order.type === "delivery" ? "default" : "secondary"}>
                                {order.type}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">{order.customer}</p>
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                              <Clock className="h-3 w-3" />
                              <span>{order.time}</span>
                            </div>
                          </div>
                          <p className="text-xl font-bold text-foreground">₹{order.total}</p>
                        </div>

                        <div className="space-y-1">
                          {order.items.map((item, idx) => (
                            <p key={idx} className="text-sm text-foreground">{item}</p>
                          ))}
                        </div>

                        <div className="flex gap-2 pt-2">
                          <Button className="flex-1" size="sm">
                            <CheckCircle2 className="h-4 w-4 mr-2" />
                            Accept Order
                          </Button>
                          <Button variant="destructive" size="sm">
                            Decline
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))
                )}
              </TabsContent>

              <TabsContent value="active" className="space-y-4 mt-6">
                {activeOrders.map((order) => (
                  <Card key={order.id} className="p-4">
                    <div className="space-y-4">
                      <div className="flex items-start justify-between">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <h3 className="font-bold text-lg">#{order.id}</h3>
                            <Badge className="bg-primary">Preparing</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{order.customer}</p>
                        </div>
                        <p className="text-xl font-bold">₹{order.total}</p>
                      </div>

                      <div className="space-y-1">
                        {order.items.map((item, idx) => (
                          <p key={idx} className="text-sm">{item}</p>
                        ))}
                      </div>

                      <Button className="w-full" size="sm">
                        Mark as Ready
                      </Button>
                    </div>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="completed" className="mt-6">
                <div className="text-center py-12">
                  <CheckCircle2 className="h-12 w-12 text-accent mx-auto mb-4" />
                  <p className="text-muted-foreground">18 orders completed today</p>
                </div>
              </TabsContent>
            </Tabs>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default VendorDashboard;
