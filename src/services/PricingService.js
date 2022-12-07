import Data from "../App.json";
import axios from "axios";

export default class PricingService {
  static async createTariff(garageId, tariff) {
    try {
      const url = new URL("api/Pricings", Data.ConsumerAddress);
      const result = await axios.post(url.toString(), {
        garageID: garageId,
        startingTime: PricingService.DoTimeZoneOffset(tariff.start),
        endingTime: PricingService.DoTimeZoneOffset(tariff.end),
        price: tariff.title,
        recurring: tariff.repetitive
      });

      return result.data;
    } catch (error) {
      console.log(error);
    }
  }



  static async deleteTariff(id) {
    try {
      const url = new URL(
        `api/Pricings/${id}`,
        Data.ConsumerAddress
      );
      const result = await axios.delete(url.toString());

      return result.data;
    } catch (error) {
      console.log(error);
    }
  }

  static async putTariff(TariffId, tariff, garageId) {
    try {
      const url = new URL(`api/Pricings/${TariffId}`, Data.ConsumerAddress);
      const result = await axios.put(url.toString(), {
        id: TariffId,
        garageID: garageId,
        startingTime: PricingService.DoTimeZoneOffset(tariff.start),
        endingTime: PricingService.DoTimeZoneOffset(tariff.end),
        price: tariff.title,
        recurring: tariff.repetitive
      });

      return result.data;
    } catch (error) {
      console.log(error);
    }
  }

  static async getTariff() {
    try {
      const url = new URL(
        `api/Pricings`,
        Data.ConsumerAddress
      );
      const result = await axios.get(url.toString());

      return result.data;
    } catch (error) {
      console.log(error);
    }
  }

  static DoTimeZoneOffset(time) {
    console.log(time);
    return new Date(new Date(time) - new Date(time).getTimezoneOffset() * 60000);
  }


}
