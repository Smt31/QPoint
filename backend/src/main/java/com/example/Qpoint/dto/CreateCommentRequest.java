package com.example.Qpoint.dto;

import lombok.Data;

@Data
public class CreateCommentRequest {
    private String content;
    private Long parentId;
}