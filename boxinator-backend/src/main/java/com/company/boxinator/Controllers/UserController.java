package com.company.boxinator.Controllers;
import com.company.boxinator.Models.AuthToken;
import com.company.boxinator.Models.Enums.AccountType;
import com.company.boxinator.Models.Session;
import com.company.boxinator.Models.Shipment;
import com.company.boxinator.Models.User;
import com.company.boxinator.Repositories.AuthTokenRepository;
import com.company.boxinator.Repositories.ShipmentRepository;
import com.company.boxinator.Repositories.UserRepository;
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

    private UserUtil userUtil = new UserUtil();


    private BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();

    private JwtUtil jwtUtil = new JwtUtil();
    private SessionUtil sessionUtil = SessionUtil.getInstance();

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

        Optional<User> user = userRepository.findByEmail(userLogin.getEmail());
        if(!user.isPresent())
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);

        AuthToken Token = authTokenRepository.findByUserId(user.get().getId());
//        if(Token)
//            return new ResponseEntity<>(HttpStatus.NO_CONTENT);

        System.out.println("Generated code from token: " + Token.getToken());
        String sixDigitCode = google2FAService.runGoogle2fa(Token.getToken());

        System.out.println("sixDigitCode: " + sixDigitCode);
        System.out.println("Auth code: " + code);

        System.out.println(sixDigitCode.equals(code));

        //sixDigitCode.equals(code) && ADD THIS TO IF STATEMENT LATER
        if (sixDigitCode.equals(code) && bCryptPasswordEncoder.matches(userLogin.getPassword(),user.get().getPassword()) && userLogin.getEmail().equals(user.get().getEmail())) {
            System.out.println("In if statement");
            sessionUtil.addSession(user.get());
            System.out.println(sessionUtil.getSession(user.get().getId()).get());
            return new ResponseEntity<>(sessionUtil.getSession(user.get().getId()).get(), HttpStatus.OK);
        }
        return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);

    }

  @PostMapping("/logout")
    public ResponseEntity login(@RequestHeader("Authorization") String jwt){
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
            return new ResponseEntity<>(userRepository.findAll(), HttpStatus.OK);
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

        if (!sessionUtil.isSessionValid(jwt)) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }

        Optional<User> userData = userRepository.findById(id);
        if (!userData.isPresent()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        User updateUserInDB = userRepository.findById(id).get();
        if (jwtUtil.tokenAccountType(jwt) == AccountType.ADMINISTRATOR) {
            updateUserInDB.setEmail(user.getEmail());
            updateUserInDB.setAccountType(user.getAccountType());
            //updateUserInDB.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
//            updateUserInDB.setFirstname(user.getFirstname());
//            updateUserInDB.setLastname(user.getLastname());
//            updateUserInDB.setContactNumber(user.getContactNumber());
//            updateUserInDB.setCountryOfResidence(user.getCountryOfResidence());
//            updateUserInDB.setDateOfBirth(user.getDateOfBirth());
//            updateUserInDB.setZipcode(user.getZipcode());
            userRepository.save(updateUserInDB);
            System.out.println("UPDATED BY ADMIN");

            return new ResponseEntity<>(updateUserInDB, HttpStatus.OK);
        }

        Integer userId = jwtUtil.getJwtId(jwt);
        if (userId == id) {
            updateUserInDB.setEmail(user.getEmail());
            //updateUserInDB.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
            updateUserInDB.setFirstname(user.getFirstname());
            updateUserInDB.setLastname(user.getLastname());
            updateUserInDB.setContactNumber(user.getContactNumber());
            updateUserInDB.setCountryOfResidence(user.getCountryOfResidence());
            updateUserInDB.setDateOfBirth(user.getDateOfBirth());
            updateUserInDB.setZipcode(user.getZipcode());
            userRepository.save(updateUserInDB);
            System.out.println("UPDATED BY REGISTERED_USER :)");
            return new ResponseEntity<>(updateUserInDB, HttpStatus.OK);
        }

        return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

    }

    @PostMapping("/user")
    public ResponseEntity addUser(@RequestBody User user) {
        Optional<User> userData = userRepository.findByEmail(user.getEmail());

        //Check if there is no email registered then register a new user
        if (!userData.isPresent()) {
            user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
            user.setAccountType(AccountType.REGISTERED_USER);
            userRepository.save(user);

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
            User guestUser = userUtil.setUser(userData.get(), new User());
            userRepository.save(guestUser);

            return ResponseEntity.status(HttpStatus.CREATED).body(guestUser.getEmail() + " is now registered as a REGISTERED_USER!");
        }
        return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body("Something went wrong");
    }

    @DeleteMapping("/user")
    public ResponseEntity deleteUser(HttpServletRequest  request, @RequestHeader("Authorization") String jwt) {
        String  email = request.getHeader("data");
        if (!sessionUtil.isSessionValid(jwt)) {
            System.out.println("FIRST");
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
        if (jwtUtil.tokenAccountType(jwt) == AccountType.ADMINISTRATOR) {
            System.out.println(email);
            Optional<User> deleteUser = userRepository.findByEmail(email);
            if (!deleteUser.isPresent()) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            } else {

                List<Shipment> listOfShipments = shipmentRepository.findAll();
                List<Shipment> filteredList = listOfShipments.stream().filter(shipment -> shipment.getUser().getId() == deleteUser.get().getId()).collect(Collectors.toList());
                Integer id = deleteUser.get().getId();
                AuthToken userAuthToken = authTokenRepository.findByUserId(id);

                shipmentRepository.deleteAll(filteredList);
                authTokenRepository.delete(userAuthToken);
                userRepository.delete(deleteUser.get());
                return ResponseEntity.status(HttpStatus.OK).body(email + " deleted succeded");
            }
        }
        System.out.println("Second");

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
