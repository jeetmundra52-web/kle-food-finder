import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import { CartProvider, useCart } from "@/context/CartContext";
import VendorSwitchDialog from "@/components/VendorSwitchDialog";
import Landing from "./pages/Landing";
import NotFound from "./pages/NotFound";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import OutletsList from "./pages/student/OutletsList";
import OutletDetails from "./pages/student/OutletDetails";
import Menu from "./pages/student/Menu";
import Cart from "./pages/student/Cart";
import MyOrders from "./pages/student/MyOrders";
import VendorLogin from "./pages/vendor/VendorLogin";
import Dashboard from "./pages/vendor/Dashboard";

const queryClient = new QueryClient();

// Inner component to access cart context
const AppContent = () => {
  const { showVendorDialog, pendingItem, cart, confirmVendorSwitch, cancelVendorSwitch } = useCart();

  return (
    <>
      <Toaster />
      <Sonner />
      <Routes>
        <Route path="/" element={<Landing />} />

        {/* Auth Routes */}
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/register" element={<Register />} />

        {/* Student Routes */}
        <Route path="/student/outlets" element={<OutletsList />} />
        <Route path="/student/outlets/:id" element={<OutletDetails />} />
        <Route path="/student/menu/:id" element={<Menu />} />
        <Route path="/student/cart" element={<Cart />} />
        <Route path="/student/orders" element={<MyOrders />} />

        {/* Vendor Routes */}
        <Route path="/vendor/login" element={<VendorLogin />} />
        <Route path="/vendor/dashboard" element={<Dashboard />} />

        {/* Fallback */}
        <Route path="*" element={<NotFound />} />
      </Routes>

      {/* Multi-vendor warning dialog */}
      <VendorSwitchDialog
        open={showVendorDialog}
        currentVendor={cart.length > 0 ? cart[0].vendorName : ""}
        currentItemCount={cart.reduce((total, item) => total + item.quantity, 0)}
        newVendor={pendingItem?.vendorName || ""}
        newItemName={pendingItem?.name || ""}
        onCancel={cancelVendorSwitch}
        onConfirm={confirmVendorSwitch}
      />
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter>
        <AuthProvider>
          <CartProvider>
            <AppContent />
          </CartProvider>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

