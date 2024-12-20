package com.revature.proj1.exception;

public class InsufficientPrivilegesException extends RuntimeException{
    public InsufficientPrivilegesException(final String msg){
        super(msg);
    }
}
