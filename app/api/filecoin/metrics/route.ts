import { NextRequest, NextResponse } from 'next/server'

interface FilecoinMetricsResponse {
  filPrice: number
  totalStorage: number // in EiB
  activeDeals: number // in millions
  nodes: number
  networkPower: number // in PiB
  activeMiners: number
  activeClients: number
  dealsPerMinute: number
  velocity402: number
}

export async function GET(request: NextRequest) {
  // Mock data - в продакшене здесь будет реальный запрос к Filecoin API
  const metrics: FilecoinMetricsResponse = {
    filPrice: 4.82 + (Math.random() * 0.2 - 0.1),
    totalStorage: Number((11.2 + (Math.random() * 0.1 - 0.05)).toFixed(1)),
    activeDeals: Number((2.3 + (Math.random() * 0.1 - 0.05)).toFixed(1)),
    nodes: 4500 + Math.floor(Math.random() * 10) - 5,
    networkPower: Number((18.5 + (Math.random() * 0.2 - 0.1)).toFixed(1)),
    activeMiners: 1850 + Math.floor(Math.random() * 10) - 5,
    activeClients: 12500 + Math.floor(Math.random() * 50) - 25,
    dealsPerMinute: 12 + Math.floor(Math.random() * 3) - 1,
    velocity402: 82 + Math.floor(Math.random() * 5) - 2,
  }

  return NextResponse.json(metrics)
}

