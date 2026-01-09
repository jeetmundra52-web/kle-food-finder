
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { toast } from "sonner";
import { Mail, ArrowLeft, KeyRound } from "lucide-react";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [step, setStep] = useState(1); // 1: Verify USN, 2: Reset Password
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleVerifyEmail = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await fetch('http://localhost:5000/api/auth/verify-user', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: email })
            });
            const data = await res.json();
            if (res.ok) {
                toast.success("Email Verified");
                setStep(2);
            } else {
                toast.error(data.msg || "Invalid Email");
            }
        } catch (err) {
            toast.error("Server error");
        } finally {
            setLoading(false);
        }
    };

    const handleResetPassword = async (e: React.FormEvent) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        setLoading(true);
        try {
            const res = await fetch('http://localhost:5000/api/auth/reset-password-data', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: email, newPassword })
            });

            if (res.ok) {
                toast.success("Password changed successfully");
                navigate('/auth/login');
            } else {
                toast.error("Failed to reset password");
            }
        } catch (err) {
            toast.error("Server error");
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
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-orange-400/30 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-blue-400/30 rounded-full blur-3xl pointer-events-none" />

                <CardHeader className="space-y-4 text-center pt-10 pb-2 relative z-10">
                    <div className="mx-auto w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-orange-600 flex items-center justify-center shadow-lg shadow-orange-500/20 mb-2">
                        <KeyRound className="h-8 w-8 text-white" />
                    </div>
                    <div className="space-y-1">
                        <h2 className="text-2xl font-bold tracking-tight text-gray-900">Forgot Password</h2>
                        <p className="text-sm text-gray-600 font-medium">
                            {step === 1 ? "Enter Email to verify account" : "Set your new password"}
                        </p>
                    </div>
                </CardHeader>

                <CardContent className="p-8 pt-4 relative z-10">
                    {step === 1 ? (
                        <form onSubmit={handleVerifyEmail} className="space-y-5">
                            <div className="space-y-4">
                                <Input
                                    type="text"
                                    placeholder="Enter Email Address"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="bg-white/50 border-gray-200/50 focus:bg-white transition-all duration-300 h-11 rounded-xl"
                                />
                            </div>
                            <Button
                                type="submit"
                                className="w-full bg-gradient-to-r from-gray-900 to-black hover:from-black hover:to-gray-900 text-white shadow-lg shadow-black/10 rounded-xl h-11 font-semibold"
                                disabled={loading}
                            >
                                {loading ? "Verifying..." : "Verify Email"}
                            </Button>
                        </form>
                    ) : (
                        <form onSubmit={handleResetPassword} className="space-y-5">
                            <div className="space-y-4">
                                <Input
                                    type="password"
                                    placeholder="New Password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    required
                                    className="bg-white/50 border-gray-200/50 focus:bg-white transition-all duration-300 h-11 rounded-xl"
                                />
                                <Input
                                    type="password"
                                    placeholder="Confirm Password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                    className="bg-white/50 border-gray-200/50 focus:bg-white transition-all duration-300 h-11 rounded-xl"
                                />
                            </div>
                            <Button
                                type="submit"
                                className="w-full bg-gradient-to-r from-gray-900 to-black hover:from-black hover:to-gray-900 text-white shadow-lg shadow-black/10 rounded-xl h-11 font-semibold"
                                disabled={loading}
                            >
                                {loading ? "Updating..." : "Change Password"}
                            </Button>
                        </form>
                    )}

                    <div className="mt-8 text-center">
                        <Link to="/auth/login" className="inline-flex items-center gap-2 text-sm text-gray-600 font-medium hover:text-primary transition-colors group">
                            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                            Back to Login
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default ForgotPassword;
