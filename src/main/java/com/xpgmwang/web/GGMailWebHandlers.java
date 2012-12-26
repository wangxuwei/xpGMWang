package com.xpgmwang.web;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.mail.Flags;
import javax.mail.Folder;
import javax.mail.Message;
import javax.mail.Multipart;
import javax.mail.Session;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

import com.britesnow.snow.web.RequestContext;
import com.britesnow.snow.web.handler.annotation.WebActionHandler;
import com.britesnow.snow.web.handler.annotation.WebModelHandler;
import com.britesnow.snow.web.param.annotation.WebModel;
import com.britesnow.snow.web.param.annotation.WebParam;
import com.google.code.samples.oauth2.OAuth2Authenticator;
import com.google.inject.Inject;
import com.google.inject.Singleton;
import com.sun.mail.imap.IMAPStore;
import com.sun.mail.smtp.SMTPTransport;
import com.xpgmwang.util.JSONOptions;

@Singleton
public class GGMailWebHandlers {
    @Inject
    private OAuth2Authenticator oauthAuthenticator;
    
    @WebModelHandler(startsWith = "/listGroups")
    public void listGroups(@WebModel Map m, RequestContext rc) {
        String token = rc.getUser(String.class);
        String email = rc.getCookie("email");
        IMAPStore store = oauthAuthenticator.getImapStore(email,token);
        List result = new ArrayList();
        try{
            Folder[] f = store.getDefaultFolder().list();
            for(Folder fd:f){
                Map map = new HashMap();
                map.put("name", fd.getName());
                map.put("id", fd.getName());
                result.add(map);
            }
            store.close();
        }catch(Exception e){
            e.printStackTrace();
        }
        m.put("result",result);
    }
    
    @WebModelHandler(startsWith = "/listMails")
    public void listMails(@WebModel Map m, @WebParam("groupId") String groupId, @WebParam("pageJsonInfo") String pageJsonInfo, RequestContext rc) {
        JSONOptions opts = new JSONOptions(pageJsonInfo);
        String token = rc.getUser(String.class);
        String email = rc.getCookie("email");
        IMAPStore store = oauthAuthenticator.getImapStore(email,token);
        List result = new ArrayList();
        int count = 0;
        try{
            String groupName = groupId == null || "".equals(groupId) ? "Inbox" : groupId;
            Folder folder = store.getFolder(groupName);
            folder.open(Folder.READ_ONLY);
            count = folder.getMessageCount();
            int start = count - ((opts.getPageIndex() + 1) * opts.getPageSize() - 1);
            int end = count - (opts.getPageIndex() * opts.getPageSize());
            if(start < 1){
                start = 1;
            }
            Message[] messages = folder.getMessages(start, end);
            if(messages != null){
                for(int i = messages.length - 1; i >= 0; i--){
                    Message message = messages[i];
                    Map map = getMapFromMessage(message,false);
                    map.put("id", message.getMessageNumber());
                    result.add(map);
                }
            }
            folder.close(false);
            store.close();
        }catch(Exception e){
            e.printStackTrace();
        }
        m.put("result",result);
        m.put("result_count",count);
    }

    @WebModelHandler(startsWith = "/getMail")
    public void getMail(@WebModel Map m, @WebParam("id") Integer id, RequestContext rc) {
        String token = rc.getUser(String.class);
        String email = rc.getCookie("email");
        IMAPStore store = oauthAuthenticator.getImapStore(email,token);
        Map map = null;
        try{
            Folder folder = store.getFolder("Inbox");
            folder.open(Folder.READ_ONLY);
            Message message = folder.getMessage(id);
            map = this.getMapFromMessage(message,true);
            folder.close(false);
            store.close();
        }catch(Exception e){
            e.printStackTrace();
        }
        m.put("result",map);
    }

    @WebActionHandler
    public Object sendMail(@WebModel Map m, @WebParam("subject") String subject,
                            @WebParam("content") String content,@WebParam("to") String to, RequestContext rc) {
        String token = rc.getUser(String.class);
        String email = rc.getCookie("email");
        SMTPTransport transport = oauthAuthenticator.getSmtpTransport(email, token);
        Session mailSession = oauthAuthenticator.getSMTPSession(token);
        Message msg = new MimeMessage(mailSession);
        try {
            msg.setFrom(new InternetAddress(email));  
            msg.setSubject(subject);  
            msg.setContent(content, "text/html;charset=UTF-8");  
            InternetAddress[] iaRecevers = new InternetAddress[1];  
            iaRecevers[0] = new InternetAddress(to);
            msg.setRecipients(Message.RecipientType.TO, iaRecevers);  
            transport.sendMessage(msg, msg.getAllRecipients());
            transport.close();
        } catch (Exception e) {
            e.printStackTrace();
        }  
        return null;
    }

    @WebActionHandler
    public Object deleteMail(@WebModel Map m, @WebParam("id") Integer id, RequestContext rc) {
        String token = rc.getUser(String.class);
        String email = rc.getCookie("email");
        IMAPStore store = oauthAuthenticator.getImapStore(email,token);
        try{
            Folder folder = store.getFolder("Inbox");
            folder.open(Folder.READ_WRITE);
            Message message = folder.getMessage(id);
            message.setFlag(Flags.Flag.DELETED, true);
            folder.close(false);
            store.close();
        }catch(Exception e){
            e.printStackTrace();
        }
        return null;
    }
    
    private Map getMapFromMessage(Message message,boolean showContent){
        Map map = new HashMap();
        if(message == null){
            return map;
        }
        DateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        try {
            map.put("subject", message.getSubject());
            map.put("from", message.getFrom()[0]);
            if(message.getSentDate() != null){
                map.put("date",df.format(message.getSentDate()) );
            }
            if(showContent){
                map.put("content", getContent(message));
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return map;
    }
    
    private String getContent(Message message) throws Exception {
        StringBuffer str = new StringBuffer();
        if (message.isMimeType("text/plain"))
            str.append(message.getContent().toString());
        if (message.isMimeType("multipart/alternative")) {
            Multipart part = (Multipart) message.getContent();
            str.append(part.getBodyPart(1).getContent().toString());
        }
        if (message.isMimeType("multipart/related")) {
            Multipart part = (Multipart) message.getContent();
            Multipart cpart = (Multipart) part.getBodyPart(0).getContent();
            str.append(cpart.getBodyPart(1).getContent().toString());
        }
        if (message.isMimeType("multipart/mixed")) {
            Multipart part = (Multipart) message.getContent();
            if (part.getBodyPart(0).isMimeType("text/plain")) {
                str.append(part.getBodyPart(0).getContent());
            }
            if (part.getBodyPart(0).isMimeType("multipart/alternative")) {
                Multipart cpart = (Multipart) part.getBodyPart(0).getContent();
                str.append(cpart.getBodyPart(1).getContent());
            }
        }
        return str.toString();
    }
    
}
