import axios from 'axios';
import { ACCESS_TOKEN } from "../constants";

// conection to the backend server
const apps_url = "/choreo-apis/djangorestnotes/backend/v1"

const notes_api = axios.create({
  baseURL: import.meta.env.VITE_APPS_URL ? import.meta.env.VITE_APPS_URL : apps_url,
    headers: {
        "Content-Type": "application/json", // Se asegura de enviar JSON correctamente
      },
});

// Interceptor para agregar el token de autenticación a cada solicitud
notes_api.interceptors.request.use(
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

export default notes_api;