package lk.joblens.tenant.controller;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import lk.joblens.tenant.entity.SavedRole;
import lk.joblens.tenant.repository.SavedRoleRepository;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/tenant/saved-roles")
@RequiredArgsConstructor
public class SavedRoleController {

    private final SavedRoleRepository savedRoleRepository;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class SaveRoleRequest {
        @NotNull
        private UUID sharedRoleId;
        private String notes;
    }

    @GetMapping
    public ResponseEntity<List<SavedRole>> getMySavedRoles() {
        return ResponseEntity.ok(savedRoleRepository.findAll());
    }

    @PostMapping
    public ResponseEntity<SavedRole> saveRole(@Valid @RequestBody SaveRoleRequest request) {
        SavedRole role = SavedRole.builder()
                .sharedRoleId(request.getSharedRoleId())
                .notes(request.getNotes())
                .build();
        return ResponseEntity.status(HttpStatus.CREATED).body(savedRoleRepository.save(role));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSavedRole(@PathVariable UUID id) {
        savedRoleRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
