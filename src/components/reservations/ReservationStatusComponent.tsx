import { Component, ReactNode } from "react";
import ReservationStatus from "../../reservations/ReservationStatus";
import "../../styles/components/reservations/ReservationStatusComponent.css"

interface Props {
    status: ReservationStatus;
}

export default class ReservationStatusComponent extends Component<Props> {
    public render(): ReactNode {
        return (
            <>
                <div>{ReservationStatusComponent.getStatusDisplay(this.props.status)}</div>
                <div className="reservation-status-bullet" style={{ background: "orange" }}></div>
            </>
        );
    }

    private static getStatusDisplay(status: ReservationStatus): string {
        switch (status) {
            case ReservationStatus.PENDING:
                return "Pending";
            case ReservationStatus.ACCEPTED:
                return "Accepted";
            case ReservationStatus.DENIED:
                return "Denied";
            default:
                return "Unknown";
        }
    }
}
