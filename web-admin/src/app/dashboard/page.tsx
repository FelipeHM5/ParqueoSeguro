"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const [isAuth, setIsAuth] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login"); // Redirige si no hay token
    } else {
      setIsAuth(true);
    }
  }, [router]);

  if (!isAuth) return <p className="text-center mt-10">Cargando...</p>;

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold">Bienvenido al Dashboard 🚀</h1>
      <button>
        <a href="/reservas" className="mt-4 bg-blue-600 text-white px-4 py-2 rounded">
          Ver Reservas
        </a>
      </button>
      <button
        onClick={() => {
          localStorage.removeItem("token");
          router.push("/login");
        }}
        className="mt-4 bg-red-600 text-white px-4 py-2 rounded"
      >
        Cerrar sesión
      </button>
    </div>
  );
}
