package com.company.boxinator.Models;

import javax.persistence.*;

@Entity
@Table(name = "auth_token",
        uniqueConstraints = {

                @UniqueConstraint(columnNames = "token")
        })
public class AuthToken {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    @Column
    private String token;

    @Column
    private boolean isValid;

    @OneToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    public AuthToken() {
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
