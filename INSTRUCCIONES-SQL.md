# Instrucciones para arreglar la biblioteca y el foro

## PASO 1: Ver qué tenés ahora

1. Abre https://supabase.com/dashboard
2. Entra a tu proyecto
3. Click en **"SQL Editor"** (menú izquierdo)
4. Click en **"New query"**
5. Copia TODO el contenido del archivo `1-VER-QUE-TENGO-EN-SUPABASE.sql`
6. Pégalo en el editor
7. Click en **"RUN"** (botón verde abajo)

### Qué vas a ver:

- Lista de todas tus tablas
- Cuántos registros tiene cada tabla
- Los datos que ya tenés (autores, artículos, etc.)
- Si RLS está habilitado
- Las políticas de seguridad

**IMPORTANTE:** Mándame una captura de pantalla o copiá los resultados que te da este script. Así sé exactamente qué tenés y qué te falta.

---

## PASO 2: Ejecutar el setup completo

**Solo después de ejecutar el PASO 1:**

1. En el SQL Editor, abre una **nueva query**
2. Copia TODO el contenido del archivo `SETUP-COMPLETO-SUPABASE.sql`
3. Pégalo en el editor
4. Click en **"RUN"**
5. Espera a que termine (debería decir "Success")

### Qué hace este script:

- Crea TODAS las tablas que faltan (no toca las que ya existen)
- Configura los permisos correctos (RLS)
- Inserta datos de muestra:
  - 2 autores (Neville Goddard, Joseph Murphy)
  - 3 artículos
  - 2 items en library
  - 4 categorías de foro

---

## PASO 3: Verificar en tu sitio

Después de ejecutar el PASO 2:

1. Ve a https://elclubdelaimaginacion.com/blog
   - Deberías ver la sección "Autores" con 2 autores
   - Deberías ver "Conferencias y Material" con 2 items

2. Ve a https://elclubdelaimaginacion.com/comunidad
   - Deberías ver 4 categorías con contador "0"
   - No habrá threads todavía (necesitas crearlos desde el sitio)

---

## ¿Por qué no veo nada?

Si después del PASO 2 sigue sin aparecer nada:

### Opción A: Las variables de entorno están mal
Ve a Vercel → tu proyecto → Settings → Environment Variables
Verifica que tengas:
- `NEXT_PUBLIC_SUPABASE_URL` = tu URL de Supabase
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` = tu anon key de Supabase

### Opción B: Cache del navegador
Presiona Ctrl+Shift+R (Windows) o Cmd+Shift+R (Mac) para hacer hard refresh

### Opción C: El deploy no se completó
Ve a Vercel → tu proyecto → Deployments
Verifica que el último deploy diga "Ready" y no tenga errores

---

## Notas importantes

- ✅ El script `SETUP-COMPLETO-SUPABASE.sql` es **seguro** de ejecutar múltiples veces
- ✅ Usa `ON CONFLICT DO NOTHING` para no duplicar datos
- ✅ No borra nada, solo agrega lo que falta
- ⚠️ Si ya tenés autores/artículos, este script NO los va a borrar
