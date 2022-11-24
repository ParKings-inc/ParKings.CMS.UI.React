import { Component, ReactNode } from "react";
import Reservation from "../reservations/Reservation";
import "../styles/Reservation.css";

interface Props {
    reservation: Reservation;
}

export default class ReservationComponent extends Component<Props> {
    public render(): ReactNode {
        return (
            <div className="reservation-container">
                <div>Arrival: {this.props.reservation.arrivalTime.toString()}</div>
                <div>Departure: {this.props.reservation.departureTime.toString()}</div>
                <div>Status: {this.props.reservation.status}</div>
            </div>
        );
    }
}
