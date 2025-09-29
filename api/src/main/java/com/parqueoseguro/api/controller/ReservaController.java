package com.parqueoseguro.api.controller;

import org.springframework.web.bind.annotation.*;
//import org.springframework.http.ResponseEntity;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.*;
import com.google.cloud.Timestamp;

import com.google.firebase.cloud.FirestoreClient;

import java.util.*;
import java.util.concurrent.ExecutionException;

 @RestController
    @RequestMapping("/api/reservas")
public class ReservaController {
    //Crear reserva
    Firestore db = FirestoreClient.getFirestore();
    @PostMapping("/crear")
    public Map<String, Object> crearReserva(@RequestBody Map<String, Object> request) {
        try {
            CollectionReference reservasRef = db.collection("reservas");

            if (!request.containsKey("usuarioId") || !request.containsKey("vehiculoId") ||
                !request.containsKey("parqueaderoId") || !request.containsKey("horaInicio") ||
                !request.containsKey("horaFin") ) {
                return Map.of(
                    "status", "Error",
                    "message", "Faltan campos obligatorios ❌"
                );
            }
            
            // Generar código de reserva único
            String codigoReserva = "RES-" + System.currentTimeMillis();

            // Agregar timestamps
            request.put("createdAt", new Date());
            request.put("updatedAt", new Date());
            request.put("codigoReserva", codigoReserva);
            request.put("estado", "PENDIENTE");

            ApiFuture<DocumentReference> addedDocRef = reservasRef.add(request);
            return Map.of(
                "status", "Success",
                "message", "Reserva creada correctamente ✅",
                "reservaId", addedDocRef.get().getId(),
                "codigoReserva", codigoReserva
            );
        } catch (Exception e) {
            e.printStackTrace();
            return Map.of(
                "status", "Error",
                "message", "Error al crear la reserva: " + e.getMessage() + " ❌"
            );
        }
    }
    //Consultar reservas por usuario
    @GetMapping("/consultar/usuario/{usuarioId}")
    public Map<String, Object> consultarReservasId(@PathVariable String usuarioId) {
        try {
            
            CollectionReference reservasRef = db.collection("reservas");

            ApiFuture<QuerySnapshot> querySnapshot = reservasRef.whereEqualTo("usuarioId", usuarioId).get();
            List<QueryDocumentSnapshot> documents = querySnapshot.get().getDocuments();

            if (documents.isEmpty()) {
                return Map.of(
                    "status", "Error",
                    "message", "No se encontraron reservas para este usuario ❌",
                    "reservas", List.of()
                );
            }

            List<Map<String, Object>> reservas = documents.stream()
                .map(doc -> {
                    Map<String, Object> data = doc.getData();

                    if (data.get("createdAt") instanceof Timestamp) {
                        data.put("createdAt", ((Timestamp) data.get("createdAt")).toDate().toString());
                    }
                    if (data.get("updatedAt") instanceof Timestamp) {
                        data.put("updatedAt", ((Timestamp) data.get("updatedAt")).toDate().toString());
                    }
                    return data;
                }).toList();

            return Map.of(
                "status", "Success",
                "message", "Reservas encontradas ✅",
                "reservas", reservas
            );
        
        } catch (InterruptedException | ExecutionException e) {
            e.printStackTrace();
            return Map.of(
                "status", "Error",
                "message", "Error al consultar las reservas: " + e.getMessage() + " ❌"
            );
        }
    }
    //Consultar todas las reservas
    @GetMapping("/consultar/todas")
    public Map<String, Object> consultarTodasReservas() {
        try {
            
            CollectionReference reservasRef = db.collection("reservas");

            ApiFuture<QuerySnapshot> querySnapshot = reservasRef.get();
            List<QueryDocumentSnapshot> documents = querySnapshot.get().getDocuments();

            if (documents.isEmpty()) {
                return Map.of(
                    "status", "Error",
                    "message", "No se encontraron reservas ❌",
                    "reservas", List.of()
                );
            }

            List<Map<String, Object>> reservas = documents.stream()
                .map(doc -> {
                    Map<String, Object> data = doc.getData();

                    if (data.get("createdAt") instanceof Timestamp) {
                        data.put("createdAt", ((Timestamp) data.get("createdAt")).toDate().toString());
                    }
                    if (data.get("updatedAt") instanceof Timestamp) {
                        data.put("updatedAt", ((Timestamp) data.get("updatedAt")).toDate().toString());
                    }
                    return data;
                }).toList();

            return Map.of(
                "status", "Success",
                "message", "Reservas encontradas ✅",
                "reservas", reservas
            );
        
        } catch (InterruptedException | ExecutionException e) {
            e.printStackTrace();
            return Map.of(
                "status", "Error",
                "message", "Error al consultar las reservas: " + e.getMessage() + " ❌"
            );
        }
    }

