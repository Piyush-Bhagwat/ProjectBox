'use client'
import React, { createContext, useState } from 'react'

export const projectContext = createContext(null);

const ProjectContext = ({children}) => {
    const [user, setUser] = useState(null)

    const val = {
        user, setUser
    }
  return (
    <projectContext.Provider value={val}>{children}</projectContext.Provider>
  )
}

export default ProjectContext