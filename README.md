# 🚗 ParqueoSeguro

**ParqueoSeguro** es una solución integral para la gestión de parqueaderos que incluye:

- 📱 **App Móvil (React Native + Firebase)** → permite a los usuarios encontrar, reservar y gestionar parqueaderos desde su celular.  
- 🌐 **Panel Web (React + Next.js)** → interfaz administrativa para la gestión de usuarios, reservas y parqueaderos.  
- ⚙️ **API (Java Spring Boot)** → backend que conecta la app móvil y el panel web, centralizando la lógica de negocio y la base de datos.  

---

## 📂 Estructura del repositorio
```
ParqueoSeguro/
├── app-movil/ # Proyecto móvil (React Native)
├── panel-web/ # Proyecto web (React + Vite/Next.js)
├── api/ # Proyecto backend (Java Spring Boot)
└── README.md
```


---

## 🚀 Cómo ejecutar

### 1. App Móvil (`app-movil/`)
```bash
cd app-movil
npm install
npm start
```

### 2. Panel Web (panel-web/)
```bash
cd panel-web
npm install
npm run dev
```
3. API (api/)
```bash
cd api
./mvnw spring-boot:run
```
