package com.parqueoseguro.api.model;

import java.util.Date;

public class Vehiculo {
    
    private String usuarioId;
    private String placa;
    private String marca;
    private String modelo;
    private String color;
    private Date createdAt;

    // Getters and Setters
        
        public String getUsuarioId() { return usuarioId; }
        public void setUsuarioId(String usuarioId) { this.usuarioId = usuarioId; }
        
        public String getPlaca() { return placa; }
        public void setPlaca(String placa) { this.placa = placa; }

        public String getMarca() {  return marca;}
        public void setMarca(String marca) { this.marca = marca; }

        public String getModelo() { return modelo; }
        public void setModelo(String modelo) { this.modelo = modelo; }

        public String getColor() { return color; }
        public void setColor(String color ) { this.color = color; }

        public Date getCreatedAt() { return createdAt; }
        public void setCreatedAt(Date createdAt) { this.createdAt = createdAt; }
}
