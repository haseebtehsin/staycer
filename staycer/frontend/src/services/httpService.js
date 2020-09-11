import axios from "axios";

axios.interceptors.response.use(null, (error) => {
  const unexpectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;
  if (!unexpectedError) {
    console.log("Unexpected error: ", error);
  }

  return Promise.reject(error);
});

export default {
  get: axios.get,
  post: axios.post,
  delete: axios.delete,
  put: axios.put,
  patch: axios.patch,
};
