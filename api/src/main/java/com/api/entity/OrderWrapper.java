package com.api.entity;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class OrderWrapper {

    private long id;
    private String list;
    private int price;
    private String orderDate;
    private String orderHour;

}
