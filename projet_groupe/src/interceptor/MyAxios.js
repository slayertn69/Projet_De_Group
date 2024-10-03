import axios from 'axios';
import { store } from '../redux/store';
import { logout } from '../redux/authSlice';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:3005', // URL du backend local
});

axiosInstance.interceptors.request.use(
    (config) => {
        const state = store.getState();
        const token = state.auth.token;

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response) => {

        return response;
    },
    (error) => {
        if (error.response) {
            if (error.response.status === 401 || error.response.status === 403) {
                console.log('Session expirée, déconnexion...');
                store.dispatch(logout());
                window.location.href = '/login';
            }
        } else if (error.message === 'Network Error') {
            console.error('Erreur réseau :', error.message);
            alert('Problème de connexion. Vérifiez votre réseau.');
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;
