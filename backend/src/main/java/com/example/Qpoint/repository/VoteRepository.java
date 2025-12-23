package com.example.Qpoint.repository;

import com.example.Qpoint.models.User;
import com.example.Qpoint.models.Vote;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.Optional;

public interface VoteRepository extends JpaRepository<Vote, Long> {
    Optional<Vote> findByUserAndEntityTypeAndEntityId(User user, Vote.EntityType entityType, Long entityId);
    java.util.List<Vote> findAllByUserAndEntityTypeAndEntityId(User user, Vote.EntityType entityType, Long entityId);
    void deleteByEntityTypeAndEntityId(Vote.EntityType entityType, Long entityId);
    
    @Query("SELECT COUNT(v) FROM Vote v WHERE v.entityType = :entityType AND v.entityId = :entityId AND v.voteType = 'UPVOTE'")
    long countUpvotesByEntityTypeAndEntityId(@Param("entityType") Vote.EntityType entityType, @Param("entityId") Long entityId);
    
    @Query("SELECT COUNT(v) FROM Vote v WHERE v.entityType = :entityType AND v.entityId = :entityId AND v.voteType = 'DOWNVOTE'")
    long countDownvotesByEntityTypeAndEntityId(@Param("entityType") Vote.EntityType entityType, @Param("entityId") Long entityId);
    
    long countByEntityTypeAndEntityId(Vote.EntityType entityType, Long entityId);
}