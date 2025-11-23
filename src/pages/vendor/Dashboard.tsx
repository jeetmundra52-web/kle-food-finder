import Navbar from "@/components/Navbar";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Store, Clock, CheckCircle, AlertCircle, TrendingUp, IndianRupee } from "lucide-react";

const Dashboard = () => {
    const { user } = useAuth();

    // Mock Data - In a real app, this would come from an API based on user.id
    const stats = {
        todaysOrders: 24,
        revenue: 3240,
        pending: 2,
        completed: 18
    };

    const orders = [
        {
            id: "#ORD001",
            customer: "Rahul Kumar",
            time: "2 mins ago",
            items: ["2x Masala Dosa", "1x Filter Coffee"],
            total: 180,
            status: "pending",
            type: "pickup"
        },
        {
            id: "#ORD002",
            customer: "Priya Sharma",
            time: "5 mins ago",
            items: ["1x Vada Plate", "1x Sambhar"],
            total: 90,
            status: "pending",
            type: "delivery"
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50 font-sans">
            <Navbar />
            <main className="container mx-auto px-4 py-8 max-w-6xl">

                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center">
                            <Store className="w-6 h-6 text-teal-700" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">{user?.name || "Vendor Dashboard"}</h1>
                            <p className="text-sm text-gray-500 font-medium">Vendor Dashboard</p>
                        </div>
                    </div>
                    <Button variant="outline" className="gap-2">
                        <Clock className="w-4 h-4" /> History
                    </Button>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                    <Card className="border-none shadow-sm hover:shadow-md transition-shadow">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-gray-500">Today's Orders</CardTitle>
                            <Clock className="h-4 w-4 text-gray-400" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-gray-900">{stats.todaysOrders}</div>
                            <p className="text-xs text-green-600 flex items-center mt-1 font-medium">
                                <TrendingUp className="w-3 h-3 mr-1" /> +12% from yesterday
                            </p>
                        </CardContent>
                    </Card>
                    <Card className="border-none shadow-sm hover:shadow-md transition-shadow">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-gray-500">Revenue</CardTitle>
                            <IndianRupee className="h-4 w-4 text-gray-400" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-gray-900">₹{stats.revenue.toLocaleString()}</div>
                            <p className="text-xs text-gray-500 mt-1">Last 24 hours</p>
                        </CardContent>
                    </Card>
                    <Card className="border-none shadow-sm hover:shadow-md transition-shadow">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-gray-500">Pending</CardTitle>
                            <AlertCircle className="h-4 w-4 text-orange-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-orange-600">{stats.pending}</div>
                            <p className="text-xs text-gray-500 mt-1">Needs attention</p>
                        </CardContent>
                    </Card>
                    <Card className="border-none shadow-sm hover:shadow-md transition-shadow">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-gray-500">Completed</CardTitle>
                            <CheckCircle className="h-4 w-4 text-green-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-green-600">{stats.completed}</div>
                            <p className="text-xs text-gray-500 mt-1">Today</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Orders Section */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-6 border-b border-gray-100 flex items-center gap-4">
                        <Button variant="secondary" className="bg-gray-900 text-white hover:bg-black h-9 text-xs font-semibold rounded-full px-4">
                            Pending ({stats.pending})
                        </Button>
                        <Button variant="ghost" className="text-gray-500 hover:text-gray-900 h-9 text-xs font-medium rounded-full px-4">
                            Active (1)
                        </Button>
                        <Button variant="ghost" className="text-gray-500 hover:text-gray-900 h-9 text-xs font-medium rounded-full px-4">
                            Completed
                        </Button>
                    </div>

                    <div className="divide-y divide-gray-100">
                        {orders.map((order) => (
                            <div key={order.id} className="p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 hover:bg-gray-50/50 transition-colors">
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-2">
                                        <span className="text-lg font-bold text-gray-900">{order.id}</span>
                                        <Badge variant={order.type === 'pickup' ? 'default' : 'secondary'} className="capitalize">
                                            {order.type}
                                        </Badge>
                                    </div>
                                    <div className="text-sm text-gray-900 font-medium mb-1">{order.customer}</div>
                                    <div className="text-xs text-gray-500 mb-3 flex items-center gap-1">
                                        <Clock className="w-3 h-3" /> {order.time}
                                    </div>
                                    <div className="space-y-1">
                                        {order.items.map((item, idx) => (
                                            <div key={idx} className="text-sm text-gray-600">{item}</div>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex flex-col items-end gap-4 w-full md:w-auto">
                                    <div className="text-xl font-bold text-gray-900">₹{order.total}</div>
                                    <div className="flex items-center gap-3 w-full md:w-auto">
                                        <Button className="flex-1 md:flex-none bg-orange-500 hover:bg-orange-600 text-white font-semibold">
                                            Accept Order
                                        </Button>
                                        <Button variant="outline" className="flex-1 md:flex-none text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700">
                                            Decline
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </main>
        </div>
    );
};

export default Dashboard;
