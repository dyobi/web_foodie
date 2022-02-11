package com.api.repository;

import com.api.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

public interface UserRepository extends JpaRepository<UserEntity, Long> {

    // User Database

    UserEntity findByUserId(String userId);

    @Transactional
    void deleteByUserId(String userId);

}
