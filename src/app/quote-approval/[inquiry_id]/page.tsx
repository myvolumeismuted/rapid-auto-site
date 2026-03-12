"use client"


import { useState, useEffect } from "react";
import { useParams } from "next/navigation";

type QuoteItem = {
    name: string
    price: number | string
}

type QuoteOption = {
    id: string | null
    title?: string
    price?: string | number
    notes?: string
    itemization?: QuoteItem[]
}

export default function QuotePage() {
    const params = useParams()
    console.log(params.inquiry_id)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [data, setData] = useState({})
    const [quoteOptions, setQuoteOptions] = useState<QuoteOption[]>([])
    const [selectedOption, setSelectedOPtion] = useState<QuoteOption | null>(null)
    const [quoteHasSent, setQuoteHasSent] = useState(false)

    const preferredPaymentMethods = [
        { name: "Cash App", icon: "" },
        { name: "Paypal", icon: "" },
        { name: "Cash Upon Arrival", icon: "" },
        { name: "Credit/Debit Card", icon: "" },
    ]

    async function getData() {
        const response = await fetch(`/api/get-quote-options/${params.inquiry_id}`, {
            headers: {
                "Content-Type": "application/json"
            },
            method: "GET",
            body: null
        })
        const { success, data, error } = await response.json().catch(() => { return { error: true } })
        if (error || !success) {
            setError(true)
        } else {
            setData(data)
            if (data.selected_option) setQuoteHasSent(true)
            setQuoteOptions(JSON.parse(data.quote_options || "[]"))
            setLoading(false)
            console.log(data)
        }
    }

    const [awaitingResponse, setAwaitingResponse] = useState(false)

    useEffect(() => {
        // MAKE REQUEST TO SERVER, GATHER INFO TO DISPLAY
        getData()
    }, [])

    async function sendQuoteConfirmation() {
        if (!selectedOption?.id) return
        console.log(selectedOption)
        setAwaitingResponse(true)
        const response = await fetch("/api/quote-selection/approve", {
            headers: {
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify({
                lookup_id: params.inquiry_id,
                option: selectedOption,
                itemization: selectedOption.itemization || []
            })
        })
        const { success } = await response.json()
        if (success) setQuoteHasSent(true)
        setAwaitingResponse(false)
    }

    return (
        <main>
            <div className="quotemain">

                {quoteHasSent && (
                    <div className="thankYouMessage">
                        <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" className="css-i6dzq1"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                        <span>Thank you for confirming your option. Your appointment is now confirmed. A member from our team will message you shortly with details regaurding your appointment</span>
                    </div>
                )}


                {loading && (
                    <div className="loaderView">
                        <div className="loader"></div>
                    </div>
                )}

                {!loading && quoteOptions.length > 0 && !quoteHasSent && (
                    <>
                        {quoteOptions.map((item, index) => (
                                <div style={item.id === selectedOption?.id ? { border: "1px solid rgb(0, 191, 255)" } : {}} key={index} className="quoteCard">
                                    <span className="quoteTitle">{item.title!}</span>
                                    <span className="quotePrice">${Number(item.price || 0).toFixed(2)}</span>
                                    <span className="quoteDesc">{item.notes}</span>

                                    <div className="guarwrap">
                                        <span className="guartxt">
                                            <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" className="css-i6dzq1"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                                            30-Day Labor Warranty
                                        </span>

                                        <span className="guartxt">
                                            <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" className="css-i6dzq1"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                                            Same Day Select Service
                                        </span>

                                        <span className="guartxt">
                                            <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" className="css-i6dzq1"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                                            Secure Payment Processing
                                        </span>
                                    </div>


                                    <button onClick={() => setSelectedOPtion(item)} className="quoteBtn">Select Quote</button>
                                </div>

                        ))}


                        <span style={{fontWeight: "500", width: "100%", textAlign: "center", marginTop: "10px"}}>Any questions? <a style={{textDecoration: "underline"}} href="mailto:kam@rapidautoworks.com">Contact Us</a></span>
                        <button disabled={awaitingResponse || !selectedOption?.id} onClick={sendQuoteConfirmation} className="confBtn" style={selectedOption?.id ? { display: "flex" } : { display: "none" }}>Confirm Quote Selection</button>

                    </>
                )
                }
            </div>
        </main>
    )
}
