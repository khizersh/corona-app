import moment from "moment/moment";
import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import swal from "sweetalert";
import "../../assets/css/calender.css";
import { BASE_URL } from "../../service/utility";

const CustomCalender = () => {
  const [value, onChange] = useState(new Date());
  const [dateList, setDateList] = useState([]);
  const mark = ["01-02-2023", "02-02-2023", "03-02-2023"];
  const [information, setInformation] = useState([]);

  const onChangeDate = (data) => {
    let date = moment(data).format("DD-MM-YYYY");
    setInformation([])
    fetchData(date);
  };

  useEffect(() => {
    fetchByEmail();
  }, []);

  const fetchByEmail = async () => {
    let email = JSON.parse(localStorage.getItem("user")).email;
    const response = await fetch(BASE_URL + "/info/fetch-by-email", {
      method: "POST",
      body: JSON.stringify({ email }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    const data = await response.json();
    if (data && data.status == "0000") {
      setDateList(data.data.map((m) => m.date));
    } else if (data && data.status == "9999") {
      swal("Error!", data.message, "error");
    } else {
      swal("Error!", "Something went wrong!", "error");
    }
  };

  const fetchData = async (date) => {
    let email = JSON.parse(localStorage.getItem("user"))?.email;
    let request = {
      email: email,
      date: date,
    };
    const response = await fetch(BASE_URL + "/info/fetch", {
      method: "POST",
      body: JSON.stringify(request),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });

    const data = await response.json();

    if (data && data.status == "0000") {
      setInformation(data.data.infoList);
      console.log("data.data : ", data.data.infoList);
    } else if (data && data.status == "9999") {
      swal("Error!", data.message, "error");
    } else {
      swal("Error!", "Something went wrong!", "error");
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-12 w-100 text-center ">
          <Calendar
            className={"mx-auto shadow"}
            onChange={(e) => onChangeDate(e)}
            value={value}
            tileClassName={({ date, view }) => {
              if (
                dateList.find((x) => x === moment(date).format("DD-MM-YYYY"))
              ) {
                return "highlight";
              }
            }}
          />
        </div>
        <div className="col-12 text-center card my-5 p-0">
          <div className="card-header bg-green ">
            <h1 className="text-black">User data</h1>
          </div>
          <div className="card-body">
            {information.length ? (
              information.map((info) => (
                <div>
                  <h3 className="text-black font-outfit text-left font-25">{info.question}</h3>
                  <p className="text-danger font-outfit text-left weight-700">{info.answer}</p>
                  <ul>
                    {info.treatment.map((m) => (
                      <li className="text-green font-outfit text-left">{m}</li>
                    ))}
                  </ul>
                </div>
              ))
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomCalender;
