package com.company.boxinator.Controllers;
import com.company.boxinator.Config.SecurityConf;
import com.company.boxinator.Models.*;
import com.company.boxinator.Models.Enums.AccountType;
import com.company.boxinator.Repositories.AuthTokenRepository;
import com.company.boxinator.Repositories.BannedAccountRepository;
import com.company.boxinator.Repositories.ShipmentRepository;
import com.company.boxinator.Repositories.UserRepository;
import com.company.boxinator.Services.FailedSignInService;
import com.company.boxinator.Services.Google2FAService;
import com.company.boxinator.Services.EmailService;
import com.company.boxinator.Utils.JwtUtil;
import com.company.boxinator.Utils.SessionUtil;
import com.company.boxinator.Utils.UserUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.MailException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;


import javax.servlet.http.HttpServletRequest;
import java.net.MalformedURLException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api")
public class UserController {
    @Autowired
    UserRepository userRepository;

    @Autowired
    AuthTokenRepository authTokenRepository;

    @Autowired
    ShipmentRepository shipmentRepository;

    @Autowired
    private EmailService emailService;

    @Autowired
    private Google2FAService google2FAService;

    @Autowired
    private FailedSignInService failedSignInService;

    @Autowired
    private BannedAccountRepository bannedAccountRepository;

    private UserUtil userUtil = new UserUtil();

    private BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();

    private JwtUtil jwtUtil = new JwtUtil();
    private SessionUtil sessionUtil = SessionUtil.getInstance();

    private SecurityConf securityConf = new SecurityConf();

    @GetMapping("/failedAttempts")
    public List<FailedSignIn> failedAttempts(){
        return failedSignInService.getFailedAttemptsList();
    }

    @PostMapping("/google2fa")
    public ResponseEntity<String> authenticate2fa(@RequestBody(required = false) AuthToken authToken){
        Google2FAService google2FAService = new Google2FAService();

        String code = google2FAService.runGoogle2fa(authToken.getToken());


        if(code.equals(authToken.getToken())){
            System.out.println("Generated code: " + code);
            return new ResponseEntity<>(HttpStatus.OK);

        }
        return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
    }

    @PostMapping("/login")
    public ResponseEntity<Session> login(@RequestBody User userLogin, @RequestHeader("Authorization") String code){


        if(!securityConf.validInputs(userLogin.getEmail(), userLogin.getPassword(), code))
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);

