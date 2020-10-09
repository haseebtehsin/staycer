import http from "./httpService";
import apiEndPoints from "../config/apiEndPoints";
const TOKEN = "token";

// We do this here to remove bidirectional dependency
// of httpService and authService
const token = getToken()
if (token) {
    http.setToken(token);
}


export async function login(email, password) {
    try {
        const response = await http.post(apiEndPoints.login(), {
            email: email,
            password: password
        });
        localStorage.setItem(TOKEN, response.data.token);
        return response;
    } catch (error) {
        console.log("Error logging in");
        return error.response;
    }
}

export async function getCurrentUser() {
    try {
        const response = await http.get(apiEndPoints.authUser())
        console.log("got current user");
        console.log(response.data);
        return response.data
    } catch (error) {
        console.log("got no user");
        return null;
    }
}

export function getToken() {
    try {
        return localStorage.getItem(TOKEN)
    } catch (error) {
        return null;
    }
}
export async function logout() {
    try {
        const response = await http.post(apiEndPoints.logout())
        console.log("logout successful");
        localStorage.removeItem(TOKEN);
        return true;
    } catch (error) {
        console.log("error logging out");
        return null;
    }
}

export function removeToken() {
    localStorage.removeItem(TOKEN);
}

export default {
    login,
    logout,
    getCurrentUser,
    getToken,
    removeToken,
}