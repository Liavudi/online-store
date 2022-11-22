import { useState } from "react";

export default function useToken() {
  const [token, setToken] = useState();
  const isToken = localStorage.getItem("token");

  const getToken = () => {
    setToken(isToken.token);
  };

  const saveToken = (userToken) => {
    localStorage.setItem("token", JSON.stringify(userToken));
    setToken(userToken.token);
  };
  return {
    setToken: isToken ? getToken : saveToken,
    token,
  };
}
