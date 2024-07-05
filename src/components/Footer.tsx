import Link from 'next/link'
import React from 'react'
import { FaFacebook, FaInstagramSquare } from 'react-icons/fa'
import { FaSquareXTwitter } from 'react-icons/fa6'

export function Footer() {
  return (
    <footer className=' bg-theme-primary text-theme-secondary text-xl p-5 md:p-7'>
      <div className='flex gap-4'>
      <Link href={"https://www.facebook.com/emmanuel.rotich.121398"}><FaFacebook className='hover:text-blue-700' /></Link>
      <Link href={""}><FaSquareXTwitter /></Link>
      <Link href={"https://www.instagram.com/pappi_chulo._/"}><FaInstagramSquare className='hover:text-red-500' /></Link>
      </div>
      <p> 2024 Emmanuel Mnangat.all Rights Reserved</p>
    </footer>
  )
}
