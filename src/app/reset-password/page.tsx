"use client";
import React from 'react'

export default function page({searchParams: {email, token}}: any) {

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        let postData = Object.fromEntries(formData);
        postData = {...postData, email, token};        
        const response = await fetch('/api/auth/reset-password', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(postData),
        });
        if(!response.ok) {
            const errorData = await response.json();
            console.log(errorData);
            return;
        }
        const data = await response.json();
        console.log(data);
    }
  return (
    <div>
      <form onSubmit={handleSubmit} className='w-full max-w-sm mx-auto flex flex-col gap-4 items-center justify-center'>
       <h2 className='text-xl'>Reset Password</h2>
        <div>
            <label htmlFor="">New Password</label>
        <input type="password" name='password' />
            </div>
        <button type="submit">Submit</button>
      </form>

    </div>
    
  )
}
