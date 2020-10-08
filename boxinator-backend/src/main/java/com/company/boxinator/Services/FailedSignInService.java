package com.company.boxinator.Services;

import com.company.boxinator.Models.BannedAccount;
import com.company.boxinator.Models.FailedSignIn;
import com.company.boxinator.Models.Session;
import com.company.boxinator.Models.User;
import com.company.boxinator.Repositories.BannedAccountRepository;
import com.company.boxinator.Repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
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
        Optional<FailedSignIn> findSession = findFailedSignInUserId(userId);

        if(findSession.isPresent()){
            System.out.println("findSession isPresent");
            findSession.get().setCounter(findSession.get().getCounter()+1);
            if(findSession.get().getCounter() > MAXLIMIT){
                System.out.println("ID: " + findSession.get().getAccount_id() + ": " + findSession.get().getCounter());
                banAccount(findSession.get());
                failedAttempts.remove(findSession.get());
            }
        }else{
           failedAttempts.add(new FailedSignIn(userId));
        }
    }
    private void banAccount(FailedSignIn failedSignIn){
        System.out.println("In banAccount");
        Optional<User> user = userRepository.findById(failedSignIn.getAccount_id());
        if(user.isPresent()){
            System.out.println("USER IS PRESENT");
            BannedAccount bannedAccount = new BannedAccount(user.get());
            try{
                bannedAccountRepository.save(new BannedAccount(user.get()));
            }catch (Exception ex){
                System.out.println("COULDNT SAVE BANNEDACCOUNT TO DB \nErrorMessage: " + ex.getMessage());
            }
        }
    }
    public boolean isUserBan(Integer userId) {

        Optional<BannedAccount> bannedAccount = bannedAccountRepository.findBannedAccountByUserId(userId);
        if (bannedAccount.isPresent()) {
            BannedAccount foundBannedAccount = bannedAccount.get();

            LocalDateTime localDateTime = LocalDateTime.parse(foundBannedAccount.getEndDate());
            if (localDateTime.isBefore(LocalDateTime.now())) {
                bannedAccountRepository.delete(foundBannedAccount);
                return false;
            } else {
                return true;
            }
        }
        return false;
    }
    public List<FailedSignIn> getFailedAttemptsList(){
        return failedAttempts;
    }

    public void removeCounter(Integer userId){
        Optional<FailedSignIn> failedSignIn = findFailedSignInUserId(userId);
        if(failedSignIn.isPresent())
            failedAttempts.remove(failedSignIn.get());
    }

    private Optional<FailedSignIn> findFailedSignInUserId(Integer userId){
        return failedAttempts.stream().filter(attempt -> attempt.getAccount_id() == userId).findFirst();
    }
}
