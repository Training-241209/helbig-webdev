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

    public UserResponse(){
    }

    public UserResponse(User user){
        this.username = user.getUsername();
        this.firstname = user.getFirstName();
    }

}
