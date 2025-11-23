import { useState, useEffect } from "react";
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
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            {/* Banner */}
            <div className="h-64 md:h-80 w-full relative">
                <img src={outlet.image} alt={outlet.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-0 left-0 w-full p-6 md:p-10 text-white">
                    <div className="container mx-auto">
                        <h1 className="text-3xl md:text-5xl font-bold mb-2">{outlet.name}</h1>
                        <p className="text-lg opacity-90 mb-4 max-w-2xl">{outlet.description}</p>
                        <div className="flex flex-wrap items-center gap-4 text-sm font-medium">
                            <div className="flex items-center gap-1 bg-green-600 px-2 py-1 rounded">
                                <span>{outlet.rating}</span>
                                <Star className="w-3 h-3 fill-white" />
                            </div>
                            <span>•</span>
                            <span>{outlet.deliveryTime}</span>
                            <span>•</span>
                            <span>{outlet.priceRange}</span>
                            <span>•</span>
                            <span>{outlet.type}</span>
                        </div>
                    </div>
                </div>
            </div>

            <main className="container mx-auto px-4 py-8">
                <h2 className="text-2xl font-bold mb-6">Menu</h2>

                <div className="grid md:grid-cols-2 gap-6">
                    {outlet.menu?.map((item: any) => (
                        <div key={item._id || item.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex justify-between items-center">
                            <div>
                                <div className="flex items-center gap-2 mb-1">
                                    {item.isVeg ? (
                                        <div className="w-4 h-4 border border-green-600 flex items-center justify-center rounded-[2px]">
                                            <div className="w-2 h-2 bg-green-600 rounded-full" />
                                        </div>
                                    ) : (
                                        <div className="w-4 h-4 border border-red-600 flex items-center justify-center rounded-[2px]">
                                            <div className="w-2 h-2 bg-red-600 rounded-full" />
                                        </div>
                                    )}
                                    <h3 className="font-semibold text-gray-900">{item.name}</h3>
                                </div>
                                <p className="text-sm text-gray-500">{item.category}</p>
                                <p className="text-xs text-gray-400 mt-1">{item.description}</p>
                                <p className="font-medium mt-2">₹{item.price}</p>
                            </div>
                            {cart.find((cartItem) => cartItem.id === (item._id || item.id)) ? (
                                <div className="flex items-center gap-3 bg-green-50 border border-green-600 rounded-md px-2 py-1">
                                    <button
                                        onClick={() => updateQuantity(item._id || item.id, (cart.find((i) => i.id === (item._id || item.id))?.quantity || 0) - 1)}
                                        className="text-green-700 font-bold hover:bg-green-100 rounded px-1"
                                    >
                                        -
                                    </button>
                                    <span className="text-green-700 font-semibold text-sm">
                                        {cart.find((i) => i.id === (item._id || item.id))?.quantity}
                                    </span>
                                    <button
                                        onClick={() => updateQuantity(item._id || item.id, (cart.find((i) => i.id === (item._id || item.id))?.quantity || 0) + 1)}
                                        className="text-green-700 font-bold hover:bg-green-100 rounded px-1"
                                    >
                                        +
                                    </button>
                                </div>
                            ) : (
                                <Button
                                    size="sm"
                                    variant="outline"
                                    className="text-green-600 border-green-600 hover:bg-green-50"
                                    onClick={() => handleAddToCart(item)}
                                >
                                    ADD
                                </Button>
                            )}
                        </div>
                    ))}
                    {(!outlet.menu || outlet.menu.length === 0) && (
                        <p className="text-gray-500 col-span-2 text-center py-10">No menu items available.</p>
                    )}
                </div>
            </main>
        </div>
    );
};

export default OutletDetails;
