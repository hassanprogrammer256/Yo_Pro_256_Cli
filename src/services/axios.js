import axios from "axios";
import {BASE_API_URL} from '../configs'


const api = axios.create({baseURL: BASE_API_URL});

api.interceptors.request.use((config) => {

    const token = localStorage.getItem("access");

    if (token) {

      config.headers.Authorization =
        `Bearer ${token}`;
    }

    return config;
  }
);

export default api;