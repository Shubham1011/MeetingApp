package com.meeting.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.meeting.model.Credential;

public interface CredentialRepository extends JpaRepository<Credential,Integer>{

    
}
