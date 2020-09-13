const baseURL = "http://127.0.0.1:8000/";
const apiVersion = "api/v1/";
const apiEndPoints = {
  usersCollection: () => `${baseURL}${apiVersion}users/`,
  usersResource: (id) => `${baseURL}${apiVersion}users/${id}/`,
  usersProfileResource: (id) => `${baseURL}${apiVersion}users/${id}/profile/`,
  userCertificationCollection: (userId) =>
    `${baseURL}${apiVersion}users/${userId}/certifications/`,
};

export default apiEndPoints;
