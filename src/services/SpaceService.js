import axios from "axios";
import Data from "../App.json";

export async function getAllSpacesByGarage() {
  try {
    console.log("in garage service");
    const response = await axios.get(Data.ConsumerAddress + "/Spaces/garage/1");
    console.log("response ", response);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}
