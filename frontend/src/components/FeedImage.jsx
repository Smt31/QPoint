import { useState, useEffect } from 'react';

export default function FeedImage({ src, alt }) {
    const [isOpen, setIsOpen] = useState(false);

    // Lock body scroll when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    if (!src) return null;

    return (
        <>
            {/* Feed Container */}
            {/* 
         w-full: Width fills parent (card)
         flex justify-center: Centers the image horizontally (letterboxing effect)
         bg-gray-50: Neutral background for empty space
         max-h-[500px]: Constrains height to avoid tall posts breaking layout
         overflow-hidden: Ensures no spillover
      */}
            <div
                className="w-full bg-gray-50 border border-gray-200 rounded-xl overflow-hidden cursor-pointer flex items-center justify-center mb-3 relative"
                onClick={(e) => {
                    e.stopPropagation();
                    setIsOpen(true);
                }}
                role="button"
                tabIndex={0}
            >
                <img
                    src={src}
                    alt={alt || "Post image"}
                    className="max-w-full max-h-[500px] object-contain"
                // object-contain ensures full image is visible
                // max-h-[500px] ensures it doesn't exceed container limit
                />

                {/* Hover overlay hint (optional) */}
                <div className="absolute inset-0 bg-black/0 hover:bg-black/5 transition-colors duration-200" />
            </div>

            {/* Full Screen Viewer Modal */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-[9999] bg-black/95 flex items-center justify-center p-4 md:p-8 backdrop-blur-sm animate-in fade-in duration-200"
                    onClick={(e) => {
                        e.stopPropagation();
                        setIsOpen(false);
                    }}
                >
                    {/* Close Button */}
                    <button
                        className="absolute top-4 right-4 md:top-6 md:right-6 text-white/70 hover:text-white p-2 rounded-full hover:bg-white/10 transition-all z-50"
                        onClick={() => setIsOpen(false)}
                        aria-label="Close full view"
                    >
                        <svg className="w-8 h-8 md:w-10 md:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>

                    {/* Full Image */}
                    <img
                        src={src}
                        alt={alt || "Full view"}
                        className="max-w-full max-h-[95vh] object-contain shadow-2xl rounded-sm"
                        onClick={(e) => e.stopPropagation()} // Clicking image usually doesn't close
                    />
                </div>
            )}
        </>
    );
}
