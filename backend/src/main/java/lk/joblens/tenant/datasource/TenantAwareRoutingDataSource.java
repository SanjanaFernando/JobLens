package lk.joblens.tenant.datasource;

import lk.joblens.tenant.context.TenantContext;
import lombok.extern.slf4j.Slf4j;
import org.springframework.jdbc.datasource.lookup.AbstractRoutingDataSource;

import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.Collections;

@Slf4j
public class TenantAwareRoutingDataSource extends AbstractRoutingDataSource {

    private final DataSource targetDataSource;

    public TenantAwareRoutingDataSource(DataSource targetDataSource) {
        this.targetDataSource = targetDataSource;
        super.setDefaultTargetDataSource(targetDataSource);
        super.setTargetDataSources(Collections.emptyMap());
        super.afterPropertiesSet();
    }

    @Override
    protected Object determineCurrentLookupKey() {
        return TenantContext.getCurrentTenant();
    }

    @Override
    public Connection getConnection() throws SQLException {
        Connection connection = targetDataSource.getConnection();
        applyTenantSchema(connection);
        return connection;
    }

    @Override
    public Connection getConnection(String username, String password) throws SQLException {
        Connection connection = targetDataSource.getConnection(username, password);
        applyTenantSchema(connection);
        return connection;
    }

    private void applyTenantSchema(Connection connection) throws SQLException {
        String tenant = TenantContext.getCurrentTenant();
        if (tenant != null && !tenant.isBlank()) {
            if (!tenant.matches("^[a-z0-9_]+$")) {
                throw new SQLException("Invalid schema name: " + tenant);
            }
            try (Statement statement = connection.createStatement()) {
                // Set search_path for PostgreSQL / H2 compatible schema switching
                statement.execute("SET SCHEMA '" + tenant + "'");
            } catch (SQLException e) {
                // If SET SCHEMA fails (e.g. in older Postgres/dialect), try SET search_path
                try (Statement statement = connection.createStatement()) {
                    statement.execute("SET search_path TO " + tenant + ", public");
                }
            }
        }
    }
}
