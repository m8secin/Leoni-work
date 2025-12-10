package com.example.maintenance.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "pannes")
public class Panne {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "machine_id", nullable = false)
    @JsonIgnoreProperties("pannes") // évite boucle Machine <-> Panne en JSON
    private Machine machine;

    @Column(name = "type_panne")
    private String typePanne;

    // adapte le nom si ta colonne est "gravite" au lieu de "niveau_gravite"
    @Column(name = "niveau_gravite")
    private String niveauGravite;

    @Column(name = "date_panne")
    private LocalDateTime datePanne;

    @Column(columnDefinition = "TEXT")
    private String description;

    public Panne() {}

    public Long getId() {
        return id;
    }

    public Machine getMachine() {
        return machine;
    }

    public void setMachine(Machine machine) {
        this.machine = machine;
    }

    public String getTypePanne() {
        return typePanne;
    }

    public void setTypePanne(String typePanne) {
        this.typePanne = typePanne;
    }

    public String getNiveauGravite() {
        return niveauGravite;
    }

    public void setNiveauGravite(String niveauGravite) {
        this.niveauGravite = niveauGravite;
    }

    public LocalDateTime getDatePanne() {
        return datePanne;
    }

    public void setDatePanne(LocalDateTime datePanne) {
        this.datePanne = datePanne;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
