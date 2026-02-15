import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { toast } from "sonner";


export default function AdminSection() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({ username: "", password: "" })
    const [error, setError] = useState(false)
    const router = useRouter()
   

    function HandleUsernameChange(value: string) {
        setUsername(value.toLowerCase())
    }

    function HandlePasswordChange(value: string) {
        setPassword(value)
    }

    async function handleSubmit() {
        if (username.length > 0 && password.length > 0) {
            setLoading(true)
            const respoonse = await fetch("api/admin/login", {
                headers: {
                    "Content-Type": "application/json"
                },
                method: "POST",
                body: JSON.stringify({username, password})
            })
            setLoading(false)
            const resData = await respoonse.json().catch(() => {})
            if (!resData.success) toast.error(resData.message || "Internal Server Error. Please try again soon.")
            if (resData.success) router.push("/")
        }
    }

    async function verify() {
        const response = await fetch("/api/admin/verify", {
            headers: {
                "Content-Type": "application/json"
            },
            method: "GET",
            body: null,
            credentials: "include"
        })
        const { success, message, verified } = await response.json().catch(() => { return {} })
        if (success && verified) router.push("/")
        // HANDLE ERROR HANDLING FOR INCORRECT PASSWORD OR AUTHORIZATION
    } 

    useEffect(() => {
        verify()
    }, [])

    return (
        <div className="admin-capture-container">
            <input onChange={(e) => HandleUsernameChange(e.target.value)} placeholder="Username" type="text" name="" id="" required />
            <input onChange={(e) => {HandlePasswordChange(e.target.value)}} placeholder="Password" type="password" name="" id="" required />
            <button onClick={handleSubmit} disabled={(username.length === 0 || password.length ===0) ? true : false} style={(username.length === 0 || password.length ===0) ? {backgroundColor: "rgba(255, 107, 53, 0.517)", cursor: "not-allowed"} : {}}>
                {
                    loading && (
                        <div className="loader"></div>
                    )
                } 

                {
                    !loading && (
                        <>Login</>
                    )
                }
            </button>
        </div>
    )
}

