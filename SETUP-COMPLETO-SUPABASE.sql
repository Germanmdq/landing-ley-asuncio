-- =====================================================
-- SCRIPT COMPLETO PARA SUPABASE
-- Ejecuta esto EN ORDEN en el SQL Editor de Supabase
-- =====================================================

-- 1. LIMPIAR TABLAS EXISTENTES (si quieres empezar de cero)
-- DROP TABLE IF EXISTS forum_likes CASCADE;
-- DROP TABLE IF EXISTS forum_replies CASCADE;
-- DROP TABLE IF EXISTS forum_threads CASCADE;
-- DROP TABLE IF EXISTS forum_categories CASCADE;
-- DROP TABLE IF EXISTS user_profiles CASCADE;
-- DROP TABLE IF EXISTS articulos CASCADE;
-- DROP TABLE IF EXISTS autores CASCADE;
-- DROP TABLE IF EXISTS library CASCADE;

-- 2. CREAR TABLA DE AUTORES
CREATE TABLE IF NOT EXISTS autores (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nombre TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  biografia TEXT,
  imagen_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. CREAR TABLA DE ARTÍCULOS
CREATE TABLE IF NOT EXISTS articulos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  autor_id UUID REFERENCES autores(id) ON DELETE CASCADE,
  titulo TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  contenido TEXT NOT NULL,
  resumen TEXT,
  imagen_portada TEXT,
  tiempo_lectura INTEGER DEFAULT 5,
  estado TEXT DEFAULT 'publicado' CHECK (estado IN ('borrador', 'publicado')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. CREAR TABLA LIBRARY (conferencias, materiales)
CREATE TABLE IF NOT EXISTS library (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  type TEXT CHECK (type IN ('video', 'audio', 'book', 'article')),
  url TEXT,
  accessTier TEXT DEFAULT 'bronce' CHECK (accessTier IN ('bronce', 'plata', 'oro')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. CREAR TABLAS DEL FORO
CREATE TABLE IF NOT EXISTS forum_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  "order" INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS forum_threads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id UUID REFERENCES forum_categories(id) ON DELETE CASCADE,
  author_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  body_text TEXT NOT NULL,
  images TEXT[],
  pinned BOOLEAN DEFAULT FALSE,
  locked BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS forum_replies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  thread_id UUID REFERENCES forum_threads(id) ON DELETE CASCADE,
  author_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  body_text TEXT NOT NULL,
  images TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS forum_likes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  thread_id UUID REFERENCES forum_threads(id) ON DELETE CASCADE,
  reply_id UUID REFERENCES forum_replies(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  CONSTRAINT unique_user_thread_like UNIQUE (user_id, thread_id),
  CONSTRAINT unique_user_reply_like UNIQUE (user_id, reply_id),
  CONSTRAINT check_like_target CHECK (
    (thread_id IS NOT NULL AND reply_id IS NULL) OR
    (thread_id IS NULL AND reply_id IS NOT NULL)
  )
);

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

-- 6. POLÍTICAS RLS (Row Level Security)
-- Habilitar RLS en todas las tablas
ALTER TABLE autores ENABLE ROW LEVEL SECURITY;
ALTER TABLE articulos ENABLE ROW LEVEL SECURITY;
ALTER TABLE library ENABLE ROW LEVEL SECURITY;
ALTER TABLE forum_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE forum_threads ENABLE ROW LEVEL SECURITY;
ALTER TABLE forum_replies ENABLE ROW LEVEL SECURITY;
ALTER TABLE forum_likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

-- Políticas: TODOS pueden leer
DROP POLICY IF EXISTS "Autores públicos" ON autores;
CREATE POLICY "Autores públicos" ON autores FOR SELECT USING (true);

DROP POLICY IF EXISTS "Artículos públicos" ON articulos;
CREATE POLICY "Artículos públicos" ON articulos FOR SELECT USING (estado = 'publicado');

DROP POLICY IF EXISTS "Library público" ON library;
CREATE POLICY "Library público" ON library FOR SELECT USING (true);

DROP POLICY IF EXISTS "Categorías públicas" ON forum_categories;
CREATE POLICY "Categorías públicas" ON forum_categories FOR SELECT USING (true);

DROP POLICY IF EXISTS "Threads públicos" ON forum_threads;
CREATE POLICY "Threads públicos" ON forum_threads FOR SELECT USING (true);

DROP POLICY IF EXISTS "Replies públicos" ON forum_replies;
CREATE POLICY "Replies públicos" ON forum_replies FOR SELECT USING (true);

DROP POLICY IF EXISTS "Likes públicos" ON forum_likes;
CREATE POLICY "Likes públicos" ON forum_likes FOR SELECT USING (true);

DROP POLICY IF EXISTS "Perfiles públicos" ON user_profiles;
CREATE POLICY "Perfiles públicos" ON user_profiles FOR SELECT USING (true);

-- Políticas: Solo autenticados pueden crear
DROP POLICY IF EXISTS "Usuarios pueden crear threads" ON forum_threads;
CREATE POLICY "Usuarios pueden crear threads" ON forum_threads
  FOR INSERT WITH CHECK (auth.uid() = author_id);

DROP POLICY IF EXISTS "Usuarios pueden crear replies" ON forum_replies;
CREATE POLICY "Usuarios pueden crear replies" ON forum_replies
  FOR INSERT WITH CHECK (auth.uid() = author_id);

DROP POLICY IF EXISTS "Usuarios pueden dar likes" ON forum_likes;
CREATE POLICY "Usuarios pueden dar likes" ON forum_likes
  FOR ALL USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Usuarios pueden editar su perfil" ON user_profiles;
CREATE POLICY "Usuarios pueden editar su perfil" ON user_profiles
  FOR ALL USING (auth.uid() = id);

-- 7. INSERTAR DATOS DE MUESTRA
-- Insertar autor: Neville Goddard
INSERT INTO autores (nombre, slug, biografia, imagen_url)
VALUES (
  'Neville Goddard',
  'neville-goddard',
  'Neville Goddard (1905-1972) fue uno de los maestros más influyentes de la Ley de Asunción. Sus enseñanzas sobre el poder de la imaginación transformaron la vida de millones.',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400'
) ON CONFLICT (slug) DO NOTHING;

-- Insertar autor: Joseph Murphy
INSERT INTO autores (nombre, slug, biografia, imagen_url)
VALUES (
  'Joseph Murphy',
  'joseph-murphy',
  'Joseph Murphy (1898-1981) fue autor de "El poder de la mente subconsciente" y uno de los grandes maestros del Nuevo Pensamiento.',
  'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400'
) ON CONFLICT (slug) DO NOTHING;

-- Obtener los IDs de los autores
DO $$
DECLARE
  neville_id UUID;
  murphy_id UUID;
BEGIN
  SELECT id INTO neville_id FROM autores WHERE slug = 'neville-goddard';
  SELECT id INTO murphy_id FROM autores WHERE slug = 'joseph-murphy';

  -- Insertar artículos de Neville Goddard
  INSERT INTO articulos (autor_id, titulo, slug, contenido, resumen, imagen_portada, tiempo_lectura, estado)
  VALUES (
    neville_id,
    'Neville Goddard: El Maestro de la Imaginación que Cambió el Juego para Siempre',
    'neville-goddard-maestro-imaginacion',
    '<h2>El Poder de la Asunción</h2><p>Neville Goddard no filosofaba bonito: enseñaba que lo que asumís como real en tu interior, con sensación de hecho, tiende a volverse tu realidad exterior.</p><h2>La Técnica del Estado Deseado</h2><p>La clave está en asumir el sentimiento de ya tener lo que deseás. No es visualizar esperando que llegue, es sentir como si ya fuera tuyo.</p><h3>Cómo Aplicarlo</h3><p>Antes de dormir, imagina la escena que implicaría que tu deseo ya se cumplió. Sentí la realidad de eso.</p>',
    'Neville Goddard no filosofaba bonito: enseñaba que lo que asumís como real en tu interior, con sensación de hecho, tiende a volverse tu realidad exterior.',
    'https://images.unsplash.com/photo-1499728603263-13726abce5fd?w=1200',
    8,
    'publicado'
  ) ON CONFLICT (slug) DO NOTHING;

  INSERT INTO articulos (autor_id, titulo, slug, contenido, resumen, imagen_portada, tiempo_lectura, estado)
  VALUES (
    neville_id,
    'La Técnica del Sueño de Neville: Manifestar Mientras Dormís',
    'tecnica-sueno-neville',
    '<h2>El Estado Alfa y la Manifestación</h2><p>Justo antes de dormir, tu mente entra en estado alfa, el momento más poderoso para impresionar tu subconsciente.</p><h2>Paso a Paso</h2><p>1. Acuéstate y relajate completamente<br>2. Imagina una escena corta que implique tu deseo cumplido<br>3. Repetí esa escena hasta dormirte</p><h3>Por Qué Funciona</h3><p>En ese estado, no hay resistencia mental. Tu subconsciente acepta lo que le das como verdad.</p>',
    'La técnica más poderosa de Neville: impresionar tu subconsciente en el momento exacto antes de dormir.',
    'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=1200',
    5,
    'publicado'
  ) ON CONFLICT (slug) DO NOTHING;

  -- Insertar artículo de Joseph Murphy
  INSERT INTO articulos (autor_id, titulo, slug, contenido, resumen, imagen_portada, tiempo_lectura, estado)
  VALUES (
    murphy_id,
    'El Poder de la Mente Subconsciente según Joseph Murphy',
    'poder-mente-subconsciente-murphy',
    '<h2>La Mente Subconsciente No Juzga</h2><p>Joseph Murphy enseñaba que tu mente subconsciente acepta todo lo que le das, sin juzgar si es bueno o malo.</p><h2>La Ley de la Creencia</h2><p>Lo que creés profundamente, lo manifestás. Si creés en la escasez, creás escasez. Si creés en la abundancia, creás abundancia.</p>',
    'Tu mente subconsciente es como un jardín: lo que siembres, eso cosecharás.',
    'https://images.unsplash.com/photo-1516849677043-ef67c9557e16?w=1200',
    6,
    'publicado'
  ) ON CONFLICT (slug) DO NOTHING;
END$$;

-- Insertar conferencias/materiales en library
INSERT INTO library (title, description, type, url, accessTier)
VALUES (
  'Conferencias de Neville Goddard: "La roca, el agua y el vino"',
  'El texto comenta la conferencia de Neville Goddard titulada La roca, el agua y el vino. Explica que en la Biblia estos elementos simbolizan estados de conciencia.',
  'video',
  'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  'bronce'
) ON CONFLICT DO NOTHING;

INSERT INTO library (title, description, type, url, accessTier)
VALUES (
  'Neville Goddard: Feeling is the Secret (Audio)',
  'Audiolibro completo de una de las obras más importantes de Neville sobre el poder del sentimiento.',
  'audio',
  'https://example.com/audio/feeling-is-the-secret.mp3',
  'plata'
) ON CONFLICT DO NOTHING;

-- Insertar categorías del foro
INSERT INTO forum_categories (name, slug, description, "order")
VALUES
  ('Manifestaciones', 'manifestaciones', 'Comparte tus historias de manifestación exitosas', 1),
  ('Técnicas', 'tecnicas', 'Discute diferentes técnicas de manifestación', 2),
  ('Preguntas Generales', 'preguntas-generales', 'Todo lo que necesites saber sobre la Ley', 3),
  ('Éxitos del Día', 'exitos-del-dia', 'Celebra tus pequeños y grandes logros', 4)
ON CONFLICT (slug) DO NOTHING;

-- Nota: No insertamos threads de muestra porque requieren un author_id válido de auth.users

-- 8. VERIFICAR QUE TODO ESTÉ CREADO
SELECT 'AUTORES' as tabla, COUNT(*) as registros FROM autores
UNION ALL
SELECT 'ARTÍCULOS', COUNT(*) FROM articulos
UNION ALL
SELECT 'LIBRARY', COUNT(*) FROM library
UNION ALL
SELECT 'CATEGORÍAS FORO', COUNT(*) FROM forum_categories;
