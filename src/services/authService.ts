import { supabase } from '../lib/supabase'
import type { User, AuthError } from '@supabase/supabase-js'

export interface SignUpData {
  email: string
  password: string
  username: string
  fullName?: string
}

export interface SignInData {
  email: string
  password: string
}

export interface AuthResponse {
  user: User | null
  error: AuthError | null
}

class AuthService {
  // Sign up with email confirmation
  async signUp({ email, password, username, fullName }: SignUpData): Promise<AuthResponse> {
    try {
      // First check if username is already taken
      const { data: existingUser } = await supabase
        .from('user_profiles')
        .select('username')
        .eq('username', username)
        .single()

      if (existingUser) {
        return {
          user: null,
          error: { message: 'Username already taken' } as AuthError
        }
      }

      // Get current URL for redirect - use current domain instead of localhost
      const currentDomain = window.location.origin
      const redirectUrl = `${currentDomain}/login?confirmed=true`

      // Sign up user with redirect URL
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            username,
            full_name: fullName
          },
          emailRedirectTo: redirectUrl
        }
      })

      if (error) {
        return { user: null, error }
      }

      return { user: data.user, error: null }
    } catch (error) {
      return {
        user: null,
        error: { message: 'An unexpected error occurred' } as AuthError
      }
    }
  }

  // Sign in with email/username and password
  async signIn({ email, password }: SignInData): Promise<AuthResponse> {
    try {
      // Check if input is username or email
      let loginEmail = email
      
      if (!email.includes('@')) {
        // It's a username, get the email
        const { data: profile } = await supabase
          .from('user_profiles')
          .select('email')
          .eq('username', email)
          .single()

        if (!profile) {
          return {
            user: null,
            error: { message: 'Username not found' } as AuthError
          }
        }
        loginEmail = profile.email
      }

      const { data, error } = await supabase.auth.signInWithPassword({
        email: loginEmail,
        password
      })

      if (error) {
        // Provide more specific error messages
        if (error.message.includes('Invalid login credentials')) {
          return {
            user: null,
            error: { message: 'Invalid email/username or password' } as AuthError
          }
        }
        if (error.message.includes('Email not confirmed')) {
          return {
            user: null,
            error: { message: 'Please check your email and confirm your account before signing in' } as AuthError
          }
        }
      }

      return { user: data.user, error }
    } catch (error) {
      return {
        user: null,
        error: { message: 'An unexpected error occurred' } as AuthError
      }
    }
  }

  // Sign out
  async signOut(): Promise<{ error: AuthError | null }> {
    const { error } = await supabase.auth.signOut()
    return { error }
  }

  // Get current user
  async getCurrentUser(): Promise<User | null> {
    const { data: { user } } = await supabase.auth.getUser()
    return user
  }

  // Get current session
  async getCurrentSession() {
    const { data: { session } } = await supabase.auth.getSession()
    return session
  }

  // Get user profile
  async getUserProfile(userId: string) {
    const { data, error } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('id', userId)
      .single()

    return { data, error }
  }

  // Update user profile
  async updateUserProfile(userId: string, updates: Partial<any>) {
    const { data, error } = await supabase
      .from('user_profiles')
      .update({
        ...updates,
        updated_at: new Date().toISOString()
      })
      .eq('id', userId)
      .select()
      .single()

    return { data, error }
  }

  // Listen to auth state changes
  onAuthStateChange(callback: (event: string, session: any) => void) {
    return supabase.auth.onAuthStateChange(callback)
  }

  // Resend confirmation email
  async resendConfirmation(email: string) {
    const currentDomain = window.location.origin
    const redirectUrl = `${currentDomain}/login?confirmed=true`
    
    const { error } = await supabase.auth.resend({
      type: 'signup',
      email,
      options: {
        emailRedirectTo: redirectUrl
      }
    })
    return { error }
  }

  // Check if user email is confirmed
  async checkEmailConfirmed(email: string): Promise<boolean> {
    try {
      const { data } = await supabase
        .from('user_profiles')
        .select('id')
        .eq('email', email)
        .single()
      
      return !!data
    } catch {
      return false
    }
  }

  // Handle email confirmation from URL
  async handleEmailConfirmation(): Promise<{ success: boolean; error?: string }> {
    try {
      const { data, error } = await supabase.auth.getSession()
      
      if (error) {
        console.error('Session error:', error)
        return { success: false, error: error.message }
      }

      if (data.session?.user) {
        // User is confirmed and logged in
        return { success: true }
      }

      return { success: false, error: 'No active session found' }
    } catch (error) {
      console.error('Email confirmation error:', error)
      return { success: false, error: 'Failed to confirm email' }
    }
  }
}

export const authService = new AuthService()