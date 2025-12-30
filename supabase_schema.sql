-- Create categories table
CREATE TABLE IF NOT EXISTS forum_categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  "order" INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create threads table
CREATE TABLE IF NOT EXISTS forum_threads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  category_id UUID REFERENCES forum_categories(id) ON DELETE CASCADE,
  author_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  body_json JSONB,
  body_text TEXT,
  pinned BOOLEAN DEFAULT false,
  locked BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create replies table
CREATE TABLE IF NOT EXISTS forum_replies (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  thread_id UUID REFERENCES forum_threads(id) ON DELETE CASCADE,
  author_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  body_json JSONB,
  body_text TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE forum_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE forum_threads ENABLE ROW LEVEL SECURITY;
ALTER TABLE forum_replies ENABLE ROW LEVEL SECURITY;

-- Policies for Categories
-- Everyone can view categories
CREATE POLICY "Categories are viewable by everyone" ON forum_categories
  FOR SELECT USING (true);

-- Only service role can insert/update/delete (for now)
-- You can add admin policies here later

-- Policies for Threads
-- Everyone can view threads
CREATE POLICY "Threads are viewable by everyone" ON forum_threads
  FOR SELECT USING (true);

-- Authenticated users can insert threads
CREATE POLICY "Authenticated users can create threads" ON forum_threads
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Authors can update their own threads
CREATE POLICY "Users can update own threads" ON forum_threads
  FOR UPDATE USING (auth.uid() = author_id);

-- Policies for Replies
-- Everyone can view replies
CREATE POLICY "Replies are viewable by everyone" ON forum_replies
  FOR SELECT USING (true);

-- Authenticated users can insert replies
CREATE POLICY "Authenticated users can create replies" ON forum_replies
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Authors can update their own replies
CREATE POLICY "Users can update own replies" ON forum_replies
  FOR UPDATE USING (auth.uid() = author_id);

-- Seed Categories
INSERT INTO forum_categories (name, slug, description, "order") VALUES
('Presentaciones', 'presentaciones', 'Preséntate a la comunidad y cuéntanos tu historia.', 10),
('SATS y Rutina Nocturna', 'sats', 'Dudas, experiencias y consejos sobre la técnica de State Akin To Sleep.', 20),
('Estados (Ansiedad, Duda, Miedo)', 'estados', 'Cómo gestionar y transformar estados no deseados.', 30),
('Relaciones', 'relaciones', 'Todo sobre Personas Específicas (PE) y armonía en relaciones.', 40),
('Dinero y Trabajo', 'dinero', 'Manifestando abundancia, nuevos empleos y éxito profesional.', 50),
('Preguntas sobre Neville', 'neville', 'Debates profundos sobre las enseñanzas de Neville Goddard.', 60),
('Otros Autores', 'otros', 'Murphy, Dispensa, Zeland y otros maestros del Nuevo Pensamiento.', 70)
ON CONFLICT (slug) DO NOTHING;
