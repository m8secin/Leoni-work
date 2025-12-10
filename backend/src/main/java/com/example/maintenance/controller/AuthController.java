package com.example.maintenance.controller;

import com.example.maintenance.dto.LoginRequest;
import com.example.maintenance.dto.LoginResponse;
import com.example.maintenance.entity.Utilisateur;
import com.example.maintenance.repository.UtilisateurRepository;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin
public class AuthController {

    private final UtilisateurRepository utilisateurRepository;

    public AuthController(UtilisateurRepository utilisateurRepository) {
        this.utilisateurRepository = utilisateurRepository;
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@Valid @RequestBody LoginRequest request) {
        return utilisateurRepository.findByEmailAndMotDePasse(request.getEmail(), request.getPassword())
                .map(user -> ResponseEntity.ok(
                        new LoginResponse(true, "Connexion réussie", user.getId(), user.getEmail(), user.getNom())
                ))
                .orElseGet(() -> ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body(new LoginResponse(false, "Email ou mot de passe incorrect", null, null, null)));
    }
}
