package com.revature.proj1.entity;

import java.util.Set;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity(name = "ROLE")
@Getter
@Setter
@EqualsAndHashCode
@NoArgsConstructor
public class Role {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private String role;
    @OneToMany(mappedBy = "role")
    private Set<User> user;

    public Role(String role){
        this.role = role;
    }
}
