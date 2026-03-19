package com.example.Qnect.controller;

import com.example.Qnect.models.Topic;
import com.example.Qnect.service.TopicService;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/topics")
public class TopicController {

    private final TopicService topicService;

    public TopicController(TopicService topicService) {
        this.topicService = topicService;
    }

    @GetMapping
    public ResponseEntity<com.example.Qnect.dto.PageDto<Topic>> getAllTopics(@RequestParam(defaultValue = "0") int page,
                                                   @RequestParam(defaultValue = "10") int size) {
        Page<Topic> topics = topicService.getAllTopics(page, size);
        return ResponseEntity.ok(new com.example.Qnect.dto.PageDto<>(topics));
    }

    @GetMapping("/all")
    public ResponseEntity<Iterable<Topic>> getAll() {
        return ResponseEntity.ok(topicService.getAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Topic> getTopic(@PathVariable Long id) {
        Topic topic = topicService.getTopicById(id);
        return ResponseEntity.ok(topic);
    }

    @GetMapping("/search")
    public ResponseEntity<com.example.Qnect.dto.PageDto<Topic>> searchTopics(@RequestParam String query,
                                                   @RequestParam(defaultValue = "0") int page,
                                                   @RequestParam(defaultValue = "10") int size) {
        Page<Topic> topics = topicService.searchTopics(query, page, size);
        return ResponseEntity.ok(new com.example.Qnect.dto.PageDto<>(topics));
    }
}
