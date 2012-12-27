package com.xpgmwang.web;

import javax.servlet.http.Cookie;

import org.aopalliance.intercept.MethodInterceptor;
import org.aopalliance.intercept.MethodInvocation;

import com.britesnow.snow.web.CurrentRequestContextHolder;
import com.britesnow.snow.web.RequestContext;
import com.google.code.samples.oauth2.AuthException;
import com.google.inject.Inject;
import com.google.inject.Singleton;

@Singleton
public class OAuthInterceptor implements MethodInterceptor {
    @Inject
    private CurrentRequestContextHolder rcHolder;

    @Override
    public Object invoke(MethodInvocation invocation) throws Throwable {
        Object obj = null;
        try {
            obj = invocation.proceed();
        } catch (AuthException e) {
            RequestContext rc = rcHolder.getCurrentRequestContext();
            rc.getWebModel().put("AUTH_FAILED",true);
            for(Cookie c : rc.getReq().getCookies()){
                String uId = "userId";
                if(uId.equals(c.getName())){
                    c.setPath("/");
                    c.setMaxAge(0);
                    rc.getRes().addCookie(c);
                }
            }
        }
        return obj;
    }
}
