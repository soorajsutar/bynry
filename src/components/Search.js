import { Autocomplete, TextField } from "@mui/material";
import React, { useContext, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { employeeContext } from "./Main";

const Search = () => {
  const searchcontext = useContext(employeeContext);
  const [filteredNames, setFilteredNames] = useState([]);
  const navigate = useNavigate();

  // Convert context object to array
  const employeedata = searchcontext
    ? Object.entries(searchcontext).map(([id, result]) => ({
        id,
        name: result.name,
        phone: result.phone,
        email: result.email,
        description: result.description,
        lat: result.lat,
        lng: result.lng,
        interests: result.interests,
      }))
    : [];

  const names = employeedata.map((person) => ({
    id: person.id,
    name: person.name,
  }));

  const handleChange = (event, value) => {
    if (value) {
      navigate(`/PersonSummery/${value.id}`);
    }
  };

  const allInterests = useMemo(() => {
    const interestSet = new Set();
    employeedata.forEach((person) => {
      person.interests?.forEach((interest) => {
        interestSet.add(interest);
      });
    });
    return Array.from(interestSet);
  }, [employeedata]);

  const handleInterestChange = (event, value) => {
    if (value) {
      const filtered = employeedata
        .filter((person) => person.interests?.includes(value))
        .map((person) => ({
          id: person.id,
          name: person.name,
        }));
      setFilteredNames(filtered);
    } else {
      setFilteredNames(names);
    }
  };

  return (
    <>
      <Autocomplete
        options={filteredNames.length > 0 ? filteredNames : names}
        getOptionLabel={(option) => option.name}
        fullWidth
        sx={{ padding: 1,}}
        onChange={handleChange}
        renderInput={(params) => (
          <TextField {...params} label="Search by Name" />
        )}
      />

      <Autocomplete
        options={allInterests}
        getOptionLabel={(option) => option}
        fullWidth
        sx={{ padding: 1, }}
        onChange={handleInterestChange}
        renderInput={(params) => (
          <TextField {...params} label="Search by Interests" />
        )}
      />
    </>
  );
};

export default Search;
