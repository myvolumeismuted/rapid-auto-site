export type InquiryData = {
    // USER INFO
    firstName?: string,
    lastName?: string,
    phone?: string

    // SERVICE INFORMATION
    issueDescription?: string,
    serviceType?: string,
    preferredDate?: string,
    preferredTime?: string,
    address?: string,
    city?: string
    zipCode?: string

    // VEHICLE INFO
    vehicleYear?: string
    vehicleMake?: string
    vehicelModel?: string,
    mileage?: string,
    vin?: string,
    licensePlate?: string,
    
    // OTHER INFO
    lookup_id?: string
} | {} | null