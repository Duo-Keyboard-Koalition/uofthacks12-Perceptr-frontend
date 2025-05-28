// components/UserProvider.tsx
'use client'

import { createContext, useState, useContext, ReactNode } from 'react'

interface User {
  id: string
  name: string
  email: string
}

interface UserContextProps {
  user: User | null
  error: string | null
  setUser: (user: User | null) => void
  setError: (error: string | null) => void
}

const UserContext = createContext<UserContextProps | undefined>(undefined)

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [error, setError] = useState<string | null>(null)

  return (
    <UserContext.Provider value={{ user, error, setUser, setError }}>
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider')
  }
  return context
}