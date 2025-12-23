package com.example.Qpoint.service;

import com.example.Qpoint.dto.BookmarkItemDto;
import com.example.Qpoint.dto.FeedPostDto;
import com.example.Qpoint.models.Bookmark;
import com.example.Qpoint.models.Post;
import com.example.Qpoint.models.User;
import com.example.Qpoint.repository.BookmarkRepository;
import com.example.Qpoint.repository.PostRepository;
import com.example.Qpoint.repository.UserRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class BookmarkService {

    private final BookmarkRepository bookmarkRepository;
    private final PostRepository postRepository;
    private final UserRepository userRepository;
    private final PostService postService;

    public BookmarkService(BookmarkRepository bookmarkRepository, PostRepository postRepository, UserRepository userRepository, PostService postService) {
        this.bookmarkRepository = bookmarkRepository;
        this.postRepository = postRepository;
        this.userRepository = userRepository;
        this.postService = postService;
    }

    @Transactional
    public Bookmark bookmarkPost(Long userId, Long postId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new RuntimeException("Post not found"));

        boolean alreadyBookmarked = bookmarkRepository.existsByUserAndPost(user, post);
        if (alreadyBookmarked) {
            throw new RuntimeException("Post already bookmarked");
        }

        Bookmark bookmark = new Bookmark();
        bookmark.setUser(user);
        bookmark.setPost(post);

        return bookmarkRepository.save(bookmark);
    }

    @Transactional
    public void unbookmarkPost(Long userId, Long postId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new RuntimeException("Post not found"));

        var bookmark = bookmarkRepository.findByUserAndPost(user, post);
        if (bookmark.isEmpty()) {
            throw new RuntimeException("Post not bookmarked");
        }

        bookmarkRepository.delete(bookmark.get());
    }

    @Transactional(readOnly = true)
    public Page<BookmarkItemDto> getUserBookmarks(Long userId, int page, int size) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "createdAt"));
        return bookmarkRepository.findByUserOrderByCreatedAtDesc(user, pageable)
                .map(this::convertToBookmarkItemDto);
    }

    private BookmarkItemDto convertToBookmarkItemDto(Bookmark bookmark) {
        BookmarkItemDto dto = new BookmarkItemDto();
        dto.setBookmarkId(bookmark.getId());
        dto.setCreatedAt(bookmark.getCreatedAt());

        Post post = bookmark.getPost();
        FeedPostDto postDto = postService.convertToFeedPostDtoForBookmark(post);
        dto.setPost(postDto);

        return dto;
    }

    public boolean isPostBookmarked(Long userId, Long postId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new RuntimeException("Post not found"));

        return bookmarkRepository.existsByUserAndPost(user, post);
    }
}