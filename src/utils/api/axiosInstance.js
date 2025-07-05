import axios from "axios";

const axiosInstance = axios.create({
  // You can set a baseURL if all your API endpoints share a common prefix
  // For example, if your APIs are like /api/v1/users, /api/v1/products
  // you can set baseURL: '/api/v1'
  // Based on your current usage, '/api' seems appropriate
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`,
});

// Add a request interceptor to include the token in headers
axiosInstance.interceptors.request.use(
  (config) => {
    let token = null;
    try {
      const authStorageString = localStorage.getItem("auth-storage");
      if (authStorageString) {
        const persistedState = JSON.parse(authStorageString);
        // Assuming the token is stored at persistedState.state.token
        if (
          persistedState &&
          persistedState.state &&
          typeof persistedState.state.token === "string"
        ) {
          token = persistedState.state.token;
        }
      }
    } catch (error) {
      console.error(
        "Failed to retrieve or parse token from auth-storage:",
        error
      );
    }

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
