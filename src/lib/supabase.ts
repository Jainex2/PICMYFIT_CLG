import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    flowType: 'pkce'
  }
})

// Database Types
export interface UserProfile {
  id: string
  email: string
  username: string
  full_name?: string
  age?: number
  gender?: 'male' | 'female' | 'non-binary' | 'prefer-not-to-say'
  body_type?: string
  skin_tone?: string
  style_personality?: string[]
  preferred_brands?: string[]
  budget_min?: number
  budget_max?: number
  lifestyle?: string
  location?: string
  profile_image_url?: string
  created_at: string
  updated_at: string
}

export interface SavedLook {
  id: string
  user_id: string
  look_name: string
  items: any[]
  total_price: number
  confidence_score: number
  style_note: string
  occasion: string
  weather?: string
  season?: string
  age_group?: string
  gender?: string
  body_type?: string
  budget: number
  tags: string[]
  ai_analysis: any
  outfit_image_url?: string
  is_liked: boolean
  created_at: string
  updated_at: string
}

export interface UserPreferences {
  id: string
  user_id: string
  gender: string
  age_group: string
  skin_tone: string
  body_type: string
  style_personality: string[]
  occasion: string
  weather: string
  season: string
  budget: number
  location: string
  lifestyle: string
  formality: string
  created_at: string
  updated_at: string
}