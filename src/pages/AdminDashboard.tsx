import { useEffect, useState } from 'react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { LogOut, Mail, Calendar, Search, Trash2 } from 'lucide-react';

interface AdminDashboardProps {
    onLogout: () => void;
}

interface Message {
    _id: string;
    name: string;
    email: string;
    subject: string;
    message: string;
    createdAt: string;
}

export function AdminDashboard({ onLogout }: AdminDashboardProps) {
    const [activeTab, setActiveTab] = useState<'messages' | 'causes'>('messages');

    // Messages State
    const [messages, setMessages] = useState<Message[]>([]);
    const [isLoadingMessages, setIsLoadingMessages] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    // Causes State
    const [causes, setCauses] = useState<any[]>([]);
    const [isLoadingCauses, setIsLoadingCauses] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [currentCause, setCurrentCause] = useState<any>({
        title: '', description: '', category: '', raised_amount: 0, goal_amount: 0, image_url: ''
    });

    const categories = ['Education', 'Healthcare', 'Water & Sanitation', 'Food & Nutrition', 'Empowerment', 'Emergency Relief'];

    const fetchData = async () => {
        const token = localStorage.getItem('adminToken');
        if (!token) return onLogout();

        try {
            // Fetch Messages
            const msgResponse = await fetch('http://localhost:5000/api/admin/messages', {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (msgResponse.ok) setMessages(await msgResponse.json());

            // Fetch Causes
            const causeResponse = await fetch('http://localhost:5000/api/causes');
            if (causeResponse.ok) setCauses(await causeResponse.json());
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setIsLoadingMessages(false);
            setIsLoadingCauses(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [onLogout]);

    // Cause Handlers
    const handleSaveCause = async (e: React.FormEvent) => {
        e.preventDefault();
        const token = localStorage.getItem('adminToken');
        const url = isEditing ? `http://localhost:5000/api/causes/${currentCause._id}` : 'http://localhost:5000/api/causes';
        const method = isEditing ? 'PUT' : 'POST';

        try {
            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
                body: JSON.stringify(currentCause)
            });
            if (res.ok) {
                setIsEditing(false);
                setCurrentCause({ title: '', description: '', category: '', raised_amount: 0, goal_amount: 0, image_url: '' });
                fetchData();
            }
        } catch (error) {
            console.error('Error saving cause:', error);
        }
    };

    const handleDeleteCause = async (id: string) => {
        if (!confirm('Are you sure you want to delete this cause?')) return;
        const token = localStorage.getItem('adminToken');
        try {
            await fetch(`http://localhost:5000/api/causes/${id}`, {
                method: 'DELETE',
                headers: { Authorization: `Bearer ${token}` }
            });
            fetchData();
        } catch (error) {
            console.error('Error deleting cause:', error);
        }
    };

    const filteredMessages = messages.filter(msg =>
        msg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        msg.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
        msg.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <header className="bg-gray-900 text-white shadow-lg sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
                    <div className="flex items-center space-x-3">
                        <div className="font-bold text-xl tracking-tight">Admin<span className="text-purple-400">Panel</span></div>
                        <div className="hidden md:block h-6 w-px bg-gray-700 mx-2"></div>
                        <nav className="flex space-x-4">
                            <button onClick={() => setActiveTab('messages')} className={`${activeTab === 'messages' ? 'text-white font-bold' : 'text-gray-400 hover:text-white'}`}>Messages</button>
                            <button onClick={() => setActiveTab('causes')} className={`${activeTab === 'causes' ? 'text-white font-bold' : 'text-gray-400 hover:text-white'}`}>Causes</button>
                        </nav>
                    </div>
                    <Button variant="outline" size="sm" onClick={onLogout} className="border-gray-600 text-gray-300 hover:text-white hover:bg-gray-800">
                        <LogOut className="w-4 h-4 mr-2 inline" />
                        Logout
                    </Button>
                </div>
            </header>

            <main className="flex-grow container mx-auto px-4 py-8 max-w-7xl">
                {activeTab === 'messages' ? (
                    <>
                        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                            <h1 className="text-3xl font-bold text-gray-900 flex items-center">
                                <Mail className="w-8 h-8 mr-3 text-purple-600" />
                                Inbox <span className="ml-3 text-lg font-normal text-gray-500 bg-gray-200 px-3 py-1 rounded-full">{messages.length}</span>
                            </h1>
                            <div className="relative w-full md:w-96">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    type="text"
                                    placeholder="Search messages..."
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                        </div>

                        {isLoadingMessages ? (
                            <div className="flex justify-center items-center h-64"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div></div>
                        ) : filteredMessages.length === 0 ? (
                            <div className="text-center py-20 bg-white rounded-xl shadow-sm border border-gray-100">
                                <Mail className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                                <h3 className="text-xl font-medium text-gray-900">No messages found</h3>
                            </div>
                        ) : (
                            <div className="grid gap-6">
                                {filteredMessages.map((msg) => (
                                    <Card key={msg._id} className="overflow-hidden hover:shadow-md transition-shadow border-l-4 border-l-purple-600">
                                        <div className="p-6">
                                            <div className="flex flex-col md:flex-row justify-between md:items-center mb-4 gap-2">
                                                <div className="flex items-center space-x-3">
                                                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center text-purple-700 font-bold text-lg">{msg.name.charAt(0).toUpperCase()}</div>
                                                    <div><h3 className="font-bold text-gray-900">{msg.name}</h3><a href={`mailto:${msg.email}`} className="text-sm text-purple-600 hover:underline">{msg.email}</a></div>
                                                </div>
                                                <div className="flex items-center text-gray-500 text-sm bg-gray-50 px-3 py-1 rounded-full"><Calendar className="w-4 h-4 mr-2" />{new Date(msg.createdAt).toLocaleString()}</div>
                                            </div>
                                            <div className="bg-gray-50 rounded-lg p-4 border border-gray-100 mb-2"><h4 className="font-semibold text-gray-800 mb-2">{msg.subject}</h4><p className="text-gray-600 whitespace-pre-wrap leading-relaxed">{msg.message}</p></div>
                                        </div>
                                    </Card>
                                ))}
                            </div>
                        )}
                    </>
                ) : (
                    <>
                        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                            <h1 className="text-3xl font-bold text-gray-900 flex items-center">Causes Management</h1>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                            <h2 className="text-xl font-bold mb-4">{isEditing ? 'Edit Cause' : 'Add New Cause'}</h2>
                            <form onSubmit={handleSaveCause} className="grid gap-4 md:grid-cols-2">
                                <input className="border p-2 rounded" placeholder="Title" value={currentCause.title} onChange={e => setCurrentCause({ ...currentCause, title: e.target.value })} required />
                                <select className="border p-2 rounded" value={currentCause.category} onChange={e => setCurrentCause({ ...currentCause, category: e.target.value })} required>
                                    <option value="">Select Category</option>
                                    {categories.map(c => <option key={c} value={c}>{c}</option>)}
                                </select>
                                <input className="border p-2 rounded" type="number" placeholder="Raised Amount" value={currentCause.raised_amount} onChange={e => setCurrentCause({ ...currentCause, raised_amount: Number(e.target.value) })} required />
                                <input className="border p-2 rounded" type="number" placeholder="Goal Amount" value={currentCause.goal_amount} onChange={e => setCurrentCause({ ...currentCause, goal_amount: Number(e.target.value) })} required />
                                <input className="border p-2 rounded md:col-span-2" placeholder="Image URL" value={currentCause.image_url} onChange={e => setCurrentCause({ ...currentCause, image_url: e.target.value })} required />
                                <textarea className="border p-2 rounded md:col-span-2" placeholder="Description" rows={3} value={currentCause.description} onChange={e => setCurrentCause({ ...currentCause, description: e.target.value })} required />
                                <div className="md:col-span-2 flex gap-2">
                                    <Button type="submit">{isEditing ? 'Update Cause' : 'Add Cause'}</Button>
                                    {isEditing && <Button variant="outline" type="button" onClick={() => { setIsEditing(false); setCurrentCause({ title: '', description: '', category: '', raised_amount: 0, goal_amount: 0, image_url: '' }); }}>Cancel</Button>}
                                </div>
                            </form>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {isLoadingCauses ? <p>Loading causes...</p> : causes.map(cause => (
                                <Card key={cause._id} className="p-4 flex flex-col justify-between">
                                    <div>
                                        <img src={cause.image_url} alt={cause.title} className="w-full h-32 object-cover rounded mb-4" />
                                        <h3 className="font-bold text-lg mb-2">{cause.title}</h3>
                                        <p className="text-sm text-gray-600 mb-2">{cause.category}</p>
                                        <p className="text-sm text-gray-500 mb-4 line-clamp-3">{cause.description}</p>
                                        <div className="bg-gray-200 rounded-full h-2 mb-2">
                                            <div className="bg-purple-600 h-2 rounded-full" style={{ width: `${Math.min((cause.raised_amount / cause.goal_amount) * 100, 100)}%` }}></div>
                                        </div>
                                        <div className="flex justify-between text-xs text-gray-500 mb-4">
                                            <span>${cause.raised_amount} raised</span>
                                            <span>of ${cause.goal_amount}</span>
                                        </div>
                                    </div>
                                    <div className="flex justify-end gap-2">
                                        <Button size="sm" variant="outline" onClick={() => { setIsEditing(true); setCurrentCause(cause); window.scrollTo(0, 0); }}>Edit</Button>
                                        <Button size="sm" className="bg-red-600 hover:bg-red-700 text-white" onClick={() => handleDeleteCause(cause._id)}><Trash2 className="w-4 h-4" /></Button>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    </>
                )}
            </main>
        </div>
    );
}
