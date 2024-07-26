import NewProjectForm from '@/components/NewProjectForm'
import React from 'react'

const NewPage = () => {
  return (
    <div className='mx-4 md:mx-40'>

        <h1 className='text-[2em] text-neutral-200 md:text-[3em] font-black mt-2 mb-10'>Add New Project: </h1>

        <NewProjectForm />
  
    </div>
  )
}

export default NewPage