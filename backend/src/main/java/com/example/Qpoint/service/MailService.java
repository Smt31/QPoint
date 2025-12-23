package com.example.Qpoint.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class MailService {

    private final JavaMailSender mailSender;
    private final String fromEmail;

    public MailService(JavaMailSender mailSender,
                      @Value("${spring.mail.username:}") String fromEmail) {
        this.mailSender = mailSender;
        this.fromEmail = fromEmail;
    }

    public void sendOtpEmail(String to, String code) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(fromEmail.isEmpty() ? "noreply@qpoint.com" : fromEmail);
        message.setTo(to);
        message.setSubject("Your Qpoint OTP code");
        message.setText("Your OTP code is: " + code + "\n\nThis code is valid for 5 minutes.\n\nIf you didn't request this code, please ignore this email.");
        mailSender.send(message);
    }
}

