"use client"

import { useEffect } from "react"

export default function PaymentPortal() {
    const mockOrder = {
        items: [
            { name: "Oil Charge", price: 19.99, tax: 1.22 },
            { name: "Mileage Charge", price: 3.45, tax: 0 },
            { name: "Labor Charge", price: 16.66, tax: 0.90 }
        ]
    }

    const totalTax = (mockOrder.items.reduce((total, item) => total = total + item.tax, 0)).toFixed(2)

    function getTotal() {
        const prices = mockOrder.items.map((item, index) => item.price)
        return prices.reduce((total, item) => total += item, 0).toFixed(2)
    }

    useEffect(() => {
        getTotal()
    }, [])


    return (
        <main>
            <div className="paymentPortalContainer">

                <div className="overView">
                    <h1>Order Summary:</h1>
                    <div className="orderItems">
                        {mockOrder.items.map((item, index) => (
                            <div className="textrow">
                                <span>{item.name}</span>
                                <span>${item.price}</span>
                            </div>
                        ))}
                        <div className="textrow">
                            <span>tax</span>
                            <span>{totalTax}</span>
                        </div>

                        <div style={{marginBottom: "100px"}} className="textrow">
                            <span style={{fontWeight: 700}} className="total">Total Due:</span>
                            <span style={{fontWeight: 700}} className="total">{getTotal()}</span>
                        </div>
                    </div>



                    <h1>Payment</h1>
                </div>


            </div>
        </main>
    )
}



/**
 * Hood Replacement: 100.98
 * Wipers Replacement: 55.00
 * Air Duct Hoses Replacement: 92.91
 * Total Basic: 248.89
 * 
 * Tires: 500.00
 * Motor Mounts: ~ 90.95
 * Total All: 1148.89
 */