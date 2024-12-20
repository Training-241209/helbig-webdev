package com.revature.proj1.exception;

public class InvalidUserException extends RuntimeException{
    public InvalidUserException(final String msg){
        super(msg);
    }
}
