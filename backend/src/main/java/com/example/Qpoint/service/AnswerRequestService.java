package com.example.Qpoint.service;

import com.example.Qpoint.models.*;
import com.example.Qpoint.repository.*;
import com.example.Qpoint.dto.UserProfileDto;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class AnswerRequestService {

    private final AnswerRequestRepository answerRequestRepository;
    private final QuestionRepository questionRepository;
    private final UserRepository userRepository;
    private final NotificationService notificationService;
    private final UserService userService;

    public AnswerRequestService(AnswerRequestRepository answerRequestRepository,
                                QuestionRepository questionRepository,
                                UserRepository userRepository,
                                NotificationService notificationService,
                                UserService userService) {
        this.answerRequestRepository = answerRequestRepository;
        this.questionRepository = questionRepository;
        this.userRepository = userRepository;
        this.notificationService = notificationService;
        this.userService = userService;
    }

    @Transactional
    public void createRequest(Long questionId, Long expertId, Long requesterId) {
        Post question = questionRepository.findById(questionId)
                .orElseThrow(() -> new RuntimeException("Question not found"));

        if (!question.getAuthor().getUserId().equals(requesterId)) {
            throw new RuntimeException("Only the author can request answers");
        }

        User expert = userRepository.findById(expertId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        User requester = userRepository.findById(requesterId)
                .orElseThrow(() -> new RuntimeException("Requester not found"));

        if (expertId.equals(requesterId)) {
            throw new RuntimeException("Cannot request answer from yourself");
        }

        if (answerRequestRepository.existsByQuestionAndRequestedTo(question, expert)) {
            throw new RuntimeException("Request already sent to this user");
        }
        
        // Basic limits check (placeholder)
        // long count = answerRequestRepository.countByQuestionAndRequestedBy(question, requester);
        // if (count >= 5) throw new RuntimeException("Request limit reached for this question");

        AnswerRequest request = AnswerRequest.builder()
                .question(question)
                .requestedBy(requester)
                .requestedTo(expert)
                .status(AnswerRequest.RequestStatus.PENDING)
                .build();

        answerRequestRepository.save(request);

        // Notify expert
        notificationService.createNotification(
                expertId,
                requesterId,
                Notification.NotificationType.ANSWER_REQUEST,
                questionId,
                requester.getFullName() + " asked you to answer: " + question.getTitle()
        );
    }

    @Transactional(readOnly = true)
    public List<UserProfileDto> getSuggestions(Long questionId, Long userId) {
        try {
            Post question = questionRepository.findById(questionId)
                    .orElseThrow(() -> new RuntimeException("Question not found"));
            java.util.Set<com.example.Qpoint.models.Topic> questionTopics = question.getTopics();
            List<User> allUsers = userRepository.findAll();
            
            List<User> matchingExperts = new java.util.ArrayList<>();
            List<User> otherUsers = new java.util.ArrayList<>();

            for (User u : allUsers) {
                 if (u.getUserId().equals(userId)) continue;

                 // Safe topic matching
                 boolean matches = false;
                 try {
                     if (questionTopics != null && !questionTopics.isEmpty()) {
                         matches = u.getTopics().stream().anyMatch(questionTopics::contains);
                     }
                 } catch (Exception e) {
                     // Ignore topic matching errors (lazy init etc)
                 }

                 if (matches) {
                     matchingExperts.add(u);
                 } else {
                     otherUsers.add(u);
                 }
            }

            java.util.Collections.shuffle(otherUsers);
            java.util.Collections.shuffle(matchingExperts);
            
            List<User> result = new java.util.ArrayList<>(matchingExperts);
            for (User u : otherUsers) {
                if (result.size() >= 10) break;
                result.add(u);
            }
            
            if (result.size() > 10) {
                result = result.subList(0, 10);
            }

            return result.stream()
                    .map(userService::convertToUserProfileDto)
                    .collect(Collectors.toList());

        } catch (Exception e) {
            e.printStackTrace();
            // Emergency fallback: just get any 5 users
            return userRepository.findAll(org.springframework.data.domain.PageRequest.of(0, 5))
                    .getContent().stream()
                    .filter(u -> !u.getUserId().equals(userId))
                    .map(userService::convertToUserProfileDto)
                    .collect(Collectors.toList());
        }
    }
    
    public List<AnswerRequest> getMyPendingRequests(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return answerRequestRepository.findByRequestedTo(user).stream()
                .filter(r -> r.getStatus() == AnswerRequest.RequestStatus.PENDING)
                .collect(Collectors.toList());
    }
}
