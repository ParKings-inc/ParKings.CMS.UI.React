import axios from "axios";

const api = "https://localhost:7205/api";

export async function getAllGarage() {
  try {
    console.log("in garage service");
    const response = await axios.get(api + "/Garages");
    console.log("response ", response);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function getGarageByID(id) {
  try {
    const response = await axios.get(`${api}/Garages/${id}`);
    console.log("response", response);
    return response.data;
  } catch (error) {
    return [];
  }
}

export async function getGarage(data) {
  try {
    const response = await axios.get(api + "/Garages", { garage: data });
    console.log("response ", response);
    return response.data;
  } catch (error) {
    return [];
  }
}
