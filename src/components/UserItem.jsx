import {
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemText,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DoneIcon from "@mui/icons-material/Done";

export const UserItem = ({ user }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [isEditable, setIsEditable] = useState(false);

  useEffect(() => {
    (function () {
      setFirstName(() => user.first_name);
      setLastName(() => user.last_name);
      setEmail(() => user.email);
    })();
  }, [user]);
  return (
    <>
      <ListItem>
        <ListItemAvatar>
          <Avatar src={user.avatar} />
        </ListItemAvatar>
        {isEditable ? (
          <>
            <TextField variant="standard" value={`${firstName} ${lastName}`} />
            <TextField variant="standard" value={email} />
          </>
        ) : (
          <ListItemText
            primary={`${firstName} ${lastName}`}
            secondary={email}
          />
        )}
        {isEditable ? (
          <DoneIcon onClick={() => setIsEditable(() => false)} />
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
