package com.meeting.model;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;

import com.fasterxml.jackson.annotation.JsonIgnore;
@Entity
public class Task {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int id;
	
	private String details;
	
@ManyToMany(mappedBy="tasks")	
@JsonIgnore
private List<Meeting> meetings;

public int getId() {
	return id;
}

public void setId(int id) {
	this.id = id;
}

public String getDetails() {
	return details;
}

public void setDetails(String details) {
	this.details = details;
}

public List<Meeting> getMeetings() {
	return meetings;
}

public void setMeetings(List<Meeting> meetings) {
	this.meetings = meetings;
}



}
