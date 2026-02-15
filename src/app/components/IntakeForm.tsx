"use client";

import { useState } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Calendar } from "./ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { CalendarIcon, CheckCircle2, Search, Loader2, Clock, ShieldCheck, Phone } from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";
import "react-day-picker/dist/style.css";

interface FormData {
  // Customer Info
  firstName: string;
  lastName: string;
  email: string;
  phone: string;

  // Vehicle Info
  licensePlate: string;
  vehicleYear: string;
  vehicleMake: string;
  vehicleModel: string;
  mileage: string;

  // Service Info
  serviceType: string;
  issueDescription: string;
  preferredDate: Date | undefined;
  preferredTime: string;

  // Location
  address: string;
  city: string;
  zipCode: string;
}

interface VehicleData {
  year: string;
  make: string;
  model: string;
}

export function IntakeForm() {
  const [submitted, setSubmitted] = useState(false);
  const [lookingUp, setLookingUp] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    licensePlate: "",
    vehicleYear: "",
    vehicleMake: "",
    vehicleModel: "",
    mileage: "",
    serviceType: "",
    issueDescription: "",
    preferredDate: undefined,
    preferredTime: "",
    address: "",
    city: "",
    zipCode: "",
  });

  const handleLicensePlateLookup = async () => {
    setLookingUp(true)
    toast.error("Unable to access vehicle info at this time. Please enter details manually.")
    setLookingUp(false)
    return;
    if (!formData.licensePlate) {
      toast.error("Please enter a license plate number");
      return;
    }

    setLookingUp(true);

    const getVehicleInfo = async () => {
      const licensePlate = formData.licensePlate
      const response = await fetch("/lookup-plate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ licensePlate })
      }).then(async i => {
        return await i.json()
      })

      if (response.error) {
        toast.error("Error parsing license plate. Please enter details manually")
        return;
      } else {
        setFormData({
          ...formData,
          vehicleYear: response.year,
          vehicleMake: response.make,
          vehicleModel: response.model,
        });
        toast.success("Vehicle information retrieved!");
        setLookingUp(false);
      }

    }

    const states = [
      "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA",
      "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD",
      "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ",
      "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC",
      "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"
    ]

  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone) {
      toast.error("Please fill in all customer information");
      return;
    }

    if (!formData.vehicleYear || !formData.vehicleMake || !formData.vehicleModel) {
      toast.error("Please provide vehicle information");
      return;
    }

    if (!formData.serviceType || !formData.issueDescription) {
      toast.error("Please describe the service needed");
      return;
    }


    //! ADD SUMBMIT FORM FUNCTION 
    try {
      const response = await fetch("/api/service-request", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: { "Content-Type": "application/json" }
      })
      console.log(formData)
      const responseDate = await response.json()
      toast.success("Service request submitted! We'll contact you soon")
      setSubmitted(true)
      console.log(responseDate)
    } catch (error) {
      toast.error("Error submitting form. Please try again later.")
    }
  };

  if (submitted) {
    return (
      <section id="intake-form" className="py-24 bg-gradient-to-b from-[#0d1220] to-background relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-6 animate-pulse">
              <CheckCircle2 className="h-12 w-12 text-primary" />
            </div>
            <h2 className="text-4xl md:text-5xl mb-4 text-foreground">Request Received!</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Thank you for choosing RapidAuto Mobile Mechanic. We'll review your service request and contact you shortly to confirm your appointment.
            </p>
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="p-6 rounded-xl bg-card border border-border">
                <Clock className="h-8 w-8 text-primary mx-auto mb-3" />
                <h3 className="mb-2 text-sm text-foreground">Quick Response</h3>
                <p className="text-sm text-muted-foreground">Within 2 hours</p>
              </div>
              <div className="p-6 rounded-xl bg-card border border-border">
                <ShieldCheck className="h-8 w-8 text-primary mx-auto mb-3" />
                <h3 className="mb-2 text-sm text-foreground">Professional Service</h3>
                <p className="text-sm text-muted-foreground">Tech Certified</p>
              </div>
              <div className="p-6 rounded-xl bg-card border border-border">
                <Phone className="h-8 w-8 text-primary mx-auto mb-3" />
                <h3 className="mb-2 text-sm text-foreground">Need Help?</h3>
                <p className="text-sm text-muted-foreground">Call (540) 525-8425</p>
              </div>
            </div>
            <Button
              onClick={() => setSubmitted(false)}
              variant="outline"
              className="border-border hover:bg-accent"
            >
              Submit Another Request
            </Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="intake-form" className="py-24 bg-gradient-to-b from-[#0d1220] to-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <div className="inline-block px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
            <span className="text-sm text-primary">Get Started</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl mb-6 bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
            Request Service
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Fill out the form below and we'll get back to you with a quote and appointment options.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">
          <div className="space-y-8">
            {/* Customer Information */}
            <div className="p-8 rounded-2xl bg-card border border-border">
              <h3 className="mb-6 text-foreground flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <span className="text-sm text-primary">1</span>
                </div>
                Your Information
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">First Name *</Label>
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className="mt-2 bg-input border-border focus:border-primary"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name *</Label>
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    className="mt-2 bg-input border-border focus:border-primary"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="mt-2 bg-input border-border focus:border-primary"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="mt-2 bg-input border-border focus:border-primary"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Vehicle Information */}
            <div className="p-8 rounded-2xl bg-card border border-border">
              <h3 className="mb-6 text-foreground flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <span className="text-sm text-primary">2</span>
                </div>
                Vehicle Information
              </h3>

              {/* License Plate Lookup */}
              <div className="mb-6 p-6 rounded-xl bg-primary/5 border border-primary/20">
                <Label htmlFor="licensePlate">License Plate (Optional Auto-Fill)</Label>
                <div className="flex gap-2 mt-2">
                  <Input
                    id="licensePlate"
                    value={formData.licensePlate}
                    onChange={(e: any) => setFormData({ ...formData, licensePlate: e.target.value.toUpperCase() })}
                    placeholder="ABC1234"
                    className="bg-background/50 border-border focus:border-primary"
                  />


                  <Button
                    type="button"
                    onClick={handleLicensePlateLookup}
                    disabled={lookingUp}
                    className="bg-primary hover:bg-primary/90 text-primary-foreground"
                  >
                    {lookingUp ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Looking up...
                      </>
                    ) : (
                      <>
                        <Search className="mr-2 h-4 w-4" />
                        Lookup
                      </>
                    )}
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Enter your license plate to auto-fill vehicle details
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="vehicleYear">Year *</Label>
                  <Input
                    id="vehicleYear"
                    value={formData.vehicleYear}
                    onChange={(e) => setFormData({ ...formData, vehicleYear: e.target.value })}
                    placeholder="2020"
                    className="mt-2 bg-input border-border focus:border-primary"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="vehicleMake">Make *</Label>
                  <Input
                    id="vehicleMake"
                    value={formData.vehicleMake}
                    onChange={(e) => setFormData({ ...formData, vehicleMake: e.target.value })}
                    placeholder="Toyota"
                    className="mt-2 bg-input border-border focus:border-primary"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="vehicleModel">Model *</Label>
                  <Input
                    id="vehicleModel"
                    value={formData.vehicleModel}
                    onChange={(e) => setFormData({ ...formData, vehicleModel: e.target.value })}
                    placeholder="Camry"
                    className="mt-2 bg-input border-border focus:border-primary"
                    required
                  />
                </div>
              </div>

              <div className="mt-4">
                <Label htmlFor="mileage">Current Mileage</Label>
                <Input
                  id="mileage"
                  value={formData.mileage}
                  onChange={(e) => setFormData({ ...formData, mileage: e.target.value })}
                  placeholder="50,000"
                  className="mt-2 bg-input border-border focus:border-primary"
                />
              </div>
            </div>

            {/* Service Details */}
            <div className="p-8 rounded-2xl bg-card border border-border">
              <h3 className="mb-6 text-foreground flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <span className="text-sm text-primary">3</span>
                </div>
                Service Needed
              </h3>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="serviceType">Service Type *</Label>
                  <Select
                    value={formData.serviceType}
                    onValueChange={(value) => setFormData({ ...formData, serviceType: value })}
                  >
                    <SelectTrigger className="mt-2 bg-input border-border">
                      <SelectValue placeholder="Select a service" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="oil-change">Oil Change</SelectItem>
                      <SelectItem value="brake-service">Brake Service</SelectItem>
                      <SelectItem value="battery">Battery Replacement</SelectItem>
                      <SelectItem value="diagnostics">Diagnostics</SelectItem>
                      <SelectItem value="tune-up">Tune-Up</SelectItem>
                      <SelectItem value="alternator">Alternator Service</SelectItem>
                      <SelectItem value="starter">Starter Replacement</SelectItem>
                      <SelectItem value="fluid-change">Fluid Change</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="issueDescription">Describe the Issue *</Label>
                  <Textarea
                    id="issueDescription"
                    value={formData.issueDescription}
                    onChange={(e) => setFormData({ ...formData, issueDescription: e.target.value })}
                    placeholder="Tell us what's going on with your vehicle..."
                    className="mt-2 min-h-32 bg-input border-border focus:border-primary"
                    required
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label>Preferred Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          type="button"
                          variant="outline"
                          className="w-full justify-start text-left mt-2 bg-input border-border hover:bg-accent"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {formData.preferredDate ? format(formData.preferredDate, "PPP") : "Pick a date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={formData.preferredDate}
                          onSelect={(date:any) => setFormData({ ...formData, preferredDate: date })}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div>
                    <Label htmlFor="preferredTime">Preferred Time</Label>
                    <Select
                      value={formData.preferredTime}
                      onValueChange={(value) => setFormData({ ...formData, preferredTime: value })}
                    >
                      <SelectTrigger className="mt-2 bg-input border-border">
                        <SelectValue placeholder="Select time" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="morning">Morning (8am-12pm)</SelectItem>
                        <SelectItem value="afternoon">Afternoon (12pm-4pm)</SelectItem>
                        <SelectItem value="evening">Evening (4pm-7pm)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </div>

            {/* Location */}
            <div className="p-8 rounded-2xl bg-card border border-border">
              <h3 className="mb-6 text-foreground flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <span className="text-sm text-primary">4</span>
                </div>
                Service Location
              </h3>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="address">Street Address</Label>
                  <Input
                    id="address"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    placeholder="123 Main Street"
                    className="mt-2 bg-input border-border focus:border-primary"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      placeholder="Your City"
                      className="mt-2 bg-input border-border focus:border-primary"
                    />
                  </div>
                  <div>
                    <Label htmlFor="zipCode">ZIP Code</Label>
                    <Input
                      id="zipCode"
                      value={formData.zipCode}
                      onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                      placeholder="12345"
                      className="mt-2 bg-input border-border focus:border-primary"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              size="lg"
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-6 h-auto shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all duration-300 hover:scale-[1.02]"
            >
              Submit Service Request
            </Button>

            <p className="text-center text-sm text-muted-foreground">
              By submitting this form, you agree to be contacted regarding your service request.
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}
