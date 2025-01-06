package com.revature.proj1.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.revature.proj1.entity.Reimbursement;
import com.revature.proj1.entity.User;
import com.revature.proj1.exception.InsufficientPrivilegesException;
import com.revature.proj1.exception.InvalidArgumentException;
import com.revature.proj1.exception.UserDoesNotExistException;
import com.revature.proj1.repository.ReimbursementRepository;

@Service
public class ReimbursementService {
    private ReimbursementRepository reimbursementRepository;

    public ReimbursementService(ReimbursementRepository reimbursementRepository){
        this.reimbursementRepository = reimbursementRepository;
    }

    public Reimbursement createReimbursement(User userId, Reimbursement reimbursement){
        reimbursement.setIdUserFk(userId);
        reimbursement.setStatus("pending");
        return reimbursementRepository.save(reimbursement);
    }

    public List<Reimbursement> getReimbursements(User userId){
        List<Reimbursement> reimbursementsList = reimbursementRepository.findByIdUserFk(userId);
        return reimbursementsList;
    }

    public List<Reimbursement> getPendingReimbursements(User userId){
        return reimbursementRepository.findByIdUserFkAndStatus(userId, "pending");
    }

    public Reimbursement patchAmountAndDescription(Reimbursement reimb){
        int reimbId = reimb.getRembId();
        Optional<Reimbursement> optReimb = reimbursementRepository.findById(reimbId);
        if(optReimb.isEmpty()){
            throw new RuntimeException("Error: Reimbursement does not exist.");
        }
        Reimbursement updatedReimb = optReimb.get();
        updatedReimb.setAmount(reimb.getAmount());
        updatedReimb.setDescription(reimb.getDescription());
        return updatedReimb;
    }

    /*
     * ADMIN
     */

    public List<Reimbursement> getReimbursementsAdmin(boolean admin){
        if(admin) return reimbursementRepository.findAll();
        throw new InsufficientPrivilegesException("Error: Insufficient Privileges.");
    }

    public List<Reimbursement> getPendingReimbursementsAdmin(boolean admin){
        if(admin) return reimbursementRepository.findByStatus("pending");
        throw new InsufficientPrivilegesException("Error: Insufficient Privileges.");
    }

    public List<Reimbursement> getResolvedReimbursementsAdmin(boolean admin){
        if(admin) return reimbursementRepository.findByStatusNot("pending");
        throw new InsufficientPrivilegesException("Error: Insufficient Privileges.");
    }

    public Reimbursement patchStatus(boolean admin, Reimbursement reimbursement){
        if(!admin) throw new InsufficientPrivilegesException("Error: Insufficient Privileges.");
        if(!(reimbursement.getStatus().equalsIgnoreCase("accepted")
         || reimbursement.getStatus().equalsIgnoreCase("denied")
         || reimbursement.getStatus().equalsIgnoreCase("pending"))){
            throw new InvalidArgumentException("Error: invalid input, reimbursement status can be accepted, pending, or denied");
        }
        Optional<Reimbursement> optionalReimb = reimbursementRepository.findById(reimbursement.getRembId());
        if(optionalReimb.isEmpty()){
            throw new UserDoesNotExistException("Error: User not found.");
        }
        Reimbursement patchedReimb = optionalReimb.get();
        patchedReimb.setStatus(reimbursement.getStatus());

        return reimbursementRepository.save(patchedReimb);

    }

}
