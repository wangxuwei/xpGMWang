package com.xpgmwang;

import com.britesnow.snow.web.auth.AuthRequest;
import com.britesnow.snow.web.handler.annotation.WebActionHandler;
import com.britesnow.snow.web.handler.annotation.WebModelHandler;
import com.google.inject.AbstractModule;
import com.google.inject.matcher.Matchers;
import com.xpgmwang.web.GMAuthRequest;
import com.xpgmwang.web.OAuthInterceptor;




/**
 * TODO: Rename the package and the class name to fit your application naming convention and
 * update /webapp/WEB-INF/snow.properties "snow.webApplicationModules" accordingly
 * <p/>
 * TODO: add/remove bindings to fit your application's need
 */
public class GMConfig extends AbstractModule {


    @Override
    protected void configure() {

        bind(AuthRequest.class).to(GMAuthRequest.class);
        OAuthInterceptor oauthInterceptor = new OAuthInterceptor();
        requestInjection(oauthInterceptor);
        bindInterceptor(Matchers.any(), Matchers.annotatedWith(WebModelHandler.class),oauthInterceptor);
        bindInterceptor(Matchers.any(), Matchers.annotatedWith(WebActionHandler.class),oauthInterceptor);
    }

}
