import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import axios from "axios";

export const AddUser = ({ users, setUsers }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  async function addUser(event, firstName, lastName, email) {
    event.preventDefault();
    setFirstName("");
    setLastName("");
    setEmail("");
    const userObj = {
      first_name: firstName,
      last_name: lastName,
      email: email,
    };
    const response = await axios.post("https://reqres.in/api/users", userObj);
    console.log(response);
    if (response.status === 201) {
      setUsers(() => [...users, response.data]);
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
          onChange={(event) => setFirstName(() => event.target.value)}
        />
        <TextField
          variant="outlined"
          label="Last Name"
          value={lastName}
          onChange={(event) => setLastName(() => event.target.value)}
        />
        <TextField
          variant="outlined"
          label="Email"
          value={email}
          onChange={(event) => setEmail(() => event.target.value)}
        />
        <Button variant="contained" type="submit">
          Add User
        </Button>
      </form>
    </>
  );
};
