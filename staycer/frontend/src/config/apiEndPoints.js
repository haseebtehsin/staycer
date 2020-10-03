const baseURL = "http://127.0.0.1:8000/";
const apiVersion = "api/v1/";
const apiEndPoints = {
  usersCollection: () => `${baseURL}${apiVersion}users/`,
  usersResource: (id) => `${baseURL}${apiVersion}users/${id}/`,
  usersProfileResource: (id) => `${baseURL}${apiVersion}users/${id}/profile/`,
  userCertificationCollection: (userId) =>
    `${baseURL}${apiVersion}users/${userId}/certifications/`,
  userCertificationResource: (userId, certificationId) =>
    `${baseURL}${apiVersion}users/${userId}/certifications/${certificationId}/`,
  certificatesCollection: () => `${baseURL}${apiVersion}certificates/`,
  certificationCollection: () => `${baseURL}${apiVersion}certifications/`,
  institutesCollection: () => `${baseURL}${apiVersion}institutes/`,
  instituteCertificatesCollection: (insituteId) =>
    `${baseURL}${apiVersion}institutes/${insituteId}/certificates/`,
  positionsCollection: () => `${baseURL}${apiVersion}positions/`,
  tradesCollection: () => `${baseURL}${apiVersion}trades/`,
  tradeCertificateCollection: (tradeId) =>
    `${baseURL}${apiVersion}trades/${tradeId}/certificates/`,
  projectsCollection: () => `${baseURL}${apiVersion}projects/`,
  userScheduleCollection: (employeeId) =>
    `${baseURL}${apiVersion}users/${employeeId}/schedules/`,
  projectScheduleCollection: (projectId) =>
    `${baseURL}${apiVersion}projects/${projectId}/schedules/`,
  projectScheduleResource: (projectId, scheduleId) =>
    `${baseURL}${apiVersion}projects/${projectId}/schedules/${scheduleId}/`,
  scheduleCollection: () => `${baseURL}${apiVersion}schedules/`,
  metricsCertificationExpiryResource: () =>
    `${baseURL}${apiVersion}metrics/expiring-certifications/`,
  metricsTradesCountResource: () =>
    `${baseURL}${apiVersion}metrics/trade-count/`,
};

export default apiEndPoints;
