"use client"

import { useEffect, useMemo, useState } from "react"
import { useParams } from "next/navigation"

type QuoteOption = {
  id: string
  label: string // Good / Better / Best
  title: string // Full Synthetic / Conventional / High Mileage etc
  price: string // keep as string for input; parse when needed
  notes: string
}

function uid() {
  return Math.random().toString(36).slice(2) + Date.now().toString(36)
}

export default function InquiryPage() {
  const params = useParams()
  const inquiry_id = params?.inquiry_id as string

  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [openedQuote, setOpenedQuote] = useState(false)

  // Quote modal state
  const [quoteOpen, setQuoteOpen] = useState(false)
  const [options, setOptions] = useState<QuoteOption[]>([
    { id: uid(), label: "Good", title: "Conventional Oil", price: "", notes: "" },
    { id: uid(), label: "Better", title: "High Mileage Oil", price: "", notes: "" },
    { id: uid(), label: "Best", title: "Full Synthetic Oil", price: "", notes: "" },
  ])

  const selectedTotal = useMemo(() => {
    // optional, you can compute min/avg/etc. For now just return nothing.
    return null
  }, [options])

  useEffect(() => {
    if (!inquiry_id) return

    fetch(`/api/inquiries/${inquiry_id}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    })
      .then(async (response) => {
        if (!response.ok) {
          setError(true)
          setLoading(false)
          return
        }
        const dataRes = await response.json().catch(() => ({ err: true }))
        if (dataRes?.err) setError(true)
        setData(dataRes.data)
        setLoading(false)
      })
      .catch(() => setError(true))
  }, [inquiry_id])

  function formatDate(str: string) {
    const date = new Date(str)
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`
  }

  function updateOption(id: string, patch: Partial<QuoteOption>) {
    setOptions((prev) => prev.map((o) => (o.id === id ? { ...o, ...patch } : o)))
  }

  function addOption() {
    setOptions((prev) => [
      ...prev,
      { id: uid(), label: `Option ${prev.length + 1}`, title: "", price: "", notes: "" },
    ])
  }

  function removeOption(id: string) {
    setOptions((prev) => prev.filter((o) => o.id !== id))
  }

  function closeQuote() {
      setQuoteOpen(false)
      console.log(options)
  }

  async function saveQuote() {
    // OPTIONAL: wire this to your API route when you’re ready
    // Example: POST /api/inquiries/:id/quote
    // Body: { options }
    try {
      const payload = {
        inquiry_id,
        options: options.map((o) => ({
          ...o,
          price: o.price.trim(),
        })),
      }

      // Uncomment when your endpoint exists:
      /*
      const res = await fetch(`/api/inquiries/${inquiry_id}/quote`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload),
      })

      if (!res.ok) throw new Error("Save failed")
      */

      // For now:
      console.log("Quote payload:", payload)
      closeQuote()
    } catch (e) {
      console.error(e)
      alert("Could not save quote (endpoint not wired yet).")
    }
  }
    
    async function sendQuote() {
        const response = await fetch("/api/quotes/send", {
            headers: {
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify({quote: options, lookup_id: data.lookup_id})
        })
        const { success } = await response.json().catch(error => console.log(error))
        if (success) console.log("successfully sent the quote to the customer")
    }

  
  
  function getServiceDateString(date: string, dayTime: string) {
    const day = new Date(date)
    const months = ["January", "Febuary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    return `${months[day.getMonth()]} ${day.getDate()}, ${day.getFullYear()} ${dayTime.toUpperCase()}`
  }

  

  return (
    <>
      {(error || loading) && (
        <div style={{ width: "100dvw", height: "100dvh", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div className="loader"></div>
        </div>
      )}

      {!loading && !error && (
        <main>
          <div className="custView">
            <div className="customerContent">

              {/* CARD HEADER */}
              <div className="card-header">
                <div className="row">
                  <span>{`Inquiry ID: ${data.lookup_id}`}</span>
                  <button className="cancelBtn">Cancel</button>
                </div>
                <span className="creationDate">{`Created At: ${formatDate(data.created_at)}`}</span>
              </div>
              <div className="cust-info-container">
                <div className="user-info info">
                  <span className="custTitle">Customer Information</span>
                  <span className="custName" style={{marginBottom: "25px"}}>{data.firstName + " " + data.lastName}</span>
                  <span><svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" className="css-i6dzq1"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>{data.email}</span>
                  <span><svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" className="css-i6dzq1"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>{data.phone}</span>
                  <div className="divider"></div>
                  <span>{getServiceDateString(data.preferredDate, data.preferredTime)}</span>
                  <div className="divider"></div>
                </div>

                {/* VEHICLE INFORMATION CENTER */}
                <div className="vehicle-info info">
                  <span className="custTitle">Vehicle Information</span>
                  <div className="row">
                    <span className="custDesc">Make/Model:</span>
                    <span>{`${data.vehicleMake} ${data.vehicleModel}`}</span>
                  </div>

                  <div className="row">
                    <span className="custDesc">Year:</span>
                    <span>{`${data.vehicleYear}`}</span>
                  </div>

                  <div className="row">
                    <span className="custDesc">License Plate:</span>
                    <span>{`${data.licensePlate}`}</span>
                  </div>

                  <div className="row">
                    <span className="custDesc">Mileage:</span>
                    <span>{`${data.mileage} miles`}</span>
                  </div>

                  <div className="divider"></div>

                  <span style={{marginBottom: "15px"}} className="custTitle">Issue Description</span>
                  <textarea value={data.issueDescription} name="" id=""></textarea>
                  <div style={{ marginTop: "25px" }} className="divider"></div>
                  <button onClick={() => [setQuoteOpen(true), setOpenedQuote(true)]} className="quoteAction skel">Create Quote</button>
                  <button onClick={() => openedQuote ? sendQuote() : () => {}} disabled={openedQuote ? false : true} className={`quoteAction ${openedQuote ? "" : "disabledAction"}`}>Send Quote</button>
                </div>
              </div>
            </div>

          </div>
        </main>
      )}

      {/* QUOTE MODAL */}
      {quoteOpen && (
        <div className="modalOverlay" onMouseDown={closeQuote}>
          <div className="modalCard" onMouseDown={(e) => e.stopPropagation()}>
            <div className="modalHeader">
              <div className="modalTitle">
                <h2>Quote Options</h2>
                <p>Good / Better / Best (add as many options as you want)</p>
              </div>

              <button className="iconBtn" onClick={closeQuote} aria-label="Close">
                ✕
              </button>
            </div>

            <div className="modalBody">
              <div className="optionList">
                {options.map((opt, idx) => (
                  <div className="optionCard" key={opt.id}>
                    <div className="optionTopRow">
                      <div className="field">
                        <label>Label</label>
                        <input
                          value={opt.label}
                          onChange={(e) => updateOption(opt.id, { label: e.target.value })}
                          placeholder="Good / Better / Best"
                        />
                      </div>

                      <div className="field">
                        <label>Price</label>
                        <div className="moneyInput">
                          <span>$</span>
                          <input
                            inputMode="decimal"
                            value={opt.price}
                            onChange={(e) => updateOption(opt.id, { price: e.target.value })}
                            placeholder="0.00"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="field">
                      <label>Title</label>
                      <input
                        value={opt.title}
                        onChange={(e) => updateOption(opt.id, { title: e.target.value })}
                        placeholder="Full Synthetic / Conventional / High Mileage..."
                      />
                    </div>

                    <div className="field">
                      <label>Notes (optional)</label>
                      <textarea
                        value={opt.notes}
                        onChange={(e) => updateOption(opt.id, { notes: e.target.value })}
                        placeholder="What’s included? Oil qty, filter, labor, warranty, etc."
                        rows={3}
                      />
                    </div>

                    <div className="optionFooter">
                      <span className="optionIndex">{`Option ${idx + 1}`}</span>
                      <button className="btnDanger" onClick={() => removeOption(opt.id)} disabled={options.length <= 1}>
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <button className="btnGhost fullWidth" onClick={addOption}>
                + Add another option
              </button>
            </div>

            <div className="modalFooter">
              <button className="btnGhost" onClick={closeQuote}>
                Cancel
              </button>
              <button className="btnPrimary" onClick={saveQuote}>
                Save Quote
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
