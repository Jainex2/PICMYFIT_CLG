-- PICMYFIT Database Schema for Supabase
-- Run these queries in your Supabase SQL editor

-- Enable Row Level Security
ALTER DATABASE postgres SET "app.jwt_secret" TO 'your-jwt-secret';

-- Create user_profiles table
CREATE TABLE IF NOT EXISTS user_profiles (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    username TEXT UNIQUE NOT NULL,
    full_name TEXT,
    age INTEGER,
    gender TEXT CHECK (gender IN ('male', 'female', 'non-binary', 'prefer-not-to-say')),
    body_type TEXT,
    skin_tone TEXT,
    style_personality TEXT[],
    preferred_brands TEXT[],
    budget_min INTEGER DEFAULT 0,
    budget_max INTEGER DEFAULT 1000,
    lifestyle TEXT,
    location TEXT,
    profile_image_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create saved_looks table
CREATE TABLE IF NOT EXISTS saved_looks (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE NOT NULL,
    look_name TEXT NOT NULL,
    items JSONB NOT NULL,
    total_price INTEGER NOT NULL,
    confidence_score DECIMAL(3,2) DEFAULT 0.0,
    style_note TEXT,
    occasion TEXT,
    weather TEXT,
    season TEXT,
    age_group TEXT,
    gender TEXT,
    body_type TEXT,
    budget INTEGER,
    tags TEXT[],
    ai_analysis JSONB,
    outfit_image_url TEXT,
    is_liked BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create user_preferences table
CREATE TABLE IF NOT EXISTS user_preferences (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE NOT NULL,
    gender TEXT NOT NULL,
    age_group TEXT NOT NULL,
    skin_tone TEXT,
    body_type TEXT,
    style_personality TEXT[],
    occasion TEXT,
    weather TEXT,
    season TEXT,
    budget INTEGER DEFAULT 100,
    location TEXT,
    lifestyle TEXT,
    formality TEXT DEFAULT 'mixed',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id)
);

-- Enable Row Level Security
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE saved_looks ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_preferences ENABLE ROW LEVEL SECURITY;

-- Create policies for user_profiles
CREATE POLICY "Users can view own profile" ON user_profiles
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON user_profiles
    FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON user_profiles
    FOR INSERT WITH CHECK (auth.uid() = id);

-- Create policies for saved_looks
CREATE POLICY "Users can view own saved looks" ON saved_looks
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own saved looks" ON saved_looks
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own saved looks" ON saved_looks
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own saved looks" ON saved_looks
    FOR DELETE USING (auth.uid() = user_id);

-- Create policies for user_preferences
CREATE POLICY "Users can view own preferences" ON user_preferences
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own preferences" ON user_preferences
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own preferences" ON user_preferences
    FOR UPDATE USING (auth.uid() = user_id);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_user_profiles_username ON user_profiles(username);
CREATE INDEX IF NOT EXISTS idx_user_profiles_email ON user_profiles(email);
CREATE INDEX IF NOT EXISTS idx_saved_looks_user_id ON saved_looks(user_id);
CREATE INDEX IF NOT EXISTS idx_saved_looks_created_at ON saved_looks(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_user_preferences_user_id ON user_preferences(user_id);

-- Create function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_user_profiles_updated_at BEFORE UPDATE ON user_profiles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_saved_looks_updated_at BEFORE UPDATE ON saved_looks
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_preferences_updated_at BEFORE UPDATE ON user_preferences
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Create function to handle user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.user_profiles (id, email, username, full_name)
    VALUES (
        NEW.id,
        NEW.email,
        COALESCE(NEW.raw_user_meta_data->>'username', split_part(NEW.email, '@', 1)),
        COALESCE(NEW.raw_user_meta_data->>'full_name', '')
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user signup
CREATE OR REPLACE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();