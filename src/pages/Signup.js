import React, { useEffect, useState } from "react";
import swal from "sweetalert";
import { useHistory } from "react-router-dom";
import "../assets/css/login.css";
import { BASE_URL, GOOGLE_CLIENT_ID } from "../service/utility";
// import GoogleLogin from "react-google-login";
import { useGoogleLogin, hasGrantedAnyScopeGoogle } from "@react-oauth/google";
import { hasGrantedAllScopesGoogle } from "@react-oauth/google";
import { GoogleLogin } from "@react-oauth/google";
import jwtDecode from "jwt-decode";

const Signup = () => {
  const router = useHistory();
  const [user, setUser] = useState({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    role: "public",
  });

  const responseGoogle = (response) => {
    if (response["error"]) {
      console.log("response error : ", response);
    } else {
      console.log("response Success : ", response);
    }
  };

  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      console.log("tokenResponse : ", tokenResponse);
      const hasAccess = hasGrantedAllScopesGoogle(
        tokenResponse,
        "email",
        "profile"
      );
      console.log("hasAccess : ", hasAccess);
    },
    onError: (error) => {
      console.log("error : ", error);
    },
    scope:
      "email profile https://www.googleapis.com/auth/cloud-platform openid https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/cloud-platform.read-only",
  });

  const onSuccesGoogle = async (rep) => {
    const info = jwtDecode(rep.credential);

    let request = {
      email: info.email,
      firstName: info.given_name,
      lastName: info.family_name,
      role: "public",
    };

    const response = await fetch(BASE_URL + "/user/signup-google", {
      method: "POST",
      body: JSON.stringify(request),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });

    const data = await response.json();

    if (data && data.status == "0000") {
      localStorage.setItem("user", JSON.stringify(data.data));
        swal("Success!", "User registered successfully!", "success").then((m) => {
          router.push("/");
        });
    } else if (data && data.status == "9999") {
      swal("Error!", data.message, "error");
    } else {
      swal("Error!", "Something went wrong!", "error");
    }
  };

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onClick = async () => {
    try {
      const response = await fetch(BASE_URL + "/user/signup", {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });

      const data = await response.json();

      if (data && data.status == "0000") {
        swal("Success!", "User register successfully!", "success").then((m) => {
          router.push("/signin");
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
            <button className="purple-bg none-border">
              {/* <img
                  alt="Building"
                  className=""
                  width={"23px"}
                  src={require("../assets/img/google.png")}
                />{" "}
                <text>sign up with Google</text> */}
              <GoogleLogin
                className="bg-green"
                text="Sign up with Google"
                onSuccess={(data) => onSuccesGoogle(data)}
                onError={() => {
                  console.log("Login Failed");
                }}
              ></GoogleLogin>
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
            create an account
          </h1>
          <div className="p-5 bg-green">
            <div className="p-3 border-black">
              <div className="form-group mt-4">
                <text className="text-black weight-600">first name: </text>
                <input
                  type={"text"}
                  name="firstName"
                  onChange={(e) => onChange(e)}
                  className="form-control"
                />
              </div>
              <div className="form-group mt-4">
                <text className="text-black weight-600">last name: </text>
                <input
                  type={"text"}
                  className="form-control"
                  name="lastName"
                  onChange={(e) => onChange(e)}
                />
              </div>
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
                  Sign up
                </button>
                <p className="text-black">
                  Have an account?{" "}
                  <a href="/signin" className="text-black">
                    Sign in
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

export default Signup;
