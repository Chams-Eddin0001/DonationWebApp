import { useState } from 'react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Lock, User, Loader2 } from 'lucide-react';

interface AdminLoginProps {
    onLoginSuccess: (token: string) => void;
}

export function AdminLogin({ onLoginSuccess }: AdminLoginProps) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            const response = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username: email, password })
            });

            const data = await response.json();

            if (response.ok) {
                onLoginSuccess(data.token);
            } else {
                setError(data.error || 'Login failed');
            }
        } catch (err) {
            console.error(err);
            setError('Connection error');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
            <Card className="max-w-md w-full p-8 animate-fade-in shadow-2xl">
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                        <Lock className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900">Admin Portal</h1>
                    <p className="text-gray-500 text-sm mt-1">Secure Access Only</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
                    <Input
                        label="Email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        // icon={<User className="text-gray-400" />}
                        required
                        autoFocus
                    />
                    <Input
                        label="Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        // icon={<Lock className="text-gray-400" />}
                        required
                    />

                    {error && (
                        <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg border border-red-200">
                            {error}
                        </div>
                    )}

                    <Button type="submit" className="w-full" disabled={isLoading}>
                        {isLoading ? (
                            <>
                                <Loader2 className="w-4 h-4 mr-2 animate-spin inline" />
                                Authenticating...
                            </>
                        ) : (
                            'Login to Dashboard'
                        )}
                    </Button>
                </form>
            </Card>
        </div>
    );
}
