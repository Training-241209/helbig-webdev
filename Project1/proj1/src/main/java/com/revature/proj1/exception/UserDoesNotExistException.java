package com.revature.proj1.exception;

public class UserDoesNotExistException extends RuntimeException{
    public UserDoesNotExistException(final String msg){
        super(msg);
    }
}
