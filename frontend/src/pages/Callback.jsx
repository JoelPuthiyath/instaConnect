import React, { useEffect, useRef } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Spinner from '../components/ui/Spinner';
import Card from '../components/ui/Card';

const InstagramCallback = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const { loginWithInstagram } = useAuth();
    const processedRef = useRef(false);

    useEffect(() => {
        const code = searchParams.get('code');
        const state = searchParams.get('state');
        const error = searchParams.get('error');

        if (processedRef.current) return;
        processedRef.current = true;

        if (code && state) {
            handleAuth(code, state);
        } else if (error) {
            console.error('Instagram auth error:', error);
            navigate('/login');
        }
    }, [searchParams, navigate, loginWithInstagram]);

    const handleAuth = async (code, state) => {
        try {
            await loginWithInstagram(code, state);
            navigate('/dashboard');
        } catch (error) {
            console.error('Login failed', error.response?.data || error);
            // Show error handling UI or toast
            // navigate('/login'); // Commented out for debugging
            alert('Login failed: ' + JSON.stringify(error.response?.data || error.message)); // Alert for immediate visibility
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center py-12 sm:px-6 lg:px-8">
            <Card className="text-center w-full max-w-md">
                <Spinner size="lg" className="mx-auto mb-4" />
                <h2 className="text-xl font-semibold text-gray-900">
                    Connecting to Instagram...
                </h2>
                <p className="mt-2 text-gray-600">
                    Please wait while we verify your account.
                </p>
            </Card>
        </div>
    );
};

export default InstagramCallback;
