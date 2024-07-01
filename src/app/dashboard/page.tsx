import UserInfo from '@/components/UserInfo'
import { getServerAuthSession } from '@/server/auth'
import { IUser } from '@/types/user'
import React from 'react'

export default async function Dashboard() {
  const session = await getServerAuthSession()
  // console.log({session})
  return (
    <div>
      Dashboard
      <div>

      <UserInfo user={session?.user as IUser} />
      </div>
    </div>
  )
}
