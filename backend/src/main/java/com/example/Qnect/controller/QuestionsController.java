package com.example.Qnect.controller;

import com.example.Qnect.dto.CreatePostRequest;
import com.example.Qnect.dto.FeedPostDto;
import com.example.Qnect.models.Post;
import com.example.Qnect.service.PostService;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import org.springframework.security.core.Authentication;
import com.example.Qnect.config.CustomUserDetails;
import java.util.List;

@RestController
@RequestMapping("/api/questions")
public class QuestionsController {

    private final PostService postService;

    public QuestionsController(PostService postService) {
        this.postService = postService;
    }

    @PostMapping
    public ResponseEntity<FeedPostDto> createQuestion(@RequestBody CreatePostRequest request, Authentication authentication) {
        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.status(401).build();
        }
        
        Object principal = authentication.getPrincipal();
        if (!(principal instanceof CustomUserDetails)) {
            return ResponseEntity.status(401).build();
        }
        
        Long userId = ((CustomUserDetails) principal).getUserId();
        if (userId == null) {
            return ResponseEntity.status(401).build();
        }
        
        var post = postService.createPost(userId, request);
        var postDto = postService.getPostById(post.getId());
        return ResponseEntity.ok(postDto);
    }

    @GetMapping("/{id}")
    public ResponseEntity<FeedPostDto> getQuestion(@PathVariable Long id, Authentication authentication) {
        Long userId = null;
        if (authentication != null && authentication.isAuthenticated()) {
            Object principal = authentication.getPrincipal();
            if (principal instanceof CustomUserDetails) {
                userId = ((CustomUserDetails) principal).getUserId();
            }
        }
        FeedPostDto post = postService.getPostByIdAndIncrementViews(id, userId);
        return ResponseEntity.ok(post);
    }

    @PutMapping("/{id}")
    public ResponseEntity<FeedPostDto> updateQuestion(@PathVariable Long id,
                                                      @RequestBody CreatePostRequest request,
                                                      Authentication authentication) {
        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.status(401).build();
        }
        
        Object principal = authentication.getPrincipal();
        if (!(principal instanceof CustomUserDetails)) {
            return ResponseEntity.status(401).build();
        }
        
        Long userId = ((CustomUserDetails) principal).getUserId();
        if (userId == null) {
            return ResponseEntity.status(401).build();
        }
        
        Post updated = postService.updatePost(id, userId, request);
        return ResponseEntity.ok(postService.getPostById(updated.getId()));
    }

    @GetMapping
    public ResponseEntity<Page<FeedPostDto>> getAllQuestions(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Page<FeedPostDto> questions = postService.getAllPosts(page, size);
        return ResponseEntity.ok(questions);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteQuestion(@PathVariable Long id, Authentication authentication) {
        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.status(401).build();
        }
        
        Object principal = authentication.getPrincipal();
        if (!(principal instanceof CustomUserDetails)) {
            return ResponseEntity.status(401).build();
        }
        
        Long userId = ((CustomUserDetails) principal).getUserId();
        if (userId == null) {
            return ResponseEntity.status(401).build();
        }
        
        postService.deletePost(id, userId);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/topic/{topicId}")
    public ResponseEntity<Page<FeedPostDto>> getQuestionsByTopic(@PathVariable Long topicId,
                                                                 @RequestParam(defaultValue = "0") int page,
                                                                 @RequestParam(defaultValue = "10") int size,
                                                                 Authentication authentication) {
        Long userId = null;
        if (authentication != null && authentication.isAuthenticated()) {
            Object principal = authentication.getPrincipal();
            if (principal instanceof CustomUserDetails) {
                userId = ((CustomUserDetails) principal).getUserId();
            }
        }
        Page<FeedPostDto> questions = postService.getPostsByTopic(topicId, userId, page, size);
        return ResponseEntity.ok(questions);
    }

    @GetMapping("/search")
    public ResponseEntity<Page<FeedPostDto>> searchQuestions(
            @RequestParam(required = false) String query,
            @RequestParam(required = false) String tag,
            @RequestParam(required = false) Long userId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Page<FeedPostDto> questions = postService.searchPosts(query, tag, userId, page, size);
        return ResponseEntity.ok(questions);
    }
}
