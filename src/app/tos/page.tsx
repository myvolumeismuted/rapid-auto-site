import type { Metadata } from "next";
import { Terms } from "../components/Terms"

export const metadata: Metadata = {
    title: "Terms of Service",
    description: "Read the RapidAuto Mobile Mechanic terms of service, policies, and customer service conditions.",
    alternates: {
        canonical: "/tos",
    },
    robots: {
        index: true,
        follow: true,
    },
}



export default function TOS() {
    return (
        <main>
            <Terms></Terms>
        </main>
    )
}
