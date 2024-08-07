import {api_base_url} from "@/core/config/app";
import axios from "axios";
import JwtService from "@/core/services/jwt.service";
import store from "@/store";
import router from "@/router";

const apiService = axios.create({
  baseURL: api_base_url,
});


// Request interceptor for API calls
apiService.interceptors.request.use((config) => {
  config.headers.Authorization = JwtService.getToken();
  return config;
});

// Response interceptor for API calls
let isRefreshingToken = false;
let queuedRequests = [];
apiService.interceptors.response.use(response => response, async (error) => {
  const status = error.response ? error.response.status : null

  if (status === 403 && error.response.data.message === 'Bearer token invalid') {
    await store.commit('PURGE_AUTH')
    await router.push({name: 'Login'});
  }
  // else if (status === 404) await router.push({name: 'NotFound'});
  // else if (status === 500) await router.push({name: 'error-500'});
  // If the response status is 404, redirect to the 404 page
  //

  if (status === 403 && error.response.data.error === 'Token expired') {
    if (isRefreshingToken) {
      return new Promise((resolve, reject) => {
        queuedRequests.push({resolve, reject, originalRequest: error.config});
      });
    }
    isRefreshingToken = true;
    try {
      const {data} = await apiService.post('user/token/refresh');
      JwtService.destroyToken();
      store.commit('SET_AUTH', data);
      axios.defaults.headers.common['Authorization'] = `Bearer ${JwtService.getToken()}`;

      // Retry the original request with the new token
      const originalRequest = error.config;
      originalRequest.headers['Authorization'] = `Bearer ${JwtService.getToken()}`;
      return apiService(originalRequest);
    } catch (refreshError) {
      // If refreshing token fails, redirect to login or handle the error as needed
      await store.commit('PURGE_AUTH');
      await router.push({name: 'Login'});
      return Promise.reject(refreshError);
    } finally {
      isRefreshingToken = false;
      queuedRequests.forEach(request => request.resolve(apiService(request.originalRequest)));
      queuedRequests = [];
    }
  }
  return Promise.reject(error);
})

export default apiService;
