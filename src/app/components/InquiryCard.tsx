"use client";

export type Inquiry = {
    id: string;
  
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  
    address: string;
    city: string;
    zipCode: string;
  
    vehicleYear: number;
    vehicleMake: string;
    vehicleModel: string;
    mileage: string;
  
    serviceType: string;
    issueDescription: string;
  
    preferredDate: string;
    preferredTime: string;
  
    licensePlate: string | null;
    lookup_id: string | null;
  
    status: "new" | "contacted" | "quoted" | "scheduled" | "completed" | "closed";
    priority: number;
  
    created_at: string;
    updated_at: string;
};
  

type Props = {
  item: Inquiry;
  onEdit?: (id: string) => void;
  onQuote?: (id: string) => void;
  onApprove?: (id: string) => void;
};

export default function InquiryCard({ item, onEdit, onQuote, onApprove }: Props) {
  const fullName = `${item.firstName} ${item.lastName}`;
  const vehicle = `${item.vehicleYear} ${item.vehicleMake} ${item.vehicleModel}`;

  const submittedDate = new Date(item.created_at).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <article className="InquiryCard">
      {/* Header */}
      <header className="InquiryCard__header">
        <h3>
          <span className="InquiryCard__name">{fullName}</span>
          <span className="InquiryCard__dot">•</span>
          <span className="InquiryCard__date">Submitted {submittedDate}</span>
        </h3>
      </header>

      {/* Body */}
      <section className="InquiryCard__body">
        <div className="InquiryCard__section">
          <label>Service Requested</label>
          <div className="InquiryCard__value">
            {item.serviceType.toUpperCase()}
          </div>
        </div>

        <div className="InquiryCard__divider" />

        <div className="InquiryCard__section">
          <label>Vehicle</label>
          <div className="InquiryCard__value">{vehicle}</div>
          <div className="InquiryCard__sub">
            Mileage: {item.mileage} • Plate: {item.licensePlate ?? "N/A"}
          </div>
        </div>

        <div className="InquiryCard__divider" />

        <div className="InquiryCard__section">
          <label>Issue Description</label>
          <p className="InquiryCard__description">
            {item.issueDescription}
          </p>
        </div>

        <div className="InquiryCard__divider" />

        <div className="InquiryCard__section">
          <label>Customer</label>
          <div>{item.phone}</div>
          <div>{item.email}</div>
          <div className="InquiryCard__sub">
            {item.address}, {item.city}, {item.zipCode}
          </div>
        </div>

        <div className="InquiryCard__divider" />

        <div className="InquiryCard__statusRow">
          <span>Status</span>
          <span className={`InquiryCard__status InquiryCard__status--${item.status}`}>
            {item.status}
          </span>
        </div>
      </section>

      {/* Actions */}
      <footer className="InquiryCard__actions">
        <button onClick={() => onEdit?.(item.id)}>Edit</button>
        <button onClick={() => onQuote?.(item.id)}>Send Quote</button>
        <button onClick={() => onApprove?.(item.id)}>Approve</button>
      </footer>
    </article>
  );
}
