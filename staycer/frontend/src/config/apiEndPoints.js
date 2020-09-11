const baseURL = "http://127.0.0.1:8000/";
const apiVersion = "api/v1/";
const apiEndPoints = {
  usersCollection: () => `${baseURL}${apiVersion}users/`,
  usersResource: (id) => `${baseURL}${apiVersion}users/${id}`,
};

export default apiEndPoints;
