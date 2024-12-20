package com.revature.proj1.exception;

public class InvalidArgumentException extends RuntimeException{
    public InvalidArgumentException(final String msg){
        super(msg);
    }
}
