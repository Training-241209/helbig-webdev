package com.revature.proj1.exception;

import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import io.jsonwebtoken.ExpiredJwtException;

import org.springframework.http.HttpStatus;

@ControllerAdvice
public class ExceptionHandlingController {
    
    @ExceptionHandler(InvalidUserException.class)
    @ResponseStatus(HttpStatus.CONFLICT)
    public @ResponseBody String handleInvalidUserException(InvalidUserException ex){
        return ex.getMessage();
    }

    @ExceptionHandler(UserDoesNotExistException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public @ResponseBody String handleUserDoesNotExistException(UserDoesNotExistException ex){
        return ex.getMessage();
    }

    @ExceptionHandler(InsufficientPrivilegesException.class)
    @ResponseStatus(HttpStatus.FORBIDDEN)
    public @ResponseBody String handleInsufficientPrivilegesException(InsufficientPrivilegesException ex){
        return ex.getMessage();
    }

    @ExceptionHandler(InvalidArgumentException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public @ResponseBody String handleInvalidArgumentException(InvalidArgumentException ex){
        return ex.getMessage();
    }

    @ExceptionHandler(ExpiredJwtException.class)
    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    public @ResponseBody String handleExpiredJwtException(ExpiredJwtException ex){
        return ex.getMessage();
    }

    @ExceptionHandler(IllegalArgumentException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public @ResponseBody String handleIllegalArgumentException(IllegalArgumentException ex){
        return ex.getMessage();
    }

}
