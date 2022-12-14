import axios from "axios";
import React, { useEffect, useState } from "react";

const useAuth = (token) => {
  const [accessToken, setAccessToken] = useState();
  const [refreshToken, setRefreshToken] = useState();
  const [expiresIn, setExpiresIn] = useState();

  useEffect(() => {
    axios.post("http://localhost:3001/login", { token })
    .then((response) => {
      setAccessToken(response.data.accessToken);
      setRefreshToken(response.data.refreshToken);
      setExpiresIn(response.data.expiresIn);
      window.history.pushState({}, null, "/");
    })
    .catch(() => {
      window.location = "/";
    })
    }, [token]);

  useEffect(() => {
    if (!refreshToken || !expiresIn) return;
    const interval = setInterval(() => {
      axios
        .post("http://localhost:3001/refresh", { refreshToken })
        .then((response) => {
          setAccessToken(response.data.accessToken);
          setExpiresIn(response.data.expiresIn);
        })
        .catch(() => {
          window.location = "/";
        });
    }, (expiresIn - 60) * 1000);

    return () => clearInterval(interval);
  }, [refreshToken, expiresIn]);

  return accessToken;
};

export default useAuth;
