package com.parqueoseguro.api.model;

import com.google.cloud.Timestamp;
import java.util.Date;

public class EntradaSalida {
    
    private String entradaSalidaId;
    private String reservaId;
    private String usuarioId;
    private String vehiculoId;
    private String parqueaderoId;
    private String espacioId;
    private EstadoEstancia estado;

    private Date horaEntrada;
    private Date horaSalida;

    private Timestamp createdAt;
    private Timestamp updatedAt;
    
    public enum EstadoEstancia {
        EN_PARQUEO,
        FINALIZADO
    }

    public EntradaSalida() {

    }

    public EntradaSalida(String vehiculoId, String parqueaderoId, Date horaEntrada) {
        this.vehiculoId = vehiculoId;
        this.parqueaderoId = parqueaderoId;
        this.horaEntrada = horaEntrada;
        this.estado = EstadoEstancia.EN_PARQUEO;
    }

// Getters and Setters

    public String getId() { return entradaSalidaId; }
    public void setId(String id) { this.entradaSalidaId = id; }

    public String getReservaId() { return reservaId;}
    public void setReservaId(String reservaId) { this.reservaId = reservaId; }

    public String getUsuarioId() { return usuarioId; }
    public void setUsuarioId(String usuarioId) { this.usuarioId = usuarioId; }

    public String getVehiculoId() { return vehiculoId; }
    public void setVehiculoId(String vehiculoId) { this.vehiculoId = vehiculoId; }

    public String getParqueaderoId() { return parqueaderoId; }
    public void setParqueaderoId(String parqueaderoId) { this.parqueaderoId = parqueaderoId; }

    public String getEspacioId() { return espacioId; }
    public void setEspacioId(String espacioId) { this.espacioId = espacioId; }

    public EstadoEstancia getEstado() { return estado; }
    public void setEstado(EstadoEstancia estado) { this.estado = estado; }

    public Date getHoraEntrada() { return horaEntrada; }
    public void setHoraEntrada(Date horaEntrada) { this.horaEntrada = horaEntrada; }

    public Date getHoraSalida() { return horaSalida; }
    public void setHoraSalida(Date horaSalida) { this.horaSalida = horaSalida; }

    public Timestamp getCreatedAt() { return createdAt; }
    public void setCreatedAt(Timestamp createdAt) { this.createdAt = createdAt; }

    public Timestamp getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(Timestamp updatedAt) { this.updatedAt = updatedAt; }

    @Override
    public String toString() {
        return "EntradaSalida{" +
                "id='" + entradaSalidaId + '\'' +
                ", vehiculoId='" + vehiculoId + '\'' +
                ", parqueaderoId='" + parqueaderoId + '\'' +
                ", horaEntrada=" + horaEntrada +
                ", horaSalida=" + horaSalida +
                ", estado=" + estado +
                '}';
    }
}