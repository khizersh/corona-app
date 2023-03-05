import React from "react";
import { Link } from "react-router-dom";

const DesktopHeader = () => {
  return (
    <div className="container p-4">
      <div className="row">
        <div className="col-4">
          <Link to={"/"} className="text-decoration-none font-17">Home</Link>
        </div>
        <div className="col-8">
          <div className="row">
            <div className="col-3 text-center ">
              <Link to={"/tracker"} className="text-decoration-none font-17">Symptoms tracker</Link>
            </div>
            <div className="col-2 text-center">
              <Link to={"/"} className="text-decoration-none font-17">my dashboard</Link>
            </div>
            <div className="col-2 text-center">
              <Link to={"/"} className="text-decoration-none font-17">who are we?</Link>
            </div>
            <div className="col-2 text-center">
              <Link to={"/signin"} className="text-decoration-none font-17">login/signup</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesktopHeader;
