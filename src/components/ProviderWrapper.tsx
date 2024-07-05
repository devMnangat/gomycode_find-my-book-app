"use client"
import { SessionProvider } from 'next-auth/react'
import React, { PropsWithChildren } from 'react'

export default function ProviderWrapper({children}: PropsWithChildren) {
  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  )
}