        Optional<User> user = userRepository.findByEmail(userLogin.getEmail());
        if(!user.isPresent())
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);

        System.out.println(failedSignInService.isUserBan(user.get().getId()));
        System.out.println("isUserBan: " + failedSignInService.isUserBan(user.get().getId()));

        if(failedSignInService.isUserBan(user.get().getId())){
            return new ResponseEntity<>(HttpStatus.NOT_ACCEPTABLE);
        }

        AuthToken Token = authTokenRepository.findByUserId(user.get().getId());
        String sixDigitCode = google2FAService.runGoogle2fa(Token.getToken());

        if (sixDigitCode.equals(code) && bCryptPasswordEncoder.matches(userLogin.getPassword(),user.get().getPassword()) && userLogin.getEmail().equals(user.get().getEmail())) {
            sessionUtil.addSession(user.get());
            failedSignInService.removeCounter(user.get().getId());
            return new ResponseEntity<>(sessionUtil.getSession(user.get().getId()).get(), HttpStatus.OK);
        }else{
            failedSignInService.attemptFailed(user.get().getId());
        }

        return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);

    }

  @PostMapping("/logout")
    public ResponseEntity logout(@RequestHeader("Authorization") String jwt){
        System.out.println("JWTOken: "+ jwt);
        Integer userId = jwtUtil.getJwtId(jwt);
        if (!sessionUtil.isSessionValid(jwt)) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }

        try{
            sessionUtil.removeSession(userId);
        }catch(Exception e){
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/users")
    public ResponseEntity<List<User>> getUsers(@RequestHeader("Authorization") String jwt) {
        if (!sessionUtil.isSessionValid(jwt)) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }

        if (jwtUtil.tokenAccountType(jwt) == AccountType.ADMINISTRATOR) {
//            return new ResponseEntity<>(userRepository.findAll(), HttpStatus.OK);
            return new ResponseEntity<>(userRepository.findUsersByIdIsNot(jwtUtil.getJwtId(jwt)), HttpStatus.OK);
        }

        return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
    }

    @GetMapping("/user/{id}")
    public ResponseEntity<User> getUserById(@PathVariable("id") int id, @RequestHeader("Authorization") String jwt) {

        if (!sessionUtil.isSessionValid(jwt)) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }

        Optional<User> userData = userRepository.findById(id);
        if (!userData.isPresent()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        if (jwtUtil.tokenAccountType(jwt) == AccountType.ADMINISTRATOR) {
            return new ResponseEntity<>(userRepository.findById(id).get(), HttpStatus.OK);
        }

        Integer userId = jwtUtil.getJwtId(jwt);
        if (userId == id) {
            return new ResponseEntity<>(userRepository.findById(id).get(), HttpStatus.OK);
        }

        return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);


    }

    @GetMapping("/loggedInUser")
    public ResponseEntity<User> getLoggedInUser(@RequestHeader("Authorization") String jwt) {

        if (!sessionUtil.isSessionValid(jwt)) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }

        Integer userId = jwtUtil.getJwtId(jwt);
        Optional<User> userData = userRepository.findById(userId);
        if (userData.isPresent()) {

            return new ResponseEntity<>(userData.get(),HttpStatus.OK);
        }else{
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);

        }
    }
    @PutMapping("/user/{id}")
    public ResponseEntity updateUserById(@RequestBody User user, @PathVariable("id") Integer id, @RequestHeader("Authorization") String jwt) {
        System.out.println("In updateUserById");
        System.out.println("email: " + user.getEmail());
        System.out.println("password: " + user.getPassword());
        System.out.println("firstname: " + user.getFirstname());
        System.out.println("lastname: " + user.getLastname());
        System.out.println("contactNumber: " + user.getContactNumber());
        System.out.println("countryOfResidence: " + user.getCountryOfResidence());
        System.out.println("dateOfBirth: " + user.getDateOfBirth());
        System.out.println("zipcode: " + user.getZipcode());
        System.out.println("accountType: " + user.getAccountType());

        if (!sessionUtil.isSessionValid(jwt)) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }

        Optional<User> userData = userRepository.findById(id);
        if (!userData.isPresent()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        User updateUserInDB = userRepository.findById(id).get();
        if (jwtUtil.tokenAccountType(jwt) == AccountType.ADMINISTRATOR) {
            if(jwtUtil.getJwtId(jwt) == id){
                System.out.println("IN ADMIN OWN ACCOUNT UPDATE");
                updateUserInDB.setEmail(user.getEmail());
                if(!user.getPassword().isBlank())
                    updateUserInDB.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
                updateUserInDB.setFirstname(user.getFirstname());
                updateUserInDB.setLastname(user.getLastname());
                updateUserInDB.setContactNumber(user.getContactNumber());
                updateUserInDB.setCountryOfResidence(user.getCountryOfResidence());
                updateUserInDB.setDateOfBirth(user.getDateOfBirth());
                updateUserInDB.setZipcode(user.getZipcode());
                updateUserInDB.setAccountType(user.getAccountType());

                if(!securityConf.validInputs(updateUserInDB.getEmail(), updateUserInDB.getFirstname(), updateUserInDB.getLastname(),
                        updateUserInDB.getContactNumber(), updateUserInDB.getCountryOfResidence(),
                        updateUserInDB.getDateOfBirth()))
                return new ResponseEntity(HttpStatus.FORBIDDEN);
            } else {

                updateUserInDB.setEmail(user.getEmail());
                //UPDATE THIS MAYBE????
                //updateUserInDB.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
                updateUserInDB.setAccountType(user.getAccountType());

                if(!securityConf.validInputs(updateUserInDB.getEmail()))
                    return new ResponseEntity(HttpStatus.FORBIDDEN);
            }
            try{
                userRepository.save(updateUserInDB);
            }catch (Exception ex){
                return new ResponseEntity<>(null, HttpStatus.CONFLICT);
            }
            return new ResponseEntity<>(updateUserInDB, HttpStatus.OK);
        }
        Integer userId = jwtUtil.getJwtId(jwt);
        if (userId == id) {
            updateUserInDB.setEmail(user.getEmail());
            if(!user.getPassword().isBlank())
                updateUserInDB.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
            updateUserInDB.setFirstname(user.getFirstname());
            updateUserInDB.setLastname(user.getLastname());
            updateUserInDB.setContactNumber(user.getContactNumber());
            updateUserInDB.setCountryOfResidence(user.getCountryOfResidence());
            updateUserInDB.setDateOfBirth(user.getDateOfBirth());
            updateUserInDB.setZipcode(user.getZipcode());
            if(!securityConf.validInputs(updateUserInDB.getEmail(), updateUserInDB.getFirstname(), updateUserInDB.getLastname(), updateUserInDB.getContactNumber(),
                    updateUserInDB.getCountryOfResidence(), updateUserInDB.getDateOfBirth(), updateUserInDB.getZipcode()))
                return new ResponseEntity(HttpStatus.FORBIDDEN);
            userRepository.save(updateUserInDB);
            return new ResponseEntity<>(updateUserInDB, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
    }

    @PostMapping("/user")
    public ResponseEntity addUser(@RequestBody User user) {
        Optional<User> userData = userRepository.findByEmail(user.getEmail());
        //Check if there is no email registered then register a new user
        if (!userData.isPresent()) {
            if(!securityConf.validInputs(user.getPassword()))
                return new ResponseEntity(HttpStatus.FORBIDDEN);
            System.out.println("PASSES FIRST TWO CHECKS");
            user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
            user.setAccountType(AccountType.REGISTERED_USER);
            userRepository.save(user);

            System.out.println("BEFORE AUTHTOKEN");
            AuthToken authToken = new AuthToken();
            String secret = google2FAService.generateSecretKey();
            authToken.setToken(secret);
            authToken.setUser(user);
            authTokenRepository.save(authToken);

            emailService.sendLoginTwoFactorCode(user,secret);
            return ResponseEntity.status(HttpStatus.CREATED).body("A New user is registered!");
        }
        //Check if the email is registered with an user or an admin
        if (userData.isPresent() && (userData.get().getAccountType() == AccountType.REGISTERED_USER || userData.get().getAccountType() == AccountType.ADMINISTRATOR)) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("User is already registered!");
        }
        //Check if the email exists and that the account type is a GUEST then register user as Registered_USER
        if (userData.isPresent() && userData.get().getAccountType() == AccountType.GUEST) {

            User guestUser = userUtil.setUser(user,userData.get());
            userRepository.save(guestUser);
            AuthToken authToken = new AuthToken();
            String secret = google2FAService.generateSecretKey();
            authToken.setToken(secret);
            authToken.setUser(guestUser);
            authTokenRepository.save(authToken);

            emailService.sendLoginTwoFactorCode(guestUser,secret);
            return ResponseEntity.status(HttpStatus.CREATED).body(guestUser.getEmail() + " is now registered as a REGISTERED_USER!");
        }
        return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body("Something went wrong");
    }

    @DeleteMapping("/user")
    public ResponseEntity deleteUser(HttpServletRequest request, @RequestHeader("Authorization") String jwt) {
        String email = request.getHeader("data");
        System.out.println("Email: " + email);
        System.out.println("JWT: " + jwt);
        if (!sessionUtil.isSessionValid(jwt)) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
        if(!securityConf.validInputs(email))
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);

        if (jwtUtil.tokenAccountType(jwt) == AccountType.ADMINISTRATOR) {
            Optional<User> deleteUser = userRepository.findByEmail(email);
            if (!deleteUser.isPresent()) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            } else {

                List<Shipment> listOfShipments = shipmentRepository.findAll();
                List<Shipment> filteredList = listOfShipments.stream().filter(shipment -> shipment.getUser().getId() == deleteUser.get().getId()).collect(Collectors.toList());
                Integer id = deleteUser.get().getId();

                shipmentRepository.deleteAll(filteredList);
                if(deleteUser.get().getAccountType() != AccountType.GUEST){
                    AuthToken userAuthToken = authTokenRepository.findByUserId(id);
                    authTokenRepository.delete(userAuthToken);
                }

                Optional<BannedAccount> bannedUser = bannedAccountRepository.findBannedAccountByUserId(deleteUser.get().getId());
                if(bannedUser.isPresent()){
                    bannedAccountRepository.delete(bannedUser.get());
                }
                userRepository.delete(deleteUser.get());
                return ResponseEntity.status(HttpStatus.OK).body(email + " deleted succeded");
            }
        }

        return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

    }

    @GetMapping("/jwt/{jwtw}")
    public boolean isSessionValid(@PathVariable("jwtw") String jwt) {
        return sessionUtil.isSessionValid(jwt);
    }

    @GetMapping("/sessions")
    public List<Session> sessions() {
        return sessionUtil.getSessionsList();
    }

    @GetMapping("/removesession/{session_id}")
    public void s(@PathVariable("session_id") Integer id) {
        sessionUtil.removeSession(id);
    }
    @GetMapping("/sendemail")
    public ResponseEntity sendEmail(@RequestHeader("Authorization") String jwt){
        Optional<User> user = userRepository.findById(jwtUtil.getJwtId(jwt));
        if(!user.isPresent())
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Couldnt find");

        try{
            emailService.sendAuthenticationEmail(user.get());
        } catch (MailException | MalformedURLException e){
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        }
        return ResponseEntity.status(HttpStatus.OK).body("Check email");
    }
}
