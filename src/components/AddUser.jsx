import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const AddUser = ({ users, setUsers }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  async function addUser(event, firstName, lastName, email) {
    event.preventDefault();
    const userObj = {
      first_name: firstName,
      last_name: lastName,
      email: email,
    };
    if (firstName !== "" && lastName !== "" && email !== "") {
      const response = await axios.post("https://reqres.in/api/users", userObj);
      console.log(response);
      if (response.status === 201) {
        setFirstName("");
        setLastName("");
        setEmail("");
        setUsers(() => [...users, response.data]);
        toast.success("Added User !!", {
          position: "top-center",
          autoClose: 3000,
          theme: "colored",
          closeOnClick: true,
          pauseOnHover: false,
        });
      }
    }
  }
  return (
    <>
      <form
        className="createUserForm"
        onSubmit={(event) => addUser(event, firstName, lastName, email)}
      >
        <TextField
          variant="outlined"
          label="First Name"
          value={firstName}
          required
          onChange={(event) => setFirstName(() => event.target.value)}
        />
        <TextField
          variant="outlined"
          label="Last Name"
          value={lastName}
          required
          onChange={(event) => setLastName(() => event.target.value)}
        />
        <TextField
          variant="outlined"
          label="Email"
          value={email}
          required
          onChange={(event) => setEmail(() => event.target.value)}
        />
        <Button
          variant="contained"
          type="submit"
          disabled={firstName === "" || lastName === "" || email === ""}
        >
          Add User
        </Button>
      </form>
      <ToastContainer />
    </>
  );
};
