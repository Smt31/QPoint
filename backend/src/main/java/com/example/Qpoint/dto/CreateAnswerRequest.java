package com.example.Qpoint.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class CreateAnswerRequest {
    @NotBlank(message = "Content cannot be empty")
    private String content;
}
