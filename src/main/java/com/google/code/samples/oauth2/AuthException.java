package com.google.code.samples.oauth2;

public class AuthException extends RuntimeException {

    private static final long serialVersionUID = 7795490003279701296L;

    public AuthException() {
        super();
    }

    public AuthException(String arg0, Throwable arg1) {
        super(arg0, arg1);
    }

    public AuthException(String arg0) {
        super(arg0);
    }

    public AuthException(Throwable arg0) {
        super(arg0);
    }

}