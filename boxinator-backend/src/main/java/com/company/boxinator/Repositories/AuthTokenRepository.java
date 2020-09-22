package com.company.boxinator.Repositories;

import com.company.boxinator.Models.AuthToken;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AuthTokenRepository extends JpaRepository<AuthToken,Integer> {
}
