package com.api.controller;

import com.api.entity.Response;
import com.api.entity.UserEntity;
import com.api.service.UserService;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController @RequestMapping("/api/auth")
public class UserController {

    @Setter(onMethod = @__({@Autowired}))
    private UserService userService;

    @GetMapping("/userId/{userId}")
    public Response getUserId(@PathVariable("userId") String userId) {
        return userService.getUserId(userId);
    }

    @PostMapping("/signin")
    public Response signIn(@RequestBody UserEntity user) {
        return userService.signIn(user);
    }

    @PostMapping("/signup")
    public Response signUp(@RequestBody UserEntity user) {
        return userService.signUp(user);
    }

    @PutMapping("/")
    public Response putUser(@RequestBody UserEntity user) {
        return userService.putUser(user);
    }

    @DeleteMapping("/")
    public Response deleteUser(@RequestParam String userId) {
        return userService.deleteUser(userId);
    }

}
