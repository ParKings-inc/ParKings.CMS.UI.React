import { Component, ReactNode } from "react";
import ReservationsService from "../services/ReservationsService";

export default class ReservationsPage extends Component {
    public render(): ReactNode {
        return (
            <div>
                <div>Reservations</div>
                <button onClick={async () => await this.getReservations()}>Get Reservations</button>
            </div>
        );
    }

    private async getReservations(): Promise<void> {
        await ReservationsService.getReservations();
    }
}
