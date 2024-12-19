package com.revature.proj1.repository;

import org.springframework.stereotype.Repository;

import com.revature.proj1.entity.Role;

import org.springframework.data.jpa.repository.JpaRepository;

@Repository
public interface RoleRepository extends JpaRepository<Role, String> {
    
}
