import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
    LayoutDashboard,
    BarChart2,
    Users,
    MessageSquare,
    Image as ImageIcon,
    Settings,
    HelpCircle,
    Menu,
    ChevronLeft,
    Plus
} from "lucide-react";

const SideNav = ({ onNavigate }) => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const location = useLocation();

    const menuItems = [
        {
            id: 'dashboard',
            icon: LayoutDashboard,
            label: 'Dashboard',
            link: '/',
        },
        {
            id: 'analytics',
            icon: BarChart2,
            label: 'Analytics',
            link: '/analytics',
        },
        {
            id: 'posts',
            icon: MessageSquare,
            label: 'Posts',
            link: '/post',
            badge: '3'
        },
    ];

    const bottomMenuItems = [
        // Commented out but kept for future reference
        // {
        //     id: 'settings',
        //     icon: Settings,
        //     label: 'Settings',
        //     link: '/settings',
        // },
        // {
        //     id: 'help',
        //     icon: HelpCircle,
        //     label: 'Help & Support',
        //     link: '/help',
        // }
    ];

    return (
        <div
            className={`fixed left-0 top-0 h-full bg-white shadow-lg flex flex-col z-[99999]
                ${isCollapsed ? 'w-20' : 'w-64'} transition-all duration-300`}
        >
            {/* Header */}
            <div className="p-4 border-b flex items-center justify-between">
                {!isCollapsed && (
                    <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-lg bg-blue-600 flex items-center justify-center">
                            <span className="text-white font-bold">S</span>
                        </div>
                        <span className="font-bold text-xl">SuperMind</span>
                    </div>
                )}
                <button
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className="p-2 hover:bg-gray-100 rounded-lg"
                >
                    {isCollapsed ? <Menu className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
                </button>
            </div>

            {/* Main Menu Items */}
            <div className="flex-1 py-4 overflow-y-auto">
                {menuItems.map((item) => (
                    <Link
                        key={item.id}
                        to={item.link}
                        className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50
                            ${location.pathname === item.link ? 'text-blue-600 bg-blue-50' : 'text-gray-600'}
                            ${isCollapsed ? 'justify-center' : ''}`}
                    >
                        <item.icon className="h-5 w-5" />
                        {!isCollapsed && (
                            <div className="flex-1 flex items-center justify-between">
                                <span>{item.label}</span>
                                {item.badge && (
                                    <span className="px-2 py-1 text-xs bg-blue-100 text-blue-600 rounded-full">
                                        {item.badge}
                                    </span>
                                )}
                            </div>
                        )}
                    </Link>
                ))}
            </div>

            {/* Bottom Menu Items */}
            <div className="border-t py-4">
                {bottomMenuItems.map((item) => (
                    <Link
                        key={item.id}
                        to={item.link}
                        className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50
                            ${location.pathname === item.link ? 'text-blue-600 bg-blue-50' : 'text-gray-600'}
                            ${isCollapsed ? 'justify-center' : ''}`}
                    >
                        <item.icon className="h-5 w-5" />
                        {!isCollapsed && <span>{item.label}</span>}
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default SideNav;