package com.company.boxinator.Utils;

import com.company.boxinator.Models.Session;
import com.company.boxinator.Models.User;
import com.company.boxinator.Repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

public class SessionUtil {


    @Autowired
    UserRepository userRepository;
    private JwtUtil jwtUtil = new JwtUtil();

    private List<Session> sessions = new ArrayList<Session>();

    private static volatile SessionUtil single_session = new SessionUtil();

    private SessionUtil() {
    }

    public static SessionUtil getInstance() {
        return single_session;
    }

    public void addSession(User user) {
        Session session = new Session();
        String token = jwtUtil.createJWT(user.getAccountType(), user.getId());
        session.setAccount_id(user.getId());
        session.setToken(token);
        sessions.add(session);
    }

    public Optional<Session> getSession(Integer userId) {
        return sessions.stream().filter(session -> session.getAccount_id() == userId).findFirst();
    }

    public boolean isSessionValid(String jwt) {
        boolean isValid = false;

        Optional<Session> optSessions = sessions.stream().filter(session -> session.getToken().equals(jwt)).findFirst();

        if (!optSessions.isPresent()) {
            return isValid;
        }

        if (jwtUtil.isJwtValid(optSessions.get().getToken())) {
            isValid = true;
        } else {
            sessions.remove(optSessions.get());
        }

        return isValid;
    }

    public Optional<Session> findSessionByUserId(Integer user_id) {
        return sessions.stream().filter(s -> s.getAccount_id().equals(user_id)).findFirst();
    }

    public void removeSession(Integer user_id) {
        System.out.println("Before session set");
        Session session = findSessionByUserId(user_id).get();
        System.out.println("In removeSession: " + session);
        sessions.remove(session);
    }

    public List<Session> getSessionsList() {
        return sessions;
    }
}
