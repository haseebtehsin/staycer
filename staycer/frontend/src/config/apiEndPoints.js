const baseURL = "http://127.0.0.1:8000/";
const apiVersion = "api/v1/";
const apiEndPoints = {
  usersV1: () => `${baseURL}${apiVersion}users/`,
};

export default apiEndPoints;
