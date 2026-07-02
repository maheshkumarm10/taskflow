import type { ReactNode } from 'react';
import Sidebar from './Sidebar';

interface LayoutProps {
    children: ReactNode;
    title: string;
    actions?: ReactNode;
}

export default function Layout({ children, title, actions }: LayoutProps) {
    return (
        <div className="min-h-screen bg-gray-50 flex">
            <Sidebar />
            <main className="flex-1 ml-64 transition-all duration-300">
                <div className="sticky top-0 z-10 bg-gray-50/95 backdrop-blur-sm border-b border-gray-200 px-8 py-4 flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
                    <div className="flex gap-4">{actions}</div>
                </div>
                <div className="p-8 max-w-7xl mx-auto">
                    {children}
                </div>
            </main>
        </div>
    );
}
