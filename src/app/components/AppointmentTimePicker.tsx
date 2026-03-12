"use client"

import { useState, useEffect, useRef } from "react";
import { CSSProperties } from "react";


export default function AppointmentTimePicker({ style, name, scrollable, trackValue, trackValueUpdate, selectedDate }: { style?: CSSProperties, name?: string, scrollable?: boolean, trackValue: string, trackValueUpdate: CallableFunction, selectedDate: string | Date | undefined }) {
  const openHours = ["7:00AM", "7:30AM", "8:00AM", "8:30AM", "9:00AM", "9:30AM", "10:00AM", "10:30AM", "11:00AM", "11:30AM", "12:00PM", "12:30PM", "1:00PM", "1:30PM", "2:00PM", "2:30PM", "3:00PM", "3:30PM", "4:00PM", "4:30PM", "5:00PM", "5:30PM", "6:00PM", "6:30PM", "7:00PM"]
  const inputRef = useRef<HTMLInputElement>(null)

  const [timeSheet, setTimeSheet] = useState(openHours.map(item => { return { timeSlot: item, selected: false } }))
  const legacyTimeSheet = openHours.map(item => { return { timeSlot: item, selected: false } })
  const [selectedTime, setSelectedTime] = useState("4:00PM")
  const [selectorOpen, setSelectorOpen] = useState(false)
  const [availability, setAvailability] = useState<[{ date: number, id: string, availabilityStart: string }] | []>([])
  const [loading, setLoading] = useState(true)

  function handleSelectedTimeChange(index: number, time: string) {
    const prev = timeSheet
    prev[index].selected = true
    setSelectedTime(time)
    setTimeSheet(prev)
    console.log(selectedTime)
    setSelectorOpen(false)
    inputRef.current?.blur(); // closes focus
    trackValueUpdate(time)
  }

  useEffect(() => {
    console.log(availability)
  }, [availability])

  async function getTimes() {
    // USE THIS FUNCTION TO GET THE AVAILABILITY TIMES FOR THE NEXT 2 WEEKS
    const response = await fetch("/api/availability", {
      headers: { "Content-Type": "application/json" },
      method: "GET"
    })
    const { times } = await response.json()
    setAvailability(JSON.parse(times))
    setLoading(false)
  }

  useEffect(() => {
    getTimes()
  }, [])

  useEffect(() => {
    if (!loading) {
      const selectionAsMS = new Date(new Date(selectedDate ? selectedDate : Date.now()).setHours(0, 0, 0, 0)).getTime()
      const openAvailabilityTime = availability.find(item => selectionAsMS === new Date(new Date(item.date).setHours(0, 0, 0, 0)).getTime())?.availabilityStart
      if (!openAvailabilityTime) {
        setTimeSheet([])
        setSelectedTime("CLOSED")
        return
      }
      const prevTimesheet = legacyTimeSheet
      const indexOfAvail = prevTimesheet.findIndex(item => item.timeSlot === openAvailabilityTime)
      const newArrayOfTimeSheet = prevTimesheet.slice(indexOfAvail)
      if (newArrayOfTimeSheet.length > 0) setTimeSheet(newArrayOfTimeSheet)
      if (!newArrayOfTimeSheet) setTimeSheet([])
      if (timeSheet[0]) {
        setSelectedTime(timeSheet[0].timeSlot)
      }
    }
  }, [selectedDate])

  useEffect(() => {
    if (timeSheet.length === 0) {
      setSelectedTime("CLOSED")
      trackValueUpdate("CLOSED")
    }
    if (timeSheet[0]) {
      setSelectedTime(timeSheet[0].timeSlot)
    }
  }, [timeSheet])



  return (
    <div id={name} style={{ ...style }} className="appointmentTimePicker">
      <input readOnly ref={inputRef} onBlur={() => setSelectorOpen(false)} onFocus={() => setSelectorOpen(true)} value={selectedTime} type="text" />
      <div className="clockIcon">
        <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" className="css-i6dzq1"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
      </div>
      <div style={{ ...style, display: selectorOpen ? "flex" : "none" }} className="timeSelectorContainer">
        {timeSheet.map((item, index) => (
          <div onMouseDown={(e) => e.preventDefault()} onClick={() => handleSelectedTimeChange(index, item.timeSlot)} key={index} className="timeItem">
            <span>{item.timeSlot}</span>
            {item.timeSlot === selectedTime && (
              <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" className="css-i6dzq1"><polyline points="20 6 9 17 4 12"></polyline></svg>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
