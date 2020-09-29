package com.company.boxinator.Repositories;

import com.company.boxinator.Models.AuthToken;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AuthTokenRepository extends JpaRepository<AuthToken,Integer> {
    AuthToken findByUserId(Integer userId);

}
