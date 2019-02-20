	package com.meeting.controller;

import java.security.Principal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.mail.MessagingException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import com.meeting.model.Credential;

import com.meeting.model.User;
import com.meeting.repository.CredentialRepository;
import com.meeting.repository.UserRepository;
import com.meeting.service.MailService;


/*All api's related to User in this conroller */
@RestController
@RequestMapping("rest")
public class UserController {
	@Autowired
	@Lazy
	PasswordEncoder ps;
	@Autowired
	UserRepository userRepository;
	@Autowired
	private MailService mailservice;
	@Autowired
	CredentialRepository credentialrepository;
     
	
	Map<Integer ,Integer> hm=new HashMap<>();
	
	
	
	
	
	
	@PostMapping("/user")
	public User createUser(@RequestBody User user) {
		user.setRole("USER");
		return userRepository.save(user);
	}
	
	@GetMapping("/getlogedin")
	public User	 getloggedin(Principal user) {
		User u=userRepository.findByEmail(user.getName());
		return u;
	}
	
	
	
	@PostMapping("/sendmail")
	public void sendmail(@RequestHeader("fromAddress") String fromAddress,
			@RequestHeader("subject") String subject,
			@RequestHeader("content") String content) {
		
	try {
		mailservice.send(fromAddress, "reddevil10111@gmail.com", subject, content);
	} catch (MessagingException e) {
		// TODO Auto-generated catch block
		e.printStackTrace();
	}
	}
		

	
	@PostMapping("/addcreden/{id}")
	public void addcreden(@PathVariable("id") int id,@RequestBody Credential c)
	{
		User nu=userRepository.getOne(id);
		c.setPassword(ps.encode(c.getPassword()));
		c.setUsername(nu.getEmail());
		
		
		nu.setCredential(c);
		
		credentialrepository.save(c);
		userRepository.save(nu);
		
	}
	
	@GetMapping("/getverificationcode/{id}")
	public int get(@PathVariable("id") int id)
	{
		User u=userRepository.getOne(id);
		
		int code=(int) (Math.random()*100000);
		hm.put(id,code);
		System.out.println(code);
		return code;
	}
	
	@GetMapping("/verify/{id}/{code}")
	public boolean verify(@PathVariable("id") int id,@PathVariable("code") int code)
	{
		for (Map.Entry<Integer, Integer> e : hm.entrySet()) {
			if(e.getKey()==id)
				if(e.getValue()==code)
					return true;
			}
		return false;
	}
	
	
	@GetMapping("/users")
	public List<User> getUsers() {
		//go to repo and fetch all users 
		return userRepository.findAll();
	}
	@GetMapping("/user/{id}")
	public User getUser(@PathVariable("id") int id) {
		//go to repo and fetch user based on id.
		return userRepository.getOne(id);
	}
	
	@PutMapping("/user/{id}")
	public User updateUser(@RequestBody User user,@PathVariable("id") int id) {
		//go to repo and fetch existing user based on id
		User u = userRepository.getOne(id);//existing User
		Credential c=credentialrepository.getOne(u.getCredential().getId());
		c.setUsername(user.getEmail());
		c.setPassword(ps.encode(user.getCredential().getPassword()));
		u.setName(user.getName());
		u.setEmail(user.getEmail());
		credentialrepository.save(c);
		System.out.println(c);
		return userRepository.save(u);
		
	}
	
	@DeleteMapping("/user/{id}")
	public void deleteUser(@PathVariable("id") int id) {
		//go to repo and delete based on id
		userRepository.deleteById(id);
	}
	

	
}














