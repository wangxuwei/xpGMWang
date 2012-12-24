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
import com.google.inject.Singleton;
import com.sun.mail.imap.IMAPStore;
import com.sun.mail.smtp.SMTPTransport;

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
            folder.open(Folder.READ_ONLY);
            Message[] messages = folder.getMessages(folder.getMessageCount() - 10, folder.getMessageCount() - 1);
            if(messages != null){
                for(int i = 0; i < messages.length; i++){
                    Message message = messages[i];
                    Map map = getMapFromMessage(message,false);
                    map.put("id", message.getMessageNumber());
                    result.add(map);
                }
            }
        }catch(Exception e){
            e.printStackTrace();
        }
        m.put("result",result);
    }

    @WebModelHandler(startsWith = "/getMail")
    public void getMail(@WebModel Map m, @WebParam("id") Integer id, RequestContext rc) {
        String token = rc.getUser(String.class);
        String email = rc.getCookie("email");
        IMAPStore imap = OAuth2Authenticator.getImapStore(email,token);
        Map map = null;
        try{
            Folder folder = imap.getFolder("Inbox");
            folder.open(Folder.READ_ONLY);
            Message message = folder.getMessage(id);
            map = this.getMapFromMessage(message,true);
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
        SMTPTransport transport = OAuth2Authenticator.getSmtpTransport(email, token);
        Session mailSession = OAuth2Authenticator.getSession(token);
        Message msg = new MimeMessage(mailSession);
        try {
            msg.setFrom(new InternetAddress(email));  
            msg.setSubject(subject);  
            msg.setContent(content, "text/html;charset=UTF-8");  
            InternetAddress[] iaRecevers = new InternetAddress[1];  
            iaRecevers[0] = new InternetAddress(to);
            msg.setRecipients(Message.RecipientType.TO, iaRecevers);  
            transport.sendMessage(msg, msg.getAllRecipients());
        } catch (Exception e) {
            e.printStackTrace();
        }  
        return null;
    }

    @WebActionHandler
    public Object deleteMail(@WebModel Map m, @WebParam("id") Integer id, RequestContext rc) {
        String token = rc.getUser(String.class);
        String email = rc.getCookie("email");
        IMAPStore imap = OAuth2Authenticator.getImapStore(email,token);
        try{
            Folder folder = imap.getFolder("Inbox");
            folder.open(Folder.READ_WRITE);
            Message message = folder.getMessage(id);
            message.setFlag(Flags.Flag.DELETED, true);
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
