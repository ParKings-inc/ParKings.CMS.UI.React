import Data from '../App.json';
import axios, { AxiosResponse } from 'axios';
import Reservation from '../reservations/Reservation';

export default class ReservationsService {
    public static async getReservations(): Promise<Reservation[]> {
        try {
            let url: URL = new URL("Reservations", Data.serverAddress);
            let result: AxiosResponse<Reservation[]> = await axios.get(url.toString());
            return result.data;
        } catch (e) {
            console.error(e);
        }
        return [];
    }
}
