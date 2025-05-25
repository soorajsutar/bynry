import axios from "axios";

async function tryandCatchPost(url, RegUrl, data) {
  try {
    const response = await axios.post(url, data);
    return response.data;
  } catch (error) {
    throw error;
  }
}

async function tryandCatchget(url) {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export const employeeDetails = async (details) => {
  const link =
    "https://bynry-5b6ba-default-rtdb.firebaseio.com/employeeDetails.json";
  return await tryandCatchPost(link, null, details);
};

export const getemployeeDetails = async () => {
  const link = `https://bynry-5b6ba-default-rtdb.firebaseio.com/employeeDetails.json`;
  return await tryandCatchget(link);
};

export const getemployeeDetailsbyid = async (id) => {
  const link = `https://bynry-5b6ba-default-rtdb.firebaseio.com/employeeDetails/${id}.json`;
  return await tryandCatchget(link);
};
export const deleteEmployee = async (id) => {
  try {
    const res = await axios.delete(
      `https://bynry-5b6ba-default-rtdb.firebaseio.com/employeeDetails/${id}.json`
    );
    return res.data;
  } catch (error) {
    console.error("Error deleting from Firebase:", error);
    throw error;
  }
};

export const editEmployee = async (id, updatedFields) => {
  const res = await axios.patch(
    `https://bynry-5b6ba-default-rtdb.firebaseio.com/employeeDetails/${id}.json`,
    updatedFields
  );
  return res.data;
};
