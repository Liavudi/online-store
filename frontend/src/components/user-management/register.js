import "./register.css";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import utils from "../../api/utils";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup
  .object({
    firstName: yup
      .string()
      .required("First Name is required")
      .min(3, "First Name must be at least 3 characters")
      .max(50, "First Name must be at most 50 characters"),
    lastName: yup
      .string()
      .required("Last Name is required")
      .min(3, "Last Name must be at least 3 characters")
      .max(50, "Last Name must be at most 50 characters"),
    userName: yup
      .string()
      .required("Username is required")
      .min(4, "Username must be at least 4 characters")
      .max(50, "Username must be at most 50 characters"),
    email: yup
      .string()
      .required("Email is required")
      .max(255, "Email must be at most 255 characters")
      .email('Must be a valid email'),
    password: yup
      .string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters"),
    age: yup
      .number()
      .transform((value) => (isNaN(value) ? 0 : value))
      .required("Age is required")
      .min(18, "You must be over 18"),
  })
  .required();

export const Register = () => {
  const [showRegisterComponent, setRegisterComponent] = useState(false);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    utils.registerUser(data).then((response) => {
      if (response.status === 200) window.location.reload(false);
    });
  };
  const onError = (errors, e) => console.log(errors, e);
  const tokenString = localStorage.getItem("token");
  const userToken = JSON.parse(tokenString);
  return (
    <>{tokenString? '': 
    <div>
      <div
        className="register-div"
        onClick={() => {
          setRegisterComponent(!showRegisterComponent);
        }}
      >
        Register
      </div>
      {showRegisterComponent ? (
        <div>
          <div
            onClick={() => {
              setRegisterComponent(!showRegisterComponent);
            }}
            className="register-container"
            ></div>
          <form
            className="register-inner-container"
            onSubmit={handleSubmit(onSubmit, onError)}
            >
            <div className="title">Sign Up</div>
            <div className="input-order">
              <input
                className="input"
                placeholder="First Name"
                {...register("firstName")}
                />

              <input
                className="input"
                placeholder="Last Name"
                {...register("lastName")}
                />

              <div className="error-message">
                <p>{errors.firstName?.message}</p>
                <p>{errors.lastName?.message}</p>
              </div>
            </div>
            <div className="input-order">
              <input
                className="input"
                placeholder="Username"
                {...register("userName")}
                />

              <input
                className="input"
                placeholder="Email"
                {...register("email")}
                />

              <div className="error-message">
                <p>{errors.userName?.message}</p>
                <p>{errors.email?.message}</p>
              </div>
            </div>
            <div className="input-order">
              <input
                className="input"
                type="password"
                placeholder="Password"
                {...register("password")}
              />

              <input
                className="input"
                type="number"
                placeholder="Age"
                {...register("age")}
                />
              <div className="error-message">
                <p>{errors.password?.message}</p>
                <p>{errors.age?.message}</p>
              </div>
            </div>
            <button className="submit-btn" type="submit" value="Submit">
              Sign Up
            </button>
          </form>
        </div>
      ) : (
        ""
        )}
    </div>
  }
    </>
  );
};

export default Register;
