package com.company.boxinator.Utils;

import com.company.boxinator.Models.Enums.AccountType;
import com.company.boxinator.Models.User;
import com.company.boxinator.Repositories.UserRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class UserUtil {
    private UserRepository userRepository;
    private BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();

    public User setUser(User user){
        User newUser = new User();
        newUser.setContactNumber(user.getContactNumber());
        newUser.setCountryOfResidence(user.getCountryOfResidence());
        newUser.setDateOfBirth(user.getDateOfBirth());
        newUser.setEmail(user.getEmail());
        newUser.setFirstname(user.getFirstname());
        newUser.setLastname(user.getLastname());
        newUser.setZipcode(user.getZipcode());
        newUser.setAccountType(AccountType.REGISTERED_USER);
        newUser.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
        return newUser;
    }
}
