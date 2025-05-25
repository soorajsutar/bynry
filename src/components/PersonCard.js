import React, { useContext } from "react";
import { Typography, Button, Grid, Avatar } from "@mui/material";
import { Link } from "react-router-dom";
import { employeeContext } from "./Main";

const PersonCard = () => {
  const cardcontext = useContext(employeeContext);
  const employeedata = cardcontext
    ? Object.entries(cardcontext).map(([id, result]) => ({
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
    

  return (
    <>
      {employeedata.map((emp, index) => {
        const openGoogleMap = () => {
          const mapUrl = `https://www.google.com/maps?q=${emp.lat},${emp.lng}`;
          window.open(mapUrl, "_blank");
        };

        return (
          <Grid
            container
            sx={{
              borderRadius: "16px",
              boxShadow: 3,
              border: "1px solid black",
              padding: 2,
              marginBottom: 2,
            }}
          >
            <Grid size={{md:12,xs:12}} textAlign="center" justifyItems={"center"}>
              <Avatar sx={{width:100,height:100,border:"1px solid black"}}></Avatar>
            </Grid>
            <Grid size={{md:12,xs:12}} textAlign="center">
              <Typography gutterBottom variant="h5" component="div">
                {emp.name}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                Interests: {Array.isArray(emp.int) ? emp.int.join(", ") : emp.int}
              </Typography>
            </Grid>
            <Grid size={{md:6,xs:6}} textAlign="center">
              <Link to={`/PersonSummery/${emp.id}`}>
                <Button variant="outlined" sx={{ mt: 2 }}>
                  Profile
                </Button>
              </Link>
            </Grid>
            <Grid size={{md:6,xs:6}} textAlign="center">
              <Button variant="outlined" sx={{ mt: 2 }} onClick={openGoogleMap}>
                Map
              </Button>
            </Grid>
          </Grid>
        );
      })}
    </>
  );
};

export default PersonCard;
