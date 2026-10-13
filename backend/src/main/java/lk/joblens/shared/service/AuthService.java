package lk.joblens.shared.service;

import lk.joblens.config.JwtService;
import lk.joblens.shared.dto.AuthDtos.*;
import lk.joblens.shared.entity.AppUser;
import lk.joblens.shared.repository.AppUserRepository;
import lk.joblens.tenant.service.TenantProvisioningService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
public class AuthService {

    private final AppUserRepository appUserRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final TenantProvisioningService tenantProvisioningService;

    @Transactional("sharedTransactionManager")
    public AuthResponse register(RegisterRequest request) {
        String normalizedEmail = request.getEmail().trim().toLowerCase();
        if (appUserRepository.existsByEmail(normalizedEmail)) {
            throw new IllegalArgumentException("Email is already registered: " + normalizedEmail);
        }

        // Generate clean tenant schema name based on uuid: tenant_<uuid_without_hyphens>
        String rawUuid = UUID.randomUUID().toString().replace("-", "");
        String tenantSchema = "tenant_" + rawUuid;

        AppUser user = AppUser.builder()
                .email(normalizedEmail)
                .passwordHash(passwordEncoder.encode(request.getPassword()))
                .role("USER")
                .tenantSchema(tenantSchema)
                .build();

        user = appUserRepository.save(user);

        // Provision dynamic schema & run tenant flyway migrations
        try {
            tenantProvisioningService.provisionTenantSchema(tenantSchema);
        } catch (Exception e) {
            log.error("Failed to provision tenant schema during registration for {}", normalizedEmail, e);
            throw new RuntimeException("User registration failed during schema provisioning: " + e.getMessage(), e);
        }

        String accessToken = jwtService.generateAccessToken(user.getId(), user.getEmail(), user.getTenantSchema(), user.getRole());
        String refreshToken = jwtService.generateRefreshToken(user.getId(), user.getEmail());

        return AuthResponse.builder()
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .userId(user.getId())
                .email(user.getEmail())
                .tenantSchema(user.getTenantSchema())
                .role(user.getRole())
                .build();
    }

    @Transactional(value = "sharedTransactionManager", readOnly = true)
    public AuthResponse login(LoginRequest request) {
        String normalizedEmail = request.getEmail().trim().toLowerCase();
        AppUser user = appUserRepository.findByEmail(normalizedEmail)
                .orElseThrow(() -> new IllegalArgumentException("Invalid email or password"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPasswordHash())) {
            throw new IllegalArgumentException("Invalid email or password");
        }

        String accessToken = jwtService.generateAccessToken(user.getId(), user.getEmail(), user.getTenantSchema(), user.getRole());
        String refreshToken = jwtService.generateRefreshToken(user.getId(), user.getEmail());

        return AuthResponse.builder()
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .userId(user.getId())
                .email(user.getEmail())
                .tenantSchema(user.getTenantSchema())
                .role(user.getRole())
                .build();
    }

    @Transactional(value = "sharedTransactionManager", readOnly = true)
    public AuthResponse refreshToken(RefreshTokenRequest request) {
        String token = request.getRefreshToken();
        if (!jwtService.isTokenValid(token)) {
            throw new IllegalArgumentException("Invalid or expired refresh token");
        }

        UUID userId = jwtService.extractUserId(token);
        AppUser user = appUserRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        String newAccessToken = jwtService.generateAccessToken(user.getId(), user.getEmail(), user.getTenantSchema(), user.getRole());
        String newRefreshToken = jwtService.generateRefreshToken(user.getId(), user.getEmail());

        return AuthResponse.builder()
                .accessToken(newAccessToken)
                .refreshToken(newRefreshToken)
                .userId(user.getId())
                .email(user.getEmail())
                .tenantSchema(user.getTenantSchema())
                .role(user.getRole())
                .build();
    }

    @Transactional("sharedTransactionManager")
    public void deleteAccount(UUID userId) {
        AppUser user = appUserRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        String tenantSchema = user.getTenantSchema();
        appUserRepository.delete(user);

        // Drop tenant private schema
        tenantProvisioningService.dropTenantSchema(tenantSchema);
        log.info("Account deleted and tenant schema dropped for user: {}", userId);
    }

    @Transactional(value = "sharedTransactionManager", readOnly = true)
    public UserProfileResponse getProfile(UUID userId) {
        AppUser user = appUserRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        return UserProfileResponse.builder()
                .userId(user.getId())
                .email(user.getEmail())
                .tenantSchema(user.getTenantSchema())
                .role(user.getRole())
                .build();
    }
}
