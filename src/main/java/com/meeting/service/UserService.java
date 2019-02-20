package com.meeting.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.meeting.model.User;
import com.meeting.repository.UserRepository;
@Service
public class UserService implements UserDetailsService {
@Autowired
UserRepository ur;
	
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		User u=ur.findByEmail(username);
		List<GrantedAuthority> list=new ArrayList<>();
		SimpleGrantedAuthority sm=new SimpleGrantedAuthority(u.getRole());
		list.add(sm);
		return new org.springframework.security.core.userdetails.User(u.getEmail(),u.getCredential().getPassword(),list);
	}
	

}
