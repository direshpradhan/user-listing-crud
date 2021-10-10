import React, { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { List, Typography } from "@mui/material";
import { UserItem } from "./UserItem";
import { AddUser } from "./AddUser";

export const UserListing = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    (async function () {
      const response = await axios.get("https://reqres.in/api/users");
      setUsers(() => response.data.data);
      console.log(response);
    })();
  }, []);

  return (
    <>
      <AddUser users={users} setUsers={setUsers} />
      <div className="userList">
        <Typography variant="h5">User Listing</Typography>
        <List sx={{ width: { md: "60%", xs: "95%" } }}>
          {users.map((user) => {
            return (
              <UserItem
                key={user.id}
                user={user}
                users={users}
                setUsers={setUsers}
              />
            );
          })}
        </List>
      </div>
    </>
  );
};
