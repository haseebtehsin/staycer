import React, { Component, useEffect } from "react";
import { toast } from "react-toastify";

import auth from "./services/authService";

const Logout = () => {
  useEffect(() => {
    async function logoutAsync() {
      const logout = await auth.logout();
      if (logout) {
        window.location.hash = "/";
        window.location.reload();
      } else {
        console.log("error Logging out");
        toast.error("Error Logging out", { autoClose: 2000 });
      }
    }
    logoutAsync();
  });
  return null;
};

export default Logout;
