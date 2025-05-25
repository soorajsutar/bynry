import { Avatar, CircularProgress, Typography } from "@mui/material";
import React from "react";
import Grid2 from "@mui/material/Grid";
import { useQuery } from "@tanstack/react-query";
import { getemployeeDetailsbyid } from "../Server";
import { personsummery } from "./Constants";
import { useParams } from "react-router-dom";

const PersonSummery = () => {
  const { id } = useParams();
  const {
    data: person,
    isLoading,
    error,
  } = useQuery({
    queryKey: [personsummery],
    queryFn: () => getemployeeDetailsbyid(id),
  });

  if (isLoading) {
    return <CircularProgress />;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <Grid2
      container
      spacing={4}
      justifyContent={"center"}
      padding={3}
      backgroundColor="lightblue"
      height={"100vh"}
      overflow={"scroll"}
    >
      <Grid2
        size={{ md: 4, xs: 4 }}
        position={"sticky"}
        padding={2}
        top="0"
        textAlign={"left"}
        alignContent={"center"}
        justifyItems={"center"}
        justifyContent="space-between"
        zIndex={1}
      >
        <Avatar
          alt="logo"
          src="/Assets/bynry logo.png"
          sx={{ width: 100, height: 100 }}
        />
      </Grid2>
      <Grid2
        size={{ md: 8, xs: 8 }}
        position={"sticky"}
        padding={2}
        top="0"
        textAlign={"left"}
        alignContent={"center"}
        zIndex={1}
      >
        <Typography variant="h3">Employee Profiles</Typography>
      </Grid2>

      <Grid2
        item
        xs={12}
        md={4}
        textAlign="center"
        alignContent="center"
        justifyItems={"center"}
        overflow="hidden"
        border="0.5px solid gray"
        borderRadius="16px"
        padding={2}
      >
        <Avatar alt="person-photo" sx={{ width: 100, height: 100 }}>
          profile photo
        </Avatar>
        <Typography variant="h5">{person.name}</Typography>
        <Typography variant="body1">Email: {person.email}</Typography>
        <Typography variant="body1">Phone: {person.phone}</Typography>
        <Typography variant="body1">
          Hobbies:{" "}
          {Array.isArray(person.interests) ? person.interests.join(", ") : ""}
        </Typography>
        <Typography variant="body2" marginTop={2}>
          Latitude: {person.lat}, Longitude: {person.lng}
        </Typography>
      </Grid2>

      <Grid2 item xs={12} padding={2}>
        <Typography variant="body1">
          Description: {person.description}
        </Typography>
      </Grid2>
    </Grid2>
  );
};

export default PersonSummery;
