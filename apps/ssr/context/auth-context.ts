import { Context, createContext } from 'react'
import { IGlobalContext } from './IGlobalContext'

export const AuthContext: Context<IGlobalContext | null> = createContext<IGlobalContext | null>(null)
