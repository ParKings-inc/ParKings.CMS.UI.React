import { Component, ReactNode } from "react";
import ReservationComponent from "../components/reservations/ReservationComponent";
import Reservation from "../reservations/Reservation";
import ReservationsService from "../services/ReservationsService";
import "../styles/pages/ReservationsPage.css";

interface State {
    reservations: ReactNode[] | null;
}

export default class ReservationsPage extends Component<any, State> {
    public constructor(props: any, state: State) {
        super(props);
        this.state = {
            reservations: null
        };
    }

    public render(): ReactNode {
        if (this.state.reservations == null) {
            return (
                <div>Loading reservations...</div>
            );
        }

        return (
            <div>
                <div>Reservations</div>
                <div className="reservations-container">
                    {this.state != null && this.state.reservations}
                </div>
            </div>
        );
    }

    public async componentDidMount(): Promise<void> {
        await this.getReservations();
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
