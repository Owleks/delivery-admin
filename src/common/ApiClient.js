import axios from 'axios';


export const apiClient = axios.create({
    baseURL: 'http://api.besmart.link:3000',
});

export const setAuthToken = (token) => {
    apiClient.defaults.headers.common['Authorization'] = token;
};