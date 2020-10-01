package com.company.boxinator.Models;

public class FailedSignIn {
    private Integer account_id;
    private Integer counter = 0;

    public FailedSignIn(){};

    public FailedSignIn(Integer account_id) {
        this.account_id = account_id;
    }


    public Integer getAccount_id() {
        return account_id;
    }

    public void setAccount_id(Integer account_id) {
        this.account_id = account_id;
    }

    public Integer getCounter() {
        return counter;
    }

    public void setCounter(Integer counter) {
        this.counter = counter;
    }
}
