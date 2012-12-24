package com.xpgmwang.web;

import java.util.Map;

import net.sf.json.JSONObject;

import org.apache.commons.httpclient.methods.GetMethod;

import com.britesnow.snow.util.JsonUtil;
import com.britesnow.snow.web.RequestContext;
import com.britesnow.snow.web.handler.annotation.WebActionHandler;
import com.britesnow.snow.web.handler.annotation.WebModelHandler;
import com.britesnow.snow.web.param.annotation.WebModel;
import com.britesnow.snow.web.param.annotation.WebParam;
import com.google.code.samples.oauth2.OAuth2Authenticator;
import com.google.inject.Inject;
import com.google.inject.Singleton;
import com.xpgmwang.oauth.OAuthManager;
import com.xpgmwang.util.Client;

@Singleton
public class OAuthWebHandlers {
	@Inject
	private OAuthManager oauthManager;
	

	@WebModelHandler(startsWith = "/authorize")
	public void authorize(@WebModel Map m,@WebParam("service") String service,RequestContext rc) {
		try {
			String authorizationUrl = oauthManager.authorize(service);
			rc.getRes().sendRedirect(authorizationUrl);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	@WebActionHandler
	public void setToken(@WebModel Map m,@WebParam("params") String params,@WebParam("service") String service, RequestContext rc) {
	    Map map = oauthManager.getMapByQueryString(params);
        String code = (String) map.get("code");
        String accessToken = null;
        try {
            accessToken = oauthManager.getToken(code, service).getAccessToken();
        } catch (Exception e) {
            e.printStackTrace();
        }
        
        rc.setCookie("userId", accessToken);
        
        String email = "";
        GetMethod method = null;
        method = new GetMethod("https://www.googleapis.com/oauth2/v1/userinfo");
        method.addRequestHeader("Authorization", "Bearer " + accessToken);
        String response = null;
        try {
            response = Client.send(method);
        } catch (Exception e) {
            e.printStackTrace();
        }
        JSONObject opts = (JSONObject) JsonUtil.toMapAndList(response);
        rc.setCookie("email", opts.get("email"));
        OAuth2Authenticator.initialize();
	}
}
