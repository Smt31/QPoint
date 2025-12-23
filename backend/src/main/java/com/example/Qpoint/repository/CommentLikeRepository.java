package com.example.Qpoint.repository;

import com.example.Qpoint.models.Comment;
import com.example.Qpoint.models.CommentLike;
import com.example.Qpoint.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface CommentLikeRepository extends JpaRepository<CommentLike, Long> {
    Optional<CommentLike> findByUserAndComment(User user, Comment comment);
    boolean existsByUserAndComment(User user, Comment comment);
    long countByComment(Comment comment);
}