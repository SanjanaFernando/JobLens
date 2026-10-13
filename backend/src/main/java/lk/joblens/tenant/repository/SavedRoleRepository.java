package lk.joblens.tenant.repository;

import lk.joblens.tenant.entity.SavedRole;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface SavedRoleRepository extends JpaRepository<SavedRole, UUID> {
    List<SavedRole> findBySharedRoleId(UUID sharedRoleId);
}
