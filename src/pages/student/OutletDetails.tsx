import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import { useParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Clock } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useCart } from "@/context/CartContext";
import { Outlet } from "@/types";

const OutletDetails = () => {
    const { id } = useParams();
    const [outlet, setOutlet] = useState<Outlet | null>(null);
    const { token } = useAuth();
    const { addToCart, cart, updateQuantity } = useCart();

    useEffect(() => {
        const fetchOutlet = async () => {
            try {
                const res = await fetch(`http://localhost:5000/api/outlets/${id}`, {
                    headers: { 'x-auth-token': token || '' }
                });
                if (res.ok) {
                    const data = await res.json();
                    setOutlet(data);
                }
            } catch (err) {
                console.error("Failed to fetch outlet details", err);
            }
        };

        fetchOutlet();

        // Socket.io for real-time updates
        const socket = io('http://localhost:5000');

        if (id) {
            console.log(`[Socket] Joining outlet room: ${id}`);
            socket.emit('joinOutlet', id);

            socket.on('ratingUpdated', (data: { vendorId: string, menu: any[] }) => {
                console.log('[Socket] Received rating update:', data);
                if (data.vendorId === id) {
                    setOutlet(prev => {
                        if (!prev) return null;

                        // Recalculate outlet rating based on new menu ratings
                        let sum = 0;
                        let totalRatedItems = 0;
                        data.menu.forEach(item => {
                            if (item.averageRating > 0) {
                                sum += item.averageRating;
                                totalRatedItems++;
                            }
                        });
                        const newOutletRating = totalRatedItems > 0 ? (sum / totalRatedItems).toFixed(1) : "New";

                        return {
                            ...prev,
                            menu: data.menu,
                            rating: newOutletRating as any
                        };
                    });
                }
            });
        }

        return () => {
            socket.disconnect();
        };
    }, [id, token]);

    if (!outlet) return <div className="min-h-screen bg-gray-50 flex items-center justify-center">Loading...</div>;

    const handleAddToCart = (item: any) => {
        addToCart({
            id: item._id || item.id, // Handle both MongoDB _id and potential mock id
            name: item.name,
            price: item.price,
            quantity: 1,
            vendorId: outlet.id as string,
            vendorName: outlet.name,
            isVeg: item.isVeg
        });
    };

    return (
        <div className="min-h-screen mesh-gradient">
            <Navbar />

            {/* Banner Section */}
            <div className="relative h-[28rem] md:h-[32rem] w-full overflow-hidden">
                <img src={outlet.image} alt={outlet.name} className="w-full h-full object-cover scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/40 to-transparent" />

                <div className="absolute inset-x-0 bottom-0 py-12 md:py-16">
                    <div className="container mx-auto px-6">
                        <div className="max-w-4xl animate-fade-in-up">
                            <div className="flex items-center gap-3 mb-6">
                                <Badge className="bg-primary/90 text-white border-0 font-bold px-4 py-1.5 shadow-lg shadow-primary/20">Featured Outlet</Badge>
                                {outlet.isVeg && <Badge className="bg-green-600/90 text-white border-0 font-bold px-4 py-1.5 shadow-lg shadow-green-600/20">Pure Veg</Badge>}
                            </div>

                            <h1 className="text-4xl md:text-7xl font-black text-white mb-6 tracking-tighter leading-none drop-shadow-2xl">{outlet.name}</h1>
                            <p className="text-lg md:text-2xl font-medium text-gray-200/90 mb-10 max-w-2xl leading-relaxed drop-shadow-lg">{outlet.description}</p>

                            <div className="flex flex-wrap items-center gap-8 text-white">
                                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-2xl">
                                    <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                                    <span className="text-xl font-black">{outlet.rating}</span>
                                    <span className="text-xs text-white/60 font-bold uppercase tracking-widest ml-1">Rating</span>
                                </div>

                                <div className="flex flex-col">
                                    <span className="text-[10px] font-black text-white/50 uppercase tracking-[0.2em] mb-1">Price Range</span>
                                    <div className="flex items-center tracking-tighter text-xl">
                                        {[1, 2, 3].map((i) => (
                                            <span key={i} className={i <= (outlet.priceRange.length) ? 'text-white' : 'text-white/20'}>₹</span>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex flex-col">
                                    <span className="text-[10px] font-black text-white/50 uppercase tracking-[0.2em] mb-1">Time to Hub</span>
                                    <div className="flex items-center gap-2">
                                        <Clock className="w-5 h-5 text-orange-400" />
                                        <span className="text-xl font-black">{outlet.deliveryTime}</span>
                                    </div>
                                </div>

                                <div className="flex flex-col">
                                    <span className="text-[10px] font-black text-white/50 uppercase tracking-[0.2em] mb-1">Cuisine Type</span>
                                    <span className="text-xl font-black tracking-tight">{outlet.type}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <main className="container mx-auto px-4 py-8">
                <h2 className="text-2xl font-bold mb-6">Menu</h2>

                <div className="grid lg:grid-cols-2 gap-8">
                    {outlet.menu?.map((item: any) => (
                        <div key={item._id || item.id} className="menu-item bg-white/80 backdrop-blur-sm p-5 rounded-[2.5rem] shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-gray-100/80 hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] transition-all duration-500 group flex justify-between items-center hover:-translate-y-1">
                            <div className="flex-1 min-w-0 pr-4">
                                <div className="flex items-center gap-2 mb-2">
                                    {item.isVeg ? (
                                        <div className="w-5 h-5 border-2 border-green-600 flex items-center justify-center rounded-md p-0.5">
                                            <div className="w-full h-full bg-green-600 rounded-full" />
                                        </div>
                                    ) : (
                                        <div className="w-5 h-5 border-2 border-red-600 flex items-center justify-center rounded-md p-0.5">
                                            <div className="w-full h-full bg-red-600 rounded-full" />
                                        </div>
                                    )}
                                    <div className="flex flex-col">
                                        <h3 className="font-extrabold text-xl font-sans text-gray-900 group-hover:text-primary transition-colors tracking-tight line-clamp-1">{item.name}</h3>
                                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{item.category}</span>
                                    </div>
                                </div>
                                <p className="text-sm text-gray-500/90 font-medium line-clamp-1 mb-4">{item.description}</p>
                                <div className="flex items-center gap-4">
                                    <p className="text-2xl font-black text-gray-900 tracking-tighter">₹{item.price}</p>
                                    <div className="flex items-center gap-1.5 bg-[#fefce8] px-2.5 py-1 rounded-full border border-[#fef08a] shadow-sm">
                                        <Star className="w-3.5 h-3.5 fill-yellow-500 text-yellow-500" />
                                        <span className="text-xs font-black text-yellow-800 tracking-wider">
                                            {item.averageRating ? item.averageRating.toFixed(1) : '0.0'}
                                            <span className="text-yellow-600/50 ml-1 font-bold">({item.totalReviews || 0})</span>
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="relative group/btn shrink-0">
                                {cart.find((cartItem) => cartItem.id === (item._id || item.id)) ? (
                                    <div className="flex items-center bg-gray-900 rounded-2xl p-1 shadow-lg shadow-black/10 scale-105">
                                        <button
                                            onClick={() => updateQuantity(item._id || item.id, (cart.find((i) => i.id === (item._id || item.id))?.quantity || 0) - 1)}
                                            className="w-10 h-10 flex items-center justify-center text-white font-black hover:bg-white/10 rounded-xl transition-colors"
                                        >
                                            -
                                        </button>
                                        <span className="w-8 flex items-center justify-center text-white font-black text-lg">
                                            {cart.find((i) => i.id === (item._id || item.id))?.quantity}
                                        </span>
                                        <button
                                            onClick={() => updateQuantity(item._id || item.id, (cart.find((i) => i.id === (item._id || item.id))?.quantity || 0) + 1)}
                                            className="w-10 h-10 flex items-center justify-center text-white font-black hover:bg-white/10 rounded-xl transition-colors"
                                        >
                                            +
                                        </button>
                                    </div>
                                ) : (
                                    <Button
                                        className="add-to-cart h-14 w-28 text-sm font-black uppercase tracking-widest bg-white border-2 border-gray-100 text-primary hover:bg-primary hover:text-white hover:border-primary rounded-2xl shadow-sm hover:shadow-xl hover:shadow-primary/20 transition-all duration-300 transform active:scale-95"
                                        onClick={() => handleAddToCart(item)}
                                    >
                                        ADD
                                    </Button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
                {(!outlet.menu || outlet.menu.length === 0) && (
                    <p className="text-gray-500 col-span-2 text-center py-10">No menu items available.</p>
                )}
            </main>
        </div>
    );
};

export default OutletDetails;
