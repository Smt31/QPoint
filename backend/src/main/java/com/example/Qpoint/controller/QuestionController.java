package com.example.Qpoint.controller;

import com.example.Qpoint.dto.CreatePostRequest;
import com.example.Qpoint.dto.FeedPostDto;
import com.example.Qpoint.service.QuestionService;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import org.springframework.security.core.Authentication;
import com.example.Qpoint.config.CustomUserDetails;

@RestController
@RequestMapping("/question")
public class QuestionController {

    private final QuestionService questionService;

    public QuestionController(QuestionService questionService) {
        this.questionService = questionService;
    }

    @PostMapping
    public ResponseEntity<FeedPostDto> askQuestion(@Valid @RequestBody CreatePostRequest request, Authentication authentication) {
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
        
        return ResponseEntity.ok(questionService.askQuestion(userId, request));
    }

    @GetMapping("/feed")
    public ResponseEntity<Page<FeedPostDto>> getFeed(Authentication authentication,
                                                     @RequestParam(defaultValue = "0") int page,
                                                     @RequestParam(defaultValue = "10") int size) {
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
        
        return ResponseEntity.ok(questionService.getHomeFeed(userId, page, size));
    }

    @GetMapping("/user/{id}")
    public ResponseEntity<Page<FeedPostDto>> getUserQuestions(@PathVariable Long id,
                                                              @RequestParam(defaultValue = "0") int page,
                                                              @RequestParam(defaultValue = "10") int size) {
        return ResponseEntity.ok(questionService.getUserQuestions(id, page, size));
    }
}

