import React from 'react'
import Navbar from './Navbar'

export default function Header() {
  return (
    <header className='w-full bg-theme-natural'>
      <Navbar />
      <div className='flex flex-col items-center gap-4 py-3'>
        <h1 className='text-2xl md:text-4xl font-bold'>Welcome To FindMyBook App.</h1>
        <p className='text-xl md:text-2xl'>If you are a book enthusiast, you are definitely in the right place!!</p>
        </div>
    </header>
  )
}
