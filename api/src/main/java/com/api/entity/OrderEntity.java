package com.api.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity @Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@DynamicInsert @DynamicUpdate
public class OrderEntity {

    @Id @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne() @JoinColumn(name = "userEntityId")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private UserEntity userEntity;

    @NotNull
    private String list;

    @NotNull
    private int price;

    @NotNull
    private String orderDate;

    @NotNull
    private String orderHour;

}
