package com.meeting.service;

import javax.mail.MessagingException;
import javax.websocket.server.ServerEndpoint;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import com.meeting.model.User;


public interface MailService {
	


public void send(String fromAddress,String toAddress,String subject,String content) throws MessagingException;

}
