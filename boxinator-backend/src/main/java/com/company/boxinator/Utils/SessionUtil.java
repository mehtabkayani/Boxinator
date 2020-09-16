package com.company.boxinator.Utils;

import com.company.boxinator.Models.Enums.AccountType;
import com.company.boxinator.Models.Session;
import com.company.boxinator.Models.User;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

public class SessionUtil {

    private JwtUtil jwtUtil = new JwtUtil();

    private List<Session> sessions = new ArrayList<Session>();


    public void addSession(User user){
        Session session = new Session();
        String token = jwtUtil.createJWT(user.getEmail(), user.getAccountType());
        session.setAccount_id(user.getId());
        session.setToken(token);
        sessions.add(session);
    }
    public boolean isSessionValid(Integer user_id, AccountType accountType){
        boolean isValid = false;

        Optional<Session> session = findSessionByUserId(user_id);
        if(!session.isPresent())
            return isValid;

        try {
            System.out.println("isSessionValid: try block");
            jwtUtil.parseJWT(session.get().getToken(), accountType);
            isValid = true;
            System.out.println("isSessionValid: try block: IsValid: " + isValid);
        }catch (Exception ex){
            System.out.println("isSessionValid: catch block: " + ex.getMessage());
        }
        return isValid;
    }
    public Optional<Session> findSessionByUserId (Integer user_id) {
        return sessions.stream().filter(s -> s.getAccount_id().equals(user_id)).findFirst();
    }
    public void removeSession(Integer user_id){
        System.out.println("Before session set");
        Session session = findSessionByUserId(user_id).get();
        System.out.println("In removeSession: " + session);
        sessions.remove(session);
    }
    public List<Session> getSessionsList(){
        return sessions;
    }
}
