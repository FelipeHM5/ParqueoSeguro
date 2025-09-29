package com.parqueoseguro.api.model;

import java.util.*;

public class Reserva {    
    
    private String codigoReserva;
    private String usuarioId;
    private String vehiculoId;
    private String parqueaderoId;
    private String espacioId;
    
    private EstadoReserva estado;
    
    private String horaInicio;
    private String horaFin;
    
    private Date createdAt;
    private Date updatedAt;
    
public enum EstadoReserva {
    PENDIENTE,
    ACTIVA,
    FINALIZADA,
    CANCELADA,
    EXPIRADA,
}
    public Reserva() {}

    public String getUsuarioId() { return usuarioId; }
    public void setUserId(String userId) { this.usuarioId = userId; }

    public Date getCreatedAt() { return createdAt; }
    public void setCreatedAt(Date createdAt) { this.createdAt = createdAt; }

    public Date getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(Date updatedAt) { this.updatedAt = updatedAt; }

    public String getHoraInicio() { return horaInicio; }
    public void setHoraInicio(String horaInicio) { this.horaInicio = horaInicio;}

    public String getHoraFin() { return horaFin; }
    public void setHoraFin(String horaFin) { this.horaFin = horaFin;}

    public String getParqueaderoId() { return parqueaderoId; }
    public void setParqueaderoId(String parqueaderoId) { this.parqueaderoId = parqueaderoId; }

    public String getEspacioId() { return espacioId; }
    public void setEspacioId(String espacioId) { this.espacioId = espacioId; }

    public EstadoReserva getEstado() { return estado; }
    public void setEstado(EstadoReserva estado) { this.estado = estado; }

    public String getVehiculoId() { return vehiculoId; }
    public void setVehiculoId(String vehiculoId) { this.vehiculoId = vehiculoId; }

    public String getCodigoReserva() { return codigoReserva; }
    public void setCodigoReserva(String codigoReserva) { this.codigoReserva = codigoReserva; }

   
    
}
