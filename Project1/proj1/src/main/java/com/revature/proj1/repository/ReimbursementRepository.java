package com.revature.proj1.repository;

import java.util.List;

import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.revature.proj1.entity.Reimbursement;
import com.revature.proj1.entity.User;

@Repository
public interface ReimbursementRepository extends JpaRepository<Reimbursement, Integer> {
    @Query("SELECT * FROM reimbursement WHERE iduserfk = :userId")
    List<Reimbursement> findByIdUserFk(@Param("user") User userId);

    @Query("SELECT * FROM reimbursement WHERE iduserfk = :userId and \"status\" = \':status\'")
    List<Reimbursement> findByIdUserFkAndStatus(@Param("user") User userId, String status);

    @Query("SELECT * FROM reimbursement WHERE \"status\" = \':status\'")
    List<Reimbursement> findByStatus(String status);
}
