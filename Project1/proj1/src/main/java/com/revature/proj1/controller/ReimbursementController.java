package com.revature.proj1.controller;

import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;

import com.revature.proj1.dto.response.JwtResponse;
import com.revature.proj1.dto.response.ReimbursementResponse;
import com.revature.proj1.entity.Reimbursement;
import com.revature.proj1.entity.User;
import com.revature.proj1.service.JwtAuthService;
import com.revature.proj1.service.ReimbursementService;
import com.revature.proj1.service.UserService;
import com.fasterxml.jackson.databind.ObjectMapper;

@Controller
public class ReimbursementController {
    private UserService userService;
    private ReimbursementService reimbursementService;
    private JwtAuthService jwtAuthService;

    public ReimbursementController(UserService userService, ReimbursementService reimbursementService, JwtAuthService jwtAuthService){
        this.userService = userService;
        this.reimbursementService = reimbursementService;
        this.jwtAuthService = jwtAuthService;
    }

    @PostMapping("register")
    @ResponseBody
    public User postNewUser(@RequestBody User user){
        return userService.createUser(user);
    }

    @PostMapping("login")
    public ResponseEntity<JwtResponse> loginUser(@RequestBody User user){
        user = userService.loginUserExists(user);
        String jwt = jwtAuthService.jwtBuilder(user);
        JwtResponse jwtR = new JwtResponse(jwt);
        return ResponseEntity.ok()
            .contentType(MediaType.APPLICATION_JSON)
            .body(jwtR);
    }

    @PostMapping(value="reimbursement-list/user", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<ReimbursementResponse> createReimbursement(@RequestHeader(name="authorization") String token, @RequestBody Reimbursement reimbursement){
        String strId =  jwtAuthService.jwtGetId(token);
        int userId = Integer.parseInt(strId); //fix
        User reimbUser = userService.getUser(userId);

        Reimbursement reimbursement2 = reimbursementService.createReimbursement(reimbUser, reimbursement);
        ReimbursementResponse reimbursementDto = new ReimbursementResponse(reimbursement2);
        return ResponseEntity.ok()
            .contentType(MediaType.APPLICATION_JSON)
            .body(reimbursementDto);
        //return ResponseEntity.ok(r);
    }

    @GetMapping(value="reimbursement-list/user", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public List<Reimbursement> getReimbursements(@RequestHeader (name="authorization") String token){
        int userId = Integer.parseInt(jwtAuthService.jwtGetId(token));
        User reimbUser = userService.getUser(userId);
        return reimbursementService.getReimbursements(reimbUser);
    }

    @GetMapping("reimbursement-list/user/pending")
    @ResponseBody
    public List<Reimbursement> getPendingReimbursements(@RequestHeader (name="Authorization") String token){
        int userId = Integer.parseInt(jwtAuthService.jwtGetId(token));
        User reimbUser = userService.getUser(userId);
        return reimbursementService.getPendingReimbursements(reimbUser);
    }


    /*
     * ADMINISTRATOR ONLY
     */

    @GetMapping("reimbursement-list/admin")
    @ResponseBody
    public List<Reimbursement> getPendingReimbursementsAdmin(@RequestHeader (name="Authorization") String token){
        int userId = Integer.parseInt(jwtAuthService.jwtGetId(token));
        return reimbursementService.getReimbursementsAdmin(userService.adminAuth(userId));
    }

    @GetMapping("reimbursement-list/admin/pending")
    @ResponseBody
    public List<Reimbursement> getReimbursementsAdmin(@RequestHeader (name="Authorization") String token){
        int userId = Integer.parseInt(jwtAuthService.jwtGetId(token));
        return reimbursementService.getPendingReimbursementsAdmin(userService.adminAuth(userId));
    }

    @PatchMapping("reimbursement-list/admin/pending")
    @ResponseBody
    public Reimbursement updateStatus(@RequestHeader (name="Authorization") String token, @RequestBody Reimbursement reimbursement){
        int userId = Integer.parseInt(jwtAuthService.jwtGetId(token));
        return reimbursementService.patchStatus(userService.adminAuth(userId), reimbursement);
    }

    @GetMapping("admin/users")
    @ResponseBody
    public List<User> getAllUsers(@RequestHeader (name="Authorization") String token){
        int userId = Integer.parseInt(jwtAuthService.jwtGetId(token));
        return userService.getAllUsers(userId);
    }
    @DeleteMapping("admin/users")
    @ResponseBody
    public User deleteUser(@RequestHeader (name="Authorization") String token, @RequestBody User user){
        int userId = Integer.parseInt(jwtAuthService.jwtGetId(token));
        return userService.deleteUser(userId, user);
    }
}
