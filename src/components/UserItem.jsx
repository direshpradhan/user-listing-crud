import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DoneIcon from "@mui/icons-material/Done";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const UserItem = ({ user, users, setUsers }) => {
  const [firstName, setFirstName] = useState(user.first_name);
  const [lastName, setLastName] = useState(user.last_name);
  const [email, setEmail] = useState(user.email);
  const [isEditable, setIsEditable] = useState(false);
  const [showOptionsModal, setShowOptionsModal] = useState(false);

  async function updateUserData(id, firstName, lastName, email) {
    const response = await axios.put(`https://reqres.in/api/users/${id}`, {
      firstName,
      lastName,
      email,
    });
    console.log(response);
    if (response.status === 200) {
      toast.success("Updated user !!", {
        position: "top-center",
        theme: "colored",
        autoClose: 3000,
        closeOnClick: true,
        pauseOnHover: false,
      });
    }
    setIsEditable(() => false);
  }

  async function deleteUser(id) {
    const response = await axios.delete(`https://reqres.in/api/users/${id}`);
    console.log(response);
    if (response.status === 204) {
      const newUserList = users.filter((user) => user.id !== id);
      setUsers(() => newUserList);
      toast.error("Deleted user !!", {
        position: "top-center",
        theme: "colored",
        autoClose: 3000,
        closeOnClick: true,
        pauseOnHover: false,
      });
    }
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
            sx={{ cursor: "pointer" }}
          />
        ) : (
          <MoreVertIcon
            onClick={() => setShowOptionsModal((state) => !state)}
            sx={{ cursor: "pointer" }}
          />
        )}
      </ListItem>

      {showOptionsModal && (
        <List>
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => {
                setIsEditable(() => true);
                setShowOptionsModal(() => false);
              }}
            >
              <ListItemIcon>
                <EditIcon />
              </ListItemIcon>
              <ListItemText primary="Edit User" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => {
                deleteUser(user.id);
                setShowOptionsModal(() => false);
              }}
            >
              <ListItemIcon>
                <DeleteIcon />
              </ListItemIcon>
              <ListItemText primary="Delete User" />
            </ListItemButton>
          </ListItem>
        </List>
      )}
      <ToastContainer />
    </>
  );
};
