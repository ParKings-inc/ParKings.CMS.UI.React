

export default interface Reservation {
    readonly ReservationID: number;
    readonly ArrivalTime: Date;
    readonly DepartureTime: Date;
    readonly GarageName: string;
    readonly SpaceFloor: number;
    readonly SpaceRow: number;
    readonly SpaceID: number;
    Status: string;
}
