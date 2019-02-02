package com.meeting.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.meeting.model.Credential;
import com.meeting.model.User;

public interface UserRepository extends JpaRepository<User, Integer>{

	public User findByEmail(String username);
	
}
