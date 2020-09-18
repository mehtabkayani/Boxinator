package com.company.boxinator.Models;

import javax.persistence.criteria.CriteriaBuilder;

public class Session {
    private Integer account_id;
    private String token;

    public Session(){}
    public Session(Integer account_id, String token) {
        this.account_id = account_id;
        this.token = token;
    }

    public Integer getAccount_id() {
        return account_id;
    }

    public void setAccount_id(Integer account_id) {
        this.account_id = account_id;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }
}
