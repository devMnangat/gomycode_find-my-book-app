"use client"

import { signOut } from 'next-auth/react';
import React from 'react'

interface LogoutButtonProps {
  children: React.ReactNode
}
export default function LogoutButton({ children }: LogoutButtonProps) {
    const handleLogout = async () => {

        await signOut();
      }
    
    return (
    <button onClick={handleLogout}>
      {children}
    </button>
  )
}
