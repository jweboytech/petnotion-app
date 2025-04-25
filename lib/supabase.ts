import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://kvrfxmqzuukhrananjna.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt2cmZ4bXF6dXVraHJhbmFuam5hIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ1MjY2ODgsImV4cCI6MjA2MDEwMjY4OH0.QNcSLJ7n5fSJW9DtrE1LYoXKGN8ai5W5nqsdp2h_BdQ";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
