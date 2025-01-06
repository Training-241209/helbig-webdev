package com.revature.proj1.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import com.revature.proj1.dto.response.UserResponse;
import com.revature.proj1.entity.User;
import com.revature.proj1.exception.InsufficientPrivilegesException;
import com.revature.proj1.service.JwtAuthService;
import com.revature.proj1.service.ReimbursementService;
import com.revature.proj1.service.UserService;

@Controller
public class UserController {
    private UserService userService;
    private JwtAuthService jwtAuthService;

    public UserController(UserService userService, ReimbursementService reimbursementService, JwtAuthService jwtAuthService){
        this.userService = userService;
        this.jwtAuthService = jwtAuthService;
    }

    
    @GetMapping("admin/users")
    public ResponseEntity<List<UserResponse>> getAllUsers(@RequestHeader (name="Authorization") String token){
        String strId = jwtAuthService.jwtGetId(token);
        int userId = Integer.parseInt(strId);

        if(!jwtAuthService.isAdmin(token)) throw new InsufficientPrivilegesException("Error: you do not have administrator privileges.");

        List<User> userList = userService.getAllUsers(userId);
        List<UserResponse> userDtoList = new ArrayList();

        for(User user : userList){
            userDtoList.add(new UserResponse(user));
        }

        return ResponseEntity.ok()
            .contentType(MediaType.APPLICATION_JSON)
            .body(userDtoList);
    }
    @DeleteMapping("admin/users")
    public ResponseEntity<UserResponse> deleteUser(@RequestHeader (name="Authorization") String token, @RequestBody User user){

        if(!jwtAuthService.isAdmin(token)) throw new InsufficientPrivilegesException("Error: you do not have administrator privileges.");

        User deletedUser = userService.deleteUser(user);
        UserResponse userDto = new UserResponse(deletedUser);

        return ResponseEntity.ok()
            .contentType(MediaType.APPLICATION_JSON)
            .body(userDto);
    }

    @PatchMapping("admin/users")
    public ResponseEntity<UserResponse> promoteToManager(@RequestHeader (name="Authorization") String token, @RequestBody User user){
        if(!jwtAuthService.isAdmin(token)) throw new InsufficientPrivilegesException("Error: you do not have administrator privileges.");

        User promotedUser = userService.promoteToManager(user);
        UserResponse userDto = new UserResponse(promotedUser);

        return ResponseEntity.ok()
            .contentType(MediaType.APPLICATION_JSON)
            .body(userDto);
    }

}
