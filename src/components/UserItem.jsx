import {
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemText,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DoneIcon from "@mui/icons-material/Done";
import axios from "axios";

export const UserItem = ({ user }) => {
  const [firstName, setFirstName] = useState(user.first_name);
  const [lastName, setLastName] = useState(user.last_name);
  const [email, setEmail] = useState(user.email);
  const [isEditable, setIsEditable] = useState(false);

  async function updateUserData(id, firstName, lastName, email) {
    const response = await axios.put(`https://reqres.in/api/users/${id}`, {
      firstName,
      lastName,
      email,
    });
    console.log(response);
    setIsEditable(() => false);
  }

  return (
    <>
      <ListItem>
        <ListItemAvatar>
          <Avatar src={user.avatar} />
        </ListItemAvatar>
        {isEditable ? (
          <ListItemText>
            <TextField
              variant="standard"
              label="First Name"
              value={firstName}
              onChange={(event) => setFirstName(() => event.target.value)}
              sx={{ marginRight: "2rem", marginBottom: "0.75rem" }}
            />
            <TextField
              variant="standard"
              label="Last Name"
              value={lastName}
              onChange={(event) => setLastName(() => event.target.value)}
              sx={{ marginRight: "2rem", marginBottom: "0.75rem" }}
            />
            <TextField
              variant="standard"
              label="Email"
              value={email}
              onChange={(event) => setEmail(() => event.target.value)}
              sx={{ marginRight: "2rem" }}
            />
          </ListItemText>
        ) : (
          <ListItemText
            primary={`${firstName} ${lastName}`}
            secondary={email}
          />
        )}
        {isEditable ? (
          <DoneIcon
            onClick={() => updateUserData(user.id, firstName, lastName, email)}
          />
        ) : (
          <EditIcon
            fontSize="small"
            onClick={() => setIsEditable(() => true)}
          />
        )}
      </ListItem>
    </>
  );
};
