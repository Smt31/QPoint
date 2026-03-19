package com.example.Qnect;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;


@SpringBootApplication
@org.springframework.cache.annotation.EnableCaching
@org.springframework.scheduling.annotation.EnableScheduling
public class QnectApplication {

	public static void main(String[] args) {
		SpringApplication.run(QnectApplication.class, args);
	}

}
