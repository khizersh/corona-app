import React from "react";
import "../assets/css/home.css";

const Home = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12 col-lg-6 px-5 pt-5 text-left">
          <h1 className="font-96 font-mbl">
            Your health <br /> in your <br /> hands
          </h1>
        </div>
        <div className="col-12 col-lg-6 text-right">
          <img
            alt="Building"
            className="image-building "
            src={require("../assets/img/building.png")}
          />
        </div>
      </div>
      <div className="row margin-top-100">
        <div className="col-12 col-lg-6 text-center ">
          <img
            alt="Building"
            className="image-meter"
            src={require("../assets/img/two-meter.png")}
          />
        </div>
        <div className="col-12 col-lg-6 font-96 m-text-center m-mt-5">
          <h1 className="font-75 text-green">Have Symptoms?</h1>
          <h1 className="font-75">Stay Home</h1>
          <h1 className="font-75 text-green">Save Lives</h1>
        </div>
      </div>
      <div className="row  list-div m-text-center">
        <div className="col-12  d-px-5 ">
          <ul className="steps-list">
            <li className="text-green">How To Use Our Service?</li>
            <li>Step 1: Sign Up and Make an account</li>
            <li>Step 2: Login and go on “Symptom Tracker” </li>
            <li>
              Step 3: Answer the questions and get personalized health tips!
            </li>
            <li>
              Step 4: Go on “my dashboard” and review the progression of your
              symptoms on each day{" "}
            </li>
          </ul>
          <img
            alt="Building"
            className="mask-img"
            src={require("../assets/img/mask.png")}
          />
        </div>
        <div className=""></div>
        {/* <img
          alt="Building"
          className="mask-img"
          src={require("../assets/img/mask.png")}
        /> */}
      </div>
      <div className="row margin-top-100">
        <div className="col-12 col-lg-6 font-96 text-center">
          <img
            alt="Building"
            className="doctor-img"
            src={require("../assets/img/doctor.png")}
          />
        </div>
        <div className="col-12 col-lg-6 ">
          <ul className="steps-list doctor-list text-center">
            <li className="text-green">what can you do to stop the spread?</li>
            <li>
              there are many ways you could contribute and reduce the spread of
              the virus
            </li>
            <li>Some scientifically proven ways are:</li>
            <li>wearing a face mask .</li>
            <li>Keeping distance when outside .</li>
            <li>getting tested regularly .</li>
          </ul>
        </div>
      </div>
      <div className="row margin-top-100">
        <div className="col-12 col-lg-6 text-center">
          <p className="text-green mb-3 font-40">
            Your own personalized dashboard!
          </p>
          <img
            alt="Building"
            className="time-img"
            src={require("../assets/img/timetable.png")}
          />
          <div className="text-center mt-4">
            <button className="btn btn-danger">dashboard</button>
          </div>
        </div>
        <div className="col-12 col-lg-6 text-center">
          <p className="text-green mb-3 font-40">Your own COVID Diary!</p>
          <img
            alt="Building"
            className="time-img"
            src={require("../assets/img/diary.png")}
          />
          <div className="text-center mt-4">
            <button className="btn btn-danger">tracker</button>
          </div>
        </div>
      </div>
      <div className="row margin-top-100">
        <div className="col-12 col-lg-6 text-center padding-top">
          <p className="text-green font-40">Dont Have A Account Yet?</p>
          <p className="font-40 mt-4">Sign up here in less than a minute</p>
          <div className="text-center mt-4">
            <button className="btn btn-danger">sign up</button>
          </div>
        </div>
        <div className="col-12 col-lg-6 text-center ">
          <p className="text-green mb-3 font-40">Your own COVID Diary!</p>
          <img
            alt="Building"
            className="time-img"
            src={require("../assets/img/men.png")}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
