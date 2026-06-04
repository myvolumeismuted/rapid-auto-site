"use client"

import { useState, useEffect } from "react"



export default function MobileSticky() {
    const [isMobile, setIsMobile] = useState(false)
    return (
        <div className="mobileSticky" style={{display: isMobile ? "flex" : "none"}}></div>
    )
}