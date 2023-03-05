import React, { useState, useEffect } from "react";
import "../assets/css/login.css";
import swal from "sweetalert";
import { useHistory } from "react-router-dom";
import { BASE_URL } from "../service/utility";

const Signin = () => {
  const router = useHistory();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onClick = async () => {
    try {
      const response = await fetch(BASE_URL + "/user/signin", {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });

      const data = await response.json();

      if (data && data.status == "0000") {
        localStorage.setItem("user", JSON.stringify(data.data));
        swal("Success!", "User login successfully!", "success").then((m) => {
          router.push("/");
        });
      } else if (data && data.status == "9999") {
        swal("Error!", data.message, "error");
      } else {
        swal("Error!", "Something went wrong!", "error");
      }
    } catch (error) {}
  };
  return (
    <div className="container margin-top-100">
      <div className="row">
        <div className="col-12 col-lg-5 text-center">
          <img
            alt="Building"
            className="question-img"
            src={require("../assets/img/account.png")}
          />
          <div className="mt-3">
            <button className="bg-green w-50">
              <img
                alt="Building"
                className=""
                width={"23px"}
                src={require("../assets/img/google.png")}
              />{" "}
              <text>sign up with Google</text>
            </button>
          </div>
          <div className="text-center ">
            <p className="text-green font-25 weight-900 m-0">
              Secure password tips!
            </p>
            <p className="font-25 weight-900 m-0">
              1. Dont personal information.
            </p>
            <p className=" font-25 weight-900 m-0">
              2. include a combination of letters, numbers, and characters.
            </p>
            <p className=" font-25 weight-900 m-0">
              3. Prioritize password length.{" "}
            </p>
            <p className="font-25 weight-900 m-0">4. Never repeat password</p>
          </div>
        </div>
        <div className="col-12 col-lg-7">
          <h1 className="text-black text-center bg-green font-outfit weight-800 py-2 mb-3">
            Sign in
          </h1>
          <div className="p-5 bg-green">
            <div className="p-3 border-black">
              <div className="form-group mt-4">
                <text className="text-black weight-600">email: </text>
                <input
                  type={"email"}
                  className="form-control"
                  name="email"
                  onChange={(e) => onChange(e)}
                />
              </div>
              <div className="form-group mt-4">
                <text className="text-black weight-600">password: </text>
                <input
                  type={"password"}
                  className="form-control"
                  name="password"
                  onChange={(e) => onChange(e)}
                />
              </div>
              <div className="text-left mt-5">
                <button className="btn btn-danger w-50" onClick={onClick}>
                  Sign in
                </button>
                <p className="text-black">
                  Don't have an account?{" "}
                  <a href="/signup" className="text-black">
                    Sign up
                  </a>{" "}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      Signin
    </div>
  );
};

export default Signin;
