package com.example.Qpoint.dto;

import lombok.Data;
import java.time.Instant;

@Data
public class BookmarkItemDto {
    private Long bookmarkId;
    private Instant createdAt;
    private FeedPostDto post;
}