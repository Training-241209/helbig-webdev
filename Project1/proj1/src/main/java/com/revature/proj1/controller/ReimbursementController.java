package com.revature.proj1.controller;

import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;

import com.revature.proj1.dto.response.ReimbursementResponse;
import com.revature.proj1.entity.Reimbursement;
import com.revature.proj1.entity.User;
import com.revature.proj1.service.JwtAuthService;
import com.revature.proj1.service.ReimbursementService;
import com.revature.proj1.service.UserService;



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


    @PostMapping(value="user/reimbursement-list", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<ReimbursementResponse> createReimbursement(@RequestHeader(name="authorization") String token, @RequestBody Reimbursement reimbursement){
        String strId =  jwtAuthService.jwtGetId(token);
        int userId = Integer.parseInt(strId);
        User reimbUser = userService.getUser(userId);

        Reimbursement reimbursementPost = reimbursementService.createReimbursement(reimbUser, reimbursement);
        ReimbursementResponse reimbursementDto = new ReimbursementResponse(reimbursementPost);
        return ResponseEntity.ok()
            .contentType(MediaType.APPLICATION_JSON)
            .body(reimbursementDto);
    }

    @GetMapping(value="user/reimbursement-list", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<ReimbursementResponse>> getReimbursements(@RequestHeader (name="authorization") String token){
        String strId = jwtAuthService.jwtGetId(token);
        int userId = Integer.parseInt(strId);

        User reimbUser = userService.getUser(userId);
        List<Reimbursement> reimbList = reimbursementService.getReimbursements(reimbUser);
        List<ReimbursementResponse> reimbDtoList = new ArrayList();

        for(Reimbursement reimb : reimbList){
            reimbDtoList.add(new ReimbursementResponse(reimb));
        }

        return ResponseEntity.ok()
            .contentType(MediaType.APPLICATION_JSON)
            .body(reimbDtoList);
    }

    @GetMapping("reimbursement-list/user/pending")
    public ResponseEntity<List<ReimbursementResponse>> getPendingReimbursements(@RequestHeader (name="Authorization") String token){
        int userId = Integer.parseInt(jwtAuthService.jwtGetId(token));
        User reimbUser = userService.getUser(userId);
        List<Reimbursement> reimbList = reimbursementService.getPendingReimbursements(reimbUser);
        List<ReimbursementResponse> reimbDtoList = new ArrayList();

        for(Reimbursement reimb : reimbList){
            reimbDtoList.add(new ReimbursementResponse(reimb));
        }

        return ResponseEntity.ok()
            .contentType(MediaType.APPLICATION_JSON)
            .body(reimbDtoList);
    }

    @PatchMapping
    public ResponseEntity<ReimbursementResponse> patchAmountAndDescription(@RequestHeader (name="Authorization") String token, @RequestBody Reimbursement reimb){
        Integer.parseInt(jwtAuthService.jwtGetId(token));

        Reimbursement updatedReimb = reimbursementService.patchAmountAndDescription(reimb);
        ReimbursementResponse reimbDto = new ReimbursementResponse(updatedReimb);

        return ResponseEntity.ok()
            .contentType(MediaType.APPLICATION_JSON)
            .body(reimbDto);
    }


    /*
     * ADMINISTRATOR ONLY
     */

    @GetMapping("admin/reimbursement-list")
    @ResponseBody
    public ResponseEntity<List<ReimbursementResponse>> getReimbursementsAdmin(@RequestHeader (name="Authorization") String token){

        List<Reimbursement> reimbList = reimbursementService.getReimbursementsAdmin(jwtAuthService.isAdmin(token));
        List<ReimbursementResponse> reimbDtoList = new ArrayList();

        for(Reimbursement reimb : reimbList){
            reimbDtoList.add(new ReimbursementResponse(reimb));
        }

        return ResponseEntity.ok()
            .contentType(MediaType.APPLICATION_JSON)
            .body(reimbDtoList);
    }

    @GetMapping("admin/reimbursement-list/pending")
    public ResponseEntity<List<ReimbursementResponse>> getPendingReimbursementsAdmin(@RequestHeader (name="Authorization") String token){

        List<Reimbursement> reimbList = reimbursementService.getPendingReimbursementsAdmin(jwtAuthService.isAdmin(token));
        List<ReimbursementResponse> reimbDtoList = new ArrayList();

        for(Reimbursement reimb : reimbList){
            reimbDtoList.add(new ReimbursementResponse(reimb));
        }

        return ResponseEntity.ok()
            .contentType(MediaType.APPLICATION_JSON)
            .body(reimbDtoList);
    }

    @GetMapping("admin/reimbursement-list/resolved")
    public ResponseEntity<List<ReimbursementResponse>> getResolvedReimbursementsAdmin(@RequestHeader (name="Authorization") String token){

        List<Reimbursement> reimbList = reimbursementService.getResolvedReimbursementsAdmin(jwtAuthService.isAdmin(token));
        List<ReimbursementResponse> reimbDtoList = new ArrayList();

        for(Reimbursement reimb : reimbList){
            reimbDtoList.add(new ReimbursementResponse(reimb));
        }

        return ResponseEntity.ok()
            .contentType(MediaType.APPLICATION_JSON)
            .body(reimbDtoList);
    }

    @PatchMapping("admin/reimbursement-list")
    public ResponseEntity<ReimbursementResponse> updateStatus(@RequestHeader (name="Authorization") String token, @RequestBody Reimbursement reimbursement){
        boolean admin = jwtAuthService.isAdmin(token);

        Reimbursement reimb = reimbursementService.patchStatus(admin, reimbursement);
        ReimbursementResponse reimbDto = new ReimbursementResponse(reimb);

        return ResponseEntity.ok()
            .contentType(MediaType.APPLICATION_JSON)
            .body(reimbDto);
    }

}
