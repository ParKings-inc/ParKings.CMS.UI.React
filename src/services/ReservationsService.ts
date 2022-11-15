import Data from '../App.json';
import Axios, { AxiosResponse } from 'axios';
import path from 'path';
import axios from 'axios';

export default class ReservationsService {
    public static async getReservations(): Promise<void> {
        try {
            let url: string = new URL("Reservations", Data.serverAddress).toString();
            console.log(url);
            let x: AxiosResponse = await axios.get(url);
            console.log(x);
        } catch (e) {
            console.error(e);
        }
    }
}
