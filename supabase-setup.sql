-- ============================================
-- CONFIGURACIÓN COMPLETA DE SUPABASE
-- Para: El Club de la Imaginación
-- ============================================
-- Instrucciones: Copia y pega todo este archivo en el SQL Editor de Supabase

-- ============================================
-- 1. CREAR TABLAS
-- ============================================

-- Tabla de Autores
CREATE TABLE IF NOT EXISTS autores (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nombre TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  biografia TEXT,
  imagen_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla de Artículos
CREATE TABLE IF NOT EXISTS articulos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  autor_id UUID REFERENCES autores(id),
  titulo TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  contenido TEXT NOT NULL,
  resumen TEXT,
  imagen_portada TEXT,
  tiempo_lectura INTEGER DEFAULT 5,
  meta_description TEXT,
  keywords TEXT[],
  estado TEXT DEFAULT 'borrador' CHECK (estado IN ('borrador', 'publicado')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla de Biblioteca (conferencias de Neville)
CREATE TABLE IF NOT EXISTS library (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  type TEXT CHECK (type IN ('video', 'audio', 'book', 'article')),
  accessTier TEXT DEFAULT 'bronce' CHECK (accessTier IN ('bronce', 'plata', 'oro')),
  url TEXT,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Categorías del Foro
CREATE TABLE IF NOT EXISTS forum_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  icon TEXT,
  "order" INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Hilos del Foro
CREATE TABLE IF NOT EXISTS forum_threads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  body_text TEXT,
  category_id UUID REFERENCES forum_categories(id),
  author_id UUID REFERENCES auth.users(id),
  is_pinned BOOLEAN DEFAULT false,
  is_locked BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Respuestas del Foro
CREATE TABLE IF NOT EXISTS forum_replies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  thread_id UUID REFERENCES forum_threads(id) ON DELETE CASCADE,
  author_id UUID REFERENCES auth.users(id),
  body_text TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 2. CREAR ÍNDICES PARA RENDIMIENTO
-- ============================================

CREATE INDEX IF NOT EXISTS idx_articulos_slug ON articulos(slug);
CREATE INDEX IF NOT EXISTS idx_articulos_estado ON articulos(estado);
CREATE INDEX IF NOT EXISTS idx_articulos_created_at ON articulos(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_forum_threads_category ON forum_threads(category_id);
CREATE INDEX IF NOT EXISTS idx_forum_threads_created_at ON forum_threads(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_forum_replies_thread ON forum_replies(thread_id);
CREATE INDEX IF NOT EXISTS idx_forum_replies_created_at ON forum_replies(created_at DESC);

-- ============================================
-- 3. HABILITAR ROW LEVEL SECURITY
-- ============================================

ALTER TABLE articulos ENABLE ROW LEVEL SECURITY;
ALTER TABLE autores ENABLE ROW LEVEL SECURITY;
ALTER TABLE library ENABLE ROW LEVEL SECURITY;
ALTER TABLE forum_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE forum_threads ENABLE ROW LEVEL SECURITY;
ALTER TABLE forum_replies ENABLE ROW LEVEL SECURITY;

-- ============================================
-- 4. POLÍTICAS DE SEGURIDAD - LECTURA PÚBLICA
-- ============================================

-- Artículos: solo publicados son visibles
CREATE POLICY "Public read articulos" ON articulos
  FOR SELECT USING (estado = 'publicado');

-- Autores: lectura pública
CREATE POLICY "Public read autores" ON autores
  FOR SELECT USING (true);

-- Biblioteca: lectura pública
CREATE POLICY "Public read library" ON library
  FOR SELECT USING (true);

-- Categorías del foro: lectura pública
CREATE POLICY "Public read forum_categories" ON forum_categories
  FOR SELECT USING (true);

-- Hilos del foro: lectura pública
CREATE POLICY "Public read forum_threads" ON forum_threads
  FOR SELECT USING (true);

-- Respuestas del foro: lectura pública
CREATE POLICY "Public read forum_replies" ON forum_replies
  FOR SELECT USING (true);

-- ============================================
-- 5. POLÍTICAS DE ESCRITURA
-- ============================================

-- Artículos: cualquier usuario autenticado puede insertar (ajustar según necesites)
CREATE POLICY "Authenticated insert articulos" ON articulos
  FOR INSERT WITH CHECK (true);

-- Autores: cualquier usuario autenticado puede insertar
CREATE POLICY "Authenticated insert autores" ON autores
  FOR INSERT WITH CHECK (true);

-- Foro: usuarios autenticados pueden crear hilos
CREATE POLICY "Authenticated insert forum_threads" ON forum_threads
  FOR INSERT WITH CHECK (auth.uid() = author_id);

-- Foro: usuarios autenticados pueden responder
CREATE POLICY "Authenticated insert forum_replies" ON forum_replies
  FOR INSERT WITH CHECK (auth.uid() = author_id);

-- Foro: usuarios pueden editar sus propios hilos
CREATE POLICY "Users update own threads" ON forum_threads
  FOR UPDATE USING (auth.uid() = author_id);

-- Foro: usuarios pueden editar sus propias respuestas
CREATE POLICY "Users update own replies" ON forum_replies
  FOR UPDATE USING (auth.uid() = author_id);

-- ============================================
-- 6. DATOS INICIALES
-- ============================================

-- Insertar autor: Neville Goddard
INSERT INTO autores (nombre, slug, biografia, imagen_url)
VALUES (
  'Neville Goddard',
  'neville-goddard',
  'Neville Lancelot Goddard fue un maestro espiritual barbadense que enseñó la Ley de la Asunción.',
  'https://res.cloudinary.com/demo/image/upload/neville-goddard.jpg'
)
ON CONFLICT (slug) DO NOTHING;

-- Insertar categorías del foro
INSERT INTO forum_categories (name, slug, description, icon, "order") VALUES
  ('Éxitos y Manifestaciones', 'exitos', 'Comparte tus logros y manifestaciones exitosas', '🎯', 1),
  ('Técnicas y Práctica', 'tecnicas', 'Discute técnicas específicas de manifestación', '🧘', 2),
  ('Preguntas Generales', 'preguntas', 'Dudas sobre la Ley de la Asunción', '❓', 3),
  ('Estados y SATs', 'estados', 'Conversaciones sobre estados mentales y SATs', '💭', 4)
ON CONFLICT (slug) DO NOTHING;

-- ============================================
-- 7. FUNCIONES ÚTILES
-- ============================================

-- Función para actualizar updated_at automáticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger para articulos
DROP TRIGGER IF EXISTS update_articulos_updated_at ON articulos;
CREATE TRIGGER update_articulos_updated_at
    BEFORE UPDATE ON articulos
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Trigger para forum_threads
DROP TRIGGER IF EXISTS update_forum_threads_updated_at ON forum_threads;
CREATE TRIGGER update_forum_threads_updated_at
    BEFORE UPDATE ON forum_threads
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- ✅ CONFIGURACIÓN COMPLETADA
-- ============================================
-- Ahora puedes cerrar el SQL Editor y volver a tu aplicación.
-- No olvides actualizar tu archivo .env.local con las credenciales.
