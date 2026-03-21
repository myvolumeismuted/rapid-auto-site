"use client"
import { useState, useEffect, CSSProperties } from "react"
import { io } from "socket.io-client"


const firstStyles: CSSProperties = {
    width: "100%",
    minHeight: "100dvh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    padding: "2%"
}

const textStyles: CSSProperties = {
    fontSize: "1.3rem",
    color: "#A6A6A6"
}

const buttonStyles: CSSProperties = {
    background: "linear-gradient(135deg, #ff8a5c 0%, #ff5f2e 100%)",
    padding: "2%",
    borderRadius: "0.2rem",
    marginTop: "15px"
}





export default function RepairTrackingScreen() {

    const [loading, setLoading] = useState(false)

    const handleButtonPress = async () => {
        setLoading(true)
    }

    return (
        <main>
            {
                !loading && (
                    <div style={firstStyles} className="screener">
                        <h1 style={textStyles}>Create a repair order to create a link to allow tracking for a new repair</h1>
                        <button onClick={handleButtonPress} style={buttonStyles}>Create Repair</button>
                    </div>
                )
            }

            {
                loading && (
                    <div style={firstStyles} className="screener">
                        <div className="loader"></div>
                    </div>
                )
            }
        </main>
    )
}