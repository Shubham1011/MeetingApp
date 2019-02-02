package com.meeting.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.meeting.exception.ResourceNotFoundException;
import com.meeting.model.Credential;
import com.meeting.model.User;
import com.meeting.repository.CredentialRepository;
import com.meeting.repository.UserRepository;

@RestController
@RequestMapping("rest")
public class CredentialController {

	@Autowired
	private CredentialRepository credentialsRepository;
	@Autowired
	private UserRepository userRepository;
	@GetMapping("/login")
	@CrossOrigin(origins = {"http://localhost:8080"})
	public User login(@RequestHeader("username") String username,
			@RequestHeader("password") String password){
		User u = userRepository.findByEmail(username);
		if(u != null){
			if(u.getCredential().getPassword().equals(password)){
				return u;
			}
		}
		throw new ResourceNotFoundException("Credentials Invalid");
		
		
	}

	@CrossOrigin(origins = {"http://localhost:8080"})
	@PutMapping("/upcred/{cid}")
	public Credential upcred(@PathVariable("cid") int cid,@RequestHeader("email") String email) {
		 Credential nc=credentialsRepository.getOne(cid);
		 nc.setUsername(email);
		 return credentialsRepository.save(nc);
		
		
	}
	
}
