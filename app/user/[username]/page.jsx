import React from 'react'

// Sunnnnnnnnnnnnnnnnnnnnnnnnnnnnnn!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// for text color we are user text-neutral-200 and background color jo hai vo hai bg-neutral-900



const ProfilePage = ({params}) => {
  return (
    <div className='p-16'>
        <h1 className='text-neutral-200 text-3xl '>Profile page of</h1>
        <h2 className='text-neutral-200 text-2xl '>{params.username} (username)</h2>
    </div>
  )
}

export default ProfilePage