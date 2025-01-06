package com.revature.proj1.service;

import org.mindrot.jbcrypt.BCrypt;
import org.springframework.stereotype.Service;

import com.revature.proj1.entity.User;
import com.revature.proj1.exception.InvalidUserException;
import com.revature.proj1.exception.UserDoesNotExistException;
import com.revature.proj1.repository.UserRepository;

import java.util.List;
import java.util.Optional;
import com.revature.proj1.entity.Role;

@Service
public class UserService {
    private UserRepository userRepository;

    public UserService(UserRepository userRepository){
        this.userRepository = userRepository;
    }

    public User createUser(User user){
        Optional<User> optionalUser = userRepository.findByUsername(user.getUsername());
        if(optionalUser.isPresent()){
            throw new InvalidUserException("Error: Username is unavailable.");
        }
        user.setRole(new Role("employee"));
        user.setPassword(BCrypt.hashpw(user.getPassword(), BCrypt.gensalt()));
        return userRepository.save(user);
    }

    public User loginUserExists(User user){
        Optional<User> optionalUser = userRepository.findByUsername(user.getUsername());
        if(optionalUser.isEmpty()){
            throw new UserDoesNotExistException("Error: Username not found.");
        }
        if(!BCrypt.checkpw(user.getPassword(), optionalUser.get().getPassword())){
            throw new UserDoesNotExistException("Error: Password is incorrect.");
        }
        return optionalUser.get();
    }

    public User getUser(int userId){
        return userRepository.findById(userId).get();
    }

    /*
     * ADMINISTRATOR ONLY
     */

    public List<User> getAllUsers(int userId){
        return userRepository.findAll();
    }

    public User deleteUser(User user){
        int userId = user.getUserId().intValue();
        Optional<User> optUser = userRepository.findById(userId);
        if(optUser.isEmpty()){
            throw new UserDoesNotExistException("Error: Cannot delete non-existent user.");
        }
        userRepository.delete(optUser.get());
        return optUser.get();
        
    }

    public User promoteToManager(User user){
        int userId = user.getUserId().intValue();
        Optional<User> optUser = userRepository.findById(userId);
        if(optUser.isEmpty()){
            throw new UserDoesNotExistException("Error: Cannot delete non-existent user.");
        }
        User userManager= optUser.get();
        userManager.setRole(new Role("admin"));
        userRepository.save(userManager);
        return userManager;
    }
}
