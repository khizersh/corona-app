import React, { useState, useEffect } from "react";
import swal from "sweetalert";
import Slider from "../component/Slider";
import TreatmentList from "../component/TreatmentList";
import { Data } from "../service/utility";
import { useHistory } from "react-router-dom";
import moment from "moment";

const Tracker = () => {
  const router = useHistory();
  const [currentQuestion, setCurrentQuestion] = useState(Data["1"]);
  const [action, setAction] = useState("");
  const [user, setUser] = useState({});
  const [end, setEnd] = useState(false);

  const [list, setList] = useState([]);

  useEffect(() => {
    console.log("currentQuestion : ", currentQuestion);
  }, [currentQuestion]);

  const onClickAnswer = (btn) => {
    setAction(btn.action);
  };
  const onClickSubmit = (selectedOption) => {
    // console.log("option : ", selectedOption, action);
    let userString = localStorage.getItem("user");
    let user = null;
    if (userString != null) {
      user = JSON.parse(userString);
    }
    //   {
    //     "email": "",
    //     "date": "05-03-2023",
    //     "infoList": [
    //         {
    //             "question": "",
    //             "answer": "",
    //             "treatment": ""
    //         }
    //     ]
    // }
    if (user != null) {
      let request = {
        email: user.email,
        date: moment(new Date()).format("DD-MM-YYYY"),
        infoList : {}
      };
      console.log("request : ",request);
      // if (action != "end") {
      //   setCurrentQuestion(Data[action]);
      //   let option = Data[action].options.find(
      //     (opt) => opt.option == selectedOption
      //   );
      //   if (option?.list?.length) {
      //     let oldList = list;
      //     option.list.forEach((element) => {
      //       oldList.push(element);
      //     });
      //     setList(oldList);
      //   }
      // } else {
      //   setEnd(true);
      // }
    } else {
      swal("Error!", "Please login first!", "error").then((r) =>
        router.push("/signin")
      );
    }
  };

  return (
    <div className="min-height">
      {end === false ? (
        <Slider
          data={currentQuestion}
          onClick={onClickAnswer}
          onClickSubmit={onClickSubmit}
        />
      ) : (
        <div className="slideshow-container">
          <div className="bg-green p-3 text-center">
            <h1 className="text-black weight-800 font-outfit">
              Thank you for your information!
            </h1>
          </div>
        </div>
      )}

      <div className="list">
        {list.length ? <TreatmentList list={list} /> : <></>}
      </div>
    </div>
  );
};

export default Tracker;
