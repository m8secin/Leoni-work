package com.example.maintenance.repository;

import com.example.maintenance.entity.Panne;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PanneRepository extends JpaRepository<Panne, Long> {
}
