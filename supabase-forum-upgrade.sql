-- ============================================
-- MEJORAS AL FORO - Sistema Completo
-- Para: El Club de la Imaginación
-- ============================================
-- Instrucciones: Copia y pega todo esto en el SQL Editor de Supabase

-- ============================================
-- 1. PERFILES DE USUARIO
-- ============================================

CREATE TABLE IF NOT EXISTS user_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT UNIQUE,
  display_name TEXT,
  avatar_url TEXT,
  bio TEXT,
  tier TEXT DEFAULT 'bronce' CHECK (tier IN ('bronce', 'plata', 'oro')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Habilitar RLS
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

-- Políticas: lectura pública
CREATE POLICY "Public read user_profiles" ON user_profiles
  FOR SELECT USING (true);

-- Usuarios pueden actualizar su propio perfil
CREATE POLICY "Users update own profile" ON user_profiles
  FOR UPDATE USING (auth.uid() = id);

-- Auto-crear perfil cuando se registra un usuario
CREATE POLICY "Users insert own profile" ON user_profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- ============================================
-- 2. SISTEMA DE LIKES/UPVOTES
-- ============================================

CREATE TABLE IF NOT EXISTS forum_likes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  thread_id UUID REFERENCES forum_threads(id) ON DELETE CASCADE,
  reply_id UUID REFERENCES forum_replies(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  -- Un usuario solo puede dar un like por thread o reply
  CONSTRAINT unique_user_thread_like UNIQUE (user_id, thread_id),
  CONSTRAINT unique_user_reply_like UNIQUE (user_id, reply_id),
  -- Debe ser thread O reply, no ambos
  CONSTRAINT check_thread_or_reply CHECK (
    (thread_id IS NOT NULL AND reply_id IS NULL) OR
    (thread_id IS NULL AND reply_id IS NOT NULL)
  )
);

-- Habilitar RLS
ALTER TABLE forum_likes ENABLE ROW LEVEL SECURITY;

-- Políticas
CREATE POLICY "Public read forum_likes" ON forum_likes
  FOR SELECT USING (true);

CREATE POLICY "Users insert own likes" ON forum_likes
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users delete own likes" ON forum_likes
  FOR DELETE USING (auth.uid() = user_id);

-- Índices para rendimiento
CREATE INDEX IF NOT EXISTS idx_forum_likes_thread ON forum_likes(thread_id);
CREATE INDEX IF NOT EXISTS idx_forum_likes_reply ON forum_likes(reply_id);
CREATE INDEX IF NOT EXISTS idx_forum_likes_user ON forum_likes(user_id);

-- ============================================
-- 3. CONTADOR DE VISTAS EN THREADS
-- ============================================

-- Agregar columna de contador de vistas
ALTER TABLE forum_threads
ADD COLUMN IF NOT EXISTS view_count INTEGER DEFAULT 0;

-- Tabla para rastrear qué usuarios vieron qué threads
CREATE TABLE IF NOT EXISTS forum_thread_views (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  thread_id UUID REFERENCES forum_threads(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  viewed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  CONSTRAINT unique_user_thread_view UNIQUE (user_id, thread_id)
);

ALTER TABLE forum_thread_views ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read thread_views" ON forum_thread_views
  FOR SELECT USING (true);

CREATE POLICY "Users insert own views" ON forum_thread_views
  FOR INSERT WITH CHECK (true);

CREATE INDEX IF NOT EXISTS idx_thread_views_thread ON forum_thread_views(thread_id);

-- ============================================
-- 4. SOPORTE PARA IMÁGENES EN THREADS Y REPLIES
-- ============================================

-- Agregar columnas para imágenes
ALTER TABLE forum_threads
ADD COLUMN IF NOT EXISTS images TEXT[]; -- Array de URLs de imágenes

ALTER TABLE forum_replies
ADD COLUMN IF NOT EXISTS images TEXT[]; -- Array de URLs de imágenes

-- ============================================
-- 5. FUNCIONES ÚTILES
-- ============================================

-- Función para obtener el conteo de likes de un thread
CREATE OR REPLACE FUNCTION get_thread_likes_count(thread_uuid UUID)
RETURNS INTEGER AS $$
  SELECT COUNT(*)::INTEGER FROM forum_likes WHERE thread_id = thread_uuid;
$$ LANGUAGE SQL STABLE;

-- Función para obtener el conteo de likes de un reply
CREATE OR REPLACE FUNCTION get_reply_likes_count(reply_uuid UUID)
RETURNS INTEGER AS $$
  SELECT COUNT(*)::INTEGER FROM forum_likes WHERE reply_id = reply_uuid;
$$ LANGUAGE SQL STABLE;

-- Función para obtener el conteo de replies de un thread
CREATE OR REPLACE FUNCTION get_thread_replies_count(thread_uuid UUID)
RETURNS INTEGER AS $$
  SELECT COUNT(*)::INTEGER FROM forum_replies WHERE thread_id = thread_uuid;
$$ LANGUAGE SQL STABLE;

-- Trigger para actualizar updated_at en user_profiles
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

DROP TRIGGER IF EXISTS update_user_profiles_updated_at ON user_profiles;
CREATE TRIGGER update_user_profiles_updated_at
    BEFORE UPDATE ON user_profiles
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- 6. VISTA ENRIQUECIDA PARA THREADS
-- ============================================

-- Vista que combina threads con información de autor, likes y replies
CREATE OR REPLACE VIEW forum_threads_enriched AS
SELECT
  t.id,
  t.title,
  t.body_text,
  t.images,
  t.category_id,
  t.author_id,
  t.is_pinned,
  t.is_locked,
  t.view_count,
  t.created_at,
  t.updated_at,
  c.name as category_name,
  c.slug as category_slug,
  c.icon as category_icon,
  p.display_name as author_name,
  p.username as author_username,
  p.avatar_url as author_avatar,
  p.tier as author_tier,
  (SELECT COUNT(*)::INTEGER FROM forum_likes WHERE thread_id = t.id) as likes_count,
  (SELECT COUNT(*)::INTEGER FROM forum_replies WHERE thread_id = t.id) as replies_count
FROM forum_threads t
LEFT JOIN forum_categories c ON t.category_id = c.id
LEFT JOIN user_profiles p ON t.author_id = p.id;

-- ============================================
-- 7. VISTA ENRIQUECIDA PARA REPLIES
-- ============================================

CREATE OR REPLACE VIEW forum_replies_enriched AS
SELECT
  r.id,
  r.thread_id,
  r.author_id,
  r.body_text,
  r.images,
  r.created_at,
  p.display_name as author_name,
  p.username as author_username,
  p.avatar_url as author_avatar,
  p.tier as author_tier,
  (SELECT COUNT(*)::INTEGER FROM forum_likes WHERE reply_id = r.id) as likes_count
FROM forum_replies r
LEFT JOIN user_profiles p ON r.author_id = p.id;

-- ============================================
-- 8. ÍNDICES ADICIONALES
-- ============================================

CREATE INDEX IF NOT EXISTS idx_user_profiles_username ON user_profiles(username);
CREATE INDEX IF NOT EXISTS idx_forum_threads_view_count ON forum_threads(view_count DESC);

-- ============================================
-- ✅ ACTUALIZACIÓN COMPLETADA
-- ============================================
-- Tu foro ahora tiene:
-- ✅ Perfiles de usuario con avatares
-- ✅ Sistema de likes/upvotes
-- ✅ Contador de vistas
-- ✅ Soporte para imágenes
-- ✅ Vistas enriquecidas con toda la info junta
