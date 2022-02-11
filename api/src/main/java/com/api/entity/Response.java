package com.api.entity;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class Response {

    private int status;
    private Object obj;
//    private ArrayList<Object> list;

    public Response(int status) {
        this.status = status;
    }

    public Response(int status, Object obj) {
        this.status = status;
        this.obj = obj;
    }

//    public Response(int status, ArrayList<Object> list) {
//        this.status = status;
//        this.list = list;
//    }

}
