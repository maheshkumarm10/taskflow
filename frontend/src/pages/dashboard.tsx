import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";

interface Task {
    _id: string;
    status: string;
    createdAt: string;
}

export default function DashboardPage() {
    const navigate = useNavigate();
    const [stats, setStats] = useState({
        totalToday: 0,
        completedToday: 0
    });

    useEffect(() => {
        const email = localStorage.getItem('userEmail');
        if (!email) {
            navigate('/login');
            return;
        }

        fetch(`http://localhost:5000/api/tasks/my?email=${email}`)
            .then(res => res.json())
            .then((data: Task[]) => {
                const today = new Date().toLocaleDateString();
                const todaysTasks = data.filter(task =>
                    new Date(task.createdAt).toLocaleDateString() === today
                );

                setStats({
                    totalToday: todaysTasks.length,
                    completedToday: todaysTasks.filter(t => t.status === 'completed').length
                });
            })
            .catch(err => console.error('Error fetching stats:', err));
    }, [navigate]);

    const handleLogout = () => {
        // Clear any stored tokens or user data here if implemented
        navigate("/login");
    };

    return (
        <Layout
            title="Dashboard"
            actions={
                <button
                    onClick={handleLogout}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                >
                    Logout
                </button>
            }
        >
            <div className="mb-8">

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white p-6 rounded-2xl shadow-md">
                        <h2 className="text-xl font-semibold mb-4">Welcome Back!</h2>
                        <p className="text-gray-600">
                            This is your dashboard where you can manage your tasks and view your
                            activity.
                        </p>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-md">
                        <h2 className="text-xl font-semibold mb-4">Today's Stats</h2>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-blue-50 p-4 rounded-xl">
                                <p className="text-sm text-blue-600 font-medium">Today's Tasks</p>
                                <p className="text-2xl font-bold text-blue-800">{stats.totalToday}</p>
                            </div>
                            <div className="bg-green-50 p-4 rounded-xl">
                                <p className="text-sm text-green-600 font-medium">Completed Today</p>
                                <p className="text-2xl font-bold text-green-800">{stats.completedToday}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
