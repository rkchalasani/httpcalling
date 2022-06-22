import Update from './Update';
import axios from "axios";
import React, { useEffect, useState } from "react";
import "./Home.css";
import "bootstrap/dist/css/bootstrap.min.css";
const Home = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [colour, setColour] = useState("");
  const [status, setStatus] = useState(null);
  function onFormSubmit(e) {
    // e.preventDefault();
    let objdata = new Object();
    objdata.name = name;
    objdata.age = age;
    objdata.gender = gender;
    objdata.colour = colour;
    console.log(objdata);

    try {
      axios.post(
        "https://crudcrud.com/api/fe8afab1647a44848c3d91923b24e7f8/users",
        objdata
      );
    } catch (error) {
      console.log("error");
    }
  }

  fetch("https://crudcrud.com/api/fe8afab1647a44848c3d91923b24e7f8/users")
    .then((data) => {
      return data.json();
    })
    .then((objectData) => {
      let tableData = "";
      objectData.map((users) => {
        tableData += `
        <tr>
            <td>${users._id}</td>
            <td>${users.name}</td>
            <td>${users.age}</td>
            <td>${users.colour}</td>

        </tr>`;
      });
      document.getElementById("table_body").innerHTML = tableData;
    })
    .catch((err) => {
      console.log(err);
    });

useEffect(() => {
    // DELETE request using fetch with async/await
    async function deletePost() {
        await fetch('https://crudcrud.com/api/fe8afab1647a44848c3d91923b24e7f8/users',
         { method: 'DELETE' });
        setStatus('Delete successful');
    }

    deletePost();
}, []);
  return (
    <div className="maindiv">
      <h1 className="para text-center">
        Here is the Data from the API in a table format
      </h1>
      <div className="maincontainer">
        <div className="tablediv  container">
          <table className="table table-bordered">
            <thead className="table-dark">
              <tr>
                <th scope="col">id</th>
                <th scope="col">name</th>
                <th scope="col">age</th>
                <th scope="col">colour</th>
                <th scope="col">PUT/DELETE</th>
              </tr>
            </thead>
            <tbody className="table-dark" id="table_body"></tbody>
          </table>
        </div>
        <div className="formdiv">
          <form
           
          className="form">
            <div className="form-group">
              <label className="col-sm-2 col-form-label">Name</label>
              <input
                type="text"
                name="name"
                onChange={(e) => setName(e.target.value)}
                className="form-control"
                placeholder="Enter your name"
              />
            </div>
            <div className="form-group">
              <label>Age</label>
              <input
                type="number"
                name="Age"
                onChange={(e) => setAge(e.target.value)}
                className="form-control"
                placeholder="Enter your Age"
              />
            </div>
            <div className="form-group">
              <label>Colour</label>
              <input
                type="text"
                name="colour"
                className="form-control"
                onChange={(e) => setColour(e.target.value)}
                placeholder="Enter colour"
              />
            </div>
            <div className="buttondiv">
              <button
                type="submit"
                onClick={(e) => onFormSubmit(e)}
                className=" btn btn-dark"
              >
                ADD USER
              </button>
            </div>
          </form>
          
        </div>
      </div>
      <div className="card-body">
                Status: {status}
            </div>

    </div>
  );
};

export default Home;
