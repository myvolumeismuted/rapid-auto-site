"use client"
import { FormEvent, useRef, useState } from "react"
import { InquiryData } from "../components/types/types"

type InquiryRecord = InquiryData & {
    created_at?: string
    vehicleModel?: string
    selected_option?: string | null
}


export default function TrackScreen() {
    const [submittedForm, setSubmittedForm] = useState<InquiryRecord | null>(null)
    const [searchValue, setSearchValue] = useState("")
    const [loading, setLoading] = useState(false)
    const [hasSearched, setHasSearched] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const inputRef = useRef<HTMLInputElement>(null)

    const handleInput = (value: string) => {
        setSearchValue(value.replaceAll(" ", "").toUpperCase())
        console.log(searchValue)
        if (errorMessage) setErrorMessage("")
    }

    const focusOnInput = () => {
        inputRef.current?.focus()
    }

    const getFormData = async (event: FormEvent) => {
        event.preventDefault()
        const lookupId = searchValue
        if (!lookupId) {
            setErrorMessage("Enter your Inquiry ID to view appointment details.")
            setSubmittedForm(null)
            return
        }

        setHasSearched(true)
        setLoading(true)
        setErrorMessage("")

        try {
            const response = await fetch(`/api/appointment-details/${lookupId}`, {
                headers: { "Content-Type": "application/json" },
                method: "GET",
                credentials: "include"
            })

            if (!response.ok) {
                setErrorMessage("We could not find an appointment for that Inquiry ID.")
                setSubmittedForm(null)
                return
            }

            const { data } = await response.json().catch(() => ({ data: null }))
            if (!data) {
                setErrorMessage("No appointment details were found for this Inquiry ID.")
                setSubmittedForm(null)
                return
            }

            setSubmittedForm(data)
        } catch {
            setErrorMessage("Unable to fetch appointment details right now. Please try again.")
            setSubmittedForm(null)
        } finally {
            setLoading(false)
            console.log(submittedForm)
        }
    }

    const getValue = (value?: string | number) => {
        if (!value) return "Not Provided"
        if (typeof value === "string") {
            const trimmed = value.trim()
            return trimmed.length ? trimmed : "Not Provided"
        } else if (typeof value === "number") {
            return value
        }
        return "Not Provided"
    }

    const getDateString = (value?: string) => {
        if (!value) return "Not scheduled"
        const date = new Date(value)
        if (Number.isNaN(date.getTime())) return value
        return date.toLocaleDateString("en-US", {
            weekday: "short",
            month: "long",
            day: "numeric",
            year: "numeric"
        })
    }

    const getCreatedAt = () => {
        if (!submittedForm?.created_at) return "Recently submitted"
        const date = new Date(submittedForm.created_at)
        if (Number.isNaN(date.getTime())) return "Recently submitted"
        return `Submitted ${date.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric"
        })}`
    }

    const statusLabel = submittedForm?.selected_option ? "Appointment Confirmed" : "Pending Confirmation"
    const vehicleModel = getValue(submittedForm?.vehicleModel || submittedForm?.vehicelModel)
    const canSearch = searchValue.trim().length > 0
    const fullName = `${submittedForm?.firstName || ""} ${submittedForm?.lastName || ""}`.trim()
    const cityZip = `${submittedForm?.city || ""} ${submittedForm?.zipCode || ""}`.trim()

    const renderDetail = (label: string, value: string) => (
        <div className="trackDetailRow">
            <span>{label}</span>
            <strong>{value}</strong>
        </div>
    )

    const renderResultContent = () => {
        if (loading) {
            return (
                <div className="trackStateContainer">
                    <div className="loader"></div>
                    <p>Looking up your appointment...</p>
                </div>
            )
        }

        if (errorMessage) {
            return (
                <div className="trackStateContainer">
                    <h2>We couldn&apos;t load this request.</h2>
                    <p>{errorMessage}</p>
                    <button onClick={focusOnInput}>Try Another Inquiry ID</button>
                </div>
            )
        }

        if (!hasSearched || !submittedForm) {
            return (
                <div className="trackStateContainer">
                    <h2>Track Your Appointment</h2>
                    <p>Enter your Inquiry ID to view status, appointment window, and service details.</p>
                    <button onClick={focusOnInput}>Search Appointment</button>
                </div>
            )
        }

        return (
            <div className="trackResultContent">
                <div className="trackResultHeader">
                    <div>
                        <p className="trackMeta">{getCreatedAt()}</p>
                        <h2>{`Inquiry #${getValue(submittedForm.lookup_id)}`}</h2>
                    </div>
                    <span className="trackStatusChip">{statusLabel}</span>
                </div>

                <div className="trackCardsGrid">
                    <section className="trackInfoCard">
                        <h3>Customer</h3>
                        {renderDetail("Name", getValue(fullName))}
                        {renderDetail("Phone", getValue(submittedForm.phone))}
                        {renderDetail("Email", getValue(submittedForm.email))}
                    </section>

                    <section className="trackInfoCard">
                        <h3>Appointment</h3>
                        {renderDetail("Service Type", getValue(submittedForm.serviceType))}
                        {renderDetail("Preferred Date", getDateString(submittedForm.preferredDate))}
                        {renderDetail("Preferred Time", getValue(submittedForm.preferredTime))}
                        {renderDetail("Location", getValue(submittedForm.address))}
                        {renderDetail("City / ZIP", getValue(cityZip))}
                    </section>

                    <section className="trackInfoCard">
                        <h3>Vehicle</h3>
                        {renderDetail("Year", getValue(submittedForm.vehicleYear))}
                        {renderDetail("Make", getValue(submittedForm.vehicleMake))}
                        {renderDetail("Model", vehicleModel)}
                        {renderDetail("Mileage", getValue(submittedForm.mileage))}
                        {renderDetail("VIN", getValue(submittedForm.vin))}
                        {renderDetail("Plate", getValue(submittedForm.licensePlate))}
                    </section>
                </div>

                <section className="trackIssueCard">
                    <h3>Issue Description</h3>
                    <p>{getValue(submittedForm.issueDescription)}</p>
                </section>
            </div>
        )
    }

    return (
        <div className="trackScreenContainer">
            <div className="trackHeader">
                <p className="trackEyebrow">Appointment Tracking</p>
                <h1>Find Your RapidAuto Service Request</h1>
                <span>Use your Inquiry ID to view your request status, appointment window, and vehicle details.</span>
            </div>

            <form className="searchContainer" onSubmit={getFormData}>
                <input
                    ref={inputRef}
                    onChange={(event) => handleInput(event.target.value)}
                    value={searchValue}
                    type="text"
                    id="appt-search"
                    placeholder="Enter Inquiry ID"
                    maxLength={16}
                    autoComplete="off"
                />
                <button type="submit" disabled={!canSearch || loading}>
                    {loading ? "Searching..." : "Track Appointment"}
                </button>
            </form>

            <div className="infoDisplay">
                <div className={`innerInfoContainer ${!loading && submittedForm ? "hasResult" : ""}`}>
                    {renderResultContent()}
                </div>
            </div>
        </div>
    )
}
