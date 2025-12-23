package com.example.Qpoint.dto;

import lombok.Data;

@Data
public class UserStatsDto {
    private Integer reputation;
    private Integer followersCount;
    private Integer followingCount;
    private Integer questionsCount;
    private Integer answersCount;
}