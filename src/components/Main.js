import React, { createContext} from "react";
import {
  Avatar,
  CircularProgress,
  Typography,
} from "@mui/material";
import Grid2 from "@mui/material/Grid";
import PersonCard from "./PersonCard";
import Search from "./Search";
import Addbutton from "./Addbutton";
import { useQuery } from "@tanstack/react-query";
import { submitkey } from "./Constants";
import { getemployeeDetails } from "../Server";
const employeeContext = createContext();
const Main = () => {
  const {
    data: results,
    isLoading,
    error,
  } = useQuery({
    queryKey: [submitkey],
    queryFn: getemployeeDetails,
  });
  if (isLoading) {
    return <CircularProgress />;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <employeeContext.Provider value={results}>
      <Grid2
        container
        rowSpacing={1}
        height={"100vh"}
        overflow={"scroll"}
      >
        <Grid2
          size={{ md: 2, xs: 4 }}
          position={"sticky"}
          padding={2}
          top="0"
          textAlign={"left"}
          alignContent={"center"}
          justifyItems={"center"}
          justifyContent="space-between"
          backgroundColor="gray"
          zIndex={{ md: 12, xs: 15 }}
        >
          {/* Firebase require Paid version to store the photo, that is why i hav't store the photo */}
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
          textAlign={"center"}
          alignContent={"center"}
          backgroundColor="gray"
          zIndex={{ md: 12, xs: 13, sm: 0 }}
        >
          <Typography variant="h3">Employee Profiles</Typography>
        </Grid2>

        <Grid2
          size={{ md: 2, xs: 12 }}
          textAlign={"right"}
          alignContent={"center"}
          justifyItems={"center"}
          padding={2}
          backgroundColor={{md:"gray",xs:"none"}}
          position={{ md: "sticky", xs: "none" }}
          top={{ md: 0, xs: "none" }}
          zIndex={12}
        >
          <Addbutton />
        </Grid2>

        <Grid2
          size={{
            md: 4,
            xs: 12,
          }}
          textAlign={"center"}
          padding={2}
          
        >
          <Search />
        </Grid2>

        <Grid2 size={12}> 
          <PersonCard />
        </Grid2>
        
      </Grid2>
    </employeeContext.Provider>
  );
};

export default Main;
export { employeeContext };
