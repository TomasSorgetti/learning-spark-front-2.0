let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, response = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(response);
    }
  });
  failedQueue = [];
};

const authInterceptor = (axiosInstance) => {
  axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      if (
        error.response?.status === 401 &&
        !originalRequest._retry &&
        error.response.data.errorCode == "TOKEN_EXPIRED"
      ) {
        if (isRefreshing) {
          return new Promise((resolve, reject) => {
            failedQueue.push({ resolve, reject });
          })
            .then(() => axiosInstance(originalRequest))
            .catch((err) => Promise.reject(err));
        }

        originalRequest._retry = true;
        isRefreshing = true;

        try {
          await axiosInstance.get("/auth/refresh");
          processQueue(null);
          return axiosInstance(originalRequest);
        } catch (refreshError) {
          console.log("AXIOS INTERCEPTOR REFRESH ERROR", refreshError);
          processQueue(refreshError);
          return Promise.reject(refreshError);
        } finally {
          isRefreshing = false;
        }
      }

      if (error.response?.status === 403) {
        console.warn("Access denied:", error.response.data);
        return Promise.reject(error);
      }

      return Promise.reject(error);
    }
  );
};

export default authInterceptor;
