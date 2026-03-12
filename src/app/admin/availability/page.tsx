"use client"


import DateSquare from "@/app/components/DateSquare";
import { useState, useEffect } from "react";
import { toast } from "sonner";


export default function AvailibityEditScreen() {

    // GENERATE THE DATES OF THE NEXT 2 WEEKS (14 DAYS)
    const today = new Date()
    const dates = Array.from({ length: 14 }).map((item, index) => {
        const todayAsMs = new Date(today.setHours(0, 0, 0, 0)).getTime()
        const currentIterationDate = todayAsMs + ((1000 * 60 * 60 * 24) * index + 1)
        return currentIterationDate
    })

    // MANAGEMENT OF ALL THE SELECTED TIMES AND DATES OF THE ARRAY
    const generateId = () => Math.random().toString(36).substring(2, 15)
    const [dateTimes, setDateTimes] = useState(dates.map((dateInMs, index) => {
        return { date: dateInMs, id: generateId(), availabilityStart: "" }
    }))
    const updateTimes = (id: string, time: string) => {
        setDateTimes((prev) =>
            prev.map((item) =>
                item.id === id ? { ...item, availabilityStart: time } : item
            )
        )
        console.log("CHANGED")
    }

    useEffect(() => {
        console.log(dateTimes)
    }, [dateTimes])

    function showSuccessMessage() {
        toast.success("Successfully updated the availability times")
    }


    async function updateAvailability() {
        const response = await fetch("/api/admin/availability-update", {
            headers: {
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify({dateTimes})
        })
        const responseData = await response.json().catch(err => { return {} })
        if (responseData.success) showSuccessMessage()
        if (!responseData.success) toast.error("Failed to update the available times.")
    }



    return (
        <main>
            <div className="availabilityContainer">
                <div className="dateRow">
                    {dateTimes.map((item, index) => (
                        <DateSquare handleTimeChange={updateTimes} key={index} date={item.date} id={item.id}></DateSquare>
                    )) }
                </div>
                <button onClick={updateAvailability} className="confirmAvailabiity">Set Availability Times</button>
            </div>
        </main>
    )
}
