import { Component, ReactNode } from "react";
import "../../styles/components/reservations/ReservationStatusComponent.css"

interface Props {
    status: string;
}

export default class ReservationStatusComponent extends Component<Props> {
    public render(): ReactNode {
        return (
            <>
                <div>{this.props.status}</div>
                <div className="reservation-status-bullet" style={{ background: ReservationStatusComponent.getStatusColour(this.props.status) }}></div>
            </>
        );
    }

    private static getStatusColour(status: string): string {
        switch (status) {
            case "Pending":
                return "orange";
            case "Accepted":
                return "yellowgreen";
            case "Denied":
                return "orangered";
            default:
                return "grey";
        }
    }
}
