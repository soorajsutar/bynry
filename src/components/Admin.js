import {
  Avatar,
  Button,
  CircularProgress,
  Grid,
  Typography,
} from "@mui/material";
import { QueryClient, useQuery } from "@tanstack/react-query";
import React from "react";
import { adminKey } from "./Constants";
import { deleteEmployee, editEmployee, getemployeeDetails } from "../Server";

const Admin = () => {
  // Fetch Data from firebase realtime database
  //To open Admin page we have to add " /Admin "so user can't open the admin panel , that is why it has seprate link)
  const {
    data: results,
    isLoading,
    error,
  } = useQuery({
    queryKey: [adminKey],
    queryFn: getemployeeDetails,
  });
  if (isLoading) {
    return <CircularProgress />;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  const info = results
    ? Object.entries(results).map(([id, result]) => ({
        id,
        name: result.name,
        number: result.phone,
        email: result.email,
        des: result.description,
        lat: result.lat,
        lng: result.lng,
        int: result.interests,
      }))
    : [];
  console.log(info);
  const style = {
    border: {
      md: "1px solid black",
      xs: "none",
    },
    alignContent: "center",
  };

  const Views = {
    md: 1.7,
    xs: 0,
  };
    //Delete function
  const handleDelete = async (id) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (!confirm) return;
    try {
      await deleteEmployee(id);
      QueryClient.invalidateQueries([adminKey]); // Refresh list
    } catch (err) {
      alert("Failed to delete user. Check console.");
    }
  };
  //edit function
  const handleEdit = async (user) => {
    const newName = prompt("Edit name:", user.name);
    const newEmail = prompt("Edit email:", user.email);
    const newPhone = prompt("Edit phone:", user.phone);

    // Create empty object
    const updatedUser = {};

    // Add fields only if prompt was not cancelled and input is non-empty string
    if (typeof newName === "string" && newName.trim() !== "") {
      updatedUser.name = newName.trim();
    }

    if (typeof newEmail === "string" && newEmail.trim() !== "") {
      updatedUser.email = newEmail.trim();
    }

    if (typeof newPhone === "string" && newPhone.trim() !== "") {
      updatedUser.phone = newPhone.trim();
    }

    // If no valid update, skip
    if (Object.keys(updatedUser).length === 0) {
      alert("No changes to update.");
      return;
    }

    try {
      // Update only specified fields in this user’s node (existing path)
      await editEmployee(user.id, updatedUser);
      QueryClient.invalidateQueries([adminKey]);
    } catch (error) {
      console.error("Edit failed:", error);
      alert("Failed to edit user.");
    }
  };

  return (
    <Grid container height={"100vh"} textAlign={"center"} overflow={"scroll"}>
      <Grid
        size={{ md: 2, xs: 4 }}
        justifyItems={"center"}
        alignContent={"center"}
        backgroundColor="lightblue"
        position={"sticky"}
        top="0"
      >
        {" "}
        <Avatar
          alt="logo"
          src="/Assets/bynry logo.png"
          sx={{ width: 100, height: 100 }}
        />
      </Grid>
      <Grid
        size={{ md: 10, xs: 8 }}
        textAlign="center"
        alignContent={"center"}
        backgroundColor="lightblue"
        position={"sticky"}
        top="0"
        zIndex={1}
      >
        <Typography variant="h2">Bynry Service Pvt Ltd.</Typography>
      </Grid>

      <Grid size={{ ...Views }} sx={{ ...style }}>
        Id
      </Grid>
      <Grid size={{ ...Views }} sx={{ ...style }}>
        Name
      </Grid>
      <Grid size={{ ...Views }} sx={{ ...style }}>
        Email
      </Grid>
      <Grid size={{ ...Views }} sx={{ ...style }}>
        Phone
      </Grid>
      <Grid size={{ ...Views }} sx={{ ...style }}>
        Interest
      </Grid>
      <Grid size={{ ...Views }} sx={{ ...style }}>
        Delete
      </Grid>
      <Grid size={{ ...Views }} sx={{ ...style }}>
        Edit
      </Grid>
      {info.map((user, index) => (
        <React.Fragment key={index}>
          <Grid size={{ md: 1.7, xs: 12 }} sx={{ ...style }}>
            {user.id}
          </Grid>
          <Grid size={{ md: 1.7, xs: 12 }} sx={{ ...style }}>
            {user.name}
          </Grid>
          <Grid size={{ md: 1.7, xs: 12 }} sx={{ ...style }}>
            {user.email}
          </Grid>
          <Grid size={{ md: 1.7, xs: 12 }} sx={{ ...style }}>
            {user.number}
          </Grid>
          <Grid size={{ md: 1.7, xs: 12 }} sx={{ ...style, overflow: "auto" }}>
            {user.int}
          </Grid>
          <Grid
            size={{ md: 1.7, xs: 6 }}
            sx={{
              ...style,
              borderBottom: { md: "none", xs: "1px solid black" },
            }}
          >
            <Button variant="outlined" onClick={() => handleDelete(user.id)}>
              Delete
            </Button>
          </Grid>

          <Grid
            size={{ md: 1.7, xs: 6 }}
            sx={{
              ...style,
              borderBottom: { md: "none", xs: "1px solid black" },
            }}
          >
            <Button variant="outlined" onClick={() => handleEdit(user.id)}>
              Edit
            </Button>
          </Grid>
        </React.Fragment>
      ))}
    </Grid>
  );
};

export default Admin;
