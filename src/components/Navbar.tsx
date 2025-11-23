import { Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Utensils, ShoppingCart, LogOut } from 'lucide-react';

const Navbar = () => {
    const { user, logout, isAuthenticated } = useAuth();

    return (
        <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-orange-100/50 shadow-sm">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <Link to="/" className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary-light flex items-center justify-center shadow-md">
                        <Utensils className="h-5 w-5 text-white" />
                    </div>
                    <div>
                        <h1 className="text-xl font-bold text-foreground tracking-tight leading-none">The Hub</h1>
                    </div>
                </Link>

                <div className="flex items-center gap-4">
                    {isAuthenticated ? (
                        <>
                            <span className="text-sm font-medium text-gray-600 hidden md:block">Welcome, {user?.name}</span>
                            {user?.role === 'student' && (
                                <>
                                    <Link to="/student/outlets">
                                        <Button variant="ghost" className="text-gray-600 hover:text-green-600">Outlets</Button>
                                    </Link>
                                    <Link to="/student/orders">
                                        <Button variant="ghost" className="text-gray-600 hover:text-green-600">My Orders</Button>
                                    </Link>
                                    <Link to="/student/cart">
                                        <Button variant="ghost" size="icon" className="relative">
                                            <ShoppingCart className="h-5 w-5 text-gray-600" />
                                        </Button>
                                    </Link>
                                </>
                            )}
                            <Button variant="ghost" size="sm" onClick={logout} className="text-red-500 hover:text-red-600 hover:bg-red-50">
                                <LogOut className="h-4 w-4 mr-2" /> Logout
                            </Button>
                        </>
                    ) : (
                        <>
                            <Link to="/auth/login">
                                <Button variant="ghost" className="text-gray-600 hover:text-primary">Login</Button>
                            </Link>
                            <Link to="/auth/register">
                                <Button className="bg-primary hover:bg-primary-light text-white rounded-full px-6">
                                    Sign Up
                                </Button>
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
