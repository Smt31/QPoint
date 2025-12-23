package com.example.Qpoint.dto;

import lombok.Data;
import java.util.List;

@Data
public class SuggestionsDto {
    private List<UserProfileDto> users;
}