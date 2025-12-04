import { LayoutDashboard, MessageCircle } from "lucide-react";
import '../Styles/dashboard.css'

function Dashboard() {
    // Helper component for the Stat Cards
    const StatCard = ({ title, value, change, icon, iconColor, bgColor }) => (
        <div className="card p-4 rounded-xl shadow-lg flex flex-col justify-between bg-[#1A1E2F] border border-white/5">
            <div className="flex justify-between items-center mb-2">
                <span className="text-gray-400 text-sm">{title}</span>
                <i className={`fas ${icon} ${iconColor} ${bgColor} p-2 rounded-lg`}></i>
            </div>
            <div className="flex items-end justify-between">
                <span className="text-3xl font-extrabold text-white">{value}</span>
                <span className={`${change.includes('+') ? 'text-green-400' : 'text-red-400'} text-xs`}>{change}</span>
            </div>
        </div>
    );

    // Helper component for the Conversation Items
    const ConversationItem = ({ title, date, messages }) => (
        <div className="border-b border-gray-700/50 pb-4">
            <p className="text-lg font-medium text-gray-100">{title}</p>
            <div className="text-gray-400 text-xs mt-1 flex justify-between">
                <span>{date}</span>
                <span className="text-indigo-400">{messages} messages</span>
            </div>
        </div>
    );

    // Helper component for the Right Column Cards (Activity/Breakdown)
    const DetailCard = ({ title, items, footer }) => (
        <div className="card p-6 rounded-xl shadow-lg bg-[#1A1E2F] border border-white/5">
            <h2 className="text-xl font-semibold text-white mb-4">{title}</h2>
            <div className="space-y-3 text-sm text-gray-400">
                {items.map((item, index) => (
                    <div key={index} className={`flex justify-between items-center ${item.divider ? 'border-b border-gray-700/50 pb-2' : ''}`}>
                        <span>{item.label}</span>
                        <span className="text-white font-bold">{item.value}</span>
                    </div>
                ))}
                {footer && (
                    <div className="pt-2">
                        <p>{footer.label}: <span className="text-white font-bold">{footer.value}</span></p>
                    </div>
                )}
            </div>
        </div>
    );


    return (
        <>
            {/* Font Awesome CDN link required for the icons to render */}
            <link 
                rel="stylesheet" 
                href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" 
                crossOrigin="anonymous" 
            />

            <div className='dashboard-container flex min-h-screen bg-gradient-to-b from-[#121626] via-[#1A1F30] to-[#121626] '>
                
                {/* LEFT SIDEBAR (div5) - Fixed width and dark background for sidebar component */}
                <div className="div5 w-64 p-4 space-y-8 border-r border-gray-700/50 flex-shrink-0">
                    <div className='logo text-white text-2xl font-bold'>logo</div>
                    
                    {/* Navigation Options */}
                    <div className='dashboard-options space-y-6'>
                        <div className='navigate-option space-y-2'>
                            <div className='navigate-option-inner-div space-y-1'>
                                <div className='dashboard-navigate-option flex items-center p-2 rounded-lg text-gray-400 hover:bg-gray-700/50 cursor-pointer transition duration-150'>
                                    <LayoutDashboard size={12} className="icon" />
                                    <p className='icon-name ml-3'>Dashboard</p>
                                </div>
                                {/* Active Chat Button with Gradient */}
                                <div className='chats-navigate-option flex items-center p-2 rounded-lg text-gray-400 cursor-pointer text-white font-semibold transition duration-150'
                                   >
                                    <MessageCircle size={14} className="icon dashboard-icon" />
                                    <p className='icon-name ml-3'>Chats</p>
                                </div>
                            </div>
                        </div>

                        {/* System Status Card */}
                        <div className='system-status bg-[#21283D] p-4 rounded-xl shadow-xl' style={{ border: '1px solid rgba(255, 255, 255, 0.05)' }}>
                            <div className='py-1'>
                                <p className='text-xs text-cyan-400 font-extrabold tracking-widest uppercase'>SYSTEM STATUS</p>
                            </div>
                            <div className='system-status-option space-y-2 text-gray-300 text-sm m-2 mt-4'>
                                {/* AI Status */}
                                <div className='system-status-inner-option flex justify-between items-center'>
                                    <p className='flex items-center'>
                                        {/* Green Dot */}
                                        <div className='w-2 h-2 rounded-full mr-2' style={{ backgroundColor: "#4ADE80", boxShadow: "0 0 2px #4ADE80" }}></div>
                                        AI Status
                                    </p>
                                    <p className='text-green-200 font-semibold text-sm' style={{ textShadow: '0 0 2px #4ADE80' }}>Online</p>
                                </div>
                                {/* Res. Time */}
                                <div className='system-status-inner-option flex justify-between items-center'>
                                    <p className='flex items-center'>
                                        {/* Blue Dot */}
                                        <div className='w-2 h-2 rounded-full mr-2' style={{ backgroundColor: "#38BDF8", boxShadow: "0 0 2px #38BDF8" }}></div>
                                        Res. Time
                                    </p>
                                    <p className='text-sky-400 font-semibold' style={{ textShadow: '0 0 5px #38BDF8' }}>~1.2s</p>
                                </div>
                                {/* Model Version */}
                                <div className='system-status-inner-option flex justify-between items-center'>
                                    <p className='flex items-center'>
                                        {/* Pink Dot */}
                                        <div className='w-2 h-2 rounded-full mr-2' style={{ backgroundColor: "#F472B6", boxShadow: "0 0 2px #F472B6" }}></div>
                                        Model Version
                                    </p>
                                    <p className='text-pink-400 font-semibold' style={{ textShadow: '0 0 5px #F472B6' }}>v2.1</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* MAIN DASHBOARD CONTENT (dashboard-main-hero-section) */}
                <div className="dashboard-main-hero-section flex-1 p-8 md:p-12 space-y-8">
                    
                    {/* Header: AI Dashboard & New Chat Button */}
                    <div className="mb-4 flex justify-between items-center">
                        <div>
                            <h1 className="text-3xl font-bold text-white">AI Dashboard</h1>
                            <p className="text-gray-400 mt-1">Welcome back! Ready to explore AI conversations?</p>
                        </div>
                        <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg shadow-lg transition duration-300 flex items-center space-x-2">
                            <i className="fas fa-plus text-sm"></i>
                            <span>New Chat</span>
                        </button>
                    </div>
                    
                    {/* Dashboard Grid Container */}
                    <div className="grid grid-cols-12 gap-6">

                        {/* 1. Top Row: Stat Cards (4 equal columns on desktop) */}
                        <div className="col-span-12 grid grid-cols-1 md:grid-cols-4 gap-6">
                            
                            <StatCard title="Total Conversations" value="5" change="+12%" icon="fa-comment" iconColor="text-indigo-400" bgColor="bg-indigo-900/50" />
                            <StatCard title="Total Messages" value="10" change="+8%" icon="fa-envelope" iconColor="text-pink-400" bgColor="bg-pink-900/50" />
                            <StatCard title="Today's Messages" value="0" change="-14%" icon="fa-calendar-day" iconColor="text-teal-400" bgColor="bg-teal-900/50" />
                            <StatCard title="Avg Response Time" value="1.2s" change="-2%" icon="fa-tachometer-alt" iconColor="text-orange-400" bgColor="bg-orange-900/50" />

                        </div>

                        {/* 2. Main Content Area: Left (span-8) and Right (span-4) */}

                        {/* Left Column: Recent Conversations (Span 8) */}
                        <div className="col-span-12 lg:col-span-8 card p-6 rounded-xl shadow-xl space-y-4 bg-[#1A1E2F] border border-white/5">
                            <h2 className="text-xl font-semibold text-white mb-4">Recent Conversations</h2>
                            
                            <ConversationItem title="Hey" date="Sep 12, 2024 | 10:04" messages="8" />
                            <ConversationItem title="New Conversation" date="Sep 7, 2024 | 17:12" messages="0" />
                            <ConversationItem title="Getting Started with AI" date="Jan 15, 2024 | 10:00" messages="6" />
                            <ConversationItem title="Help up with Python Programming" date="Jan 15, 2024 | 22:50" messages="9" />
                            <ConversationItem title="Creative Writing Ideas" date="Jan 10, 2024 | 08:30" messages="4" />
                        </div>

                        {/* Right Column: Activity and Message Breakdown (Span 4) */}
                        <div className="col-span-12 lg:col-span-4 space-y-6">

                            {/* Activity Overview Card */}
                            <DetailCard 
                                title="Activity Overview"
                                items={[
                                    { label: 'Today', value: '0', divider: true },
                                    { label: 'Yesterday', value: '0', divider: true },
                                    { label: 'This Week', value: '0', divider: false },
                                ]}
                            />

                            {/* Message Breakdown Card */}
                            <DetailCard 
                                title="Message Breakdown"
                                items={[
                                    { label: 'Your Messages', value: '5', divider: true },
                                    { label: 'AI Responses', value: '5', divider: true },
                                ]}
                                footer={{ label: 'Avg message length', value: '100 chars' }}
                            />
                        </div>

                        {/* 3. Bottom Row: CTA Card (Full 12 columns) */}
                        <div className="col-span-12 mt-4">
                            <div className="p-6 rounded-xl shadow-2xl flex justify-between items-center" 
                                style={{ background: 'linear-gradient(to right, #4C65EF, #8B5CF6, #EC4899)', border: '1px solid rgba(255, 255, 255, 0.2)' }}>
                                <div>
                                    <h2 className="text-xl font-bold text-white mb-1">Ready to explore AI conversations?</h2>
                                    <p className="text-gray-100">Start a new chat that learns and experience the power of advanced AI assistance.</p>
                                </div>
                                <button className="bg-indigo-900/50 hover:bg-indigo-900/70 text-white font-semibold py-3 px-6 rounded-lg transition duration-300 flex items-center space-x-2 whitespace-nowrap border border-white/20">
                                    <span>Start Chatting</span>
                                    <i className="fas fa-arrow-right text-sm ml-2"></i>
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

        </>
    );
}

export default Dashboard;
