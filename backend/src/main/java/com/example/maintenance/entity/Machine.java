package com.example.maintenance.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "machines")
public class Machine {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String line;
    private String name;
    private String type;

    public Machine() {}

    public Long getId() { return id; }

    public String getLine() { return line; }
    public void setLine(String line) { this.line = line; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getType() { return type; }
    public void setType(String type) { this.type = type; }
}
