package com.parqueoseguro.api.controller;

import com.parqueoseguro.api.model.Vehiculo;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.CollectionReference;
import com.google.cloud.firestore.DocumentReference;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.DocumentSnapshot;
import com.google.cloud.firestore.WriteResult;

import com.google.firebase.cloud.FirestoreClient;
import com.google.cloud.Timestamp;

import java.util.Map;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/vehiculos")

//rEGISTRO DE VEHICULO
public class VehiculoController {
    //Registrar vehiculo
    @PostMapping("/registrar")
    public Map<String, Object> registrarVehiculo(@RequestBody Vehiculo request) {
        try {
            Firestore db = FirestoreClient.getFirestore();
            CollectionReference vehiculos = db.collection("vehiculos");

            //Validar exitencia del usuario
            DocumentReference userRef = db.collection("usuarios").document(request.getUsuarioId());
            ApiFuture<DocumentSnapshot> future = userRef.get();
            DocumentSnapshot userDoc = future.get();

            if (!userDoc.exists()) {
                return Map.of(
                    "status", "Error",
                    "message", "El usuario con ID: " + request.getUsuarioId() + " no existe ❌"
                );
            }

            request.setCreatedAt(Timestamp.now().toDate());
            ApiFuture<DocumentReference> addedDocRef = vehiculos.add(request);
            return Map.of(
                "status", "Success",
                "message", "Vehiculo registrado con ID: " + addedDocRef.get().getId() + " ✅",
                "vehiculoId", addedDocRef.get().getId()
            );

        } catch (Exception e) {
            e.printStackTrace();
            return Map.of(
                "status", "Error",
                "message", "Error al registrar vehiculo: " + e.getMessage() + " ❌"
            );
        }

    }
    
    //Consultar vehiculo por ID
    @GetMapping("obtener/{id}")
    public Map<String, Object> obtenerVehiculoId(@PathVariable String id) {
        try {
            Firestore db = FirestoreClient.getFirestore();
            DocumentReference vehiculoRef = db.collection("vehiculos").document(id);
            ApiFuture<DocumentSnapshot> future = vehiculoRef.get();
            DocumentSnapshot document = future.get();

            if (document.exists()) {
                Vehiculo vehiculo = document.toObject(Vehiculo.class);
                return Map.of(
                    "status", "Success",
                    "vehiculo", vehiculo
                );
            } else {
                return Map.of(
                    "status", "Error",
                    "message", "No se encontró el vehículo con ID: " + id + " ❌"
                );
            }
        } catch (Exception e) {
            e.printStackTrace();
            return Map.of(
                "status", "Error",
                "message", "Error al obtener vehículo: " + e.getMessage() + " ❌"
            );
        }
    }

    //Consultar vehiculo por placa
    @GetMapping("/obtenerP/{placa}")
    public Map<String, Object> obtenerVehiculoPlaca(@PathVariable String placa) {
        try {
            Firestore db = FirestoreClient.getFirestore();
            ApiFuture<com.google.cloud.firestore.QuerySnapshot> future = db.collection("vehiculos")
                .whereEqualTo("placa", placa)
                .get();
            com.google.cloud.firestore.QuerySnapshot querySnapshot = future.get();

            if (!querySnapshot.isEmpty()) {
                Vehiculo vehiculo = querySnapshot.getDocuments().get(0).toObject(Vehiculo.class);
                return Map.of(
                    "status", "Success",
                    "vehiculo", vehiculo
                );
            } else {
                return Map.of(
                    "status", "Error",
                    "message", "No se encontró el vehículo con placa: " + placa + " ❌"
                );
            }
        } catch (Exception e) {
            e.printStackTrace();
            return Map.of(
                "status", "Error",
                "message", "Error al obtener vehículo: " + e.getMessage() + " ❌"
            );
        }
    }

    //Actualizar vehiculo
    @PatchMapping("/actualizar/{id}")
    public Map<String, Object> actualizarVehiculo(@PathVariable String id, @RequestBody Vehiculo request) {
        try {
            Firestore db = FirestoreClient.getFirestore();
            DocumentReference vehiculoRef = db.collection("vehiculos").document(id);
            ApiFuture<WriteResult> writeResult = vehiculoRef.update(
                "marca", request.getMarca(),
                "modelo", request.getModelo(),
                "color", request.getColor()
            );

            return Map.of(
                "status", "Success",
                "message", "Vehículo actualizado correctamente ✅",
                "updateTime", writeResult.get().getUpdateTime().toString()
            );

        } catch (Exception e) {
            e.printStackTrace();
            return Map.of(
                "status", "Error",
                "message", "Error al actualizar vehículo: " + e.getMessage() + " ❌"
            );
        }
    }

    //Eliminar vehiculo
    @DeleteMapping("/eliminar/{id}")
    public Map<String, Object> eliminarVehiculo(@PathVariable String id) {
        try {
            Firestore db = FirestoreClient.getFirestore();
            ApiFuture<WriteResult> writeResult = db.collection("vehiculos").document(id).delete();

            return Map.of(
                "status", "Success",
                "message", "Vehículo eliminado correctamente ✅",
                "deleteTime", writeResult.get().getUpdateTime().toString()
            );

        } catch (Exception e) {
            e.printStackTrace();
            return Map.of(
                "status", "Error",
                "message", "Error al eliminar vehículo: " + e.getMessage() + " ❌"
            );
        }
    }
    
}
