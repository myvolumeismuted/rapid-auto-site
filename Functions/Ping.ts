import { createClient } from "@supabase/supabase-js"

export type PingOptions = {
    user_identifier?: string,
    timestamp?: number,
    referrer?: string,
    device?: string
    converted?: boolean
    returning?: string
    maxHomePageScrollPosition?: number,
    visitIdleTime?: number,
    session_id: string
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