package com.revature.proj1.dto.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.revature.proj1.entity.User;

import lombok.Getter;
import lombok.Setter;

@JsonInclude(JsonInclude.Include.NON_NULL)
@Getter
@Setter
public class UserResponse {
    private String username;
    private String firstname;
    private String lastname;
    private String password;
    private long userId;
    private String role;

    public UserResponse(){
    }

    public UserResponse(User user){
        this.username = user.getUsername();
        this.firstname = user.getFirstName();
        this.lastname = user.getLastName();
        //this.password = user.getPassword();
        this.userId = user.getUserId();
        this.role = user.getRole().getRole();
    }

}
