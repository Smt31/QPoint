package com.example.Qnect.config;

import com.example.Qnect.service.TopicService;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

@Component
public class TopicDataInitializer implements ApplicationRunner {

    private final TopicService topicService;

    public TopicDataInitializer(TopicService topicService) {
        this.topicService = topicService;
    }

    @Override
    public void run(ApplicationArguments args) throws Exception {
        // Refresh topic post counts on startup to ensure consistency
        // This fixes any discrepancies from legacy data or case-sensitivity issues
        topicService.refreshPostCounts();
    }
}
