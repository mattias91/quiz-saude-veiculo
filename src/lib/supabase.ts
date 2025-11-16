import { createClient } from '@supabase/supabase-js'
import type { Database } from './database.types'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

// Cria um cliente mock se as credenciais não estiverem configuradas
export const supabase = (supabaseUrl && supabaseAnonKey) 
  ? createClient<Database>(supabaseUrl, supabaseAnonKey)
  : {
      from: () => ({
        insert: () => Promise.resolve({ data: null, error: { message: 'Supabase não configurado' } }),
        select: () => Promise.resolve({ data: null, error: { message: 'Supabase não configurado' } }),
        update: () => Promise.resolve({ data: null, error: { message: 'Supabase não configurado' } }),
        delete: () => Promise.resolve({ data: null, error: { message: 'Supabase não configurado' } }),
      })
    } as any
