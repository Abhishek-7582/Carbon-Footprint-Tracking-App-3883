import { createClient } from '@supabase/supabase-js'

// Get environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Validate environment variables
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'Missing Supabase environment variables. Please check your .env file.'
  )
}

// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  },
  realtime: {
    params: {
      eventsPerSecond: 10,
    },
  },
})

// Database helper functions
export const db = {
  // Products
  products: {
    getAll: () => supabase.from('products').select('*'),
    getById: (id) => supabase.from('products').select('*').eq('id', id).single(),
    getByCategory: (category) => supabase.from('products').select('*').eq('category', category),
    search: (query) => supabase.from('products').select('*').textSearch('name', query),
    create: (data) => supabase.from('products').insert(data).select().single(),
    update: (id, data) => supabase.from('products').update(data).eq('id', id).select().single(),
    delete: (id) => supabase.from('products').delete().eq('id', id)
  },
  
  // Orders
  orders: {
    getByUserId: (userId) => supabase.from('orders').select('*, order_items(*, products(*))').eq('user_id', userId),
    create: (data) => supabase.from('orders').insert(data).select().single(),
    update: (id, data) => supabase.from('orders').update(data).eq('id', id).select().single()
  },
  
  // Reviews
  reviews: {
    getByProductId: (productId) => supabase.from('reviews').select('*, profiles(name)').eq('product_id', productId),
    create: (data) => supabase.from('reviews').insert(data).select().single()
  },
  
  // User profiles
  profiles: {
    getById: (id) => supabase.from('profiles').select('*').eq('id', id).single(),
    update: (id, data) => supabase.from('profiles').update(data).eq('id', id).select().single(),
    create: (data) => supabase.from('profiles').insert(data).select().single()
  }
}

// Auth helpers
export const auth = {
  signUp: (email, password, metadata = {}) => 
    supabase.auth.signUp({ email, password, options: { data: metadata } }),
  
  signIn: (email, password) => 
    supabase.auth.signInWithPassword({ email, password }),
  
  signOut: () => supabase.auth.signOut(),
  
  getUser: () => supabase.auth.getUser(),
  
  getSession: () => supabase.auth.getSession(),
  
  onAuthStateChange: (callback) => 
    supabase.auth.onAuthStateChange(callback)
}

// Storage helpers
export const storage = {
  uploadProductImage: async (file, path) => {
    const { data, error } = await supabase.storage
      .from('product-images')
      .upload(path, file)
    
    if (error) throw error
    
    const { data: urlData } = supabase.storage
      .from('product-images')
      .getPublicUrl(path)
    
    return urlData.publicUrl
  },
  
  deleteProductImage: (path) => 
    supabase.storage.from('product-images').remove([path])
}

export default supabase