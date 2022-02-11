package com.api.repository;

import com.api.entity.OrderEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.ArrayList;

public interface OrderRepository extends JpaRepository<OrderEntity, Long> {

    // Order Database

    ArrayList<OrderEntity> findByUserEntityId(long userEntityid);

}
