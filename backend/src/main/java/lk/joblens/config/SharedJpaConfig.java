package lk.joblens.config;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.autoconfigure.jdbc.DataSourceProperties;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.orm.jpa.EntityManagerFactoryBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import javax.sql.DataSource;
import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

@Configuration
@EnableTransactionManagement
@EnableJpaRepositories(
        basePackages = "lk.joblens.shared.repository",
        entityManagerFactoryRef = "sharedEntityManagerFactory",
        transactionManagerRef = "sharedTransactionManager"
)
public class SharedJpaConfig {

    @Primary
    @Bean
    @ConfigurationProperties("spring.datasource")
    public DataSourceProperties sharedDataSourceProperties() {
        return new DataSourceProperties();
    }

    @Primary
    @Bean(name = "sharedDataSource")
    public DataSource sharedDataSource() {
        return sharedDataSourceProperties().initializeDataSourceBuilder().build();
    }

    @org.springframework.beans.factory.annotation.Value("${spring.jpa.hibernate.ddl-auto:none}")
    private String ddlAuto;

    @Primary
    @Bean(name = "sharedEntityManagerFactory")
    public LocalContainerEntityManagerFactoryBean sharedEntityManagerFactory(
            EntityManagerFactoryBuilder builder,
            @Qualifier("sharedDataSource") DataSource dataSource) {
        Map<String, Object> properties = new HashMap<>();
        properties.put("hibernate.hbm2ddl.auto", ddlAuto);
        return builder
                .dataSource(dataSource)
                .packages("lk.joblens.shared.entity")
                .persistenceUnit("shared")
                .properties(properties)
                .build();
    }

    @Primary
    @Bean(name = "sharedTransactionManager")
    public PlatformTransactionManager sharedTransactionManager(
            @Qualifier("sharedEntityManagerFactory") LocalContainerEntityManagerFactoryBean sharedEntityManagerFactory) {
        return new JpaTransactionManager(Objects.requireNonNull(sharedEntityManagerFactory.getObject()));
    }
}
