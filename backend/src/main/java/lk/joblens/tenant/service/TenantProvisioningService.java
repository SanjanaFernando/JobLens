package lk.joblens.tenant.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.flywaydb.core.Flyway;
import org.springframework.stereotype.Service;

import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.Statement;

@Slf4j
@Service
@RequiredArgsConstructor
public class TenantProvisioningService {

    private final DataSource dataSource;

    public void provisionTenantSchema(String tenantSchema) {
        log.info("Provisioning tenant schema: {}", tenantSchema);
        // 1. Create schema if not exists
        try (Connection connection = dataSource.getConnection();
             Statement stmt = connection.createStatement()) {
            // Validate schema name to avoid SQL injection
            if (!tenantSchema.matches("^[a-z0-9_]+$")) {
                throw new IllegalArgumentException("Invalid tenant schema name format: " + tenantSchema);
            }
            stmt.execute("CREATE SCHEMA IF NOT EXISTS " + tenantSchema);
        } catch (Exception e) {
            log.error("Failed to create schema {}", tenantSchema, e);
            throw new RuntimeException("Could not create tenant schema: " + e.getMessage(), e);
        }

        // 2. Run Flyway migrations on the newly created tenant schema
        try {
            Flyway flyway = Flyway.configure()
                    .dataSource(dataSource)
                    .schemas(tenantSchema)
                    .defaultSchema(tenantSchema)
                    .locations("classpath:db/migration/tenant")
                    .baselineOnMigrate(true)
                    .load();
            flyway.migrate();
            log.info("Tenant schema {} migrated successfully.", tenantSchema);
        } catch (Exception e) {
            log.error("Failed to run Flyway migrations for schema {}", tenantSchema, e);
            // Roll back schema creation on migration failure
            dropTenantSchema(tenantSchema);
            throw new RuntimeException("Could not migrate tenant schema: " + e.getMessage(), e);
        }
    }

    public void dropTenantSchema(String tenantSchema) {
        log.info("Dropping tenant schema: {}", tenantSchema);
        if (!tenantSchema.matches("^[a-z0-9_]+$")) {
            throw new IllegalArgumentException("Invalid tenant schema name format: " + tenantSchema);
        }
        try (Connection connection = dataSource.getConnection();
             Statement stmt = connection.createStatement()) {
            stmt.execute("DROP SCHEMA IF EXISTS " + tenantSchema + " CASCADE");
            log.info("Tenant schema {} dropped successfully.", tenantSchema);
        } catch (Exception e) {
            log.error("Failed to drop schema {}", tenantSchema, e);
            throw new RuntimeException("Could not drop tenant schema: " + e.getMessage(), e);
        }
    }
}
