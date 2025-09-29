"use client";

import { useEffect, useState } from "react";

type Reserva = {
  reservaId: string;
  usuarioId: string;
  vehiculoId: string;
  parqueaderoId: string;
  horaInicio: string;
  horaFin: string;
  estado: string;
  codigoReserva: string;
};

export default function ReservasPage() {
  const [reservas, setReservas] = useState<Reserva[]>([]);
  const [loading, setLoading] = useState(true);

  // 🔹 Consultar todas las reservas
  const fetchReservas = async () => {
    setLoading(true);
    const res = await fetch("http://localhost:8080/api/reservas/consultar/todas");
    const data = await res.json();
    if (data.status === "Success") {
      setReservas(data.reservas);
    }
    setLoading(false);
  };

  // 🔹 Crear reserva (ejemplo con datos de prueba)
  const crearReserva = async () => {
    const nueva = {
      usuarioId: "user_001",
      vehiculoId: "veh_001",
      parqueaderoId: "parq_001",
      horaInicio: new Date().toISOString(),
      horaFin: new Date(Date.now() + 3600000).toISOString(),
    };

    const res = await fetch("http://localhost:8080/api/reservas/crear", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(nueva),
    });
    const data = await res.json();
    alert(data.message);
    fetchReservas();
  };

  // 🔹 Eliminar reserva
  const eliminarReserva = async (id: string) => {
    const res = await fetch(`http://localhost:8080/api/reservas/eliminar/${id}`, {
      method: "DELETE",
    });
    const data = await res.json();
    alert(data.message);
    fetchReservas();
  };

  // 🔹 Actualizar estado
  const actualizarEstado = async (id: string, estado: string) => {
    const res = await fetch(`http://localhost:8080/api/reservas/actualizar/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ estado }),
    });
    const data = await res.json();
    alert(data.message);
    fetchReservas();
  };

  useEffect(() => {
    fetchReservas();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">📌 Reservas</h1>

      <button
        onClick={crearReserva}
        className="px-4 py-2 bg-blue-500 text-white rounded mb-4"
      >
        Crear Reserva
      </button>

      {loading ? (
        <p>Cargando reservas...</p>
      ) : (
        <ul className="space-y-2">
          {reservas.map((r: Reserva) => (
            <li
              key={r.codigoReserva}
              className="p-4 border rounded flex justify-between items-center"
            >
              <div>
                <p><b>Código:</b> {r.codigoReserva}</p>
                <p><b>Usuario:</b> {r.usuarioId}</p>
                <p><b>Vehículo:</b> {r.vehiculoId}</p>
                <p><b>Estado:</b> {r.estado}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => actualizarEstado(r.reservaId, "CANCELADA")}
                  className="px-2 py-1 bg-yellow-500 text-white rounded"
                >
                  Cancelar
                </button>
                <button
                  onClick={() => eliminarReserva(r.reservaId)}
                  className="px-2 py-1 bg-red-500 text-white rounded"
                >
                  Eliminar
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
