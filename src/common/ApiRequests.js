import {apiClient} from './ApiClient';

export const fetchMenus = async (params) => {
    const response = await apiClient.get('/menu', {
        params: {restaurantId: params.restaurant},
    }).catch(() => []); //TODO: error handling
    return response.data;
};

export const createMenu = async (menu) => {
    const response = await apiClient.post('/menu', menu).catch(() => []); //TODO: error handling
    return response.data;
};
