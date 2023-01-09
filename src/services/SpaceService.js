import axios from "axios";
import Data from "../App.json";

export async function getAllSpacesByGarage(id) {
  try {
    console.log("in garage service");
    const response = await axios.get(
      Data.ConsumerAddress + `/Spaces/garage/${id}`
    );
    console.log("response ", response);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function getAllSpaceStates() {
  try {
    const response = await axios.get(Data.ConsumerAddress + `/Spaces/status`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function putSpace(data) {
  try {
    const response = await axios.put(Data.ConsumerAddress + `/Spaces/${data.id}`, data);
  } catch (error) {
    console.log(error)
  }
}
