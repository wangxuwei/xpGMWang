package com.xpgmwang.web;

import java.util.Map;

import com.britesnow.snow.web.RequestContext;
import com.britesnow.snow.web.auth.AuthRequest;
import com.britesnow.snow.web.auth.AuthToken;
import com.britesnow.snow.web.handler.annotation.WebModelHandler;
import com.britesnow.snow.web.param.annotation.WebModel;

public class GMAuthRequest implements AuthRequest {

    @Override
    public AuthToken authRequest(RequestContext rc) {
        String userIdStr = rc.getCookie("userId");

        if (userIdStr != null) {
            // if valid, then, we create the AuthTocken with our User object
            
            String token = userIdStr;
            AuthToken<String> authToken = new AuthToken<String>();
            authToken.setUser(token);
            return authToken;
        } else {
            return null;
        }
    }

    @WebModelHandler(startsWith = "/")
    public void pageIndex(@WebModel Map m, RequestContext rc) {
        // gameTestManager.init();
        m.put("user", rc.getUser(String.class));
    }
}