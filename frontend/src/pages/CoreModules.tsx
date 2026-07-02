import { useState } from 'react';
import Layout from '../components/Layout';

interface ModuleCard {
    id: string;
    clientName: string;
    maintainedBy: string;
    hosting: string;
    frequency: string;
}

const MOCK_DATA: ModuleCard[] = [
    {
        id: '1',
        clientName: 'Acme Corp',
        maintainedBy: 'Team Alpha',
        hosting: 'AWS',
        frequency: 'Daily'
    },
    {
        id: '2',
        clientName: 'Globex Inc',
        maintainedBy: 'Team Beta',
        hosting: 'GCP',
        frequency: 'Weekly'
    },
    {
        id: '3',
        clientName: 'Soylent Corp',
        maintainedBy: 'Team Gamma',
        hosting: 'Azure',
        frequency: 'Monthly'
    },
    {
        id: '4',
        clientName: 'Initech',
        maintainedBy: 'Team Delta',
        hosting: 'On-Premise',
        frequency: 'Daily'
    }
];

export default function CoreModulesPage() {
    const [selectedModule, setSelectedModule] = useState<ModuleCard | null>(null);

    return (
        <Layout title="Core Modules">
            {/* Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {MOCK_DATA.map((module) => (
                    <div
                        key={module.id}
                        onClick={() => setSelectedModule(module)}
                        className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow cursor-pointer border border-gray-100"
                    >
                        <h3 className="text-lg font-bold text-gray-800 mb-4">{module.clientName}</h3>

                        <div className="space-y-3 text-sm">
                            <div>
                                <p className="text-gray-500 text-xs uppercase tracking-wider font-semibold">Maintained By</p>
                                <p className="text-gray-700 font-medium">{module.maintainedBy}</p>
                            </div>

                            <div>
                                <p className="text-gray-500 text-xs uppercase tracking-wider font-semibold">Hosting</p>
                                <p className="text-gray-700 font-medium">{module.hosting}</p>
                            </div>

                            <div>
                                <p className="text-gray-500 text-xs uppercase tracking-wider font-semibold">Frequency</p>
                                <span className="inline-block px-2 py-1 bg-blue-50 text-blue-700 rounded-md text-xs font-semibold mt-1">
                                    {module.frequency}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Slide-out Drawer & Overlay */}
            {/* Overlay */}
            {selectedModule && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 transition-opacity backdrop-blur-sm"
                    onClick={() => setSelectedModule(null)}
                />
            )}

            {/* Drawer */}
            <div
                className={`fixed top-0 right-0 h-full bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${selectedModule ? 'translate-x-0' : 'translate-x-full'
                    }`}
                style={{ width: '90vw' }}
            >
                {selectedModule && (
                    <div className="h-full flex flex-col">
                        {/* Header */}
                        <div className="px-8 py-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-800">{selectedModule.clientName}</h2>
                                <p className="text-gray-500 mt-1">Module Details</p>
                            </div>
                            <button
                                onClick={() => setSelectedModule(null)}
                                className="p-2 hover:bg-gray-200 rounded-full transition-colors text-gray-500"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        {/* Content */}
                        <div className="flex-1 overflow-y-auto p-8">

                            <div className="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm">
                                <div className="grid grid-cols-[100px_120px_1fr_1fr_20px_120px_1fr_1fr] gap-4 bg-gray-50 border-b border-gray-200 p-4 font-semibold text-sm text-gray-700 items-center">
                                    <div>Month</div>
                                    <div>Week</div>
                                    <div>Detail 1</div>
                                    <div>Detail 2</div>
                                    <div></div>
                                    <div>Week</div>
                                    <div>Detail 3</div>
                                    <div>Detail 4</div>
                                </div>

                                <div className="divide-y divide-gray-100">
                                    {['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map((month) => (
                                        <div key={month} className="grid grid-cols-[100px_120px_1fr_1fr_20px_120px_1fr_1fr] gap-4 p-4 items-center hover:bg-gray-50 transition-colors">
                                            <div className="font-medium text-gray-900">{month}</div>

                                            {/* Group 1 */}
                                            <div>
                                                <select className="w-full rounded-lg border-gray-300 border px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none">
                                                    <option>1st Week</option>
                                                    <option>2nd Week</option>
                                                    <option>3rd Week</option>
                                                    <option>4th Week</option>
                                                </select>
                                            </div>
                                            <div>
                                                <input type="text" className="w-full rounded-lg border-gray-300 border px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" placeholder="Detail..." />
                                            </div>
                                            <div>
                                                <input type="text" className="w-full rounded-lg border-gray-300 border px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" placeholder="Detail..." />
                                            </div>

                                            {/* Spacer */}
                                            <div className="border-r border-gray-200 h-8 mx-auto"></div>

                                            {/* Group 2 */}
                                            <div>
                                                <select className="w-full rounded-lg border-gray-300 border px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none">
                                                    <option>1st Week</option>
                                                    <option>2nd Week</option>
                                                    <option>3rd Week</option>
                                                    <option>4th Week</option>
                                                </select>
                                            </div>
                                            <div>
                                                <input type="text" className="w-full rounded-lg border-gray-300 border px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" placeholder="Detail..." />
                                            </div>
                                            <div>
                                                <input type="text" className="w-full rounded-lg border-gray-300 border px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" placeholder="Detail..." />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                        </div>

                        {/* Footer */}
                        <div className="px-8 py-6 border-t border-gray-100 bg-gray-50">
                            <div className="flex gap-4 justify-end">
                                <button
                                    onClick={() => setSelectedModule(null)}
                                    className="px-6 py-2.5 text-gray-600 hover:bg-gray-200 font-medium rounded-lg transition-colors"
                                >
                                    Close
                                </button>
                                <button className="px-6 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200">
                                    Edit Details
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </Layout>
    );
}
