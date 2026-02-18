import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import Button from '../components/ui/Button';
import Spinner from '../components/ui/Spinner';
import { FaInstagram } from 'react-icons/fa';

const Login = () => {
    const { user, loading } = useAuth();
    const navigate = useNavigate();
    const [authUrl, setAuthUrl] = useState('');
    const [isLoadingAuth, setIsLoadingAuth] = useState(false);

    useEffect(() => {
        if (user) {
            navigate('/dashboard');
        }
        fetchAuthUrl();
    }, [user, navigate]);

    const fetchAuthUrl = async () => {
        try {
            const { data } = await api.get('/auth/instagram/url');
            setAuthUrl(data.authUrl);
        } catch (error) {
            console.error('Failed to fetch auth url', error);
        }
    };

    const handleLogin = () => {
        if (authUrl) {
            setIsLoadingAuth(true);

            console.log(authUrl, "authUrl")
            window.location.href = authUrl;
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-gray-50">
                <Spinner size="lg" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 tracking-tight">
                        InstaConnect
                    </h1>
                    <p className="mt-2 text-sm text-gray-500">
                        Professional Analytics Dashboard
                    </p>
                </div>

                <div className="bg-white py-10 px-6 shadow-2xl sm:rounded-2xl sm:px-12 border border-gray-100">
                    <div className="space-y-8">
                        <div className="text-center">
                            <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome Back</h2>
                            <p className="text-gray-600 text-sm">
                                Connect your professional account to access insights.
                            </p>
                        </div>

                        {/* Error Message */}
                        {!authUrl && !isLoadingAuth && (
                            <div className="rounded-md bg-red-50 p-4 mb-4">
                                <div className="flex">
                                    <div className="flex-shrink-0">
                                        <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <div className="ml-3">
                                        <h3 className="text-sm font-medium text-red-800">
                                            Connection Error
                                        </h3>
                                        <div className="mt-2 text-sm text-red-700">
                                            <p>Unable to connect to the server. Please check your connection.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div>
                            <Button
                                onClick={handleLogin}
                                className="w-full flex justify-center items-center gap-3 py-3.5 px-4 rounded-xl text-white bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#F77737] hover:opacity-90 transition-all duration-200 transform hover:-translate-y-0.5 shadow-lg hover:shadow-xl font-semibold text-lg"
                                disabled={!authUrl || isLoadingAuth}
                            >
                                <FaInstagram className="text-2xl" />
                                <span>Continue with Instagram</span>
                            </Button>
                        </div>

                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-200" />
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-3 bg-white text-gray-400 font-medium">
                                    Requirements
                                </span>
                            </div>
                        </div>

                        <div className="bg-gray-50 rounded-lg p-4 space-y-3 border border-gray-100">
                            <div className="flex items-start">
                                <div className="flex-shrink-0 h-5 w-5 rounded-full bg-green-100 flex items-center justify-center mt-0.5">
                                    <svg className="h-3 w-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <p className="ml-3 text-sm text-gray-600">Instagram <strong>Business</strong> or <strong>Creator</strong> account</p>
                            </div>
                            <div className="flex items-start">
                                <div className="flex-shrink-0 h-5 w-5 rounded-full bg-green-100 flex items-center justify-center mt-0.5">
                                    <svg className="h-3 w-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <p className="ml-3 text-sm text-gray-600">Connected Facebook Page</p>
                            </div>
                        </div>

                        <p className="text-xs text-center text-gray-400 mt-6">
                            By connecting, you agree to our Terms of Service using the Instagram Basic Display API.
                        </p>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
