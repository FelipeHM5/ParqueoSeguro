package com.parqueoseguro.api.controller;

import java.util.Map;
import java.util.HashMap;
import com.parqueoseguro.api.model.Usuario;

import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.UserRecord;
import com.google.firebase.cloud.FirestoreClient;

import com.google.cloud.Timestamp;
import com.google.cloud.firestore.Firestore;

import org.springframework.web.bind.annotation.*;



@RestController
@RequestMapping("/api/usuarios")
public class UsuarioController {

    //Comprobar funcionamiento API
    @GetMapping("/ping")
    public String ping() {
        return "API funcionando ✅";
    }

    //Crear usuario 
    @PostMapping("/registrar")
    public String crearUsuario(@RequestBody Usuario request) {
        try {
            UserRecord.CreateRequest createRequest = new UserRecord.CreateRequest()
                    .setEmail(request.getEmail())
                    .setPassword(request.getPassword());

            UserRecord userRecord = FirebaseAuth.getInstance().createUser(createRequest);

            Firestore db = FirestoreClient.getFirestore();
            
            Map<String, Object> data = new HashMap<>();
            data.put("createdAt", Timestamp.now());
            data.put("email", request.getEmail());
            data.put("name", request.getName());
            data.put("rol", "admin");

            db.collection("usuarios").document(userRecord.getUid()).set(data);
            return "Usuario creado con UID: " + userRecord.getUid() + " y rol admin ✅";

        } catch (Exception e) {
            e.printStackTrace();
            return "Error al crear usuario: " + e.getMessage() + " ❌";
        }
    }


    //Obetener usuarios
    @GetMapping("/obtener")
    public Map<String, Object> obtenerUsuarios() {
        try {
            Firestore db = FirestoreClient.getFirestore();
            Map<String, Object> usuarios = new HashMap<>();

            db.collection("usuarios").get().get().getDocuments().forEach(document -> {
                usuarios.put(document.getId(), document.getData());
            });

            return usuarios;

        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    //Editar usuarios
    @PatchMapping("/actualizar/{id}")
    public String editarUsuario(@PathVariable String id, @RequestBody Usuario request) {
        try {   
            Firestore db = FirestoreClient.getFirestore();
            db.collection("usuarios").document(id)
                .update(
                    "email", request.getEmail(),
                    "password", request.getPassword()
                );

            return "Usuario actualizado correctamente ✅";

        } catch (Exception e) {
            e.printStackTrace();
            return "No se encontro el usuario ❌ ";
        }
    }

    //Eliminar usuarios
    @DeleteMapping("/eliminar/{id}")
    public String eliminarUsuario(@PathVariable String id) {
        try {
            Firestore db = FirestoreClient.getFirestore();
            FirebaseAuth.getInstance().deleteUser(id);
            db.collection("usuarios").document(id).delete();

            return "Usuario eliminado correctamente";
        
        } catch (Exception e) {
            e.printStackTrace();
            return "Error al eliminar usuario: " + e.getMessage() ;

        }

    }
}
