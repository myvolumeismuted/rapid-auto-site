"use client"

import { useState, useEffect } from "react";

export default function LiveRepairCreationScreen() {
    const [formData, setFormData] = useState({
        customerName: "",
        customerAddress: "",
        customerPhone: "",
        customerEmail: "",
        serviceSummary: "",
        jobCode: "",
        completionETA: "",
        selectedComm: "phone",
        selectedTarget: "",
        internalNote: "",
    })

    function createJobCode() {
        let code = "XXXX"
        const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890"
        while (code.indexOf("X") > -1) {
            code = code.replace("X", characters.charAt(Math.floor(Math.random() * characters.length)))
        }
        return code
    }

    useEffect(() => {
        const newJobCode = createJobCode()
        setFormData((prev) => ({ ...prev, jobCode: newJobCode }))
    }, [])

    return (
        <main>
            <div className="create-repair-container">
                <div className="repair-creation-form">
                <span className="repairIdBubble">Job ID: {formData.jobCode.length > 1 ? formData.jobCode : "----"}</span>
                    <label htmlFor="">Customer Information</label>
                    <div className="customerInfoContainer">
                        <div className="sq as">
                            <label htmlFor="">Contact Information</label>
                            <select name="" id="">
                                <option value="phone">Phone Number</option>
                                <option value="email">Email Address</option>
                            </select>
                        </div>

                        <div className="sq as">
                            <input type="text" name="" id="" placeholder="540-525-8425" />
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}
