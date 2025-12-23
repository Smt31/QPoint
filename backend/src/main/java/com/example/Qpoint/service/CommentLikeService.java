package com.example.Qpoint.service;

import com.example.Qpoint.models.Comment;
import com.example.Qpoint.models.CommentLike;
import com.example.Qpoint.models.User;
import com.example.Qpoint.repository.CommentLikeRepository;
import com.example.Qpoint.repository.CommentRepository;
import com.example.Qpoint.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class CommentLikeService {

    private final CommentLikeRepository commentLikeRepository;
    private final CommentRepository commentRepository;
    private final UserRepository userRepository;

    public CommentLikeService(CommentLikeRepository commentLikeRepository, CommentRepository commentRepository, UserRepository userRepository) {
        this.commentLikeRepository = commentLikeRepository;
        this.commentRepository = commentRepository;
        this.userRepository = userRepository;
    }

    @Transactional
    public CommentLike likeComment(Long userId, Long commentId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Comment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new RuntimeException("Comment not found"));

        boolean alreadyLiked = commentLikeRepository.existsByUserAndComment(user, comment);
        if (alreadyLiked) {
            throw new RuntimeException("Comment already liked");
        }

        CommentLike commentLike = new CommentLike();
        commentLike.setUser(user);
        commentLike.setComment(comment);
        commentLike = commentLikeRepository.save(commentLike);

        // Update like (upvote) count on comment
        comment.setUpvotes(comment.getUpvotes() + 1);
        commentRepository.save(comment);

        return commentLike;
    }

    @Transactional
    public void unlikeComment(Long userId, Long commentId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Comment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new RuntimeException("Comment not found"));

        var commentLike = commentLikeRepository.findByUserAndComment(user, comment);
        if (commentLike.isEmpty()) {
            throw new RuntimeException("Comment not liked");
        }

        commentLikeRepository.delete(commentLike.get());

        // Update like (upvote) count on comment
        comment.setUpvotes(Math.max(0, comment.getUpvotes() - 1));
        commentRepository.save(comment);
    }

    public boolean isCommentLikedByUser(Long userId, Long commentId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Comment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new RuntimeException("Comment not found"));

        return commentLikeRepository.existsByUserAndComment(user, comment);
    }

    public long getLikeCountForComment(Long commentId) {
        Comment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new RuntimeException("Comment not found"));

        return commentLikeRepository.countByComment(comment);
    }
}