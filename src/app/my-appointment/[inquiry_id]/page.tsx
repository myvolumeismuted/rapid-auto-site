"use client"
import { InquiryData } from "@/app/components/types/types"
import { useParams } from "next/navigation"
import { useState, useEffect } from "react"
import { toast } from "sonner"

 

export default function ViewAppointmentScreen() {
    const { inquiry_id } = useParams()
    const [inquiry, setInquiry] = useState<InquiryData>({})
    const [loading, setLoading] = useState(true)

    async function getInquiry() {
        const response = await fetch(`/api/appointment-details/${inquiry_id}`, {
            headers: {
                "Content-Type": "application/json"
            },
            method: "GET",
            credentials: "include"
        })
        const { data } = await response.json().catch(error => { return {} })
        if (data) {
            setInquiry(data)
            setLoading(false)
        } else {
            toast.error("Failed to load data. Please verify you are using the correct link")
        }
    }

    useEffect(() => {
        // GET INQUIRY DETAILS
        getInquiry()
    }, [])

    return (
        <main>
            <div className="viewAppointmentContainer">
                {
                    loading ? (
                    <div className="loader"></div>
                    ) : (
                        <span>nigger</span>
                    )
                }
            </div>
        </main>
    )
}