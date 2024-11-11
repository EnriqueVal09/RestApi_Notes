import axios from 'axios';
import { ACCESS_TOKEN } from '../constants';

const accounts = axios.create({
    baseURL: import.meta.env.VITE_ACCOUNTS_URL
})

accounts.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem(ACCESS_TOKEN)
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

export default accounts
