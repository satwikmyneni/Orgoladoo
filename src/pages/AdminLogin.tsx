import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';

const AdminLogin = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        if (!email || !password) {
            alert('Please enter email and password');
            return;
        }

        setLoading(true);

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        setLoading(false);

        if (error) {
            alert(error.message);
            return;
        }

        navigate('/admin');
    };

    const handleForgotPassword = async () => {
        if (!email) {
            alert('Enter your email first');
            return;
        }

        const { error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: window.location.origin + '/reset-password',
        });

        if (error) {
            alert(error.message);
            return;
        }

        alert('Password reset email sent');
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
            <div className="w-full max-w-sm p-8 bg-white rounded-xl shadow-sm border space-y-6">
                <h1 className="text-2xl font-bold text-center">
                    Admin Login
                </h1>

                <input
                    type="email"
                    placeholder="Email"
                    className="w-full border px-3 py-2 rounded"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />

                <div className="relative">
                    <input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Password"
                        className="w-full border px-3 py-2 rounded pr-10"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />

                    <button
                        type="button"
                        className="absolute right-3 top-1/2 -translate-y-1/2"
                        onClick={() => setShowPassword(prev => !prev)}
                    >
                        {showPassword ? (
                            <EyeOff size={18} />
                        ) : (
                            <Eye size={18} />
                        )}
                    </button>
                </div>

                <Button
                    className="w-full"
                    disabled={loading}
                    onClick={handleLogin}
                >
                    {loading ? 'Logging in...' : 'Login'}
                </Button>

                <button
                    onClick={handleForgotPassword}
                    className="text-sm text-primary hover:underline w-full text-center"
                >
                    Forgot password?
                </button>
            </div>
        </div>
    );
};

export default AdminLogin;