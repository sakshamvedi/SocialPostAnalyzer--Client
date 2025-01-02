import React from 'react';
import { BarChart, LineChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
    LayoutDashboard,
    Settings,
    Bell,
    Search,
    TrendingUp,
    Users,
    Activity,
    BarChart2
} from "lucide-react";

// Mock data
const engagementData = [
    { type: 'Carousel', likes: 1200, shares: 300, comments: 150 },
    { type: 'Reels', likes: 2000, shares: 600, comments: 400 },
    { type: 'Static', likes: 800, shares: 200, comments: 100 }
];

const timeSeriesData = [
    { name: 'Mon', carousel: 65, reels: 85, static: 45 },
    { name: 'Tue', carousel: 75, reels: 88, static: 52 },
    { name: 'Wed', carousel: 85, reels: 95, static: 58 },
    { name: 'Thu', carousel: 70, reels: 82, static: 48 },
    { name: 'Fri', carousel: 90, reels: 98, static: 62 }
];

const Dashboard = () => {
    return (
        <div className="bg-gradient-to-br from-gray-50 to-gray-100">
            {/* Side Navigation */}


            {/* Main Content */}
            <div className="">
                {/* Top Bar */}

                {/* Dashboard Content */}
                <div className="p-8 px-[100px]">
                    <h1 className="text-2xl font-bold mb-6">Social Media Performance</h1>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <Card className="hover:shadow-lg transition-shadow">
                            <CardHeader className="pb-2">
                                <CardDescription className="text-blue-600 font-medium">Total Engagement</CardDescription>
                                <CardTitle className="text-2xl font-bold">24.8K</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center text-green-500 text-sm">
                                    <TrendingUp className="h-4 w-4 mr-1" />
                                    <span>12% from last week</span>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="hover:shadow-lg transition-shadow">
                            <CardHeader className="pb-2">
                                <CardDescription className="text-purple-600 font-medium">Avg. Engagement Rate</CardDescription>
                                <CardTitle className="text-2xl font-bold">5.2%</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center text-green-500 text-sm">
                                    <TrendingUp className="h-4 w-4 mr-1" />
                                    <span>3.1% from last week</span>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="hover:shadow-lg transition-shadow">
                            <CardHeader className="pb-2">
                                <CardDescription className="text-orange-600 font-medium">Total Posts</CardDescription>
                                <CardTitle className="text-2xl font-bold">128</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center text-green-500 text-sm">
                                    <TrendingUp className="h-4 w-4 mr-1" />
                                    <span>8 new posts this week</span>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Charts */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <Card className="hover:shadow-lg transition-shadow">
                            <CardHeader>
                                <CardTitle className="text-lg font-semibold">Engagement by Post Type</CardTitle>
                                <CardDescription>Distribution of engagement metrics across different post formats</CardDescription>
                            </CardHeader>
                            <CardContent className="h-[400px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={engagementData}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                        <XAxis dataKey="type" />
                                        <YAxis />
                                        <Tooltip
                                            contentStyle={{
                                                backgroundColor: 'white',
                                                border: 'none',
                                                borderRadius: '8px',
                                                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                                            }}
                                        />
                                        <Legend />
                                        <Bar dataKey="likes" fill="#4F46E5" radius={[4, 4, 0, 0]} />
                                        <Bar dataKey="shares" fill="#7C3AED" radius={[4, 4, 0, 0]} />
                                        <Bar dataKey="comments" fill="#EC4899" radius={[4, 4, 0, 0]} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </CardContent>
                        </Card>

                        <Card className="hover:shadow-lg transition-shadow">
                            <CardHeader>
                                <CardTitle className="text-lg font-semibold">Engagement Trends</CardTitle>
                                <CardDescription>Weekly performance comparison by post type</CardDescription>
                            </CardHeader>
                            <CardContent className="h-[400px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={timeSeriesData}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                        <XAxis dataKey="name" />
                                        <YAxis />
                                        <Tooltip
                                            contentStyle={{
                                                backgroundColor: 'white',
                                                border: 'none',
                                                borderRadius: '8px',
                                                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                                            }}
                                        />
                                        <Legend />
                                        <Line
                                            type="monotone"
                                            dataKey="carousel"
                                            stroke="#4F46E5"
                                            strokeWidth={2}
                                            dot={{ fill: '#4F46E5' }}
                                        />
                                        <Line
                                            type="monotone"
                                            dataKey="reels"
                                            stroke="#7C3AED"
                                            strokeWidth={2}
                                            dot={{ fill: '#7C3AED' }}
                                        />
                                        <Line
                                            type="monotone"
                                            dataKey="static"
                                            stroke="#EC4899"
                                            strokeWidth={2}
                                            dot={{ fill: '#EC4899' }}
                                        />
                                    </LineChart>
                                </ResponsiveContainer>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;