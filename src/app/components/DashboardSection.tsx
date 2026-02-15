"use client"

import { useState, useEffect } from "react";
import InquiryCard from "./InquiryCard";
import { useRouter } from "next/navigation";


export default function DashBoardSection() {
    const [loading, setLoading] = useState(true)
    const [inquiries, setInquiries] = useState([])
    const router = useRouter()

    async function get() {
        setLoading(true);
      
        const response = await fetch("/api/inquiries", {
          method: "GET",
          credentials: "include",
        });
      
        const res = await response.json().catch(() => ({} as any));
      
        if (!response.ok || !res?.success) {
          // clear cookie server-side
          await fetch("/api/admin/logout", {
            method: "POST",
            credentials: "include",
          }).catch(() => {});
      
          // redirect
          router.push("/admin");
          router.refresh();
          return;
        }
      
        setInquiries(res.data); // adjust based on your response shape
        setLoading(false);
}

    async function handleOnquote(){}


    useEffect(() => {
        get()
    }, [])

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
                        {
                            inquiries.map((item, index) => (
                                <InquiryCard key={index} item={item}></InquiryCard>
                            ))
                        }
                    </>
                )
            }
        </div>
    )
}