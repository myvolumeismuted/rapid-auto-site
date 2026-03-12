import { NextRequest, NextResponse } from "next/server";



export async function POST(request: NextRequest) {
  type VehicleCell = {Value: string, ValueId: string, Variable: string, VariableId: number}
  const { vin, licenseplate } = await request.json()
  const testVin = "1C4NJRFB2CD614979"
  const response = await fetch(`https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVin/${vin}?format=json`, {
    headers: {
      "Content-Type": "application/json"
    },
    method: "GET"
  })
  const VehicleData = (await response.json()).Results
  const year = VehicleData.find((item: VehicleCell) => item.Variable === "Model Year").Value
  const model = VehicleData.find((item: VehicleCell) => item.Variable === "Model").Value
  const make = VehicleData.find((item: VehicleCell) => item.Variable === "Make").Value
  const displacement = VehicleData.find((item: VehicleCell) => item.Variable === "Displacement (L)").Value
  return NextResponse.json({year, make, model, displacement: displacement})
}



//-----------------------------------------------------------





















interface PlateResult{
  year: number,
  make: string,
  model: string
  vin: string | null
}

export async function POSTer(request: NextRequest) {
  try {

    const { licensePlate } = await request.json();

    if (!licensePlate) {
      return NextResponse.json(
        { error: "License plate is required" },
        { status: 400 }
      );
    }

    // LOOKUP THE PLATE AND FIND THE VIN
    // USE THE VIN TO GET DETAILED VEHICLE INFORMATION

    // Mock response for development
    const mockData: Record<string, any> = {
      ABC123: { year: "2020", make: "Toyota", model: "Camry" },
      XYZ789: { year: "2019", make: "Honda", model: "Civic" },
      TEST01: { year: "2021", make: "Ford", model: "F-150" },
    };

    const vehicleData = mockData[licensePlate.toUpperCase()];

    if (!vehicleData) {
      return NextResponse.json(
        { error: "Vehicle not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(vehicleData);
  } catch (error) {
    console.error("License plate lookup error:", error);
    return NextResponse.json(
      { error: "Failed to lookup vehicle" },
      { status: 500 }
    );
  }
}