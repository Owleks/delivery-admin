import { apiClient } from './ApiClient';

export const fetchMenus = async (params) => {
  const response = await apiClient.get('/menu', {
    params: { restaurantId: params.restaurant },
  }).catch(() => []); //TODO: error handling
  return response.data;
};

export const createMenu = async (menu) => {
  const response = await apiClient.post('/menu', menu).catch(() => []); //TODO: error handling
  return response.data;
};

export const updateMenu = async (menu) => {
  const response = await apiClient.put(`/menu/${menu.get('_id')}`, menu); // TODO: error handling
  return response.data;
};

export const deleteMenu = async (menuId) => {
  const response = await apiClient.delete(`/menu/${menuId}`); // TODO: error handling
  return response.data;
};

export const getUserWithToken = async (token) => {
  const response = await apiClient.get('/user'); //TODO: error handling
  return response.data;
};

export const fetchOrders = async () => {
  const response = await apiClient.get('/order'); //TODO: error handling
  return response.data;
};

export const fetchOrder = async (orderId) => {
  const response = await apiClient.get(`/order/${orderId}`); //TODO: error handling
  return response.data;
};

export const changeOrderStatus = async (orderId, status) => {
  const response = await apiClient.put(`/order/${orderId}`, { status }); //TODO: error handling
  return response.data;
};

export const fetchRestaurantMenuItems = async (restaurantId) => {
  const response = await apiClient.get('/menu-item', { params: { restaurantId, all: true } }); // TODO: error handling
  return response.data.reduce((prev, current) => ({
    ...prev,
    [current._id]: current,
  }), {});
};

export const fetchMenuItems = async (menuId) => {
  const response = await apiClient.get('/menu-item', {
    params: { menuId },
  }); // TODO: error handling
  return response.data;
};

export const createMenuItem = async (item) => {
  const response = await apiClient.post('/menu-item', item); // TODO: error handling
  return response.data;
};

export const updateMenuItem = async (item) => {
  const response = await apiClient.put(`/menu-item/${item.get('_id')}`, item); // TODO: error handling
  return response.data;
};

export const deleteMenuItem = async (itemId) => {
  const response = await apiClient.delete(`/menu-item/${itemId}`); // TODO: error handling
  return response.data;
};

export const fetchRestaurant = async (restaurantId) => {
  const response = await apiClient.get('/restaurant', { params: { restaurantId } }); // TODO: error handling
  return response.data
};

export const updateRestaurant = async (restaurantId, params) => {
  const response = await apiClient.put(`/restaurant/${restaurantId}`,  params); // TODO: error handling
  return response.data
};
