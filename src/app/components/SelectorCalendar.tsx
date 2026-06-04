"use client"

import { useState, useEffect, useRef } from "react"
import AppointmentTimePicker from "./AppointmentTimePicker"
import { se } from "date-fns/locale"



export default function AvailabilityCalendar() {
    const beginningOfMonth = new Date(new Date(new Date(new Date(Date.now()).setDate(1)).getTime()).setHours(0,0,0,0)).getTime()
    const days = Array.from({ length: 31 }).map((i, index) => {
        const daysSince = (new Date(new Date(Date.now()).setHours(0, 0, 0, 0)).getTime() - beginningOfMonth) / (1000 * 60 * 60 * 24)
        console.log(daysSince)
        return (index * (1000 * 60 * 60 * 24)) + beginningOfMonth
    })

    const AvailableTimes = ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "",
        "", "", "", "", "", "", "", "", ""
    ]

    const [selectedDay, setSelectedDay] = useState(new Date(Date.now()).setHours(0,0,0,0))

    return (
        <div className="availabilityCalendar">
            {days.map((timestamp, index) => (
                <div onClick={() => setSelectedDay(timestamp)} className={`calendarItem ${selectedDay === timestamp ? "selected" : ""}`}>
                    <span>Month</span>
                    <span>10</span>
                    <span>Day</span>
                </div>
            ))}

            <div className="editDateSection">
                <h1>{`Edit availability for ${new Date(selectedDay).getMonth() + 1}/${new Date(selectedDay).getDate()}/${new Date(selectedDay).getFullYear()}`}</h1>
            </div>
        </div>
    )
}