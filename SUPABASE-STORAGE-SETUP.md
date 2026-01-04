# Configuración de Supabase Storage para Imágenes del Foro

## Paso 1: Crear el Bucket en Supabase

1. Ve a tu proyecto en [Supabase Dashboard](https://app.supabase.com)
2. En el menú lateral, haz clic en **Storage**
3. Haz clic en **Create a new bucket**
4. Configura el bucket:
   - **Name**: `forum-images`
   - **Public bucket**: ✅ SÍ (marcar como público)
   - Haz clic en **Create bucket**

## Paso 2: Configurar Políticas de Storage

En la pestaña **Policies** del bucket `forum-images`, crea estas políticas:

### Política 1: Lectura Pública
```sql
CREATE POLICY "Public Access"
ON storage.objects FOR SELECT
USING ( bucket_id = 'forum-images' );
```

### Política 2: Usuarios Autenticados Pueden Subir
```sql
CREATE POLICY "Authenticated users can upload"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'forum-images'
  AND auth.role() = 'authenticated'
);
```

### Política 3: Usuarios Pueden Eliminar Sus Propias Imágenes
```sql
CREATE POLICY "Users can delete own images"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'forum-images'
  AND auth.uid()::text = (storage.foldername(name))[1]
);
```

## Paso 3: Verificar Configuración

En la consola de Supabase, ve a **Storage > forum-images** y verifica:
- ✅ El bucket aparece como **Public**
- ✅ Las 3 políticas están activas

## Estructura de Archivos

Las imágenes se guardarán con esta estructura:
```
forum-images/
  └── {user_id}/
      └── {timestamp}_{filename}
```

Por ejemplo:
```
forum-images/550e8400-e29b-41d4-a716-446655440000/1234567890_mi-foto.jpg
```

## Obtener URLs Públicas

Las URLs públicas tendrán este formato:
```
https://bwortonlhpnzugvceyvb.supabase.co/storage/v1/object/public/forum-images/{user_id}/{filename}
```

## Límites Recomendados

Para evitar abuso, considera configurar:
- **Tamaño máximo por archivo**: 5MB
- **Formatos permitidos**: JPG, PNG, GIF, WebP
- **Máximo de imágenes por post**: 5

Estos límites se implementarán en el código de la aplicación.
