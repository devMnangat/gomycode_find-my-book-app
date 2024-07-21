import Link from 'next/link'
import React from 'react'
import { FaFacebook, FaInstagramSquare } from 'react-icons/fa'
import { FaSquareXTwitter } from 'react-icons/fa6'

export function Footer() {
  return (
    <footer className='bg-theme-primary text-theme-secondary text-xl p-5 md:p-7'>
      <div className='flex justify-center md:justify-start gap-4 mb-4'>
      <Link href={"https://www.facebook.com/emmanuel.rotich.121398"} target="_blank" rel="noopener noreferrer"><FaFacebook className='hover:text-blue-700' /></Link>
      <Link href={""} target="_blank" rel="noopener noreferrer"><FaSquareXTwitter /></Link>
      <Link href={"https://www.instagram.com/pappi_chulo._/"} target="_blank" rel="noopener noreferrer"><FaInstagramSquare className='hover:text-red-500' /></Link>
      </div>
      <p className='text-center md:text-left'>© 2024 Emmanuel Mnangat. All Rights Reserved.</p>      
    </footer>
  )
}
