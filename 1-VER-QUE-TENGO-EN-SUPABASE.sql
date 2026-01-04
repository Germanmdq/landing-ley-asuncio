-- =====================================================
-- SCRIPT PARA VER QUÉ TENÉS EN TU BASE DE DATOS
-- Ejecuta esto primero en el SQL Editor de Supabase
-- =====================================================

-- 1. VER TODAS LAS TABLAS QUE EXISTEN
SELECT
    schemaname as esquema,
    tablename as tabla
FROM pg_tables
WHERE schemaname = 'public'
ORDER BY tablename;

-- 2. CONTAR REGISTROS EN CADA TABLA
DO $$
DECLARE
    tabla RECORD;
    contador INTEGER;
BEGIN
    RAISE NOTICE '=== CONTEO DE REGISTROS ===';

    FOR tabla IN
        SELECT tablename
        FROM pg_tables
        WHERE schemaname = 'public'
        ORDER BY tablename
    LOOP
        EXECUTE format('SELECT COUNT(*) FROM %I', tabla.tablename) INTO contador;
        RAISE NOTICE '% : % registros', tabla.tablename, contador;
    END LOOP;
END$$;

-- 3. VER AUTORES (si existe la tabla)
SELECT 'AUTORES' as seccion;
SELECT id, nombre, slug, biografia, created_at
FROM autores
ORDER BY created_at DESC
LIMIT 10;

-- 4. VER ARTÍCULOS (si existe la tabla)
SELECT 'ARTÍCULOS' as seccion;
SELECT id, titulo, slug, autor_id, estado, created_at
FROM articulos
ORDER BY created_at DESC
LIMIT 10;

-- 5. VER LIBRARY (si existe la tabla)
SELECT 'LIBRARY/CONFERENCIAS' as seccion;
SELECT id, title, type, accessTier, created_at
FROM library
ORDER BY created_at DESC
LIMIT 10;

-- 6. VER CATEGORÍAS DEL FORO (si existe la tabla)
SELECT 'CATEGORÍAS FORO' as seccion;
SELECT id, name, slug, description, "order"
FROM forum_categories
ORDER BY "order";

-- 7. VER THREADS DEL FORO (si existe la tabla)
SELECT 'THREADS FORO' as seccion;
SELECT id, title, category_id, author_id, created_at, pinned, locked
FROM forum_threads
ORDER BY created_at DESC
LIMIT 10;

-- 8. VER REPLIES DEL FORO (si existe la tabla)
SELECT 'REPLIES FORO' as seccion;
SELECT id, thread_id, author_id, created_at
FROM forum_replies
ORDER BY created_at DESC
LIMIT 10;

-- 9. VER POLÍTICAS RLS ACTIVAS
SELECT
    schemaname,
    tablename,
    policyname,
    permissive,
    roles,
    cmd,
    qual
FROM pg_policies
WHERE schemaname = 'public'
ORDER BY tablename, policyname;

-- 10. VERIFICAR RLS HABILITADO
SELECT
    schemaname,
    tablename,
    rowsecurity as rls_habilitado
FROM pg_tables
WHERE schemaname = 'public'
ORDER BY tablename;

-- RESUMEN FINAL
SELECT
    'AUTORES' as tabla,
    COUNT(*) as total,
    COUNT(CASE WHEN imagen_url IS NOT NULL THEN 1 END) as con_imagen
FROM autores
UNION ALL
SELECT
    'ARTÍCULOS',
    COUNT(*),
    COUNT(CASE WHEN estado = 'publicado' THEN 1 END) as publicados
FROM articulos
UNION ALL
SELECT
    'LIBRARY',
    COUNT(*),
    COUNT(CASE WHEN accessTier = 'oro' THEN 1 END) as nivel_oro
FROM library
UNION ALL
SELECT
    'FORUM CATEGORIES',
    COUNT(*),
    0
FROM forum_categories
UNION ALL
SELECT
    'FORUM THREADS',
    COUNT(*),
    COUNT(CASE WHEN pinned = true THEN 1 END) as pinned
FROM forum_threads
UNION ALL
SELECT
    'FORUM REPLIES',
    COUNT(*),
    0
FROM forum_replies;
