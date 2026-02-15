"use client"

import { useParams } from "next/navigation";
import { useState } from "react";

type Item = {
    id: string
    name: string
    price: number
}

export default function SendItemization() {
    const params = useParams()
    const inquiry_id = params?.inquiry_id as string

    const [modalDisplay, setModalDisplay] = useState("none")
    const [items, setItems] = useState([{ name: "Mileage Driven", price: 0.00 }])
    const [currentName, setCurrentName] = useState("")
    const [currentPrice, setCurrentPrice] = useState("")

    function handleNameChange(value: string) {
        setCurrentName(value)
    }

    function handlePriceChange(value: string) {
        setCurrentPrice(value)
    }

    function handleUpdateItems() {
        const prevItems = items
        const newItem = { name: currentName, price: parseFloat(currentPrice).toFixed(2) }
        prevItems.push(newItem as any)
        console.log(items)
        setModalDisplay("none")
        setCurrentName("")
        setCurrentPrice("")
    }

    function handleDeleteRow(name: string) {
        console.log("deleting")
        const prevItems = items
        const filtered = prevItems.filter((item, indexOf) => item.name !== name)
        setItems(filtered)
        console.log(items)
    }

    async function sendItemization() {
        await fetch("/api/itemize", {
            headers: {
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify({lookup_id: inquiry_id, items: items})
        })
    }

    return (
        <main>
            <div className="itemizationContainer">
                {items.map((item, index) => (
                    <div onDoubleClick={() => handleDeleteRow(item.name)} className="itemrow">
                        <span>{item.name}</span>
                        <div className="v">
                            <span>{item.price}</span>
                            <div onClick={() => handleDeleteRow(item.name)} className="dltButton">
                            <svg style={{scale: 0.8}} viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" className="css-i6dzq1"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                            </div>
                        </div>
                    </div>
                ))}
                <div className="itemrow">
                    <span>Total:</span>
                    <span>${parseFloat(items.reduce((total, item) => total += parseFloat(item.price), 0)).toFixed(2)}</span>
                </div>
                <button onClick={() => { setModalDisplay("flex") }} className="addItemButton">Add Item</button>
                <button onClick={() => sendItemization()} style={{marginTop: "10px", backgroundColor: "rgb(213, 93, 93)"}} className="addItemButton">Finalize Itemization</button>
            </div>

            <div style={{ display: modalDisplay }} className="backdrop">
                <div className="addItemModal">
                    <label htmlFor="ItemName">Name:</label>
                    <input value={currentName} onChange={(e) => handleNameChange(e.target.value)} type="text" name="itemName" id="" placeholder="Full Synthetic Oil Change" />
                    <label htmlFor="ItemPrice">Price</label>
                    <input value={currentPrice} onChange={(e) => handlePriceChange(e.target.value)} type="number" name="itemPrice" id="" placeholder="0.00" />
                    <button style={{backgroundColor: "#0b0f1a", color: "white"}} onClick={() => handleUpdateItems()} className="modalButton">Add Item</button>
                    <button style={{backgroundColor: "rgb(213, 93, 93)", color: "white"}} onClick={() => setModalDisplay("none")} className="modalButton">Cancel</button>
                </div>
            </div>
        </main>
    )
}
