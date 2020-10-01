package com.company.boxinator.Services;

import com.company.boxinator.Models.BannedAccount;
import com.company.boxinator.Models.FailedSignIn;
import com.company.boxinator.Models.Session;
import com.company.boxinator.Models.User;
import com.company.boxinator.Repositories.BannedAccountRepository;
import com.company.boxinator.Repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class FailedSignInService {
    @Autowired
    private BannedAccountRepository bannedAccountRepository;

    @Autowired
    private UserRepository userRepository;

    private List<FailedSignIn> failedAttempts = new ArrayList<>();

    private static final Integer MAXLIMIT = 5;

    public void attemptFailed(Integer userId){
        Optional<FailedSignIn> findSession = failedAttempts.stream()
                .filter(attempt -> attempt.getAccount_id() == userId).findFirst();

        if(findSession.isPresent()){
            findSession.get().setCounter(findSession.get().getCounter()+1);
            if(findSession.get().getCounter() > MAXLIMIT){
                System.out.println("ID: " + findSession.get().getAccount_id() + ": " + findSession.get().getCounter());
                banAccount(findSession.get());
                failedAttempts.remove(findSession.get());
            }
        }else{
           FailedSignIn failedSignIn = new FailedSignIn(userId);
           failedAttempts.add(failedSignIn);
        }
    }
    private void banAccount(FailedSignIn failedSignIn){
        Optional<User> user = userRepository.findById(failedSignIn.getAccount_id());
        if(user.isPresent()){
            BannedAccount bannedAccount = new BannedAccount(user.get());
            bannedAccountRepository.save(bannedAccount);
        }
    }
    public boolean isUserBan(Integer userId){
        boolean isBan = true;

//        BannedAccount bannedAccount = bannedAccountRepository.findByUserId(userId);
//        if(bannedAccount.getEndDate().isAfter(LocalDateTime.now())){
//            bannedAccountRepository.delete(bannedAccount);
//            isBan = false;
//        }
//        else if(bannedAccount == null)
//            isBan = false;

        try{
            BannedAccount bannedAccount = bannedAccountRepository.findByUserId(userId);
            if(bannedAccount.getEndDate().isBefore(LocalDateTime.now())) {
                bannedAccountRepository.delete(bannedAccount);
                isBan = false;
                System.out.println("IN TRY CATCH IF");
            }else {
                System.out.println("IN TRY CATCH ELSE");
            }
        }catch (Exception ex){
            System.out.println(ex.getMessage());
        }

        return isBan;
    }
}
