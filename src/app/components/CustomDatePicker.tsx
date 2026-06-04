import { useState, useEffect, useRef } from "react";


export default function CustomDatePicker({updateDateFunc}: {updateDateFunc?: CallableFunction}) {
    const updateDateFuncRef = useRef(updateDateFunc)
    const [today] = useState(() => new Date(new Date().setHours(0, 0, 0, 0)).getTime())
    const buildDaysArray = () => Array.from({ length: 14 }).map((i, index) => new Date(today + ((1000 * 60 * 60 * 24) * index)).getTime())
    const [selectedDate, setSelectedDate] = useState<number | null>(today)
    const [days, setDays] = useState<number[]>(() => buildDaysArray())
    const addNewWeek = () => {
        setDays((current) => {
            if (!current || current.length < 1) return current
            const pinPoint = current[current.length - 1] + (1000 * 60 * 60 * 24)
            const next_seven_days = Array.from({ length: 7 }).map((i, index) => pinPoint + ((1000 * 60 * 60 * 24) * index))
            return [...current, ...next_seven_days]
        })
    }

    const [popoverDisplay, setPopoverDisplay] = useState<string>("none")

    useEffect(() => {
        updateDateFuncRef.current = updateDateFunc
    }, [updateDateFunc])


    const toggleDisplay = () => {
        if (popoverDisplay === "none") {
            setPopoverDisplay("flex")
        } else {
            setPopoverDisplay("none")
        }
    }

    useEffect(() => {
        if (updateDateFuncRef.current && selectedDate) {
            updateDateFuncRef.current(new Date(selectedDate))
        }
    }, [selectedDate])

    const formatDate = (date: number) => {
        const day = new Date(date)
        const months = ["January", "Febuary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
        const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
        return {dateString: `${days[day.getDay()]}, ${months[day.getMonth()]} ${day.getDate()}`, dateObj: new Date(date) }
    }

    const handleDaySelect = (date: number) => {
        setSelectedDate(date)

        // Reset the date array after selection in case the user scrolled ahead.
        setDays(buildDaysArray())

        setTimeout(() => {
            setPopoverDisplay("none")
        }, 500);
    }

    return (
        <div className="appointmentDatePicker">
            <input value={selectedDate ? formatDate(selectedDate).dateString : undefined} onFocus={toggleDisplay} readOnly placeholder="Pick a date" name="" id="" />
            <div className="clockIcon">
                <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" className="css-i6dzq1"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
            </div>
            <div
                onScroll={(e) => {
                    const el = e.currentTarget
                    if (el.scrollLeft + el.clientWidth > el.scrollWidth - 5) {
                        addNewWeek()
                    }
                }}
                style={{ display: popoverDisplay }} className="date-scroll-popover">
                {days.map((item, index) => (
                    <div key={index} onClick={() => handleDaySelect(item)} className={`selectionDayItem ${item === selectedDate ? "selected" : ""}`}>
                        <span>{new Date(item).getDate()}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}
