// Hook (use-auth.js)
import React, { useState, useEffect, useContext, createContext } from 'react'
import axios from 'axios'
// @ts-ignore
import { Employee } from '../../../backend/node_modules/prisma/prisma-client'

type UserType = Omit<Employee, 'password'>

interface AuthContextType {
  user: UserType | null
  login: (email: string, password: string) => any
  logout: () => any
}

const AuthContext = createContext<AuthContextType | null>(null)

export const AuthProvider: React.FC = ({ children }) => {
  const auth = useProvideAuth()
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  return useContext(AuthContext)
}

const useProvideAuth = (): AuthContextType => {
  const [user, setUser] = useState<UserType | null>(null)
  const login = async (email: string, password: string) => {
    try{
      axios({
        url: 'http://localhost:5000/login',
        method: 'POST',
        data: {
          email,
          password,
        },
      }).then(res => setUser(res.data))
    }
    catch(err){
      return err
    }
  }
  const logout = () => {
    localStorage.removeItem('authorization')
    setUser(null)
  }
  useEffect(() => {
    console.log('here');
    const token = localStorage.getItem('authorization')
    if(!token) return
    axios({
      url: 'http://localhost:5000/authenticate',
      method: 'POST',
      data: {
        token 
      }
    })
    .then(res => {
      console.log('res :>> ', res);
      setUser(res.data.user)
    })
  }, [])
  return {
    login,
    logout,
    user,
  }
}
