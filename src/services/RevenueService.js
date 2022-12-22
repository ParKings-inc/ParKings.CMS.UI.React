import axios from "axios";
import Data from "../App.json";
import dayjs from "dayjs";

export async function getRevenue(date) {
  try {
    https://localhost:7205/api/Receipts/byday
    return axios.get(Data.ConsumerAddress + `/Receipts/byday/${dayjs(date).format("YYYY-MM-DD")}`);
  } catch (error) {
    console.log(error);
  }
}
