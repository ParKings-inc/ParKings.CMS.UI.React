import axios from "axios";
import Data from "../App.json";

export async function getRevenue(date) {
  try {
    axios.get(Data.serverAddress + `/api/Receipts/byday/${date}`);
  } catch (error) {
    console.log(error);
  }
}
