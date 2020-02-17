import axios from 'axios';
import {ENVIRONMENT} from '../environments/environment';


export const apiClient = axios.create({
    baseURL: ENVIRONMENT.API
});

export const setAuthToken = (token) => {
    apiClient.defaults.headers.common['Authorization'] = token;
};