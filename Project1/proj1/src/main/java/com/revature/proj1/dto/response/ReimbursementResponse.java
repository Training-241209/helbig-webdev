package com.revature.proj1.dto.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.revature.proj1.entity.Reimbursement;

import jakarta.persistence.Column;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class ReimbursementResponse {
    private int rembId;
    private String description;
    private int amount;
    private String status;
    private long userId;

    public ReimbursementResponse() {
    }

    public ReimbursementResponse(Reimbursement r) {
        this.rembId = r.getRembId();
        this.description = r.getDescription();
        this.amount = r.getAmount();
        this.status = r.getStatus();
        //this.userId = r.get().getUserId();  // Assuming there's a User object with getId()
        this.userId = r.getIdUserFk().getUserId();
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
