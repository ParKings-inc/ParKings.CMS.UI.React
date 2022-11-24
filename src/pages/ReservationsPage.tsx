import { Component, ReactNode } from "react";
import ReservationComponent from "../components/reservations/ReservationComponent";
import Reservation from "../reservations/Reservation";
import ReservationsService from "../services/ReservationsService";
import "../styles/pages/ReservationsPage.css";

interface State {
    reservations: ReactNode[];
}

export default class ReservationsPage extends Component<any, State> {
    public render(): ReactNode {
        return (
            <div>
                <div>Reservations</div>
                <button onClick={async () => await this.getReservations()}>Get Reservations</button>
                <div className="reservations-container">
                    {this.state != null && this.state.reservations}
                </div>
            </div>
        );
    }

    private async getReservations(): Promise<void> {
        let reservations: Reservation[] = await ReservationsService.getReservations();
        this.setState({
            reservations: reservations.map((value, index) => {
                return (
                    <ReservationComponent key={"reservation" + index} reservation={value}></ReservationComponent>
                );
            })
        });
    }
}
