package com.fittrack.backend.module.exceptions;

public class UserFoundException extends RuntimeException {
    public UserFoundException(String msg) {
        super(msg);
    }
}
