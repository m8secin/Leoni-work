package com.example.maintenance.repository;

import com.example.maintenance.entity.Utilisateur;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UtilisateurRepository extends JpaRepository<Utilisateur, Long> {

    Optional<Utilisateur> findByEmailAndMotDePasse(String email, String motDePasse);
}
