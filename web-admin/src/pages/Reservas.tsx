import { useEffect, useState } from "react";

interface Reserva {
  codigoReserva: string;
  usuarioId: string;
  vehiculoId: string;
  estado: string;
}

const Reservas: React.FC = () => {
  const [reservas, setReservas] = useState<Reserva[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchReservas = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/reservas/consultar/todas");
      const data = await res.json();
      if (data.status === "Success") {
        setReservas(data.reservas);
      }
    } catch (err) {
      console.error("Error al cargar reservas", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReservas();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">📌 Reservas</h1>

      {loading ? (
        <p>Cargando reservas...</p>
      ) : reservas.length > 0 ? (
        <ul className="space-y-2">
          {reservas.map((r, idx) => (
            <li key={idx} className="p-4 border rounded">
              <p><b>Código:</b> {r.codigoReserva}</p>
              <p><b>Usuario:</b> {r.usuarioId}</p>
              <p><b>Vehículo:</b> {r.vehiculoId}</p>
              <p><b>Estado:</b> {r.estado}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No hay reservas registradas</p>
      )}
    </div>
  );
};

export default Reservas;
