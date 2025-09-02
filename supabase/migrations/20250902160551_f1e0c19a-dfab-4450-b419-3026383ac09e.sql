-- Add 2FA and user preferences tables

-- Add 2FA columns to profiles table
ALTER TABLE public.profiles 
ADD COLUMN two_factor_enabled boolean DEFAULT false,
ADD COLUMN two_factor_secret text,
ADD COLUMN backup_codes text[];

-- Create user preferences table
CREATE TABLE public.user_preferences (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  email_notifications boolean DEFAULT true,
  push_notifications boolean DEFAULT false,
  desktop_notifications boolean DEFAULT false,
  task_reminders boolean DEFAULT true,
  project_updates boolean DEFAULT true,
  team_invitations boolean DEFAULT true,
  language text DEFAULT 'en',
  timezone text DEFAULT 'UTC',
  date_format text DEFAULT 'MM/DD/YYYY',
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  UNIQUE(user_id)
);

-- Enable RLS on user_preferences
ALTER TABLE public.user_preferences ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for user_preferences
CREATE POLICY "Users can view their own preferences" 
ON public.user_preferences 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own preferences" 
ON public.user_preferences 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own preferences" 
ON public.user_preferences 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own preferences" 
ON public.user_preferences 
FOR DELETE 
USING (auth.uid() = user_id);

-- Create trigger for updated_at
CREATE TRIGGER update_user_preferences_updated_at
BEFORE UPDATE ON public.user_preferences
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create 2FA codes table for email-based 2FA
CREATE TABLE public.two_factor_codes (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  code text NOT NULL,
  expires_at timestamp with time zone NOT NULL,
  used boolean DEFAULT false,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  INDEX(user_id, expires_at, used)
);

-- Enable RLS on two_factor_codes
ALTER TABLE public.two_factor_codes ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for two_factor_codes
CREATE POLICY "Users can view their own 2FA codes" 
ON public.two_factor_codes 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own 2FA codes" 
ON public.two_factor_codes 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own 2FA codes" 
ON public.two_factor_codes 
FOR UPDATE 
USING (auth.uid() = user_id);