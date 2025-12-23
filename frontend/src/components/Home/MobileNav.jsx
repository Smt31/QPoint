import { useNavigate, useLocation } from 'react-router-dom';

export default function MobileNav({ onAskQuestion }) {
    const navigate = useNavigate();
    const location = useLocation();
    const isActive = (path) => location.pathname === path;

    return (
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex items-center justify-around py-2 px-4 z-50">
            <button
                className={`flex flex-col items-center gap-1 ${isActive('/home') ? 'text-[#FF6B6B]' : 'text-gray-500'}`}
                onClick={() => navigate('/home')}
            >
                <svg width="20" height="20" fill={isActive('/home') ? "currentColor" : "currentColor"} viewBox="0 0 24 24">
                    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
                </svg>
                <span className="text-xs">Home</span>
            </button>
            <button
                className={`flex flex-col items-center gap-1 ${isActive('/search') ? 'text-[#FF6B6B]' : 'text-gray-500'}`}
                onClick={() => navigate('/search')}
            >
                <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                <span className="text-xs">Search</span>
            </button>
            <button className="flex flex-col items-center gap-1 text-gray-500" onClick={onAskQuestion}>
                <div className="size-10 bg-[#FF6B6B] rounded-full flex items-center justify-center -mt-4 shadow-md">
                    <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24" className="text-white">
                        <line x1="12" y1="5" x2="12" y2="19" />
                        <line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                </div>
            </button>
            <button
                className={`flex flex-col items-center gap-1 ${isActive('/bookmarks') ? 'text-[#FF6B6B]' : 'text-gray-500'}`}
                onClick={() => navigate('/bookmarks')}
            >
                <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                </svg>
                <span className="text-xs">Saved</span>
            </button>
            <button
                className={`flex flex-col items-center gap-1 ${isActive('/settings') ? 'text-[#FF6B6B]' : 'text-gray-500'}`}
                onClick={() => navigate('/settings')}
            >
                <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <span className="text-xs">Security</span>
            </button>
        </div>
    );
}
