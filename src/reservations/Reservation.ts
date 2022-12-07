export default interface Reservation {
    readonly arrivalTime: Date;
    readonly departureTime: Date;
    readonly status: string;
}
