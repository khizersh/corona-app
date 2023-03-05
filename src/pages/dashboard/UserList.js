import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import swal from "sweetalert";
import Modal from "react-modal";

const UserList = () => {
  const [selected, setSelected] = useState("halal-stock-search");
  const [page, setPage] = useState("");
  const [userName, setUserName] = useState("");
  const [sidebar, setSidebar] = useState([]);
  const [isClose, setIsClose] = useState(true);
  const [search, setSearch] = useState("");
  const [modalIsOpen, setIsOpen] = useState(false);

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    country: "",
    freeUser: "",
  });

  var customStyles = {
    content: {
      padding: "30px",
      top: "48%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      width: "373px",
      marginRight: "-50%",
      borderRadius: "10px",
      transform: "translate(-50%, -50%)",
      zIndex: "99999",
    },
  };
  const router = useHistory();

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };


  function afterOpenModal() {
    // references are now sync'd and can be accessed.
  }

  function closeModal() {
    setIsOpen(false);
  }

  const  onClickEdit = (data) => {
    setIsOpen(true);
  }
  const  onClickDelete = (data) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this imaginary file!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        swal("Poof! Your imaginary file has been deleted!", {
          icon: "success",
        });
      } else {
        swal("Your imaginary file is safe!");
      }
    });
  }

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <table class="table table-hover">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Contact No</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">1</th>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                  <td>
                  <i className="fa fa-edit" onClick={() => onClickEdit('Keera')}></i>{" "}
                    <span className="margin-left-edit">
                      <i className="fa fa-remove" onClick={() => onClickDelete('Keera')}></i>
                    </span>{" "}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h5 className="modal-heading text-center text-green weight-500 mb-5">
          Update User
        </h5>
        <div>
          <div class="form-group ">
            <label >Name</label>
            <input
              type={`text`}
              name="password"
              className="form-control "
              onChange={(e) => onChange(e)}
              id="your_pass"
              placeholder="enter new password"
            />
          </div>
          <div class="form-group ">
            <label >Email</label>
            <input
              type={`text`}
              name="password"
              className="form-control "
              onChange={(e) => onChange(e)}
              id="your_pass"
              placeholder="enter new password"
            />
          </div>
          <div class="form-group ">
            <label >Contact No</label>
            <input
              type={`text`}
              name="password"
              className="form-control "
              onChange={(e) => onChange(e)}
              id="your_pass"
              placeholder="enter new password"
            />
          </div>
          <div>
            <button className="">Update</button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default UserList;
