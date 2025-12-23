package com.example.Qpoint.dto;

import lombok.Data;
import java.util.List;

@Data
public class CreatePostRequest {
    private String title;
    private String content;
    private String imageUrl;
    private List<String> tags;
    private String type; // QUESTION or POST
}
