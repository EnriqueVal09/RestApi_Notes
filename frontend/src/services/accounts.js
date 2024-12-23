import axios from "axios";
import { ACCESS_TOKEN } from "../constants";

// Verifica si la URL de la API está definida correctamente
console.log("Base URL:", import.meta.env.VITE_APPS_URL);

console.log("Token en localStorage:", localStorage.getItem(ACCESS_TOKEN));

const accounts = axios.create({
  baseURL: import.meta.env.VITE_APPS_URL, // Asegúrate de que esté bien definida
  headers: {
    "Content-Type": "application/json", // Se asegura de enviar JSON correctamente
  },
});

// Interceptor para agregar el token de autenticación a cada solicitud
accounts.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log("Token enviado en la solicitud:", token); // Depuración
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default accounts;
