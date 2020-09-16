package com.company.boxinator.Utils;

import com.company.boxinator.Models.Enums.AccountType;
import com.company.boxinator.Models.Session;
import com.company.boxinator.Models.User;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

public class SessionUtil {
    private List<Session> sessions = new ArrayList<Session>();
    private JwtUtil jwtUtil = new JwtUtil();

    public Session addSession(User user){

//                    Optional<Session> sessionOpt = findSessionByUserId(user.getId());
//
//                    if(!sessionOpt.isPresent())
//                        return sessionOpt;
//
//                    Session session = sessionOpt.get();
        Session session = new Session();

        String token = jwtUtil.createJWT(user.getEmail(), user.getAccountType().toString());
        session.setAccount_id(user.getId());
        session.setToken(token);
        return session;
    }
    public boolean isSessionValid(Integer user_id, AccountType accountType){
        boolean isValid = false;

        Optional<Session> session = findSessionByUserId(user_id);
        if(!session.isPresent())
            isValid = true;

        try {
            System.out.println("isSessionValid: try block");
            jwtUtil.parseJWT(session.get().getToken(), accountType.toString());
            isValid = true;
            System.out.println("isSessionValid: try block: IsValid: " + isValid);
        }catch (Exception ex){
            System.out.println("isSessionValid: catch block: " + ex.getMessage());
            isValid = false;
        }
        return isValid;
    }
    public List<Session> getSessionsList(){
        return sessions;
    }
    public Optional<Session> findSessionByUserId (Integer user_id) {
        return sessions.stream().filter(s -> s.getAccount_id().equals(user_id)).findFirst();
    }
}
