package com.example.Qnect.repository;

import com.example.Qnect.models.Post;
import com.example.Qnect.models.PostView;
import com.example.Qnect.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PostViewRepository extends JpaRepository<PostView, Long> {
    boolean existsByUserAndPost(User user, Post post);
    void deleteByPost(Post post);
}
