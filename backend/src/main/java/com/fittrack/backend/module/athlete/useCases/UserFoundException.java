package com.fittrack.backend.module.athlete.useCases;

public class UserFoundException extends RuntimeException {
    public UserFoundException(String msg) {
        super(msg);
    }
}
