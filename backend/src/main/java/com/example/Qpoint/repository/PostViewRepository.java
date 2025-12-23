package com.example.Qpoint.repository;

import com.example.Qpoint.models.Post;
import com.example.Qpoint.models.PostView;
import com.example.Qpoint.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PostViewRepository extends JpaRepository<PostView, Long> {
    boolean existsByUserAndPost(User user, Post post);
    void deleteByPost(Post post);
}
