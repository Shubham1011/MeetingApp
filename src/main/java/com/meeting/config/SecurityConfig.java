package com.meeting.config;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.meeting.service.UserService;

@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {
	@Autowired
	UserService us;
	@Autowired
	PasswordEncoder ps;
	 @Override
	protected void configure(HttpSecurity http) throws Exception {
		http.authorizeRequests()
		.antMatchers("/css/**","/js/**","/cjs/**","/bootstrap/**","/rest/user","/signup","/rest/addcreden/**")
		.permitAll()
		.antMatchers("/swagger-ui.html/**")
		.permitAll()
		.antMatchers("/**")
		    
		    .hasAuthority("USER")
		    .and()
		    .formLogin()
		    .loginPage("/login")
		    .permitAll()
		   
	         .and().logout()
	         .logoutSuccessUrl("/login")
	         .invalidateHttpSession(true)
	         .deleteCookies("JSESSIONID").permitAll()
		    .and()
		    .cors()
		   
		    .and()
		    
		    .csrf()
		    .disable();
		super.configure(http);
	}
	 
	 @Autowired
	protected void configure(AuthenticationManagerBuilder auth) throws Exception {
		auth.authenticationProvider(authenticationProvider());
		    
		    
		super.configure(auth);
	}
	 private DaoAuthenticationProvider authenticationProvider() {
		DaoAuthenticationProvider auth=new DaoAuthenticationProvider();
		auth.setUserDetailsService(us);
		auth.setPasswordEncoder(ps());
		
		return auth;
	}

	private void setsession() {
	
		
	}

	@Bean
	 public PasswordEncoder ps() {
		 return new BCryptPasswordEncoder();
	 }
	

}
