import React from 'react';
import { useAuth } from '../context/AuthContext';
import Card from '../components/ui/Card';
import Layout from '../components/layout/Layout';

const Dashboard = () => {
    const { user } = useAuth();

    if (!user) return null;

    const stats = [
        { label: 'Followers', value: user.instagram?.followers_count || 0 },
        { label: 'Media', value: user.instagram?.media_count || 0 },
        { label: 'Account Type', value: user.instagram?.account_type || 'Unknown' },
    ];

    return (
        <Layout>
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                {/* Profile Card */}
                <div className="col-span-1">
                    <Card className="flex flex-col items-center">
                        <img
                            src={user.profilePic}
                            alt={user.name}
                            className="h-32 w-32 rounded-full border-4 border-instagram-gradient3 mb-4"
                        />
                        <h2 className="text-2xl font-bold text-gray-900">{user.name}</h2>
                        <p className="text-gray-500 text-sm">@{user.instagram?.username}</p>
                        <div className="mt-4 w-full">
                            <p className="text-center text-gray-700 italic">
                                "{user.instagram?.biography || 'No biography'}"
                            </p>
                            {user.instagram?.website && (
                                <a href={user.instagram.website} target="_blank" rel="noopener noreferrer" className="block text-center mt-2 text-instagram-primary hover:underline truncate">
                                    {user.instagram.website}
                                </a>
                            )}
                        </div>
                    </Card>
                </div>

                {/* Stats & Details */}
                <div className="col-span-1 lg:col-span-2 space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {stats.map((stat) => (
                            <Card key={stat.label} className="text-center p-4">
                                <dt className="text-sm font-medium text-gray-500 truncate">
                                    {stat.label}
                                </dt>
                                <dd className="mt-1 text-3xl font-semibold text-gray-900">
                                    {stat.value}
                                </dd>
                            </Card>
                        ))}
                    </div>

                    <Card>
                        <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">
                            Account Status
                        </h3>
                        <div className="border-t border-gray-200 py-4">
                            <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
                                <div className="sm:col-span-1">
                                    <dt className="text-sm font-medium text-gray-500">Instagram ID</dt>
                                    <dd className="mt-1 text-sm text-gray-900">{user.instagram?.id}</dd>
                                </div>
                                <div className="sm:col-span-1">
                                    <dt className="text-sm font-medium text-gray-500">Token Status</dt>
                                    <dd className="mt-1 text-sm text-green-600 flex items-center">
                                        <span className="h-2 w-2 bg-green-500 rounded-full mr-2"></span>
                                        Active
                                    </dd>
                                </div>
                            </dl>
                        </div>
                    </Card>
                </div>
            </div>
        </Layout>
    );
};

export default Dashboard;
