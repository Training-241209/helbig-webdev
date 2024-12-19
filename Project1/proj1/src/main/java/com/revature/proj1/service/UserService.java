package com.revature.proj1.service;

import org.mindrot.jbcrypt.BCrypt;
import org.springframework.stereotype.Service;

import com.revature.proj1.entity.User;
import com.revature.proj1.repository.UserRepository;

import java.util.List;
import java.util.Optional;
import com.revature.proj1.entity.Role;
import com.revature.proj1.service.JwtAuthService;

@Service
public class UserService {
    private UserRepository userRepository;

    public UserService(UserRepository userRepository){
        this.userRepository = userRepository;
    }

    public User createUser(User user){
        Optional<User> optionalUser = userRepository.findByUsername(user.getUsername());
        if(optionalUser.isPresent()){
            throw new RuntimeException();
        }
        user.setRole(new Role("employee"));
        user.setPassword(BCrypt.hashpw(user.getPassword(), BCrypt.gensalt()));
        return userRepository.save(user);
    }

    public User loginUserExists(User user){
        Optional<User> optionalUser = userRepository.findByUsername(user.getUsername());
        if(optionalUser.isEmpty()){
            throw new RuntimeException();
        }
        if(!BCrypt.checkpw(user.getPassword(), optionalUser.get().getPassword())){
            throw new RuntimeException();
        }
        return optionalUser.get();
    }

    public User getUser(int userId){
        return userRepository.findById(userId).get();
    }

    /*
     * ADMINISTRATOR ONLY
     */

    public boolean adminAuth(int userId){
        return userRepository.findById(userId).get().getRole().getRole().equals("admin");
    }

    public List<User> getAllUsers(int userId){
        if(!adminAuth(userId)) throw new RuntimeException();
        return userRepository.findAll();
    }

    public User deleteUser(int adminId, User user){
        int userId = user.getUserId().intValue();
        if(!adminAuth(adminId)) throw new RuntimeException();
        Optional<User> optUser = userRepository.findById(userId);
        if(optUser.isEmpty()){
            throw new RuntimeException();
        }
        userRepository.delete(optUser.get());
        return optUser.get();
        
    }
}
