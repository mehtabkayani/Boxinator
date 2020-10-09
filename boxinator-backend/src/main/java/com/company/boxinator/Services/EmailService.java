package com.company.boxinator.Services;

import com.company.boxinator.Models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.net.MalformedURLException;
import java.net.URL;

@Service
public class EmailService {

    private JavaMailSender javaMailSender;

    @Autowired
    public EmailService(JavaMailSender javaMailSender){
        this.javaMailSender = javaMailSender;
    }

    public void sendLoginTwoFactorCode(User user, String secret) throws MailException {
        String subject = "Login code";
        String text = "Your code: \n" + secret;
        SimpleMailMessage mail = setEmailMessage(user, subject, text);
        javaMailSender.send(mail);
    }
    public SimpleMailMessage setEmailMessage(User user, String subject, String text){
        SimpleMailMessage mail = new SimpleMailMessage();
        mail.setTo(user.getEmail());
        mail.setFrom("boxinatordmm@gmail.com");
        mail.setSubject(subject);
        mail.setText(text);
        return mail;
    }
}
