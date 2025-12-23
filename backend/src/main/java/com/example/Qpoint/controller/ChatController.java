package com.example.Qpoint.controller;

import com.example.Qpoint.dto.ChatDTO;
import com.example.Qpoint.models.User;
import com.example.Qpoint.repository.UserRepository;
import com.example.Qpoint.service.ChatService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import com.example.Qpoint.config.CustomUserDetails;
import java.security.Principal;

@RestController
@RequestMapping("/api/chat")
@RequiredArgsConstructor
public class ChatController {

    private final ChatService chatService;
    private final UserRepository userRepository;

    @GetMapping("/conversations")
    public ResponseEntity<List<ChatDTO.ConversationSummary>> getConversations(@AuthenticationPrincipal UserDetails userDetails) {
        if (userDetails == null) {
            return ResponseEntity.status(401).build();
        }
        User user = userRepository.findByUsername(userDetails.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));
        return ResponseEntity.ok(chatService.getConversations(user.getUserId()));
    }

    @GetMapping("/messages/{otherUserId}")
    public ResponseEntity<List<ChatDTO.MessageResponse>> getMessages(
            @AuthenticationPrincipal UserDetails userDetails,
            @PathVariable Long otherUserId) {
        if (userDetails == null) {
            return ResponseEntity.status(401).build();
        }
        User user = userRepository.findByUsername(userDetails.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));
        return ResponseEntity.ok(chatService.getMessageHistory(user.getUserId(), otherUserId));
    }

    @PostMapping("/send")
    public ResponseEntity<ChatDTO.MessageResponse> sendMessageHTTP(
            @AuthenticationPrincipal UserDetails userDetails,
            @RequestBody ChatDTO.MessageRequest request) {
        if (userDetails == null) {
            return ResponseEntity.status(401).build();
        }
        User user = userRepository.findByUsername(userDetails.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));
        return ResponseEntity.ok(chatService.sendMessage(user.getUserId(), request));
    }

    // WebSocket Handler
    @MessageMapping("/chat.sendMessage")
    public void sendMessageWS(@Payload ChatDTO.MessageRequest request, Principal principal) {
        if (principal == null) {
            throw new RuntimeException("User not authenticated");
        }
        String username;
        if (principal instanceof CustomUserDetails) {
            username = ((CustomUserDetails) principal).getUsername();
        } else {
            username = principal.getName();
        }
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
        chatService.sendMessage(user.getUserId(), request);
    }
    
    @PutMapping("/read/{otherUserId}")
    public ResponseEntity<Void> markAsRead(@AuthenticationPrincipal UserDetails userDetails, @PathVariable Long otherUserId) {
        if (userDetails == null) {
            return ResponseEntity.status(401).build();
        }
        User user = userRepository.findByUsername(userDetails.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));
        chatService.markMessagesAsRead(user.getUserId(), otherUserId);
        return ResponseEntity.ok().build();
    }
}
