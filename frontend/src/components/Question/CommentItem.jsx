import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { voteApi, commentApi } from '../../api';

// Helper to flatten nested replies into a single list
const flattenReplies = (replies) => {
    if (!replies || replies.length === 0) return [];
    let acc = [];
    replies.forEach(reply => {
        acc.push(reply);
        if (reply.replies) {
            acc = acc.concat(flattenReplies(reply.replies));
        }
    });
    // Sort flattened replies by date (Oldest first for readability, or Newest?)
    // Usually linear threads are easier if chronological.
    // Backend returns newest first. Let's reverse them for chronological flow if desired, 
    // or keep generic. User asked for "sequence".
    // Let's keep backend order to avoid confusion.
    return acc;
};

export default function CommentItem({ comment, postId, refreshComments, me, depth = 0, postAuthorId }) {
    const [voteStatus, setVoteStatus] = useState('NONE');
    const [upvotes, setUpvotes] = useState(comment.upvotes || 0);
    const [downvotes, setDownvotes] = useState(comment.downvotes || 0);

    const [isReplying, setIsReplying] = useState(false);
    const [replyContent, setReplyContent] = useState('');
    const [submitting, setSubmitting] = useState(false);

    // Determine children: If root, flatten all descendants. If not root, ignore nested (handled by root).
    const isRoot = depth === 0;
    const flatChildren = isRoot ? flattenReplies(comment.replies) : [];

    useEffect(() => {
        if (me) {
            voteApi.getCommentVoteStatus(comment.id)
                .then(status => setVoteStatus(status || 'NONE'))
                .catch(err => console.error(err));
        }
    }, [comment.id, me]);

    const handleVote = async (type) => {
        if (!me) return;

        const previousStatus = voteStatus;
        const previousCounts = { upvotes, downvotes };

        let nextStatus = type;
        let nextUp = upvotes;
        let nextDown = downvotes;

        const isUpvote = type === 'UPVOTE';

        if (voteStatus === type) {
            nextStatus = 'NONE';
            if (isUpvote) nextUp--; else nextDown--;
        } else if (voteStatus === 'NONE') {
            if (isUpvote) nextUp++; else nextDown++;
        } else {
            if (isUpvote) { nextUp++; nextDown--; } else { nextDown++; nextUp--; }
        }

        setVoteStatus(nextStatus);
        setUpvotes(nextUp);
        setDownvotes(nextDown);

        try {
            await voteApi.voteComment(comment.id, type);
        } catch (err) {
            console.error(err);
            setVoteStatus(previousStatus);
            setUpvotes(previousCounts.upvotes);
            setDownvotes(previousCounts.downvotes);
        }
    };

    const handleReplyClick = () => {
        setIsReplying(!isReplying);
        if (!isReplying) {
            setReplyContent(`@${comment.author?.username || 'user'} `);
        }
    };

    const handleSubmitReply = async (e) => {
        e.preventDefault();
        if (!replyContent.trim()) return;

        try {
            setSubmitting(true);
            await commentApi.createComment(postId, {
                content: replyContent.trim(),
                parentId: comment.id
            });
            setIsReplying(false);
            setReplyContent('');
            refreshComments();
        } catch (err) {
            console.error(err);
            alert('Failed to reply');
        } finally {
            setSubmitting(false);
        }
    };

    const handleDelete = async () => {
        if (!window.confirm('Are you sure you want to delete this comment?')) return;
        try {
            await commentApi.deleteComment(comment.id);
            refreshComments();
        } catch (err) {
            console.error(err);
            alert('Failed to delete comment');
        }
    };

    const renderContent = (text) => {
        if (!text) return null;
        // Split by @username pattern
        const parts = text.split(/(@\w+)/g);
        return parts.map((part, i) => {
            if (part.startsWith('@')) {
                const username = part.substring(1);
                return (
                    <Link
                        key={i}
                        to={`/profile/${username}`}
                        className="text-blue-600 font-medium hover:underline"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {part}
                    </Link>
                );
            }
            return part;
        });
    };

    const score = upvotes - downvotes;

    // Styling: Root comments have borders/spacing. Replies are simpler.
    // Replies (depth > 0) get standard left indent.
    return (
        <div className={`text-sm ${depth === 0 ? 'border-b border-gray-100 py-4' : 'ml-8 mt-3 pl-3 border-l-2 border-gray-100'}`}>
            <div className="flex gap-3">
                <Link to={`/profile/${comment.author?.userId}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-xs uppercase flex-shrink-0 ${comment.author?.userId === me?.userId ? 'bg-indigo-500' : 'bg-gray-400'}`}>
                        {comment.author?.avatarUrl ? (
                            <img src={comment.author.avatarUrl} alt="" className="w-full h-full rounded-full object-cover" />
                        ) : (
                            comment.author?.fullName?.[0] || 'U'
                        )}
                    </div>
                </Link>

                <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                        <Link to={`/profile/${comment.author?.userId}`} className="font-semibold text-gray-900 hover:text-red-500">
                            {comment.author?.fullName || 'User'}
                        </Link>
                        <span className="text-gray-400 text-xs">
                            • {new Date(comment.createdAt).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' })}
                        </span>
                    </div>

                    <div className="text-gray-800 break-words mb-2 leading-relaxed">
                        {renderContent(comment.content)}
                    </div>

                    <div className="flex items-center gap-4 text-xs text-gray-500">
                        <div className="flex items-center gap-1">
                            <button
                                onClick={() => handleVote('UPVOTE')}
                                className={`flex items-center gap-1 hover:text-red-500 transition-colors ${voteStatus === 'UPVOTE' ? 'text-red-600' : 'text-gray-500'}`}
                                title="Upvote"
                            >
                                <svg className="w-4 h-4" fill={voteStatus === 'UPVOTE' ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                                </svg>
                                <span className="text-xs font-semibold">{upvotes}</span>
                            </button>

                            <button
                                onClick={() => handleVote('DOWNVOTE')}
                                className={`flex items-center gap-1 hover:text-red-500 transition-colors ${voteStatus === 'DOWNVOTE' ? 'text-red-600' : 'text-gray-500'}`}
                                title="Downvote"
                            >
                                <svg className="w-4 h-4" fill={voteStatus === 'DOWNVOTE' ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018c.163 0 .326.02.485.06L17 4m-7 10v9a2 2 0 002 2h.095c.5 0 .905-.405.905-.905 0-.714.211-1.412.608-2.006L17 13V4m-7 10h2" />
                                </svg>
                                <span className="text-xs font-semibold">{downvotes}</span>
                            </button>
                        </div>

                        <button
                            onClick={handleReplyClick}
                            className="font-medium hover:text-red-500 transition-colors"
                        >
                            Reply
                        </button>

                        {(me?.userId === (comment.author?.id || comment.author?.userId) || me?.userId === postAuthorId) && (
                            <button
                                onClick={handleDelete}
                                className="font-medium text-gray-400 hover:text-red-600 transition-colors"
                            >
                                Delete
                            </button>
                        )}
                    </div>

                    {isReplying && (
                        <form onSubmit={handleSubmitReply} className="mt-3 flex gap-2">
                            <input
                                className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-300 transition-all"
                                placeholder={`Reply to ${comment.author?.fullName}...`}
                                value={replyContent}
                                onChange={e => setReplyContent(e.target.value)}
                                autoFocus
                            />
                            <button
                                type="submit"
                                className="text-white bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600 disabled:opacity-50 font-medium transition-colors"
                                disabled={submitting}
                            >
                                Send
                            </button>
                        </form>
                    )}
                </div>
            </div>

            {/* Render Flattened Children (Only if Root) */}
            {isRoot && flatChildren.length > 0 && (
                <div className="mt-1">
                    {flatChildren.map(reply => (
                        <CommentItem
                            key={reply.id}
                            comment={reply}
                            postId={postId}
                            refreshComments={refreshComments}
                            me={me}
                            depth={depth + 1}
                            postAuthorId={postAuthorId}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
