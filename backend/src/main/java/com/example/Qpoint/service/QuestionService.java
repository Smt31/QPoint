package com.example.Qpoint.service;

import com.example.Qpoint.dto.CreatePostRequest;
import com.example.Qpoint.dto.FeedPostDto;
import com.example.Qpoint.models.Post;
import com.example.Qpoint.models.User;
import com.example.Qpoint.repository.QuestionRepository;
import com.example.Qpoint.repository.UserRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class QuestionService {

    private final QuestionRepository questionRepository;
    private final UserRepository userRepository;
    private final PostService postService;

    public QuestionService(QuestionRepository questionRepository,
                           UserRepository userRepository,
                           PostService postService) {
        this.questionRepository = questionRepository;
        this.userRepository = userRepository;
        this.postService = postService;
    }

    @Transactional
    public FeedPostDto askQuestion(Long authorId, CreatePostRequest request) {
        Post post = postService.createPost(authorId, request);
        return postService.getPostById(post.getId());
    }

    public Page<FeedPostDto> getHomeFeed(Long userId, int page, int size) {
        return postService.getFeedForUser(userId, page, size);
    }

    public Page<FeedPostDto> getUserQuestions(Long userId, int page, int size) {
        User author = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "createdAt"));
        return questionRepository.findByAuthorOrderByCreatedAtDesc(author, pageable)
                .map(post -> postService.getPostById(post.getId()));
    }
}

