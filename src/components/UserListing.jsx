import React, { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { Grid, List } from "@mui/material";
import { UserItem } from "./UserItem";

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
    <div>
      <h2>User Listing</h2>
      <Grid container spacing={2}>
        <List>
          <Grid item>
            {users.map((user) => {
              return <UserItem user={user} />;
            })}
          </Grid>
        </List>
      </Grid>
    </div>
  );
};
