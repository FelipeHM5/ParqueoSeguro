package com.parqueoseguro.api.controller;

import com.parqueoseguro.api.model.EntradaSalida;
import org.springframework.web.bind.annotation.*;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.*;
import com.google.cloud.Timestamp;
import com.google.firebase.cloud.FirestoreClient;

import java.util.*;
import java.util.concurrent.ExecutionException;

@RestController
@RequestMapping("/api/entradasysalidas")

public class EntradaSalidaController {

    //Registro de entrada (hora y fecha)
    Firestore db = FirestoreClient.getFirestore();
    
    @PostMapping("/registrarEntrada")
    public Map<String, Object> registrarEntrada(@RequestBody EntradaSalida request) {
        Map<String, Object> response = new HashMap<>();
        try {
            String entradaSalidaId = UUID.randomUUID().toString();

            request.setCreatedAt(Timestamp.now());
            request.setId(entradaSalidaId);
            request.setEstado(EntradaSalida.EstadoEstancia.EN_PARQUEO);
            request.setUpdatedAt(Timestamp.now());

            if (request.getHoraEntrada() == null) {
                request.setHoraEntrada(new Date());
            }

            ApiFuture<WriteResult> future = db.collection("entradasysalidas")
                .document(entradaSalidaId)
                .set(request);

                response.put("success", true);
                response.put("message", "Entrada registrada exitosamente");
                response.put("ID", entradaSalidaId);
                response.put("updateTime", future.get().getUpdateTime().toString());
        } catch (InterruptedException | ExecutionException e) {
            response.put("success", false);
            response.put("message", "Error al registrar la entrada: " + e.getMessage());
        }

        return response;

    }
    // Registro de salida (hora y fecha)
    @PostMapping("/registrarSalida/{id}")
    public Map<String, Object> registrarSalida(@PathVariable String id) {
        Map<String, Object> response = new HashMap<>();
        try {
            DocumentReference docRef = db.collection("entradasysalidas").document(id);
            ApiFuture<DocumentSnapshot> future = docRef.get();
            DocumentSnapshot document = future.get();

            if (document.exists()) {
                EntradaSalida entradaSalida = document.toObject(EntradaSalida.class);
                if (entradaSalida != null) {
                    entradaSalida.setHoraSalida(new Date());
                    entradaSalida.setEstado(EntradaSalida.EstadoEstancia.FINALIZADO);
                    entradaSalida.setUpdatedAt(Timestamp.now());

                    ApiFuture<WriteResult> writeResult = docRef.set(entradaSalida);
                    response.put("success", true);
                    response.put("message", "Salida registrada exitosamente");
                    response.put("updateTime", writeResult.get().getUpdateTime().toString());
                } else {
                    response.put("success", false);
                    response.put("message", "Error al convertir el documento a EntradaSalida");
                }
            } else {
                response.put("success", false);
                response.put("message", "No se encontró la entrada con el ID proporcionado");
            }
        } catch (InterruptedException | ExecutionException e) {
            response.put("success", false);
            response.put("message", "Error al registrar la salida: " + e.getMessage());
        }

        return response;
    }

    //Consultar detalles de parqueo
    @GetMapping("/consultar/usuario/{id}")
    public Map<String, Object> consultarEntradaSalida(@PathVariable String id) {
        Map<String, Object> response = new HashMap<>();
        try {
            DocumentReference docRef = db.collection("entradasysalidas").document(id);
            ApiFuture<DocumentSnapshot> future = docRef.get();
            DocumentSnapshot document = future.get();

            if (document.exists()) {
                EntradaSalida entradaSalida = document.toObject(EntradaSalida.class);
                response.put("success", true);
                response.put("data", entradaSalida);
            } else {
                response.put("success", false);
                response.put("message", "No se encontró la entrada/salida con el ID proporcionado");
            }
        } catch (InterruptedException | ExecutionException e) {
            response.put("success", false);
            response.put("message", "Error al consultar la entrada/salida: " + e.getMessage());
        }

        return response;
    }

    //Listar vehiculos activos en el parqueadero
    @GetMapping("/consultar/activos/{parqueaderoId}")
    public Map<String, Object> listarVehiculosActivos(@PathVariable String parqueaderoId) {
        Map<String, Object> response = new HashMap<>();
        try {
            CollectionReference collectionRef = db.collection("entradasysalidas");
            Query query = collectionRef.whereEqualTo("parqueaderoId", parqueaderoId)
                                       .whereEqualTo("estado", EntradaSalida.EstadoEstancia.EN_PARQUEO);
            ApiFuture<QuerySnapshot> future = query.get();
            QuerySnapshot querySnapshot = future.get();

            List<EntradaSalida> entradasSalidas = new ArrayList<>();
            for (DocumentSnapshot document : querySnapshot.getDocuments()) {
                EntradaSalida entradaSalida = document.toObject(EntradaSalida.class);
                entradasSalidas.add(entradaSalida);
            }

            response.put("success", true);
            response.put("data", entradasSalidas);
        } catch (InterruptedException | ExecutionException e) {
            response.put("success", false);
            response.put("message", "Error al listar los vehículos activos: " + e.getMessage());
        }

        return response;
    }
}
