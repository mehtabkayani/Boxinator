package com.company.boxinator.Repositories;

import com.company.boxinator.Models.BannedAccount;
import com.company.boxinator.Models.User;
import org.springframework.data.jpa.repository.JpaRepository;

import javax.persistence.criteria.CriteriaBuilder;

public interface BannedAccountRepository extends JpaRepository<BannedAccount, Integer> {
    BannedAccount findByUserId(Integer userId);
}
