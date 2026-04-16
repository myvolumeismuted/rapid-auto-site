import { createClient } from "@supabase/supabase-js"

export type PingOptions = {
    user_identifier: string,
    session_id: string,
    metadata?: { [key: string]: any },
    event_name?: string
}

export async function Ping(options?: PingOptions) {
    const response = await fetch("/api/ping", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(options)
    })
    const { success } = await response.json()
    console.log(success)
}