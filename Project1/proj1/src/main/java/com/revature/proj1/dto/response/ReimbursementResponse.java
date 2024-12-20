package com.revature.proj1.dto.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.revature.proj1.entity.Reimbursement;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class ReimbursementResponse {
    private int rembId;
    private String description;
    private int amount;
    private String status;
    private long userId;

    public ReimbursementResponse() {
    }

    public ReimbursementResponse(Reimbursement reimb) {
        this.rembId = reimb.getRembId();
        this.description = reimb.getDescription();
        this.amount = reimb.getAmount();
        this.status = reimb.getStatus();
        this.userId = reimb.getIdUserFk().getUserId();
    }

    // Getters
    public int getRembId() {
        return rembId;
    }

    public String getDescription() {
        return description;
    }

    public int getAmount() {
        return amount;
    }

    public String getStatus() {
        return status;
    }

    public long getUserId() {
        return userId;
    }
}
