import { useState } from "react";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/hooks/useAuth";
import { Trash2, Plus, Minus, CreditCard, Banknote } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const Cart = () => {
    const { cart, removeFromCart, updateQuantity, totalAmount, clearCart } = useCart();
    const { token } = useAuth();
    const navigate = useNavigate();
    const [paymentMethod, setPaymentMethod] = useState<'UPI' | 'Cash'>('UPI');
    const [isPlacingOrder, setIsPlacingOrder] = useState(false);

    const handlePlaceOrder = async () => {
        if (cart.length === 0) return;
        setIsPlacingOrder(true);

        try {
            const orderData = {
                vendorId: cart[0].vendorId,
                items: cart.map(item => ({
                    name: item.name,
                    quantity: item.quantity,
                    price: item.price
                })),
                totalAmount,
                paymentMethod
            };

            const res = await fetch('http://localhost:5000/api/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': token || ''
                },
                body: JSON.stringify(orderData)
            });

            if (res.ok) {
                toast.success("Order placed successfully!");
                clearCart();
                navigate('/student/orders');
            } else {
                toast.error("Failed to place order.");
            }
        } catch (err) {
            console.error(err);
            toast.error("Something went wrong.");
        } finally {
            setIsPlacingOrder(false);
        }
    };

    if (cart.length === 0) {
        return (
            <div className="min-h-screen bg-gray-50">
                <Navbar />
                <main className="container mx-auto px-4 py-20 text-center">
                    <div className="bg-white p-8 rounded-2xl shadow-sm max-w-md mx-auto">
                        <h1 className="text-2xl font-bold mb-4 text-gray-800">Your Cart is Empty</h1>
                        <p className="text-gray-500 mb-8">Looks like you haven't added anything yet.</p>
                        <Button onClick={() => navigate('/student/outlets')} className="bg-green-600 hover:bg-green-700">
                            Browse Outlets
                        </Button>
                    </div>
                </main>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <main className="container mx-auto px-4 py-8">
                <h1 className="text-2xl font-bold mb-6">Your Cart</h1>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Cart Items */}
                    <div className="lg:col-span-2 space-y-4">
                        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-4">
                            <h2 className="font-semibold text-gray-700">Ordering from: <span className="text-black">{cart[0].vendorName}</span></h2>
                        </div>

                        {cart.map((item) => (
                            <div key={item.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex justify-between items-center">
                                <div>
                                    <div className="flex items-center gap-2">
                                        {item.isVeg ? (
                                            <div className="w-3 h-3 border border-green-600 flex items-center justify-center rounded-[2px]">
                                                <div className="w-1.5 h-1.5 bg-green-600 rounded-full" />
                                            </div>
                                        ) : (
                                            <div className="w-3 h-3 border border-red-600 flex items-center justify-center rounded-[2px]">
                                                <div className="w-1.5 h-1.5 bg-red-600 rounded-full" />
                                            </div>
                                        )}
                                        <h3 className="font-semibold text-gray-900">{item.name}</h3>
                                    </div>
                                    <p className="font-medium mt-1 text-gray-600">₹{item.price * item.quantity}</p>
                                </div>

                                <div className="flex items-center gap-4">
                                    <div className="flex items-center gap-3 bg-gray-100 rounded-lg p-1">
                                        <button
                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                            className="p-1 hover:bg-white rounded-md transition-colors"
                                        >
                                            <Minus className="w-4 h-4 text-gray-600" />
                                        </button>
                                        <span className="font-medium w-4 text-center">{item.quantity}</span>
                                        <button
                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                            className="p-1 hover:bg-white rounded-md transition-colors"
                                        >
                                            <Plus className="w-4 h-4 text-gray-600" />
                                        </button>
                                    </div>
                                    <button
                                        onClick={() => removeFromCart(item.id)}
                                        className="text-red-500 hover:bg-red-50 p-2 rounded-lg transition-colors"
                                    >
                                        <Trash2 className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Checkout Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 sticky top-24">
                            <h2 className="text-xl font-bold mb-6">Bill Details</h2>

                            <div className="space-y-3 mb-6">
                                <div className="flex justify-between text-gray-600">
                                    <span>Item Total</span>
                                    <span>₹{totalAmount}</span>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <span>Taxes & Charges</span>
                                    <span>₹20</span>
                                </div>
                                <div className="border-t border-dashed border-gray-200 my-4" />
                                <div className="flex justify-between font-bold text-lg">
                                    <span>To Pay</span>
                                    <span>₹{totalAmount + 20}</span>
                                </div>
                            </div>

                            <div className="mb-6">
                                <h3 className="font-semibold mb-3">Payment Method</h3>
                                <div className="grid grid-cols-2 gap-3">
                                    <button
                                        onClick={() => setPaymentMethod('UPI')}
                                        className={`flex flex-col items-center justify-center p-3 rounded-xl border-2 transition-all ${paymentMethod === 'UPI'
                                            ? 'border-green-600 bg-green-50 text-green-700'
                                            : 'border-gray-100 hover:border-gray-200'
                                            }`}
                                    >
                                        <CreditCard className="w-6 h-6 mb-2" />
                                        <span className="text-sm font-medium">UPI</span>
                                    </button>
                                    <button
                                        onClick={() => setPaymentMethod('Cash')}
                                        className={`flex flex-col items-center justify-center p-3 rounded-xl border-2 transition-all ${paymentMethod === 'Cash'
                                            ? 'border-green-600 bg-green-50 text-green-700'
                                            : 'border-gray-100 hover:border-gray-200'
                                            }`}
                                    >
                                        <Banknote className="w-6 h-6 mb-2" />
                                        <span className="text-sm font-medium">Cash</span>
                                    </button>
                                </div>
                            </div>

                            <Button
                                onClick={handlePlaceOrder}
                                disabled={isPlacingOrder}
                                className="w-full bg-green-600 hover:bg-green-700 h-12 text-lg"
                            >
                                {isPlacingOrder ? 'Placing Order...' : 'Place Order'}
                            </Button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Cart;
