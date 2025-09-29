import { Link, Outlet } from "react-router-dom";

const DashboardLayout: React.FC = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white p-4">
        <h1 className="text-xl font-bold mb-6">ParqueoSeguro</h1>
        <nav className="flex flex-col gap-3">
          <Link to="/dashboard" className="hover:text-gray-300">
            Dashboard
          </Link>
          <Link to="/usuarios" className="hover:text-gray-300">
            Usuarios
          </Link>
          <Link to="/reservas" className="hover:text-gray-300">
            Reservas
          </Link>
          <Link to="/parqueaderos" className="hover:text-gray-300">
            Parqueaderos
          </Link>
        </nav>
      </aside>

      {/* Contenido principal */}
      <main className="flex-1 p-6 bg-gray-100 overflow-y-auto">
        {/* Páginas hijas */}
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
