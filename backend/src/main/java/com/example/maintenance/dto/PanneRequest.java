package com.example.maintenance.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PanneRequest {

    @NotNull
    private Long machineId;

    @NotBlank
    private String typePanne;

    @NotBlank
    private String gravite;

    @NotBlank
    private String description;

    // Optional; ISO string from frontend, e.g. "2025-12-10T10:30"
    private String datePanne;
}
