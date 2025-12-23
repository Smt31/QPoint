package com.example.Qpoint.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class VerifyOtpRequest {
    @NotBlank @Email
    private String email;
    @NotBlank
    private String code;

    // optional profile fields
    private String username;
    private String fullName;
    private String mobileNumber;
    private String avatarUrl;
    private String bio;
    
    // optional registration fields
    private String password;
    private String firstName;
    private String lastName;
}
