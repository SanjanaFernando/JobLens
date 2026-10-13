package lk.joblens.tenant.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.OffsetDateTime;
import java.util.UUID;

@Entity
@Table(name = "saved_role")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SavedRole {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @Column(name = "shared_role_id", nullable = false)
    private UUID sharedRoleId;

    @Column(name = "saved_at", nullable = false)
    @Builder.Default
    private OffsetDateTime savedAt = OffsetDateTime.now();

    @Column(columnDefinition = "TEXT")
    private String notes;
}
