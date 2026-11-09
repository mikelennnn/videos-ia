# Subida automática a YouTube (GitHub Actions)

Todos los días a las 19:07 (hora de Ciudad de México), GitHub sube a tu canal el siguiente video de `cola.json` y lo anota en `subidos.json`, así que nunca se repite uno. No usa ningún servicio de pago ni tiene un límite mensual. La cuota gratis de la API de YouTube alcanza para unos **6 videos al día**.

## Configuración (una sola vez, unos 20 minutos)

### 1. Proyecto de Google Cloud
1. Entra a https://console.cloud.google.com, inicia sesión **con la cuenta dueña del canal** y crea un proyecto (por ejemplo, "subidas-shorts").
2. Ve a **APIs y servicios → Biblioteca**, busca **YouTube Data API v3** y pulsa **Habilitar**.
3. En **Pantalla de consentimiento de OAuth** (o "Google Auth Platform"), elige tipo **Externo** y pon nombre de app y tu correo. Agrégate como usuario de prueba.
4. **Importante:** en **Público**, pulsa **Publicar app** (pasa de "Prueba" a "En producción"). Si se queda en "Prueba", el permiso vence a los 7 días y las subidas se detienen.
5. En **Credenciales → Crear credenciales → ID de cliente de OAuth**, elige tipo **Aplicación web**. En "URI de redireccionamiento autorizados" pon `https://developers.google.com/oauthplayground` y guarda. Copia el **ID de cliente** y el **Secreto**.

### 2. Sacar el "refresh token"
1. Abre https://developers.google.com/oauthplayground.
2. Pulsa el engrane ⚙️, marca **Use your own OAuth credentials** y pega tu ID de cliente y tu secreto.
3. En el cuadro "Input your own scopes" escribe `https://www.googleapis.com/auth/youtube.upload` y pulsa **Authorize APIs**.
4. Elige la cuenta del canal. Si aparece "Google no verificó esta app", entra en **Configuración avanzada → Ir a … (no seguro)**. Es tu propia app, así que no hay problema.
5. Pulsa **Exchange authorization code for tokens** y copia el **Refresh token**.

### 3. Guardar los 3 secretos en GitHub
En el repositorio: **Settings → Secrets and variables → Actions → New repository secret**. Crea:

| Nombre | Valor |
|---|---|
| `YT_CLIENT_ID` | ID de cliente |
| `YT_CLIENT_SECRET` | Secreto del cliente |
| `YT_REFRESH_TOKEN` | Refresh token |

Nunca los pegues en un chat ni en un archivo del repositorio.

### 4. Activarlo
- Los horarios programados de GitHub solo corren en la **rama principal** del repositorio, así que el workflow `.github/workflows/subir-youtube.yml` tiene que estar en ella (fusiona la rama donde está).
- Para probarlo ya: pestaña **Actions → Subir video a YouTube → Run workflow**. Pon `prueba = 1` para ver qué subiría sin subir nada, y luego `0` para subir de verdad.

## ⚠️ Los videos pueden quedar privados al principio
YouTube deja en **privado** todo lo que sube un proyecto de Google Cloud nuevo que aún no ha pasado su revisión ("audit"). Si el registro de Actions dice `visibilidad: private`:
1. Llena el formulario gratuito de auditoría de la API de YouTube: https://support.google.com/youtube/contact/yt_api_form ("YouTube API Services - Audit and Quota Extension Form"). Explica que es una herramienta interna para subir los videos de tu propio canal.
2. Mientras llega la aprobación, que suele tardar de días a unas semanas, cambia a público a mano los que ya se subieron, desde YouTube Studio.
3. Si prefieres que se suban como "no listados", crea en GitHub la **variable** (no secreto) `PRIVACIDAD` con valor `unlisted`.

## Uso diario
- **Agregar videos:** añade una entrada a `cola.json` (archivo, título, descripción y etiquetas). Se suben en orden.
- **Subir más de uno al día:** crea la variable `POR_EJECUCION`, por ejemplo con valor `2`. El máximo práctico es 6, por la cuota.
- **Cambiar la hora:** edita la línea `cron` del workflow. Está en hora UTC; 01:07 UTC son las 19:07 en Ciudad de México.
