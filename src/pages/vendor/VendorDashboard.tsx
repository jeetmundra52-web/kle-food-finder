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
    <div className="min-h-screen mesh-gradient">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-100/50 shadow-sm">
        <div className="container mx-auto px-6 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-orange-600 flex items-center justify-center shadow-lg shadow-primary/20">
                <Store className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-black text-gray-900 tracking-tight">South Indian Express</h1>
                <p className="text-xs text-gray-500 font-bold uppercase tracking-widest">Vendor Dashboard</p>
              </div>
            </div>

            <Button variant="ghost" size="icon" className="hover:bg-gray-100" onClick={() => navigate("/")}>
              <LogOut className="h-5 w-5 text-gray-600" />
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          {/* Stats Overview */}
          <div className="grid md:grid-cols-4 gap-6">
            <Card className="p-6 bg-white/80 backdrop-blur-sm border-gray-100/80 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] transition-all duration-500 rounded-[2rem]">
              <div className="space-y-3">
                <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Today's Orders</p>
                <p className="text-4xl font-black text-gray-900 tracking-tighter">24</p>
                <div className="flex items-center gap-1.5 text-xs text-green-600 font-bold">
                  <TrendingUp className="h-3.5 w-3.5" />
                  <span>+12% from yesterday</span>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-white/80 backdrop-blur-sm border-gray-100/80 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] transition-all duration-500 rounded-[2rem]">
              <div className="space-y-3">
                <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Revenue</p>
                <p className="text-4xl font-black text-gray-900 tracking-tighter">₹3,240</p>
                <p className="text-xs text-gray-500 font-bold">Last 24 hours</p>
              </div>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-orange-50 to-orange-100/50 backdrop-blur-sm border-orange-100 shadow-[0_4px_20px_rgba(249,115,22,0.1)] hover:shadow-[0_20px_40px_rgba(249,115,22,0.15)] transition-all duration-500 rounded-[2rem]">
              <div className="space-y-3">
                <p className="text-xs font-black text-orange-600 uppercase tracking-widest">Pending</p>
                <p className="text-4xl font-black text-primary tracking-tighter">{pendingOrders.length}</p>
                <p className="text-xs text-orange-700 font-bold">Needs attention</p>
              </div>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-green-50 to-green-100/50 backdrop-blur-sm border-green-100 shadow-[0_4px_20px_rgba(34,197,94,0.1)] hover:shadow-[0_20px_40px_rgba(34,197,94,0.15)] transition-all duration-500 rounded-[2rem]">
              <div className="space-y-3">
                <p className="text-xs font-black text-green-600 uppercase tracking-widest">Completed</p>
                <p className="text-4xl font-black text-green-700 tracking-tighter">18</p>
                <p className="text-xs text-green-700 font-bold">Today</p>
              </div>
            </Card>
          </div>

          {/* Orders Management */}
          <Card className="p-8 bg-white/80 backdrop-blur-sm border-gray-100/80 shadow-[0_4px_20px_rgba(0,0,0,0.03)] rounded-[2.5rem]">
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
                    <Card key={order.id} className="p-5 bg-white border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 rounded-2xl">
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
                  <Card key={order.id} className="p-5 bg-white border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 rounded-2xl">
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
