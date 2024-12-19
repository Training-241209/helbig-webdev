package com.revature.proj1.dto.response;

import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.Getter;
import lombok.Setter;

@JsonInclude(JsonInclude.Include.NON_NULL)
@Getter
@Setter
public class JwtResponse {
    private String jwt;

    public JwtResponse(){
    }

    public JwtResponse(String jwt){
        this.jwt = jwt;
    }
}
