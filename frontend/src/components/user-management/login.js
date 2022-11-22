import React, { useState } from "react";
import { useForm } from "react-hook-form";
import utils from "../../api/utils";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import "./login.css";

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

export const Login = ({ loginStatus }) => {
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
    });
  };
  const onError = (errors, e) => console.log(errors, e);

  return (
    <>
      {loginStatus ? (
        <div className="after-logged">
          <div>{loginStatus}</div>
          <div
            onClick={() => {
              utils.logOut().then((res) => {
                if (res.status === 200) {
                  window.location.reload(false);
                }
              });
            }}
          >
            Sign-out
          </div>
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
