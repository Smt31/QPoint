package com.example.Qnect.controller;

import com.example.Qnect.dto.CreatePostRequest;
import com.example.Qnect.dto.FeedPostDto;
import com.example.Qnect.dto.FeedResponseDto;
import com.example.Qnect.dto.CreateCommentRequest;
import com.example.Qnect.dto.PostCommentDto;
import com.example.Qnect.service.PostService;
import com.example.Qnect.service.UserService;
import com.example.Qnect.service.CommentService;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.Authentication;
import com.example.Qnect.config.CustomUserDetails;

@RestController
@RequestMapping("/api/posts")
public class PostController {

    private final PostService postService;
    private final UserService userService;
    private final CommentService commentService;

    public PostController(PostService postService, UserService userService, CommentService commentService) {
        this.postService = postService;
        this.userService = userService;
        this.commentService = commentService;
    }

    @PostMapping
    public ResponseEntity<FeedPostDto> createPost(@RequestBody CreatePostRequest request, Authentication authentication) {
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
    public ResponseEntity<FeedPostDto> getPost(@PathVariable Long id, Authentication authentication) {
        Long userId = null;
        if (authentication != null && authentication.isAuthenticated()) {
            Object principal = authentication.getPrincipal();
            if (principal instanceof CustomUserDetails) {
                userId = ((CustomUserDetails) principal).getUserId();
                // If userId is null, the token might be invalid, but for this endpoint we can proceed with null
                if (userId == null) {
                    userId = null; // Reset to null if extraction failed
                }
            }
        }
        FeedPostDto post = postService.getPostByIdAndIncrementViews(id, userId);
        return ResponseEntity.ok(post);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePost(@PathVariable Long id, Authentication authentication) {
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

    @PostMapping("/{id}/comments")
    public ResponseEntity<PostCommentDto> createComment(@PathVariable Long id,
                                                        @RequestBody CreateCommentRequest request,
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
        
        var saved = commentService.createComment(id, userId, request);
        return ResponseEntity.ok(commentService.convertToPostCommentDto(saved));
    }

    @GetMapping("/{id}/comments")
    public ResponseEntity<com.example.Qnect.dto.PageDto<PostCommentDto>> getComments(@PathVariable Long id,
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
        com.example.Qnect.dto.PageDto<PostCommentDto> comments = commentService.getCommentsForPost(id, page, size, userId);
        return ResponseEntity.ok(comments);
    }
}
