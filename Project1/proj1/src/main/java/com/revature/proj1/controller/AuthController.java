package com.revature.proj1.controller;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

import com.revature.proj1.dto.response.JwtResponse;
import com.revature.proj1.dto.response.UserResponse;
import com.revature.proj1.entity.User;
import com.revature.proj1.service.JwtAuthService;
import com.revature.proj1.service.ReimbursementService;
import com.revature.proj1.service.UserService;

@Controller
public class AuthController {
    private UserService userService;
    private JwtAuthService jwtAuthService;

    public AuthController(UserService userService, ReimbursementService reimbursementService, JwtAuthService jwtAuthService){
        this.userService = userService;
        this.jwtAuthService = jwtAuthService;
    }

    @PostMapping("register")
    @ResponseBody
    public ResponseEntity<UserResponse> postNewUser(@RequestBody User user){
        User createdUser = userService.createUser(user);
        UserResponse userDto = new UserResponse(createdUser);
        return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_JSON)
                .body(userDto);
    }

    @PostMapping("login")
    public ResponseEntity<JwtResponse> loginUser(@RequestBody User user){
        user = userService.loginUserExists(user);
        String jwt = jwtAuthService.jwtBuilder(user);
        JwtResponse jwtR = new JwtResponse(jwt);
        return ResponseEntity.ok()
            .contentType(MediaType.APPLICATION_JSON)
            .body(jwtR);
    }
}
