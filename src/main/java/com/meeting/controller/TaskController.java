package com.meeting.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.meeting.model.Task;
import com.meeting.repository.TaskRepository;

@RestController
@RequestMapping("rest")

public class TaskController {
@Autowired
TaskRepository taskrepository;

@PostMapping("/addtask")
public Task addtask(@RequestBody Task t)
{
	return taskrepository.save(t);
	
	}


@PutMapping("/updatetask/{tid}")
public Task uptask(@PathVariable("tid") int tid,@RequestBody Task t)
{
	Task nt=taskrepository.getOne(tid);
	nt.setDetails(t.getDetails());
	return taskrepository.save(nt);
	
	
	}
	
	@DeleteMapping("/deltask/{id}")
	public void deltask(@PathVariable("id") int id)
	{
		taskrepository.deleteById(id);
		
	}
	
	@CrossOrigin
	@GetMapping("/getalltask")
	public List<Task> getalltask()
	{
		return taskrepository.findAll();
	}
	
}
