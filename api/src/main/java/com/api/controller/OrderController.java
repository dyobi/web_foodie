package com.api.controller;

import com.api.entity.OrderWrapper;
import com.api.entity.Response;
import com.api.service.OrderService;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController @RequestMapping("/api/order")
public class OrderController {

    @Setter(onMethod = @__({@Autowired}))
    private OrderService orderService;

    @GetMapping("/id/{id}")
    public Response getOrderList(@PathVariable("id") long id) {
        return orderService.getOrderList(id);
    }

    @PostMapping("/")
    public Response postOrderList(@RequestBody OrderWrapper orderWrapper) {
        return orderService.postOrderList(orderWrapper);
    }

}
