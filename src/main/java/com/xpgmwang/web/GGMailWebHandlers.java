package com.xpgmwang.web;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.mail.Folder;
import javax.mail.Message;

import com.britesnow.snow.web.RequestContext;
import com.britesnow.snow.web.handler.annotation.WebActionHandler;
import com.britesnow.snow.web.handler.annotation.WebModelHandler;
import com.britesnow.snow.web.param.annotation.WebModel;
import com.britesnow.snow.web.param.annotation.WebParam;
import com.google.code.samples.oauth2.OAuth2Authenticator;
import com.google.inject.Singleton;
import com.sun.mail.imap.IMAPStore;

@Singleton
public class GGMailWebHandlers {
    @WebModelHandler(startsWith = "/listMails")
    public void listMails(@WebModel Map m, @WebParam("groupId") String groupId, RequestContext rc) {
        String token = rc.getUser(String.class);
        String email = rc.getCookie("email");
        IMAPStore imap = OAuth2Authenticator.getImapStore(email,token);
        List result = new ArrayList();
        try{
            Folder folder = imap.getFolder("Inbox");
            folder.open(Folder.READ_WRITE);
            Message[] messages = folder.getMessages(1, 10);
            if(messages != null){
                for(int i = 0; i < messages.length; i++){
                    Message message = messages[i];
                    Map map = getMapFromMessage(message);
                    result.add(map);
                }
            }
        }catch(Exception e){
            e.printStackTrace();
        }
        m.put("result",result);
    }

    @WebModelHandler(startsWith = "/getMail")
    public void getMail(@WebModel Map m, @WebParam("id") String id, RequestContext rc) {
        String token = rc.getUser(String.class);
    }

    @WebActionHandler
    public Object saveMail(@WebModel Map m, @WebParam("id") String id,@WebParam("fullId") String fullId, @WebParam("name") String name,
                            @WebParam("email") String email,@WebParam("groupIds") String groupIdsStr, RequestContext rc) {
        String token = rc.getUser(String.class);
        return null;
    }

    @WebActionHandler
    public Object deleteMail(@WebModel Map m, @WebParam("id") String id, RequestContext rc) {
        return null;
    }
    
    private Map getMapFromMessage(Message message){
        Map map = new HashMap();
        if(message == null){
            return map;
        }
        try {
            map.put("subject", message.getSubject());
            map.put("from", message.getFrom()[0]);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return map;
    }
    
}
