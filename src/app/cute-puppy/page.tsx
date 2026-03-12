"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { LicensePlateLookup } from "@/LicensePlateLookup/LicenseVerify";
import AppointmentTimePicker from "../components/AppointmentTimePicker";

export default function PuppyScreen() {
    const router = useRouter()
    const redirectToForm = () => {
        try {
            localStorage.setItem("frm-rcc", "placeholder")
            router.push("/")
        } catch (error) {
            console.log(error)
        }
    }

    const [selectedTimes, setSelectedTimes] = useState<string[]>([]);


    return (
        <main className="puppyScreen">
            <section className="puppyScreenContainer">
                <header className="headerLine">
                    <h1>
                        You Were Promised a <span className="octxt">Cute Puppy.</span>
                    </h1>
                    <p className="puppySubhead">We Delivered. 🐶</p>
                </header>

                <div className="puppyImage">
                    <img
                        src="https://static.vecteezy.com/system/resources/previews/024/579/169/non_2x/cute-samoyed-puppy-lying-on-the-grass-in-the-garden-ai-generated-free-photo.jpg"
                        alt="Rocco the puppy lying on grass"
                    />
                </div>

                <section className="puppyCard">
                    <p>
                        This is <span>Rocco.</span>
                    </p>
                    <p>Rocco doesn&apos;t know much about cars...</p>
                    <p>But even he knows it&apos;s been 10,000 miles since your last oil change...</p>
                    <p>Rocco would hate for your engine to feel neglected.</p>
                    <button onClick={() => redirectToForm()} type="button">Book My Oil Change</button>
                </section>

            </section>
            
        </main>
    );
}
