package com.galvanize.models;

import com.fasterxml.jackson.annotation.JsonFormat;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "animals")
public class Animal {
    public enum TYPE {DOG, CAT, BIRD, RABBIT, HORSE};

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    @Enumerated(EnumType.STRING)
    private TYPE type;
    private String description;
    @JsonFormat(pattern = "YYYY-mm-dd")
    private Date birthdate;

    public Animal() {}

    public Animal(String name, String description, Date birthdate) {
        this.name = name;
        this.description = description;
        this.birthdate = birthdate;
    }

    public void getId(Long id) {
        this.id = id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public Long getId() {
        return id;
    }

    public TYPE getType() {
        return type;
    }

    public void setType(TYPE type) {
        this.type = type;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Date getBirthdate() {
        return birthdate;
    }

    public void setBirthdate(Date birthdate) {
        this.birthdate = birthdate;
    }
}
