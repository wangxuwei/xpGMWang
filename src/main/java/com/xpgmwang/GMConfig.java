package com.xpgmwang;

import com.britesnow.snow.web.auth.AuthRequest;
import com.google.inject.AbstractModule;
import com.xpgmwang.web.GMAuthRequest;




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
    }

}
