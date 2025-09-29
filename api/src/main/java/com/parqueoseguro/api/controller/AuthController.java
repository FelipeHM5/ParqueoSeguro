package com.parqueoseguro.api.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.HttpStatus;

import com.parqueoseguro.api.model.Usuario;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins= "http://localhost:3000")

public class AuthController {

    private final String FIREBASE_API_KEY = "AIzaSyCOBFSxbw5j-t0E-AMNf8nzyfAOg4T_NWk";

    @PostMapping("/login")
public ResponseEntity<?> login(@RequestBody Usuario request) {
    try {
        String url = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=" + FIREBASE_API_KEY;

        Map<String, Object> payload = new HashMap<>();
        payload.put("email", request.getEmail());
        payload.put("password", request.getPassword());
        payload.put("returnSecureToken", true);

        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<Map> response = restTemplate.postForEntity(url, payload, Map.class);

        if (response.getStatusCode().is2xxSuccessful() && response.getBody() != null) {
            Map<String, Object> firebaseResponse = response.getBody();

            // Reempaquetamos para frontend
            Map<String, Object> result = new HashMap<>();
            result.put("token", firebaseResponse.get("idToken"));
            result.put("refreshToken", firebaseResponse.get("refreshToken"));
            result.put("expiresIn", firebaseResponse.get("expiresIn"));
            result.put("email", firebaseResponse.get("email"));
            result.put("uid", firebaseResponse.get("localId"));

            return ResponseEntity.ok(result);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("error", "Credenciales inválidas ❌"));
        }

    } catch (Exception e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(Map.of("error", "Error al autenticar: " + e.getMessage()));
    }
}


}
