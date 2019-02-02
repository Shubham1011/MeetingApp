package com.meeting.service;

import java.util.Date;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import javax.websocket.server.ServerEndpoint;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service("mailservice")
public class MailServiceImpl implements MailService {

	@Autowired
	private JavaMailSender jms;
	
	@Override
	public void send(String fromAddress, String toAddress, String subject, String content) throws MessagingException {
		MimeMessage mimemess=jms.createMimeMessage();
		MimeMessageHelper mmh=new MimeMessageHelper(mimemess,true);
		mmh.setFrom(fromAddress);
	mmh.setTo(toAddress);
	mmh.setText(content,true);
	mmh.setSubject(subject);
    mmh.setSentDate(new Date());
    jms.send(mimemess);
	}

}
