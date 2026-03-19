package com.example.Qnect.dto;
import com.example.Qnect.models.OtpPurpose;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class SendOtpRequest {
    @NotBlank
    @Email
    private String email;
    private OtpPurpose purpose = OtpPurpose.LOGIN;
}
