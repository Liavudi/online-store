import React, { useState } from "react";
import { useForm } from "react-hook-form";
import utils from "../../api/utils";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import "./login.css";
import PropTypes from "prop-types";

const schema = yup
  .object({
    userName: yup
      .string()
      .required("Username is required")
      .min(4, "Username must be at least 4 characters")
      .max(50, "Username must be at most 50 characters"),
    password: yup
      .string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters"),
  })
  .required();

export const Login = ({ setToken }) => {
  const [showLoginComponent, setLoginComponent] = useState(false);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    utils.loginUser(data).then((response) => {
      if (response.status === 200) window.location.reload(false);
      setToken(response.data);
    });
  };
  const onError = (errors, e) => console.log(errors, e);
  const tokenString = localStorage.getItem("token");
  const userToken = JSON.parse(tokenString);
  return (
    <>
      {tokenString ? (
        <div style={{}}>
        <div>{userToken.token}</div>
        <div onClick={() => {localStorage.removeItem('token'); window.location.reload(false)}}>Sign Out</div>
        </div>
      ) : (
        <div>
          <div
            className="login-div"
            onClick={() => {
              setLoginComponent(!showLoginComponent);
            }}
          >
            Login
          </div>
          {showLoginComponent ? (
            <div>
              <div
                onClick={() => {
                  setLoginComponent(!showLoginComponent);
                }}
                className="login-container"
              ></div>
              <form
                className="login-inner-container"
                onSubmit={handleSubmit(onSubmit, onError)}
              >
                <div className="title">Sign In</div>
                <div className="login-input-order">
                  <input
                    className="login-input"
                    placeholder="Username"
                    {...register("userName")}
                  />
                  <div className="login-error-message">
                    <p>{errors.userName?.message}</p>
                  </div>
                  <input
                    className="login-input"
                    type="password"
                    placeholder="Password"
                    {...register("password")}
                  />
                  <div className="login-error-message">
                    <p>{errors.password?.message}</p>
                  </div>
                </div>
                <button className="sign-in-btn" type="submit" value="Submit">
                  Sign In
                </button>
              </form>
            </div>
          ) : (
            ""
          )}
        </div>
      )}
    </>
  );
};

Login.propTypes = {
  setToken: PropTypes.func.isRequired,
};
