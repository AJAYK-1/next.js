import Link from 'next/link'
import React from 'react'

const Users = () => {
  return (
    <>
      <h1 className='ml-20 mt-10'>Users Dashboard</h1>
      <ul className='ml-20 mt-10'>
        <li><Link href={'/Users/1'}> User 1 </Link></li>
        <li><Link href={'/Users/2'}> User 2 </Link></li>
        <li><Link href={'/Users/3'}> User 3 </Link></li>
        <li><Link href={'/Users/4'}> User 4 </Link></li>
      </ul>
    </>
  )
}

export default Users