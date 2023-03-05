import moment from "moment/moment";
import React, { useState } from "react";
import Calendar from "react-calendar";
// import "react-calendar/dist/Calender.css"
import "react-calendar/dist/Calendar.css";
import "../../assets/css/calender.css";

const CustomCalender = () => {
  const [value, onChange] = useState(new Date());
  const mark = ["01-02-2023", "02-02-2023", "03-02-2023"];

  const onChangeDate = (data) => {
    console.log("data  : ", moment(data).format("DD-MM-YYYY"));
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-12 w-100">
          <Calendar
            className={"mx-auto"}
            onChange={(e) => onChangeDate(e)}
            value={value}
            tileClassName={({ date, view }) => {
              if (mark.find((x) => x === moment(date).format("DD-MM-YYYY"))) {
                return "highlight";
              }
            }}
          />
        </div>
        <div className="col-12 text-center card mt-5">
          <div className="card-header ">
            <h1 className="text-black">User data</h1>
          </div>
          <div className="card-body">
            <h2>Data here</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomCalender;
