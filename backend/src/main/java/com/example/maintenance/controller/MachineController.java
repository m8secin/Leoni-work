package com.example.maintenance.controller;

import com.example.maintenance.dto.MachineRequest;
import com.example.maintenance.entity.Machine;
import com.example.maintenance.repository.MachineRepository;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/machines")
@CrossOrigin(origins = "http://localhost:5173") // ton front Vite
public class MachineController {

    private final MachineRepository machineRepository;

    public MachineController(MachineRepository machineRepository) {
        this.machineRepository = machineRepository;
    }

    @GetMapping
    public List<Machine> getAllMachines() {
        return machineRepository.findAll();
    }

    @PostMapping
    public ResponseEntity<Machine> createMachine(@Valid @RequestBody MachineRequest request) {
        String fullName = request.getName() + " - Ligne " + request.getLine();

        Machine machine = new Machine();
        machine.setName(fullName);
        machine.setLine(request.getLine());
        machine.setType(request.getType());

        Machine saved = machineRepository.save(machine);
        return ResponseEntity.status(201).body(saved);
    }
}
