package com.example.maintenance.dto;

public class MachineRequest {
    private String line;
    private String name;
    private String type;

    public String getLine() { return line; }
    public void setLine(String line) { this.line = line; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getType() { return type; }
    public void setType(String type) { this.type = type; }
}
