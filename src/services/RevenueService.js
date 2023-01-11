import axios from "axios";
import Data from "../App.json";
import dayjs from "dayjs";

export async function getRevenue(date) {
  try {    
    return axios.get(Data.ConsumerAddress + `/Receipts/byday/${dayjs(date).format("YYYY-MM-DD")}`);
  } catch (error) {
    console.log(error);
  }
}
