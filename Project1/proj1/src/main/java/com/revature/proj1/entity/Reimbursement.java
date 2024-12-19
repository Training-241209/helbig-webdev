package com.revature.proj1.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity(name="REIMBURSEMENT")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
public class Reimbursement {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int rembId;
    @Column(name="description")
    private String description;
    @Column(name="amount")
    private int amount;
    @Column(name="status")
    private String status;
    @ManyToOne()
    @JoinColumn(name="iduserfk")
    @JsonProperty
    @JsonBackReference
    private User idUserFk;

    public Reimbursement(String description, int amount){
        this.description = description;
        this.amount = amount;
    }
}
