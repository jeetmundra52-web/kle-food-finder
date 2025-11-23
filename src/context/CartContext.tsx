import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from 'sonner';

interface CartItem {
    id: string; // Menu item ID
    name: string;
    price: number;
    quantity: number;
    vendorId: string;
    vendorName: string;
    isVeg: boolean;
}

interface CartContextType {
    cart: CartItem[];
    addToCart: (item: CartItem) => void;
    removeFromCart: (itemId: string) => void;
    updateQuantity: (itemId: string, quantity: number) => void;
    clearCart: () => void;
    totalAmount: number;
    itemCount: number;
    // Dialog state for vendor switching
    showVendorDialog: boolean;
    pendingItem: CartItem | null;
    confirmVendorSwitch: () => void;
    cancelVendorSwitch: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [cart, setCart] = useState<CartItem[]>(() => {
        const savedCart = localStorage.getItem('cart');
        return savedCart ? JSON.parse(savedCart) : [];
    });

    // Dialog state for vendor switching
    const [showVendorDialog, setShowVendorDialog] = useState(false);
    const [pendingItem, setPendingItem] = useState<CartItem | null>(null);

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    const addToCart = (newItem: CartItem) => {
        // Check if adding item from a different vendor
        if (cart.length > 0 && cart[0].vendorId !== newItem.vendorId) {
            // Show custom dialog instead of window.confirm
            setPendingItem(newItem);
            setShowVendorDialog(true);
            return; // Don't modify cart yet
        }

        // Same vendor or empty cart - proceed with adding
        setCart((prevCart) => {
            const existingItem = prevCart.find((item) => item.id === newItem.id);
            if (existingItem) {
                toast.success(`Updated quantity for ${newItem.name}`);
                return prevCart.map((item) =>
                    item.id === newItem.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            toast.success(`Added ${newItem.name} to cart`);
            return [...prevCart, { ...newItem, quantity: 1 }];
        });
    };

    const removeFromCart = (itemId: string) => {
        setCart((prevCart) => prevCart.filter((item) => item.id !== itemId));
        toast.info("Item removed from cart");
    };

    const updateQuantity = (itemId: string, quantity: number) => {
        if (quantity < 1) {
            removeFromCart(itemId);
            return;
        }
        setCart((prevCart) =>
            prevCart.map((item) => (item.id === itemId ? { ...item, quantity } : item))
        );
    };

    const clearCart = () => {
        setCart([]);
        toast.info("Cart cleared");
    };

    const confirmVendorSwitch = () => {
        if (pendingItem) {
            setCart([{ ...pendingItem, quantity: 1 }]);
            toast.success(`Cart cleared. Added ${pendingItem.name} to cart`);
        }
        setShowVendorDialog(false);
        setPendingItem(null);
    };

    const cancelVendorSwitch = () => {
        setShowVendorDialog(false);
        setPendingItem(null);
    };

    const totalAmount = cart.reduce((total, item) => total + item.price * item.quantity, 0);
    const itemCount = cart.reduce((total, item) => total + item.quantity, 0);

    return (
        <CartContext.Provider
            value={{
                cart,
                addToCart,
                removeFromCart,
                updateQuantity,
                clearCart,
                totalAmount,
                itemCount,
                showVendorDialog,
                pendingItem,
                confirmVendorSwitch,
                cancelVendorSwitch
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
};
