import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { toast } from "sonner";
import { Mail, Lock, Eye, EyeOff, Utensils, ArrowRight } from "lucide-react";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const { login } = useAuth();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Strict Email Validation
        const emailRegex = /^[0-9]{2}[A-Za-z]{2}[0-9]{2}[A-Za-z]{3}[0-9]{3}@kletech\.ac\.in$/;
        if (!emailRegex.test(email)) {
            toast.error("Invalid email. Must be a valid KLE Tech USN email (e.g., 01feXXbcsXXX@kletech.ac.in)");
            return;
        }

        setLoading(true);

        try {
            const res = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            const data = await res.json();

            if (res.ok) {
                login(data.token, data.user);
                toast.success("Logged in successfully!");
                if (data.user.role === 'vendor') {
                    navigate('/vendor/dashboard');
                } else {
                    navigate('/student/outlets');
                }
            } else {
                toast.error(data.msg || "Login failed");
            }
        } catch (err) {
            toast.error("Server error. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen font-sans selection:bg-primary/20 overflow-hidden relative flex items-center justify-center">
            {/* Background Image with Overlay */}
            <div className="fixed inset-0 -z-10">
                <div className="absolute inset-0 bg-[url('/landing-bg-v3.png')] bg-cover bg-center bg-fixed" />
                <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
            </div>

            <Card className="w-full max-w-[400px] mx-4 shadow-2xl border border-white/50 bg-white/60 backdrop-blur-xl rounded-[2rem] overflow-hidden relative animate-fade-in-up">
                {/* Decorative Gradient Blob */}
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-orange-400/30 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-blue-400/30 rounded-full blur-3xl pointer-events-none" />

                <CardHeader className="space-y-4 text-center pt-10 pb-2 relative z-10">
                    <div className="mx-auto w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-orange-600 flex items-center justify-center shadow-lg shadow-orange-500/20 mb-2 transform hover:scale-105 transition-transform duration-300">
                        <Utensils className="h-8 w-8 text-white" />
                    </div>
                    <div className="space-y-1">
                        <h2 className="text-2xl font-bold tracking-tight text-gray-900">Welcome Back</h2>
                        <p className="text-sm text-gray-600 font-medium">Enter your credentials to access your account</p>
                    </div>
                </CardHeader>

                <CardContent className="p-8 pt-4 relative z-10">
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="space-y-4">
                            <div className="relative group">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 group-focus-within:text-primary transition-colors" />
                                <Input
                                    id="email-input"
                                    type="email"
                                    placeholder="Email Address"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="pl-10 bg-white/50 border-gray-200/50 focus:bg-white transition-all duration-300 h-11 rounded-xl"
                                />
                            </div>
                            <div className="space-y-1">
                                <div className="relative group">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 group-focus-within:text-primary transition-colors" />
                                    <Input
                                        id="password-input"
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        className="pl-10 pr-10 bg-white/50 border-gray-200/50 focus:bg-white transition-all duration-300 h-11 rounded-xl"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors focus:outline-none"
                                    >
                                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                    </button>
                                </div>
                                <div className="flex justify-end">
                                    <Link
                                        to="/auth/forgot-password"
                                        className="text-xs font-medium text-gray-500 hover:text-primary transition-colors"
                                    >
                                        Forgot password?
                                    </Link>
                                </div>
                            </div>
                        </div>

                        <Button
                            id="login-button"
                            type="submit"
                            className="w-full bg-gradient-to-r from-gray-900 to-black hover:from-black hover:to-gray-900 text-white shadow-lg shadow-black/10 rounded-xl h-11 font-semibold text-sm transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
                            disabled={loading}
                        >
                            {loading ? (
                                "Logging in..."
                            ) : (
                                <>
                                    Login <ArrowRight className="w-4 h-4" />
                                </>
                            )}
                        </Button>
                    </form>

                    <div className="mt-8 text-center">
                        <p className="text-sm text-gray-600 font-medium">
                            Don't have an account?{" "}
                            <Link to="/auth/register" className="text-primary hover:text-orange-600 font-bold hover:underline transition-all">
                                Sign up
                            </Link>
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default Login;
