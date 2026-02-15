import { Footer } from "./Footer"
import { NextRequest, NextResponse } from "next/server";

export default function TrackServiceSection() {
    return (
        <>
                <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-[#0d1220] to-[#151925]">
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
                        <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl"></div>
                    </div>
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,black,transparent)]"></div>
        
                    <div className="track-service-container">
                        <div className="inputcontainer"></div>
                    </div>
                </section>
        
                <Footer></Footer></>
    )
}