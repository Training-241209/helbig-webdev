package com.revature.proj1.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.revature.proj1.entity.Reimbursement;
import com.revature.proj1.entity.User;
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

    public List<Reimbursement> getReimbursementsAdmin(boolean admin){
        if(admin) return reimbursementRepository.findAll();
        throw new RuntimeException();
    }
    public List<Reimbursement> getPendingReimbursementsAdmin(boolean admin){
        if(admin) return reimbursementRepository.findByStatus("pending");
        throw new RuntimeException();
    }

    public Reimbursement patchStatus(boolean admin, Reimbursement reimbursement){
        if(!admin) throw new RuntimeException();
        if(!(reimbursement.getStatus().equalsIgnoreCase("accepted") || reimbursement.getStatus().equalsIgnoreCase("denied"))){
            throw new RuntimeException();
        }
        Optional<Reimbursement> optionalReimb = reimbursementRepository.findById(reimbursement.getRembId());
        if(optionalReimb.isEmpty()){
            throw new RuntimeException();
        }
        Reimbursement patchedReimb = optionalReimb.get();
        patchedReimb.setStatus(reimbursement.getStatus());

        return reimbursementRepository.save(patchedReimb);

    }
}
