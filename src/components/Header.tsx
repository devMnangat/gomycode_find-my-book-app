import React from 'react'
import Navbar from './Navbar'

export default function Header() {
  return (
    <header className='w-full'>
      <Navbar />
        <h1>Welcome To FindMyBook App.</h1>
        <p>If you are a book enthusiast, you are definitely in the right place!!</p>
    </header>
  )
}
