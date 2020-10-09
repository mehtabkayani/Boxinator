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

    //Creates singleton to only make one instance to store values in the list
    private static volatile SessionUtil single_session = new SessionUtil();

    private SessionUtil() {
    }

    public static SessionUtil getInstance() {
        return single_session;
    }
    //Creates and adds a session with the user and belonging token
    public void addSession(User user) {
        Session newSession = new Session();
        String token = jwtUtil.createJWT(user.getAccountType(),user.getId());
        Optional<Session> findSession = sessions.stream().filter(session -> session.getAccount_id() == user.getId()).findFirst();
        if(!findSession.isPresent()){
            newSession.setAccount_id(user.getId());
            newSession.setToken(token);
            sessions.add(newSession);
        }

    }
    //Gets the session based on the user id
    public Optional<Session> getSession(Integer userId) {
        return sessions.stream().filter(session -> session.getAccount_id() == userId).findFirst();
    }
    //Checks if the session is valid
    public boolean isSessionValid(String jwt) {
        boolean isValid = false;

        Optional<Session> optSessions = sessions.stream().filter(session -> session.getToken().equals(jwt)).findAny();

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
        Session session = findSessionByUserId(user_id).get();
        sessions.remove(session);
    }

}
