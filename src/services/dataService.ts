import { supabase } from '../lib/supabase'
import type { UserProfile, SavedLook, UserPreferences } from '../lib/supabase'

class DataService {
  // Saved Looks Operations
  async saveLook(userId: string, lookData: any) {
    const { data, error } = await supabase
      .from('saved_looks')
      .insert({
        user_id: userId,
        look_name: lookData.lookName,
        items: lookData.items,
        total_price: lookData.totalPrice,
        confidence_score: lookData.confidenceScore,
        style_note: lookData.styleNote,
        occasion: lookData.occasion,
        weather: lookData.weather,
        season: lookData.season,
        age_group: lookData.ageGroup,
        gender: lookData.gender,
        body_type: lookData.bodyType,
        budget: lookData.budget,
        tags: lookData.tags,
        ai_analysis: lookData.aiAnalysis,
        outfit_image_url: lookData.outfitImage,
        is_liked: false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .select()
      .single()

    return { data, error }
  }

  async getSavedLooks(userId: string) {
    const { data, error } = await supabase
      .from('saved_looks')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })

    return { data, error }
  }

  async getLikedLooks(userId: string) {
    const { data, error } = await supabase
      .from('saved_looks')
      .select('*')
      .eq('user_id', userId)
      .eq('is_liked', true)
      .order('created_at', { ascending: false })

    return { data, error }
  }

  async deleteSavedLook(userId: string, lookId: string) {
    const { error } = await supabase
      .from('saved_looks')
      .delete()
      .eq('id', lookId)
      .eq('user_id', userId)

    return { error }
  }

  async toggleLikeLook(userId: string, lookId: string, isLiked: boolean) {
    const { data, error } = await supabase
      .from('saved_looks')
      .update({
        is_liked: isLiked,
        updated_at: new Date().toISOString()
      })
      .eq('id', lookId)
      .eq('user_id', userId)
      .select()
      .single()

    return { data, error }
  }

  async checkIfLookSaved(userId: string, lookName: string) {
    const { data, error } = await supabase
      .from('saved_looks')
      .select('id, is_liked')
      .eq('user_id', userId)
      .eq('look_name', lookName)
      .single()

    return { data, error }
  }

  // User Preferences Operations
  async saveUserPreferences(userId: string, preferences: any) {
    const { data, error } = await supabase
      .from('user_preferences')
      .upsert({
        user_id: userId,
        gender: preferences.gender,
        age_group: preferences.ageGroup,
        skin_tone: preferences.skinTone,
        body_type: preferences.bodyType,
        style_personality: preferences.stylePersonality,
        occasion: preferences.occasion,
        weather: preferences.weather,
        season: preferences.season,
        budget: preferences.budget,
        location: preferences.location,
        lifestyle: preferences.lifestyle,
        formality: preferences.formality,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .select()
      .single()

    return { data, error }
  }

  async getUserPreferences(userId: string) {
    const { data, error } = await supabase
      .from('user_preferences')
      .select('*')
      .eq('user_id', userId)

    // Handle case where no preferences exist yet
    if (data && data.length === 0) {
      return { data: null, error: null }
    }

    // Return the first preference record if it exists
    return { data: data?.[0] || null, error }
  }

  // Analytics and Stats
  async getUserStats(userId: string) {
    const [savedLooks, likedLooks, preferences] = await Promise.all([
      this.getSavedLooks(userId),
      this.getLikedLooks(userId),
      this.getUserPreferences(userId)
    ])

    const totalInvestment = savedLooks.data?.reduce((sum, look) => sum + look.total_price, 0) || 0
    const averageConfidence = savedLooks.data?.length 
      ? savedLooks.data.reduce((sum, look) => sum + look.confidence_score, 0) / savedLooks.data.length 
      : 0

    return {
      totalLooks: savedLooks.data?.length || 0,
      savedLooks: savedLooks.data?.length || 0,
      likedLooks: likedLooks.data?.length || 0,
      totalInvestment,
      averageConfidence: Math.round(averageConfidence * 100),
      recentActivity: savedLooks.data?.slice(0, 5) || [],
      topOccasions: this.getTopOccasions(savedLooks.data || []),
      budgetBreakdown: this.getBudgetBreakdown(savedLooks.data || [])
    }
  }

  private getTopOccasions(looks: any[]) {
    const occasions: { [key: string]: number } = {}
    looks.forEach(look => {
      if (look.occasion) {
        occasions[look.occasion] = (occasions[look.occasion] || 0) + 1
      }
    })
    
    return Object.entries(occasions)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 3)
      .map(([occasion, count]) => ({ occasion, count }))
  }

  private getBudgetBreakdown(looks: any[]) {
    const breakdown = {
      'Under $100': 0,
      '$100-$500': 0,
      '$500-$1000': 0,
      'Over $1000': 0
    }

    looks.forEach(look => {
      const price = look.total_price
      if (price < 100) breakdown['Under $100']++
      else if (price < 500) breakdown['$100-$500']++
      else if (price < 1000) breakdown['$500-$1000']++
      else breakdown['Over $1000']++
    })

    return breakdown
  }
}

export const dataService = new DataService()