import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import { useAuth } from "@/hooks/useAuth";
import { Badge } from "@/components/ui/badge";
import { Clock, CheckCircle2, XCircle, ChevronRight, Utensils } from "lucide-react";

import { Button } from "@/components/ui/button";
import ReviewModal from "@/components/ReviewModal";
import { Star } from "lucide-react";

interface OrderItem {
    name: string;
    quantity: number;
    price: number;
}

interface Order {
    _id: string;
    vendor: {
        name: string;
    };
    items: OrderItem[];
    totalAmount: number;
    status: 'pending' | 'accepted' | 'completed' | 'declined';
    date: string;
    paymentMethod: string;
    isRated?: boolean;
}

const MyOrders = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const { token } = useAuth();

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const res = await fetch('http://localhost:5000/api/orders', {
                    headers: { 'x-auth-token': token || '' }
                });
                if (res.ok) {
                    const data = await res.json();
                    setOrders(data);
                }
            } catch (err) {
                console.error("Failed to fetch orders", err);
            } finally {
                setLoading(false);
            }
        };

        if (token) {
            fetchOrders();

            // Poll for order status updates every 5 seconds
            const interval = setInterval(() => {
                fetchOrders();
            }, 5000);

            return () => clearInterval(interval);
        }
    }, [token]);

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case 'accepted': return 'bg-blue-100 text-blue-800 border-blue-200';
            case 'completed': return 'bg-green-100 text-green-800 border-green-200';
            case 'declined': return 'bg-red-100 text-red-800 border-red-200';
            default: return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'pending': return <Clock className="w-4 h-4" />;
            case 'accepted': return <CheckCircle2 className="w-4 h-4" />;
            case 'completed': return <CheckCircle2 className="w-4 h-4" />;
            case 'declined': return <XCircle className="w-4 h-4" />;
            default: return <Clock className="w-4 h-4" />;
        }
    };

    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
    const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

    const handleRateOrder = (order: Order) => {
        setSelectedOrder(order);
        setIsReviewModalOpen(true);
    };

    const handleReviewSubmitted = () => {
        // Refresh orders to update isRated status
        // We can just re-fetch or update locally. Re-fetching is safer.
        const fetchOrders = async () => {
            try {
                const res = await fetch('http://localhost:5000/api/orders', {
                    headers: { 'x-auth-token': token || '' }
                });
                if (res.ok) {
                    const data = await res.json();
                    setOrders(data);
                }
            } catch (err) {
                console.error("Failed to fetch orders", err);
            }
        };
        fetchOrders();
    };

    if (loading) return (
        <div className="min-h-screen mesh-gradient flex items-center justify-center">
            <div className="animate-pulse flex flex-col items-center gap-4">
                <div className="w-12 h-12 bg-primary/20 rounded-full" />
                <p className="text-gray-500 font-medium">Loading your orders...</p>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen mesh-gradient">
            <Navbar />
            <main className="container mx-auto px-4 py-8">
                <h1 className="text-2xl font-bold mb-6">My Orders</h1>

                {orders.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-2xl shadow-sm">
                        <p className="text-gray-500">No orders found.</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {orders.map((order) => (
                            <div key={order._id} className="bg-white/80 backdrop-blur-sm p-6 rounded-[2rem] shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-gray-100 hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] transition-all duration-500 group">
                                <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-6">
                                    <div className="flex items-center gap-4">
                                        <div className="w-14 h-14 rounded-2xl bg-orange-50 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                                            <Utensils className="w-7 h-7 text-orange-600" />
                                        </div>
                                        <div>
                                            <h3 className="font-extrabold text-xl text-gray-900 group-hover:text-primary transition-colors tracking-tight">{order.vendor?.name || 'Unknown Vendor'}</h3>
                                            <div className="flex items-center gap-2 text-xs text-gray-500 font-bold uppercase tracking-widest mt-0.5">
                                                <span>{new Date(order.date).toLocaleDateString()}</span>
                                                <span className="w-1 h-1 rounded-full bg-gray-300" />
                                                <span>{new Date(order.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className={`flex items-center gap-2 px-4 py-1.5 rounded-full border-0 shadow-sm ${getStatusColor(order.status)}`}>
                                            <div className="scale-90">{getStatusIcon(order.status)}</div>
                                            <span className="text-sm font-bold capitalize">{order.status}</span>
                                        </div>
                                        {order.status === 'completed' && !order.isRated && (
                                            <Button
                                                size="sm"
                                                className="bg-gray-900 hover:bg-black text-white rounded-full px-5"
                                                onClick={() => handleRateOrder(order)}
                                            >
                                                Rate Order
                                            </Button>
                                        )}
                                        {order.isRated && (
                                            <div className="flex items-center gap-1.5 bg-yellow-50 px-3 py-1.5 rounded-full border border-yellow-100 shadow-sm">
                                                <Star className="w-4 h-4 fill-yellow-600 text-yellow-600" />
                                                <span className="text-xs font-black text-yellow-700 uppercase tracking-wider">Rated</span>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="bg-[#f8fafc]/50 subtle-noise rounded-2xl p-5 mb-6 border border-gray-50/50">
                                    <div className="space-y-3">
                                        {order.items.map((item, idx) => (
                                            <div key={idx} className="flex justify-between items-center text-sm">
                                                <div className="flex items-center gap-3">
                                                    <span className="w-6 h-6 rounded-md bg-white border border-gray-100 flex items-center justify-center text-[10px] font-black text-primary">{item.quantity}</span>
                                                    <span className="text-gray-700 font-semibold">{item.name}</span>
                                                </div>
                                                <span className="font-bold text-gray-900">₹{item.price * item.quantity}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex justify-between items-center pt-2 px-1">
                                    <div className="flex flex-col">
                                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Payment Method</span>
                                        <span className="text-sm font-bold text-gray-900">{order.paymentMethod}</span>
                                    </div>
                                    <div className="flex flex-col items-end">
                                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Grand Total</span>
                                        <span className="text-2xl font-black text-primary">₹{order.totalAmount}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>

            <ReviewModal
                isOpen={isReviewModalOpen}
                onClose={() => setIsReviewModalOpen(false)}
                order={selectedOrder}
                onReviewSubmitted={handleReviewSubmitted}
            />
        </div>
    );
};

export default MyOrders;
