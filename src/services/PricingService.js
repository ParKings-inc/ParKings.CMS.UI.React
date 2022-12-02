import Data from "../App.json";
import axios from "axios";

export default class PricingService {
  static async createTariff(garageId, tariff) {
    try {
      const url = new URL("api/Pricings", Data.ConsumerAddress);
      console.log(garageId);
      console.log(tariff);
      const result = await axios.post(url.toString(), {
        garageID: garageId,
        startingTime: tariff.start,
        endingTime: tariff.end,
        price: tariff.title,
        recurring: tariff.repetitive,
      });

      return result.data;
    } catch (error) {
      console.log(error);
    }
  }

  static async getTariff(garageId, Day) {
    try {
      const url = new URL(
        `Pricings/Week/${Day}/${garageId}`,
        Data.ConsumerAddress
      );
      const result = await axios.post(url.toString());

      return result.data;
    } catch (error) {
      console.log(error);
    }
  }
}
