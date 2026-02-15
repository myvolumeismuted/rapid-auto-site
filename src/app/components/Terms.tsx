import { Footer } from "./Footer";

const TermsAndConditions = {
    "business": "Rapid Auto - Mobile Mechanic",
    "effectiveDate": "Immediate",
    "termsOfService": {
        "1_Service Agreement": {
            "description": "By booking an appointment with Rapid Auto ('the Technician'), the customer ('Client') agrees to all terms listed below. The Technician reserves the right to refuse service for any reason, including unsafe working conditions or unrealistic expectations."
        },
        "2_Payment Terms": {
            "1": "A. Payment is required upfront before diagnostic or repair work begins.",
            "2": "B. Payment may be made via Cash App, Venmo, PayPal, Zelle, or other accepted digital methods.",
            "3": "C. No refunds will be issued once diagnostic or repair services have begun.",
            "4": "D. Chargebacks or payment disputes after completed service are considered theft of services and will be pursued legally."
        },
        "3_Diagnosis And Estimates": {
            "1": "A. All diagnostic results are based on the Technician’s best professional judgment.",
            "2": "B. A diagnosis does not guarantee the identification of every underlying issue.",
            "3": "C. Some problems may require additional labor or parts not initially expected.",
            "4": "D. The Client understands that vehicles may have multiple related or unrelated issues."
        },
        "4_Existing Damage And Vehicle Condition": {
            "1": "A. The Technician is not liable for pre-existing mechanical issues, rusted or corroded components, broken bolts due to age, or damage from previous improper repairs.",
            "2": "B. If a component fails during normal disassembly due to age or wear, the Client is responsible for replacement cost."
        },
        "5_Liability And Warranty Disclaimer": {
            "1": "A. All work is performed as-is with no warranty or guarantee, written or implied.",
            "2": "B. The Technician is not responsible for future failures, additional issues after service, or any transportation-related costs.",
            "3": "C. The Technician is not liable for injury, damage, loss, or mechanical failure occurring before, during, or after services."
        },
        "6_Parts Disclaimer": {
            "1": "A. When the Client provides their own parts, the Technician is not responsible for incorrect, defective, or poor-quality parts.",
            "2": "B. All parts must be paid for upfront when sourced by the Technician."
        },
        "7_Safety And Work Environment": {
            "1": "A. The Technician will not perform services in unsafe areas, poorly lit environments, or illegal parking locations.",
            "2": "B. The Technician may reschedule or cancel without penalty due to weather, safety, or inability to access the vehicle."
        },
        "8_Client Responsibilities": {
            "1": "A. The Client must provide accurate information about the vehicle and its symptoms.",
            "2": "B. The vehicle must be accessible at the appointment time.",
            "3": "C. The Client must remain available for communication during service.",
            "4": "D. The Client must pay for any additional parts or labor required."
        },
        "9_No Guarantees": {
            "1": "A. Rapid Auto does not guarantee that a vehicle will pass state inspection.",
            "2": "B. Rapid Auto does not guarantee that any repair will resolve all vehicle issues.",
            "3": "C. Rapid Auto does not guarantee that future problems will not arise."
        },
        "10_Indemnification": {
            "description": "The Client agrees to indemnify and hold harmless Rapid Auto and its Technician from any claims, damages, losses, or legal actions resulting from vehicle condition, use of the vehicle after service, or refusal to follow repair recommendations."
        },
        "11_Photo And Video Documentation": {
            "description": "Rapid Auto may record photos or videos of the vehicle for proof of work, protection against false claims, and training or marketing (with identifiable information omitted)."
        },
        "12_Acceptance Of Terms": {
            "description": "By booking any service with Rapid Auto, the Client acknowledges they have read, understood, and agreed to these Terms of Service in full."
        }
    }
}





export function Terms() {
    return (
        <>
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-[#0d1220] to-[#151925]">
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl"></div>
            </div>
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,black,transparent)]"></div>

            <div className="toscontainer">
                <h1 style={{fontSize:"4vw", marginBottom: 40}}>Terms of Service</h1>
                {Object.keys(TermsAndConditions.termsOfService).map((key) => {
                    const section = (TermsAndConditions.termsOfService as any)[key];

                    return (
                        <div key={key} style={{ marginBottom: "20px" }}>
                            {/* Section title */}
                            <h2>{key.replace(/_/g, ". ")}</h2>

                            {/* Section contents */}
                            {typeof section === "string" ? (
                                <p>{section}</p>
                            ) : (
                                Object.keys(section).map((line, idx) => (
                                    <p key={idx}>{section[line]}</p>
                                ))
                            )}
                        </div>
                    );
                })}
            </div>
        </section>

        <Footer></Footer></>
    )
}