export interface UserData {
  method: 'email' | 'wallet'
  identifier: string
  signal: number
  referrals: number
  whitelistStatus: 'PENDING' | 'APPROVED' | 'REJECTED'
  rewards: number
}

export interface Project {
  id: string
  name: string
  description: string
  volume: number
  ctr: number
  velocity402: number
  status: 'OPEN' | 'UPCOMING' | 'CLOSED'
  about?: string
  team?: TeamMember[]
  roadmap?: RoadmapItem[]
}

export interface TeamMember {
  name: string
  role: string
  bio: string
}

export interface RoadmapItem {
  quarter: string
  milestone: string
}

export interface ChartDataPoint {
  time: string
  velocity: number
  volume: number
}

