package com.api.service;

import com.api.entity.Response;
import com.api.entity.UserEntity;
import com.api.repository.UserRepository;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Setter(onMethod = @__({@Autowired}))
    private UserRepository userRepository;

    public Response getUserId(String userId) {
        try {
            UserEntity user = userRepository.findByUserId(userId);
            return user == null ? new Response(200) : new Response(400);
        } catch (Exception e) {
            e.printStackTrace();
            return new Response(400);
        }
    }

    public Response signIn(UserEntity user) {
        try {
            UserEntity valid = userRepository.findByUserId(user.getUserId());
            if (valid == null || !valid.getPassword().equals(user.getPassword()))
                return new Response(400);
            else {
                valid.setPassword("");
                return new Response(200, valid);
            }
        } catch (Exception e) {
            e.printStackTrace();
            return new Response(400);
        }
    }

    public Response signUp(UserEntity user) {
        try {
            userRepository.save(user);
            return new Response(200);
        } catch (Exception e) {
            e.printStackTrace();
            return new Response(400);
        }
    }

    public Response putUser(UserEntity user) {
        try {
            UserEntity _user = userRepository.findByUserId(user.getUserId());
            if (_user == null) return new Response(400);
            _user.setPassword(user.getPassword());
            _user.setUserName(user.getUserName());
            _user.setUserTel(user.getUserTel());
            userRepository.save(_user);

            _user.setPassword("");
            return new Response(200, _user);
        } catch (Exception e) {
            e.printStackTrace();
            return new Response(400);
        }
    }

    public Response deleteUser(String userId) {
        try {
            userRepository.deleteByUserId(userId);
            return new Response(200);
        } catch (Exception e) {
            e.printStackTrace();
            return new Response(400);
        }
    }

}
