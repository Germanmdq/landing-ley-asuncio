# 🔧 Configuración de Supabase para El Club de la Imaginación

## Paso 1: Obtener tus credenciales

1. Ve a https://supabase.com/dashboard
2. Inicia sesión con tu cuenta: germangonzalezmdq@gmail.com
3. Selecciona tu proyecto (o crea uno nuevo si no tienes)
4. Ve a **Settings** (⚙️) → **API**
5. Copia estos valores:
   - **Project URL**: `https://xxxxx.supabase.co`
   - **anon public key**: Token largo que empieza con `eyJ...`
   - **service_role key**: Otro token (⚠️ mantenerlo secreto)

## Paso 2: Actualizar credenciales en el proyecto

Abre tu archivo `.env.local` en la raíz del proyecto y actualiza:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://TU-PROYECTO-AQUI.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_anon_key_aqui
SUPABASE_SERVICE_KEY=tu_service_role_key_aqui
```

## Paso 3: Crear las tablas necesarias

En Supabase Dashboard, ve a **SQL Editor** y ejecuta este script:

```sql
-- 1. Tabla de Autores
CREATE TABLE IF NOT EXISTS autores (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nombre TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  biografia TEXT,
  imagen_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Tabla de Artículos
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

-- 3. Tabla de Biblioteca (conferencias de Neville)
CREATE TABLE IF NOT EXISTS library (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  type TEXT CHECK (type IN ('video', 'audio', 'book', 'article')),
  accessTier TEXT DEFAULT 'bronce' CHECK (accessTier IN ('bronce', 'plata', 'oro')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Categorías del Foro
CREATE TABLE IF NOT EXISTS forum_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  icon TEXT,
  "order" INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Hilos del Foro
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

-- 6. Respuestas del Foro
CREATE TABLE IF NOT EXISTS forum_replies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  thread_id UUID REFERENCES forum_threads(id) ON DELETE CASCADE,
  author_id UUID REFERENCES auth.users(id),
  body_text TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para mejorar rendimiento
CREATE INDEX IF NOT EXISTS idx_articulos_slug ON articulos(slug);
CREATE INDEX IF NOT EXISTS idx_articulos_estado ON articulos(estado);
CREATE INDEX IF NOT EXISTS idx_forum_threads_category ON forum_threads(category_id);
CREATE INDEX IF NOT EXISTS idx_forum_replies_thread ON forum_replies(thread_id);
```

## Paso 4: Configurar Row Level Security (RLS)

Ejecuta estos comandos en SQL Editor para permitir acceso público a lectura:

```sql
-- Habilitar RLS
ALTER TABLE articulos ENABLE ROW LEVEL SECURITY;
ALTER TABLE autores ENABLE ROW LEVEL SECURITY;
ALTER TABLE library ENABLE ROW LEVEL SECURITY;
ALTER TABLE forum_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE forum_threads ENABLE ROW LEVEL SECURITY;
ALTER TABLE forum_replies ENABLE ROW LEVEL SECURITY;

-- Políticas de lectura pública
CREATE POLICY "Public read articulos" ON articulos FOR SELECT USING (estado = 'publicado');
CREATE POLICY "Public read autores" ON autores FOR SELECT USING (true);
CREATE POLICY "Public read library" ON library FOR SELECT USING (true);
CREATE POLICY "Public read forum_categories" ON forum_categories FOR SELECT USING (true);
CREATE POLICY "Public read forum_threads" ON forum_threads FOR SELECT USING (true);
CREATE POLICY "Public read forum_replies" ON forum_replies FOR SELECT USING (true);

-- Políticas de escritura autenticadas
CREATE POLICY "Authenticated insert forum_threads" ON forum_threads
  FOR INSERT WITH CHECK (auth.uid() = author_id);

CREATE POLICY "Authenticated insert forum_replies" ON forum_replies
  FOR INSERT WITH CHECK (auth.uid() = author_id);

CREATE POLICY "Admin insert articulos" ON articulos
  FOR INSERT WITH CHECK (true); -- Ajustar según necesites
```

## Paso 5: Insertar datos iniciales

### Crear un autor de prueba:
```sql
INSERT INTO autores (nombre, slug, biografia)
VALUES ('Neville Goddard', 'neville-goddard', 'Maestro de la Ley de la Asunción');
```

### Crear categorías del foro:
```sql
INSERT INTO forum_categories (name, slug, description, "order") VALUES
  ('Éxitos y Manifestaciones', 'exitos', 'Comparte tus logros manifestando', 1),
  ('Técnicas y Práctica', 'tecnicas', 'Discute técnicas de manifestación', 2),
  ('Preguntas Generales', 'preguntas', 'Dudas sobre la Ley de la Asunción', 3);
```

## Paso 6: Configurar autenticación

1. En Supabase Dashboard, ve a **Authentication** → **Providers**
2. Habilita **Email** (ya está habilitado por defecto)
3. Si quieres Google OAuth:
   - Habilita **Google**
   - Configura las credenciales de OAuth de Google

## Paso 7: Reiniciar el servidor

Después de actualizar `.env.local`:

```bash
rm -rf .next
npm run dev
```

## 🎉 ¡Listo!

Ahora deberías poder:
- ✅ Iniciar sesión con tu email
- ✅ Ver el blog (vacío hasta que agregues artículos)
- ✅ Acceder a la comunidad
- ✅ Crear nuevos artículos desde `/admin/articulos`

---

## 🔍 Verificar que todo funciona

1. Ve a http://localhost:3000/login
2. Crea una cuenta de prueba
3. Deberías ser redirigido a `/mi-escritorio`
4. Ve a `/admin/articulos` y crea un artículo de prueba
5. Visita `/blog` y deberías verlo

## ❓ Problemas comunes

**Error: "supabaseUrl is required"**
→ Verifica que `.env.local` tenga las credenciales correctas y reinicia el servidor

**Error al login: "Failed to fetch"**
→ Verifica que la URL de Supabase sea correcta (debe terminar en `.supabase.co`)

**No puedo crear artículos**
→ Verifica las políticas RLS en Supabase Dashboard
