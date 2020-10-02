package com.company.boxinator.Repositories;

import com.company.boxinator.Models.BannedAccount;
import com.company.boxinator.Models.User;
import org.springframework.data.jpa.repository.JpaRepository;

import javax.persistence.criteria.CriteriaBuilder;
import java.util.Optional;

public interface BannedAccountRepository extends JpaRepository<BannedAccount, Integer> {
    BannedAccount findByUserId(Integer userId);

    Optional<BannedAccount> findBannedAccountByUserId(Integer userId);
}
