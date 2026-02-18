import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Button from '../ui/Button';

const Header = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleLogout = async () => {
        await logout();
        navigate('/login');
    };

    return (
        <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex">
                        <Link to="/" className="flex-shrink-0 flex items-center">
                            <span className="font-sans text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-instagram-gradient3 to-instagram-gradient6">
                                InstaConnect
                            </span>
                        </Link>
                    </div>
                    <div className="flex items-center">
                        {user ? (
                            <div className="ml-3 relative">
                                <div className="flex items-center space-x-4">
                                    <span className="text-gray-700 font-medium hidden sm:block">{user.name}</span>
                                    <img
                                        className="h-8 w-8 rounded-full cursor-pointer border border-gray-200"
                                        src={user.profilePic || 'https://via.placeholder.com/150'}
                                        alt="User Profile"
                                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                                    />
                                </div>
                                {/* Dropdown menu */}
                                {isMenuOpen && (
                                    <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                                        <div className="block px-4 py-2 text-sm text-gray-700 border-b border-gray-100 sm:hidden">
                                            {user.name}
                                        </div>
                                        <button
                                            onClick={handleLogout}
                                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                        >
                                            Sign out
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="space-x-4">
                                <Link to="/login">
                                    <Button variant="primary" size="sm">Login</Button>
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
