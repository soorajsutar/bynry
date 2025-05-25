import { Button, Grid, TextField } from "@mui/material";
import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { employeeDetails } from "../Server";
import { invaldate } from "./Constants";
const RegForm = ({ handleClose }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [interests, setInterests] = useState([]);
  const [description, setDescription] = useState("");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [nameError, setNameError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [interestsError, setInterestsError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [latError, setLatError] = useState("");
  const [lngError, setLngError] = useState("");

  const getLiveLocation = ({ handleClose }) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLat(position.coords.latitude.toString());
          setLng(position.coords.longitude.toString());
          setLatError("");
          setLngError("");
        },
        (error) => {
          console.error("Error getting location:", error);
          setLatError("Unable to fetch latitude");
          setLngError("Unable to fetch longitude");
        }
      );
    } else {
      setLatError("Geolocation not supported by browser");
      setLngError("Geolocation not supported by browser");
    }
  };
  const queryClient = useQueryClient();
  const mutation = useMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [invaldate] });
    },
    mutationFn: (data) => employeeDetails(data),
  });

  const handleSubmit = () => {
    let errorPresent = false;

    // Name validation
    const nameRegex = /^[a-zA-Z]+\s[a-zA-Z]+\s[a-zA-Z]+(\s[a-zA-Z]+)*$/;
    if (!nameRegex.test(name)) {
      setNameError("Enter Correct Name*");
      errorPresent = true;
    } else {
      setNameError("");
    }

    //Phone Number error
    if (phone.length !== 10) {
      setPhoneError("Enter 10 Digit Phone Number");
      errorPresent = true;
    } else {
      setPhoneError("");
    }

    //Email Error
    if (email === "") {
      setEmailError("Enter Your Email");
    } else {
      setEmailError("");
    }

    //Interests Error
    if (email === "") {
      setInterestsError("Enter Your Hobbies");
    } else {
      setInterestsError("");
    }
    //Description Error
    if (email === "") {
      setDescriptionError("Enter Your Description");
    } else {
      setDescriptionError("");
    }
    if (errorPresent) {
      return;
    }
    const details = {
      name,
      email,
      phone,
      interests,
      description,
      lat,
      lng,
    };
    mutation.mutate(details);
    handleClose();
    setPhoneError("");
  };
  return (
    <>
      <Grid container spacing={3}>
        <Grid padding={1} size={{ xs: 12, md: 5.5 }}>
          <TextField
            fullWidth
            size="small"
            label="Full Name"
            variant="outlined"
            error={nameError !== ""}
            helperText={nameError}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Grid>

        <Grid padding={1} size={{ xs: 12, md: 5.5 }}>
          <TextField
            fullWidth
            size="small"
            label="Email"
            variant="outlined"
            error={emailError !== ""}
            helperText={emailError}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Grid>

        <Grid padding={1} size={{ xs: 12, md: 5.5 }}>
          <TextField
            fullWidth
            size="small"
            label="Phone Number"
            variant="outlined"
            error={phoneError !== " "}
            helperText={phoneError}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </Grid>

        <Grid padding={1} size={{ xs: 12, md: 5.5 }}>
          <TextField
            fullWidth
            size="small"
            label="Interests (comma separated)"
            variant="outlined"
            error={interestsError !== ""}
            helperText={interestsError}
            value={interests.join(", ")} // show array as comma-separated string
            onChange={(e) =>
              setInterests(e.target.value.split(",").map((item) => item.trim()))
            }
          />
        </Grid>
        <Grid padding={1} size={{ xs: 12, md: 12 }}>
          <Button variant="outlined" onClick={getLiveLocation}>
            Get My Location
          </Button>
        </Grid>

        <Grid padding={1} size={{ xs: 12, md: 12 }}>
          <TextField
            fullWidth
            size="small"
            label="Description"
            variant="outlined"
            error={descriptionError !== ""}
            helperText={descriptionError}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Grid>

        <Grid size={{ md: 6 }}>
          <Button variant="contained" onClick={handleClose}>
            Cancel
          </Button>
        </Grid>

        <Grid size={{ md: 6 }}>
          <Button variant="contained" onClick={handleSubmit}>
            Submit
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default RegForm;
