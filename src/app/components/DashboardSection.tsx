"use client"

import { useState, useEffect } from "react";
import InquiryCard from "./InquiryCard";
import { useRouter } from "next/navigation";
import AvailabilityCalendar from "./SelectorCalendar";


export default function DashBoardSection() {
    const [loading, setLoading] = useState(false)
    const [inquiries, setInquiries] = useState([])
    const router = useRouter()


    const screens = ["Overview", "Availability", "Inquiries", "Mass Email"]
    const [currentScreen, setCurrentScreen] = useState("Overview")
    const handleScreenClick = (value: string) => {
        setCurrentScreen(value)
    }

    // HANDLE LOADING FOR EVERY SCREEN CHANGE
    const loadsync = async () => {
        setLoading(true)
        // OVERVIEW LOADING SEQUENCE
        const response = await fetch("/")
    }



    return (
        <div className="DashBoard" style={{}}>
            {
                loading && (
                    <div className="loader"></div>
                )
            }

            {
                !loading && (
                    <>
                        <div className="innerDashboardContainer">
                            <div className="dashSidebar">
                                <div className="sbh">
                                    <h1>RapidAuto</h1>
                                    <h3>Admin Dashboard</h3>
                                </div>
                                <div className="selectionContainer">
                                    {screens.map((item, index) => (
                                        <div onClick={() => handleScreenClick(item)} className={`screenSelectionItem ${item === currentScreen ? "selected" : ""}`}>
                                            <span>{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>


                            <div className="mainDashView" style={loading ? { alignItems: "center", justifyContent: "center" } : { alignItems: "flex-start" }}>
                                {loading && (
                                    <div className="loader"></div>
                                )}

                                {!loading && currentScreen === "Overview" && (
                                    <>
                                        <div className="textHeader">
                                            <h1>Dashboard Overview</h1>
                                            <h3>Monitor shop performance and activity</h3>
                                        </div>

                                        <div className="paramItemsContainer">
                                            <div className="paramItem">
                                                <div className="paramItemRow">
                                                    <div style={{backgroundColor: "rgba(99, 174, 255, 0.232)"}} className="icon">
                                                        <svg color="rgb(99, 174, 255)" viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" className="css-i6dzq1"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                                                    </div>
                                                </div>
                                                <h1>4,332</h1>
                                                <h3>Total open inquiries</h3>
                                            </div>


                                            <div className="paramItem">
                                                <div className="paramItemRow">
                                                    <div style={{backgroundColor: "rgba(99, 255, 151, 0.23)"}} className="icon">
                                                        <svg color="rgb(99, 255, 151)" viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" className="css-i6dzq1"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path></svg>
                                                    </div>
                                                </div>
                                                <h1>15</h1>
                                                <h3>Total Completed Jobs</h3>
                                            </div>

                                            <div className="paramItem">
                                                <div className="paramItemRow">
                                                    <div style={{backgroundColor: "rgba(255, 99, 99, 0.23)"}} className="icon">
                                                        <svg color="rgb(255, 99, 99) 0.23)" viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" className="css-i6dzq1"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>
                                                    </div>
                                                </div>
                                                <h1>891</h1>
                                                <h3>Weekly unique website visitors</h3>
                                            </div>

                                            <div className="paramItem">
                                                <div className="paramItemRow">
                                                    <div style={{backgroundColor: "rgba(255, 99, 99, 0.23)"}} className="icon">
                                                        <svg color="rgb(255, 99, 99) 0.23)" viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" className="css-i6dzq1"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                                                    </div>
                                                </div>
                                                <h1>514</h1>
                                                <h3>Email list size</h3>
                                            </div>
                                            
                                        </div>


                                        
                                    </>


                                    
                                )}


                                {!loading && currentScreen === "Availability" && (
                                    <div className="innerMain">
                                        <h1>Availability Calendar</h1>
                                        <h3>Set availability for select days</h3>
                                        <AvailabilityCalendar></AvailabilityCalendar>
                                    </div>
                                )}
                            </div>
                        </div>
                    </>
                )
            }
        </div>
    )
}