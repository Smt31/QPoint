package com.example.Qpoint.repository;

import com.example.Qpoint.models.Like;
import com.example.Qpoint.models.Post;
import com.example.Qpoint.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface LikeRepository extends JpaRepository<Like, Long> {
    Optional<Like> findByUserAndPost(User user, Post post);
    boolean existsByUserAndPost(User user, Post post);

    long countByPost(Post post);
    void deleteByPost(Post post);
}