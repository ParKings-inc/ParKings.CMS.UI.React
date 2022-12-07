import { Component, ReactNode } from "react";
import Reservation from "../../reservations/Reservation";
import ReservationStatusComponent from "./ReservationStatusComponent";
import ReservationsService from "../../services/ReservationsService";
import "../../styles/components/reservations/ReservationComponent.css";

interface Props {
    reservation: Reservation;
}

export default class ReservationComponent extends Component<Props> {
    public render(): ReactNode {
        return (
            <div className="reservation-container">
                <div className="reservation-label-container">
                    <div>Arrival: {this.props.reservation.arrivalTime.toString()}</div>
                    <div>Departure: {this.props.reservation.departureTime.toString()}</div>
                </div>
                <div className="reservation-status-container">
                    <ReservationStatusComponent status={this.props.reservation.status} />
                    <div className="reservation-button-container">
                        <button onClick={async () => await this.accept()}>Accept</button>
                        <button onClick={async () => await this.deny()}>Deny</button>
                    </div>
                </div>
            </div>
        );
    }

    private async accept(): Promise<void> {
        if (await ReservationsService.updateStatus(this.props.reservation.id, "Accepted")) {
            this.props.reservation.status = "Accepted";
            this.setState({});
        }
    }

    private async deny(): Promise<void> {
        if (await ReservationsService.updateStatus(this.props.reservation.id, "Denied")) {
            this.props.reservation.status = "Denied";
            this.setState({});
        }
    }
}