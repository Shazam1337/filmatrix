'use client'

import { useState } from 'react'
import Header from '@/components/Header'
import PortalAuth from '@/components/PortalAuth'
import PortalDashboard from '@/components/PortalDashboard'
import { UserData } from '@/types'

export default function PortalPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userData, setUserData] = useState<UserData | null>(null)

  const handleAuth = (data: UserData) => {
    setUserData(data)
    setIsAuthenticated(true)
  }

  if (!isAuthenticated) {
    return (
      <>
        <Header />
        <PortalAuth onAuth={handleAuth} />
      </>
    )
  }

  return (
    <>
      <Header />
      {userData && <PortalDashboard userData={userData} />}
    </>
  )
}

