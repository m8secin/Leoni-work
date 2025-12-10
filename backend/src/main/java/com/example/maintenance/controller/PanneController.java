package com.example.maintenance.controller;

import com.example.maintenance.entity.Panne;
import com.example.maintenance.repository.PanneRepository;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/pannes")
@CrossOrigin(origins = "http://localhost:5173") // autorise ton frontend Vite
public class PanneController {

    private final PanneRepository panneRepository;

    public PanneController(PanneRepository panneRepository) {
        this.panneRepository = panneRepository;
    }

    // ======================
    //   GET ALL PANNES
    // ======================
    @GetMapping
    public List<Panne> getAllPannes() {
        System.out.println(">>> /api/pannes appelé");
        return panneRepository.findAll();
    }


    // ======================
    //   STATISTIQUES JSON
    // ======================
    @GetMapping("/stats")
    public Map<String, Object> getStats() {

        List<Panne> pannes = panneRepository.findAll();

        // 1️⃣ Statistiques par type de panne
        Map<String, Long> byType = pannes.stream()
                .collect(Collectors.groupingBy(Panne::getTypePanne, Collectors.counting()));

        // 2️⃣ Statistiques par gravité
        Map<String, Long> byGravite = pannes.stream()
                .collect(Collectors.groupingBy(Panne::getNiveauGravite, Collectors.counting()));

        // 3️⃣ Statistiques par jour (format YYYY-MM-DD)
        Map<String, Long> byDay = pannes.stream()
                .collect(Collectors.groupingBy(
                        p -> p.getDatePanne().toLocalDate().toString(),
                        Collectors.counting()
                ));

        // Assemble un JSON propre
        Map<String, Object> result = new HashMap<>();
        result.put("byType", byType);
        result.put("byGravite", byGravite);
        result.put("byDay", byDay);

        return result;
    }
}
