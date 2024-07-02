import React from 'react'
import Navbar from './Navbar'

export default function Header() {
  return (
    <header className='w-full'>
      <Navbar />
      <div className='flex flex-col items-center mt-5 md:mt-7 gap-4'>
        <h1 className='text-2xl md:text-4xl font-bold'>Welcome To FindMyBook App.</h1>
        <p className='text-xl md:text-2xl'>If you are a book enthusiast, you are definitely in the right place!!</p>
        </div>
    </header>
  )
}
