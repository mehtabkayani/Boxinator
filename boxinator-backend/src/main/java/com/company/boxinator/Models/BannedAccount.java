package com.company.boxinator.Models;

import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;

@Entity
@Table(name = "banned_account",
        uniqueConstraints = {
                @UniqueConstraint(columnNames = "user_id")
        })
public class BannedAccount implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column
    private LocalDate startDate;

    @Column
    private LocalDateTime endDate;

    @OneToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    public BannedAccount(){ }

    public BannedAccount(User user) {
        this.startDate = LocalDate.now();
        this.endDate = LocalDateTime.now().plusMinutes(1);
        this.user = user;
    }


    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public LocalDate getStartDate() {
        return startDate;
    }

    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }

    public LocalDateTime getEndDate() {
        return endDate;
    }

    public void setEndDate(LocalDateTime endDate) {
        this.endDate = endDate;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
