package com.example.Qpoint.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AuthResponse {
    private boolean success;
    private String message;

    // JWT access token (for authenticated flows)
    private String accessToken;

    // Basic user data returned with token for frontend convenience
    private Long userId;
    private String email;
    private String username;
}
