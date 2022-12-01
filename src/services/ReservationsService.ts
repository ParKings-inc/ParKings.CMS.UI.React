import axios, { AxiosResponse } from 'axios';
import urljoin from 'url-join';
import Reservation from '../reservations/Reservation';
import ReservationStatus from '../reservations/ReservationStatus';
import Data from '../App.json';

export default class ReservationsService {
    public static async getReservations(): Promise<Reservation[]> {
        try {
            let url: URL = new URL("Reservations/GetReservations", Data.serverAddress);
            let result: AxiosResponse<Reservation[]> = await axios.get(url.toString());
            return result.data;
        } catch (e) {
            console.error(e);
        }
        return [];
    }

    public static async updateStatus(id: number, status: ReservationStatus): Promise<void> {
        let path: string = urljoin("Reservations/UpdateStatus", id.toString(), status.toString());
        let url: URL = new URL(path, Data.serverAddress);
        await axios.put(url.toString());
    }
}
