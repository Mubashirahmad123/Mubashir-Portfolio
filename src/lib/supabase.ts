import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { ContactMessage } from '../types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(
  supabaseUrl && 
  supabaseAnonKey && 
  supabaseUrl.startsWith('https://') && 
  supabaseAnonKey.length > 20
);

export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(supabaseUrl!, supabaseAnonKey!)
  : null;

// Initial mock likes state stored in localStorage for instant free demo
const LOCAL_LIKES_KEY = 'mubashir_portfolio_likes';
const LOCAL_MESSAGES_KEY = 'mubashir_portfolio_messages';
const LOCAL_VIEWS_KEY = 'mubashir_portfolio_views';

const defaultLikes: Record<string, number> = {
  'remote-job-agent': 42,
  'fastbeetle-logistics': 38,
  'ordersnap-platform': 29,
  'music-controller': 24,
  'crm-system': 19
};

function getLocalLikes(): Record<string, number> {
  try {
    const raw = localStorage.getItem(LOCAL_LIKES_KEY);
    if (!raw) {
      localStorage.setItem(LOCAL_LIKES_KEY, JSON.stringify(defaultLikes));
      return defaultLikes;
    }
    return JSON.parse(raw);
  } catch {
    return defaultLikes;
  }
}

export async function submitContactMessage(message: ContactMessage): Promise<{ success: boolean; mode: 'supabase' | 'local'; error?: string }> {
  const timestamp = new Date().toISOString();
  const payload = { ...message, timestamp };

  if (isSupabaseConfigured && supabase) {
    try {
      const { error } = await supabase.from('portfolio_messages').insert([payload]);
      if (error) {
        console.warn('Supabase insert failed, saving locally:', error.message);
      } else {
        return { success: true, mode: 'supabase' };
      }
    } catch (err: any) {
      console.warn('Supabase network error, fallback to local:', err?.message);
    }
  }

  // Graceful local persistence fallback
  try {
    const existing = JSON.parse(localStorage.getItem(LOCAL_MESSAGES_KEY) || '[]');
    existing.unshift(payload);
    localStorage.setItem(LOCAL_MESSAGES_KEY, JSON.stringify(existing));
    return { success: true, mode: 'local' };
  } catch (err: any) {
    return { success: false, mode: 'local', error: err?.message || 'Storage error' };
  }
}

export async function getProjectLikes(projectId: string): Promise<number> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('project_likes')
        .select('likes_count')
        .eq('project_id', projectId)
        .single();
      if (!error && data) {
        return data.likes_count;
      }
    } catch {
      // ignore, fall back
    }
  }
  const local = getLocalLikes();
  return local[projectId] ?? 20;
}

export async function toggleProjectLike(projectId: string): Promise<{ count: number; liked: boolean }> {
  const userLikesKey = `user_liked_${projectId}`;
  const isLiked = localStorage.getItem(userLikesKey) === 'true';

  let newCount: number;
  const local = getLocalLikes();
  const currentCount = local[projectId] ?? 20;

  if (isLiked) {
    newCount = Math.max(0, currentCount - 1);
    localStorage.removeItem(userLikesKey);
  } else {
    newCount = currentCount + 1;
    localStorage.setItem(userLikesKey, 'true');
  }

  local[projectId] = newCount;
  localStorage.setItem(LOCAL_LIKES_KEY, JSON.stringify(local));

  if (isSupabaseConfigured && supabase) {
    try {
      await supabase.from('project_likes').upsert({
        project_id: projectId,
        likes_count: newCount,
        updated_at: new Date().toISOString()
      });
    } catch (e) {
      console.warn('Supabase like sync error:', e);
    }
  }

  return { count: newCount, liked: !isLiked };
}

export async function recordVisitorView(): Promise<number> {
  try {
    const current = parseInt(localStorage.getItem(LOCAL_VIEWS_KEY) || '142', 10);
    const updated = current + 1;
    localStorage.setItem(LOCAL_VIEWS_KEY, updated.toString());
    return updated;
  } catch {
    return 143;
  }
}
