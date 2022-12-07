import { Component, ReactNode } from "react";
import Reservation from "../../reservations/Reservation";
import ReservationStatusComponent from "./ReservationStatusComponent";
import ReservationsService from "../../services/ReservationsService";
import "../../styles/components/reservations/ReservationComponent.css";
import { Button } from "@mui/material";

interface Props {
    reservation: Reservation;
}

export default class ReservationComponent extends Component<Props> {
    public render(): ReactNode {
        return (
            <div className="reservation-container">
                <div className="reservation-child-container">
                    <div className="reservation-label-container">
                        <div><h3> {this.props.reservation.GarageName}</h3></div>
                        <div><b>Space</b>: {this.props.reservation.SpaceFloor}-{this.props.reservation.SpaceID}-{this.props.reservation.SpaceRow}</div>
                        <div><b>Arrival</b>: {this.props.reservation.ArrivalTime.toString()}</div>
                        <div><b>Departure</b>: {this.props.reservation.DepartureTime.toString()}</div>
                    </div>
                    <div className="reservation-status-container">
                        <ReservationStatusComponent status={this.props.reservation.Status} />
                        <div className="reservation-button-container">
                            <Button variant="contained" color="success" onClick={async () => await this.accept()}>Accept</Button>
                            <Button variant="contained" color="error" onClick={async () => await this.deny()}>Deny</Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    private async accept(): Promise<void> {
        if (await ReservationsService.updateStatus(this.props.reservation.ReservationID
            , "Accepted")) {
            this.props.reservation.Status = "Accepted";
            this.setState({});
        }
    }

    private async deny(): Promise<void> {
        if (await ReservationsService.updateStatus(this.props.reservation.ReservationID
            , "Denied")) {
            this.props.reservation.Status = "Denied";
            this.setState({});
        }
    }
}
