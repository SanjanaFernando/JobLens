package lk.joblens;

import com.fasterxml.jackson.databind.ObjectMapper;
import lk.joblens.shared.dto.AuthDtos.LoginRequest;
import lk.joblens.shared.dto.AuthDtos.RegisterRequest;
import lk.joblens.tenant.controller.SavedRoleController.SaveRoleRequest;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import java.util.Map;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class TenantIsolationIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    @DisplayName("Unauthenticated request to tenant repository must be rejected with 403/401")
    void unauthenticatedRequestToPrivateEndpointMustFail() throws Exception {
        mockMvc.perform(get("/api/tenant/saved-roles"))
                .andExpect(status().isForbidden());
    }

    @Test
    @DisplayName("User A cannot access or see User B's private tenant data")
    void testTenantIsolationBetweenTwoUsers() throws Exception {
        // 1. Register User A
        RegisterRequest registerA = RegisterRequest.builder()
                .email("user_a@joblens.lk")
                .password("Password123!")
                .build();

        MvcResult resA = mockMvc.perform(post("/api/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(registerA)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.accessToken").isNotEmpty())
                .andReturn();

        Map<?, ?> mapA = objectMapper.readValue(resA.getResponse().getContentAsString(), Map.class);
        String tokenA = (String) mapA.get("accessToken");
        assertThat(tokenA).isNotNull();

        // 2. Register User B
        RegisterRequest registerB = RegisterRequest.builder()
                .email("user_b@joblens.lk")
                .password("Password123!")
                .build();

        MvcResult resB = mockMvc.perform(post("/api/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(registerB)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.accessToken").isNotEmpty())
                .andReturn();

        Map<?, ?> mapB = objectMapper.readValue(resB.getResponse().getContentAsString(), Map.class);
        String tokenB = (String) mapB.get("accessToken");
        assertThat(tokenB).isNotNull();

        // 3. User A saves a role in their private schema
        UUID sharedRoleIdForUserA = UUID.randomUUID();
        SaveRoleRequest saveReqA = SaveRoleRequest.builder()
                .sharedRoleId(sharedRoleIdForUserA)
                .notes("User A private dream job")
                .build();

        mockMvc.perform(post("/api/tenant/saved-roles")
                        .header("Authorization", "Bearer " + tokenA)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(saveReqA)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.notes").value("User A private dream job"));

        // 4. User A queries their saved roles: should have 1
        mockMvc.perform(get("/api/tenant/saved-roles")
                        .header("Authorization", "Bearer " + tokenA))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(1))
                .andExpect(jsonPath("$[0].notes").value("User A private dream job"));

        // 5. User B queries their saved roles: must be isolated and empty (length = 0)
        mockMvc.perform(get("/api/tenant/saved-roles")
                        .header("Authorization", "Bearer " + tokenB))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(0));

        // 6. User B saves a role
        UUID sharedRoleIdForUserB = UUID.randomUUID();
        SaveRoleRequest saveReqB = SaveRoleRequest.builder()
                .sharedRoleId(sharedRoleIdForUserB)
                .notes("User B private entry")
                .build();

        mockMvc.perform(post("/api/tenant/saved-roles")
                        .header("Authorization", "Bearer " + tokenB)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(saveReqB)))
                .andExpect(status().isCreated());

        // 7. Verify counts remain strictly isolated
        mockMvc.perform(get("/api/tenant/saved-roles")
                        .header("Authorization", "Bearer " + tokenA))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(1))
                .andExpect(jsonPath("$[0].notes").value("User A private dream job"));

        mockMvc.perform(get("/api/tenant/saved-roles")
                        .header("Authorization", "Bearer " + tokenB))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(1))
                .andExpect(jsonPath("$[0].notes").value("User B private entry"));

        // 8. Test delete account for User A drops schema and removes user
        mockMvc.perform(delete("/api/auth/account")
                        .header("Authorization", "Bearer " + tokenA))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.message").value("Account and private schema deleted successfully"));

        // Login should now fail for User A
        LoginRequest loginDeleted = LoginRequest.builder()
                .email("user_a@joblens.lk")
                .password("Password123!")
                .build();
        mockMvc.perform(post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(loginDeleted)))
                .andExpect(status().is4xxClientError());
    }
}
