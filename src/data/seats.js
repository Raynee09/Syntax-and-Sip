// Seat data — 18 seats
// availability: "available" | "reserved" | "occupied"
// seatType: "solo" | "group" | "booth" | "bar"
// wifiSpeed: number (Mbps) — Fast Wi-Fi filter: >= 100
// noiseLevel: "quiet" | "moderate" | "lively"
// hasPower: boolean
// naturalLighting: boolean  (Window filter)
// trafficLevel: "low" | "moderate" | "high"
// pricePerHour: number (INR)
// mapX, mapY: SVG coordinates within viewBox 0 0 800 600

export const seats = [
  // ── Window solo seats (top wall, x ~100–680, y ~80)
  {
    id: 'S01', label: 'Window Nook A', availability: 'available',
    seatType: 'solo', wifiSpeed: 150, noiseLevel: 'quiet',
    hasPower: true, naturalLighting: true, trafficLevel: 'low',
    pricePerHour: 250, mapX: 130, mapY: 90,
  },
  {
    id: 'S02', label: 'Window Nook B', availability: 'available',
    seatType: 'solo', wifiSpeed: 120, noiseLevel: 'quiet',
    hasPower: false, naturalLighting: true, trafficLevel: 'low',
    pricePerHour: 200, mapX: 230, mapY: 90,
  },
  {
    id: 'S03', label: 'Window Nook C', availability: 'reserved',
    seatType: 'solo', wifiSpeed: 110, noiseLevel: 'quiet',
    hasPower: true, naturalLighting: true, trafficLevel: 'low',
    pricePerHour: 250, mapX: 330, mapY: 90,
  },
  {
    id: 'S04', label: 'Window Nook D', availability: 'available',
    seatType: 'solo', wifiSpeed: 80, noiseLevel: 'moderate',
    hasPower: true, naturalLighting: true, trafficLevel: 'moderate',
    pricePerHour: 200, mapX: 430, mapY: 90,
  },
  {
    id: 'S05', label: 'Window Nook E', availability: 'available',
    seatType: 'solo', wifiSpeed: 160, noiseLevel: 'quiet',
    hasPower: true, naturalLighting: true, trafficLevel: 'low',
    pricePerHour: 300, mapX: 530, mapY: 90,
  },
  {
    id: 'S06', label: 'Window Nook F', availability: 'occupied',
    seatType: 'solo', wifiSpeed: 130, noiseLevel: 'quiet',
    hasPower: false, naturalLighting: true, trafficLevel: 'low',
    pricePerHour: 200, mapX: 660, mapY: 90,
  },
  // ── Group tables — centre
  {
    id: 'G01', label: 'Group Table 1', availability: 'available',
    seatType: 'group', wifiSpeed: 200, noiseLevel: 'moderate',
    hasPower: true, naturalLighting: false, trafficLevel: 'moderate',
    pricePerHour: 400, mapX: 200, mapY: 270,
  },
  {
    id: 'G02', label: 'Group Table 2', availability: 'available',
    seatType: 'group', wifiSpeed: 180, noiseLevel: 'moderate',
    hasPower: true, naturalLighting: false, trafficLevel: 'moderate',
    pricePerHour: 400, mapX: 400, mapY: 270,
  },
  {
    id: 'G03', label: 'Group Table 3', availability: 'reserved',
    seatType: 'group', wifiSpeed: 90, noiseLevel: 'lively',
    hasPower: false, naturalLighting: false, trafficLevel: 'high',
    pricePerHour: 350, mapX: 600, mapY: 270,
  },
  {
    id: 'G04', label: 'Group Table 4', availability: 'available',
    seatType: 'group', wifiSpeed: 210, noiseLevel: 'lively',
    hasPower: true, naturalLighting: false, trafficLevel: 'high',
    pricePerHour: 450, mapX: 400, mapY: 390,
  },
  // ── Booth seats — side wall (right)
  {
    id: 'B01', label: 'Corner Booth A', availability: 'available',
    seatType: 'booth', wifiSpeed: 75, noiseLevel: 'quiet',
    hasPower: true, naturalLighting: false, trafficLevel: 'low',
    pricePerHour: 300, mapX: 690, mapY: 180,
  },
  {
    id: 'B02', label: 'Corner Booth B', availability: 'available',
    seatType: 'booth', wifiSpeed: 85, noiseLevel: 'quiet',
    hasPower: true, naturalLighting: false, trafficLevel: 'low',
    pricePerHour: 300, mapX: 690, mapY: 360,
  },
  {
    id: 'B03', label: 'Corner Booth C', availability: 'occupied',
    seatType: 'booth', wifiSpeed: 100, noiseLevel: 'moderate',
    hasPower: false, naturalLighting: false, trafficLevel: 'moderate',
    pricePerHour: 250, mapX: 690, mapY: 480,
  },
  {
    id: 'B04', label: 'Corner Booth D', availability: 'available',
    seatType: 'booth', wifiSpeed: 115, noiseLevel: 'quiet',
    hasPower: true, naturalLighting: false, trafficLevel: 'low',
    pricePerHour: 300, mapX: 570, mapY: 480,
  },
  // ── Bar seats — left wall
  {
    id: 'R01', label: 'Bar Stool 1', availability: 'available',
    seatType: 'bar', wifiSpeed: 50, noiseLevel: 'lively',
    hasPower: false, naturalLighting: false, trafficLevel: 'high',
    pricePerHour: 150, mapX: 110, mapY: 200,
  },
  {
    id: 'R02', label: 'Bar Stool 2', availability: 'available',
    seatType: 'bar', wifiSpeed: 55, noiseLevel: 'lively',
    hasPower: true, naturalLighting: false, trafficLevel: 'high',
    pricePerHour: 150, mapX: 110, mapY: 300,
  },
  {
    id: 'R03', label: 'Bar Stool 3', availability: 'reserved',
    seatType: 'bar', wifiSpeed: 45, noiseLevel: 'lively',
    hasPower: false, naturalLighting: false, trafficLevel: 'high',
    pricePerHour: 150, mapX: 110, mapY: 400,
  },
  {
    id: 'R04', label: 'Bar Stool 4', availability: 'available',
    seatType: 'bar', wifiSpeed: 60, noiseLevel: 'moderate',
    hasPower: true, naturalLighting: false, trafficLevel: 'moderate',
    pricePerHour: 180, mapX: 110, mapY: 490,
  },
]
