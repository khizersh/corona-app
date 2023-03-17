import React, { useState, useEffect } from "react";
import swal from "sweetalert";
import Slider from "../component/Slider";
import TreatmentList from "../component/TreatmentList";
import { BASE_URL, Data } from "../service/utility";
import { useHistory } from "react-router-dom";
import moment from "moment";

const Tracker = () => {
  const router = useHistory();
  const [currentQuestion, setCurrentQuestion] = useState(Data["1"]);
  const [action, setAction] = useState("");
  const [user, setUser] = useState({});
  const [end, setEnd] = useState(false);
  const [count, setCount] = useState(1);

  const [list, setList] = useState([]);
  const [currentList, setCurrentList] = useState([]);

  useEffect(() => {}, [currentQuestion]);

  const onClickAnswer = (btn) => {
    setAction(btn.action);
    setCurrentList(btn.list);
  };
  const onClickSubmit = async (selectedOption) => {
    // console.log("option : ", selectedOption, action);
    let userString = localStorage.getItem("user");
    let user = null;
    if (userString != null) {
      user = JSON.parse(userString);
    }
    if (user != null) {
      let request = {
        email: user.email,
        date: moment(new Date()).format("DD-MM-YYYY"),
        infoList: [
          {
            question: currentQuestion.question,
            answer: selectedOption,
            treatment: currentList,
          },
        ],
      };

      const response = await fetch(BASE_URL + "/info/save", {
        method: "POST",
        body: JSON.stringify(request),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });

      const data = await response.json();

      if (data && data.status == "0000") {
        let currentCount = count + 1;
        setCount(currentCount)
      } else if (data && data.status == "9999") {
        swal("Error!", data.message, "error");
      } else {
        swal("Error!", "Something went wrong!", "error");
      }
      if (action != "end") {
        setCurrentQuestion(Data[action]);
        let option = Data[action].options.find(
          (opt) => opt.option == selectedOption
        );
        if (currentList?.length) {
          let oldList = list;
          currentList.forEach((element) => {
            oldList.push(element);
          });
          setList(oldList);
        }
        // if (option?.list?.length) {
        //   let oldList = list;
        //   option.list.forEach((element) => {
        //     oldList.push(element);
        //   });
        //   setList(oldList);
        // }
      } else {
        setEnd(true);
      }
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
          count={count}
        />
      ) : (
        <div className="slideshow-container thanks">
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
