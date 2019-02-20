package com.meeting.controller;

import java.security.Principal;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class MainController {

	
@RequestMapping(value="/",method = RequestMethod.GET)
    public String homepage(){
	
        return "index";
    }
	@RequestMapping(value = "/login", method = RequestMethod.GET)
    public String login(Model model, String error, String logout) {
       
        return "login";
    }
	@RequestMapping(value = "/signup", method = RequestMethod.GET)
    public String signup(Model model, String error, String logout) {
       
        return "signup";
    }
}
	
	

