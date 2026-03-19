import "react-native-url-polyfill/auto";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";

// ⚠️ Substitui estas duas variáveis pelas tuas chaves do Supabase!
const supabaseUrl = "https://vctqrdyekggkklukjylj.supabase.co";
const supabaseAnonKey = "sb_publishable_IKOToKnRkT0C6nhtweX8-g_UQV2YOFq";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
