package com.company.boxinator.Repositories;

import com.company.boxinator.Models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    //User findUserBy(Integer id);
}
