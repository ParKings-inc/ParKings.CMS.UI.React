import Data from '../App.json';
import axios, { AxiosResponse } from 'axios';

export default class ReservationsService {
    public static async getReservations(): Promise<void> {
        try {
            let url: URL = new URL("Reservations", Data.serverAddress);
            let x: AxiosResponse = await axios.get(url.toString());
            console.log(x);
        } catch (e) {
            console.error(e);
        }
    }
}
