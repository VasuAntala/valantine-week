import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Lock, User, AlertCircle } from 'lucide-react';

const Login = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        // Simulate loading delay for better UX
        setTimeout(() => {
            // Hardcoded credentials (no backend needed)
            const validCredentials = {
                'admin': { username: 'admin', role: 'admin', name: 'Admin' },
                'valentine': { username: 'valentine', role: 'recipient', name: 'Valentine' }
            };

            // Check if username exists and password is not empty
            if (validCredentials[username] && password) {
                const user = validCredentials[username];

                // Save to localStorage
                localStorage.setItem('token', 'local-token-' + Date.now());
                localStorage.setItem('user', JSON.stringify(user));
                localStorage.setItem('userType', user.role);

                onLogin(user);
            } else {
                setError('Invalid username or password');
            }

            setLoading(false);
        }, 500);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 via-rose-100 to-red-100 p-4">
            {/* Floating hearts background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(15)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute text-pink-300"
                        initial={{
                            y: -50,
                            x: Math.random() * window.innerWidth,
                            opacity: 0
                        }}
                        animate={{
                            y: window.innerHeight + 50,
                            opacity: [0, 0.5, 0]
                        }}
                        transition={{
                            duration: Math.random() * 5 + 5,
                            repeat: Infinity,
                            delay: Math.random() * 5,
                            ease: "linear"
                        }}
                    >
                        <Heart size={Math.random() * 30 + 20} fill="currentColor" />
                    </motion.div>
                ))}
            </div>

            <motion.div
                className="relative bg-white rounded-3xl shadow-2xl p-8 md:p-12 max-w-md w-full border-4 border-rose-200"
                initial={{ opacity: 0, scale: 0.9, y: 50 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.5, type: "spring" }}
            >
                {/* Logo/Title */}
                <div className="text-center mb-8">
                    <motion.div
                        className="inline-block mb-4"
                        animate={{
                            scale: [1, 1.1, 1],
                            rotate: [0, 5, -5, 0]
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            repeatDelay: 1
                        }}
                    >
                        <Heart size={64} className="text-rose-500 fill-rose-500 mx-auto" />
                    </motion.div>
                    <h1 className="text-4xl md:text-5xl font-display text-rose-600 mb-2">
                        Welcome
                    </h1>
                    <p className="text-gray-600">Sign in to access your Valentine's page</p>
                </div>

                {/* Error message */}
                <AnimatePresence>
                    {error && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl flex items-center gap-2"
                        >
                            <AlertCircle size={20} />
                            <span className="text-sm">{error}</span>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Login form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Username
                        </label>
                        <div className="relative">
                            <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-200 focus:border-rose-400 focus:outline-none transition-colors"
                                placeholder="Enter username"
                                required
                                disabled={loading}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Password
                        </label>
                        <div className="relative">
                            <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-200 focus:border-rose-400 focus:outline-none transition-colors"
                                placeholder="Enter password"
                                required
                                disabled={loading}
                            />
                        </div>
                    </div>

                    <motion.button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-gradient-to-r from-rose-500 to-pink-500 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-shadow disabled:opacity-50 disabled:cursor-not-allowed"
                        whileHover={{ scale: loading ? 1 : 1.02 }}
                        whileTap={{ scale: loading ? 1 : 0.98 }}
                    >
                        {loading ? 'Signing in...' : 'Sign In 💖'}
                    </motion.button>
                </form>

                {/* Hint */}
                <div className="mt-6 p-4 bg-pink-50 rounded-xl">
                    <p className="text-xs text-gray-600 text-center">
                        <strong>Admin:</strong> username: admin | <strong>Valentine:</strong> username: valentine
                        <br />
                        <span className="text-gray-500">Use any password</span>
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default Login;
