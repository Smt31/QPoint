package com.example.Qpoint.util;

import java.security.SecureRandom;


public final class OtpUtil {

    private static final SecureRandom RANDOM = new SecureRandom();

    private OtpUtil() { /* no instantiation */ }
    public static String generateNumericOtp(int digits) {
        if (digits <= 0) throw new IllegalArgumentException("digits must be > 0");
        int min = (int) Math.pow(10, digits - 1);
        int max = (int) Math.pow(10, digits) - 1;

        int value = RANDOM.nextInt(max - min + 1) + min;
        return String.valueOf(value);
    }
}
