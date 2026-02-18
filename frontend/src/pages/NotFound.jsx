import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';

const NotFound = () => {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center py-12 sm:px-6 lg:px-8">
            <div className="text-center">
                <h1 className="text-9xl font-bold text-instagram-primary">404</h1>
                <h2 className="mt-4 text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl">
                    Page not found
                </h2>
                <p className="mt-4 text-lg text-gray-500">
                    Sorry, we couldn’t find the page you’re looking for.
                </p>
                <div className="mt-6">
                    <Link to="/">
                        <Button variant="primary">Go back home</Button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default NotFound;
