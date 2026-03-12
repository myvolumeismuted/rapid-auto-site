import { useState } from "react";

export default function DateSquare({ id, date, selectedDateId, handleTimeChange }: { id: string | number, date: string | number, selectedDateId?: string, handleTimeChange: any }) {
    // Array of times in 30-minute increments from 7:00AM to 7:00PM
    const times = Array.from({ length: 25 }, (_, index) => {
        const totalMinutes = 7 * 60 + index * 30;
        const hours24 = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;
        const period = hours24 >= 12 ? "PM" : "AM";
        const hours12 = hours24 % 12 === 0 ? 12 : hours24 % 12;
        return `${hours12}:${minutes.toString().padStart(2, "0")}${period}`;
    });
    const months = ["January", "Febuary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    const days = ["Sunday", "Monday", "Tuesday", "Wednsday", "Thursday", "Friday", "Saturday"]
    //-------------------------------------------------------------------------
    const [startAvailability, setStartAvailability] = useState("4:00PM")

    const handleAvailabilityChange = (value: string) => {
        setStartAvailability(value)
        handleTimeChange(id, value)
    }

    return (
        <div className="dateSquare">
            <div className="dateDisplay">
                <span style={{ color: "#DDDDDD5A" }}>{days[new Date(date).getDay()]}</span>
                <span style={{ fontSize: 25 }}>{new Date(date).getDate()}</span>
                <span>{months[new Date(date).getMonth()]}</span>
            </div>
            <select
                className="timeSelector"
                name=""
                id=""
                value={startAvailability}
                onChange={(event) => handleAvailabilityChange(event.target.value)}
            >
                {times.map((item, index) => (
                    <option key={index} value={item}>{item}</option>
                ))}
            </select>
        </div>
    )
}