    //Consultar reserva por su ID
    @GetMapping("/consultar/{reservaId}")
    public Map<String, Object> consultarReserva(@PathVariable String reservaId) {
        try {
            DocumentReference reservaRef = db.collection("reservas").document(reservaId);

            ApiFuture<com.google.cloud.firestore.DocumentSnapshot> future = reservaRef.get();
            com.google.cloud.firestore.DocumentSnapshot document = future.get();

            if (!document.exists()) {
                return Map.of(
                    "status", "Error",
                    "message", "No se encontró la reserva ❌"
                );
            }

            Map<String, Object> data = document.getData();

            if (data.get("createdAt") instanceof Timestamp) {
                data.put("createdAt", ((Timestamp) data.get("createdAt")).toDate().toString());
            }
            if (data.get("updatedAt") instanceof Timestamp) {
                data.put("updatedAt", ((Timestamp) data.get("updatedAt")).toDate().toString());
            }

            return Map.of(
                "status", "Success",
                "message", "Reserva encontrada ✅",
                "reserva", data
            );
        
        } catch (InterruptedException | ExecutionException e) {
            e.printStackTrace();
            return Map.of(
                "status", "Error",
                "message", "Error al consultar la reserva: " + e.getMessage() + " ❌"
            );
        }
    }
    //Actualizar estado de reserva
    @PatchMapping("/actualizar/{reservaId}")
    public Map<String, Object> actualizarReserva(@PathVariable String reservaId, @RequestBody Map<String, Object> request) {
        try {
            DocumentReference reservaRef = db.collection("reservas").document(reservaId);

            ApiFuture<DocumentSnapshot> future = reservaRef.get();
            com.google.cloud.firestore.DocumentSnapshot document = future.get();

            if (!document.exists()) {
                return Map.of(
                    "status", "Error",
                    "message", "No se encontró la reserva ❌"
                );
            }

            if (!request.containsKey("estado")) {
                return Map.of(
                    "status", "Error",
                    "message", "Falta el campo 'estado' ❌"
                );
            }

            String nuevoEstado = (String) request.get("estado");
            List<String> estadosValidos = List.of("PENDIENTE", "ACTIVA", "FINALIZADA", "CANCELADA", "EXPIRADA");

            if (!estadosValidos.contains(nuevoEstado)) {
                return Map.of(
                    "status", "Error",
                    "message", "Estado inválido. Valores permitidos: PENDIENTE, ACTIVA, FINALIZADA, CANCELADA, EXPIRADA ❌"
                );
            }

            // Actualizar estado y timestamp
            reservaRef.update(
                "estado", nuevoEstado,
                "updatedAt", new Date()
            );

            return Map.of(
                "status", "Success",
                "message", "Reserva actualizada correctamente ✅"
            );
        
        } catch (InterruptedException | ExecutionException e) {
            e.printStackTrace();
            return Map.of(
                "status", "Error",
                "message", "Error al actualizar la reserva: " + e.getMessage() + " ❌"
            );
        }
    }
    //Eliminar reserva
    @DeleteMapping("/eliminar/{reservaId}")
    public Map<String, Object> eliminarReserva(@PathVariable String reservaId) {
        try {
            DocumentReference reservaRef = db.collection("reservas").document(reservaId);

            ApiFuture<DocumentSnapshot> future = reservaRef.get();
            com.google.cloud.firestore.DocumentSnapshot document = future.get();

            if (!document.exists()) {
                return Map.of(
                    "status", "Error",
                    "message", "No se encontró la reserva ❌"
                );
            }

            reservaRef.delete();

            return Map.of(
                "status", "Success",
                "message", "Reserva eliminada correctamente ✅"
            );
        
        } catch (InterruptedException | ExecutionException e) {
            e.printStackTrace();
            return Map.of(
                "status", "Error",
                "message", "Error al eliminar la reserva: " + e.getMessage() + " ❌"
            );
        }
    }
}
