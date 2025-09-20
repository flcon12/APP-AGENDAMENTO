
export interface TimeSlot {
    time: string;
    totalSpots: number;
    availableSpots: number;
}

export interface BookingDetails {
    date: Date;
    timeSlot: TimeSlot;
    name: string;
    email: string;
    phone: string;
}
