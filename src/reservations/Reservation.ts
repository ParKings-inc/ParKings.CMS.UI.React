

export default interface Reservation {
    readonly id: number;
    readonly arrivalTime: Date;
    readonly departureTime: Date;
    status: string;
}
