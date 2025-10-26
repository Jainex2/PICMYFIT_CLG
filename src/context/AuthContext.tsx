import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { User } from '@supabase/supabase-js'
import { authService } from '../services/authService'

interface AuthContextType {
  user: User | null
  userProfile: any | null
  loading: boolean
  signUp: (data: any) => Promise<any>
  signIn: (data: any) => Promise<any>
  signOut: () => Promise<void>
  updateProfile: (updates: any) => Promise<any>
  refreshProfile: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [userProfile, setUserProfile] = useState<any | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true

    // Get initial session with timeout
    const getInitialSession = async () => {
      try {
        // Set a timeout for the initial session check
        const sessionPromise = authService.getCurrentSession()
        const timeoutPromise = new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Session timeout')), 5000)
        )

        const session = await Promise.race([sessionPromise, timeoutPromise]) as any
        
        if (mounted && session?.user) {
          setUser(session.user)
          // Load profile in background, don't wait for it
          loadUserProfile(session.user.id).catch(console.error)
        }
      } catch (error) {
        console.error('Error getting initial session:', error)
        // Don't show error to user, just continue without session
      } finally {
        if (mounted) {
          setLoading(false)
        }
      }
    }

    getInitialSession()

    // Listen for auth changes
    const { data: { subscription } } = authService.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, session?.user?.email)
        
        if (!mounted) return

        if (event === 'SIGNED_IN' && session?.user) {
          setUser(session.user)
          setLoading(false)
          // Load profile in background
          loadUserProfile(session.user.id).catch(console.error)
        } else if (event === 'SIGNED_OUT') {
          setUser(null)
          setUserProfile(null)
          setLoading(false)
        } else if (event === 'TOKEN_REFRESHED' && session?.user) {
          setUser(session.user)
          if (!userProfile) {
            loadUserProfile(session.user.id).catch(console.error)
          }
        }
      }
    )

    return () => {
      mounted = false
      subscription.unsubscribe()
    }
  }, [])

  const loadUserProfile = async (userId: string) => {
    try {
      const { data, error } = await authService.getUserProfile(userId)
      if (data && !error) {
        setUserProfile(data)
      } else if (error) {
        console.error('Error loading user profile:', error)
      }
    } catch (error) {
      console.error('Error loading user profile:', error)
    }
  }

  const signUp = async (signUpData: any) => {
    setLoading(true)
    try {
      const result = await authService.signUp(signUpData)
      return result
    } finally {
      setLoading(false)
    }
  }

  const signIn = async (signInData: any) => {
    setLoading(true)
    try {
      const result = await authService.signIn(signInData)
      if (result.user && !result.error) {
        setUser(result.user)
        // Load profile in background
        loadUserProfile(result.user.id).catch(console.error)
      }
      return result
    } finally {
      setLoading(false)
    }
  }

  const signOut = async () => {
    setLoading(true)
    try {
      await authService.signOut()
    } catch (error) {
      console.error('Error during sign out:', error)
      // Continue with local state cleanup even if API call fails
    } finally {
      // Always clear local state regardless of API call success/failure
      setUser(null)
      setUserProfile(null)
      setLoading(false)
    }
  }

  const updateProfile = async (updates: any) => {
    if (!user) return { error: 'No user logged in' }
    
    const result = await authService.updateUserProfile(user.id, updates)
    if (result.data && !result.error) {
      setUserProfile(result.data)
    }
    return result
  }

  const refreshProfile = async () => {
    if (user) {
      await loadUserProfile(user.id)
    }
  }

  const value = {
    user,
    userProfile,
    loading,
    signUp,
    signIn,
    signOut,
    updateProfile,
    refreshProfile
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}