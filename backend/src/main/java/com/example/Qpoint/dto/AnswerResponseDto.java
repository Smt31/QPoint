package com.example.Qpoint.dto;

import lombok.Data;
import java.time.Instant;

@Data
public class AnswerResponseDto {
    private Long id;
    private Long postId;
    private AuthorDto author;
    private String content;
    private Integer upvotes;
    private Integer downvotes;
    private Boolean accepted;
    private Integer commentsCount;
    private Instant createdAt;
    private Instant updatedAt;

    @Data
    public static class AuthorDto {
        private Long id;
        private String fullName;
        private String avatarUrl;
        private String username;
        private Integer reputation;
    }
}
