import React from 'react'
import { FaFacebook, FaInstagramSquare } from 'react-icons/fa'
import { FaSquareXTwitter } from 'react-icons/fa6'

export function Footer() {
  return (
    <footer className=' bg-orange-600 text-gray-300 text-xl p-5 md:p-7'>
      <a><FaFacebook /></a>
      <a><FaSquareXTwitter /></a>
      <a><FaInstagramSquare /></a>
      <p> 2024 Emmanuel Mnangat.all Rights Reserved</p>
    </footer>
  )
}
