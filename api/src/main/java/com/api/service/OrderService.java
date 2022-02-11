package com.api.service;

import com.api.entity.OrderEntity;
import com.api.entity.OrderWrapper;
import com.api.entity.Response;
import com.api.entity.UserEntity;
import com.api.repository.OrderRepository;
import com.api.repository.UserRepository;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class OrderService {

    @Setter(onMethod = @__({@Autowired}))
    private OrderRepository orderRepository;

    @Setter(onMethod = @__({@Autowired}))
    private UserRepository userRepository;

    public Response getOrderList(long id) {
        try {
            ArrayList<OrderEntity> list = orderRepository.findByUserEntityId(id);
            if (list.size() > 0) return new Response(200, list);
            else return new Response(400);
        } catch (Exception e) {
            e.printStackTrace();
            return new Response(400);
        }
    }

    public Response postOrderList(OrderWrapper ow) {
        try {
            UserEntity user = userRepository.findById(ow.getId()).orElse(null);
            if (user == null) {
                return new Response(400);
            } else {
                OrderEntity orderEntity = new OrderEntity();
                orderEntity.setUserEntity(user);
                orderEntity.setList(ow.getList());
                orderEntity.setPrice(ow.getPrice());
                orderEntity.setOrderDate(ow.getOrderDate());
                orderEntity.setOrderHour(ow.getOrderHour());
                orderRepository.save(orderEntity);

                return new Response(200);
            }
        } catch (Exception e) {
            e.printStackTrace();
            return new Response(400);
        }
    }

}
