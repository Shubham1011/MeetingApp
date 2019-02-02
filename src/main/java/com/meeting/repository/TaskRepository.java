package com.meeting.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.meeting.model.Task;

public interface TaskRepository  extends JpaRepository<Task,Integer>{

}
