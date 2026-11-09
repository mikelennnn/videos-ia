"""Sube a YouTube el siguiente video de publicar/cola.json que aún no esté en publicar/subidos.json.

Lo ejecuta GitHub Actions (.github/workflows/subir-youtube.yml). Solo usa la biblioteca estándar.
Variables de entorno (secretos del repositorio):
  YT_CLIENT_ID, YT_CLIENT_SECRET, YT_REFRESH_TOKEN
Opcionales:
  POR_EJECUCION (cuántos videos subir en cada ejecución, 1 por defecto)
  PRIVACIDAD (public | unlisted | private, public por defecto)
  PRUEBA=1 (no sube nada: solo muestra qué subiría)
"""
import json, os, sys, urllib.request, urllib.parse, urllib.error

RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
COLA = os.path.join(RAIZ, 'publicar', 'cola.json')
SUBIDOS = os.path.join(RAIZ, 'publicar', 'subidos.json')


def token_de_acceso():
    datos = urllib.parse.urlencode({
        'client_id': os.environ['YT_CLIENT_ID'], 'client_secret': os.environ['YT_CLIENT_SECRET'],
        'refresh_token': os.environ['YT_REFRESH_TOKEN'], 'grant_type': 'refresh_token'}).encode()
    with urllib.request.urlopen('https://oauth2.googleapis.com/token', datos, timeout=60) as r:
        return json.load(r)['access_token']


def subir(token, v, privacidad):
    ruta = os.path.join(RAIZ, v['archivo']); tam = os.path.getsize(ruta)
    meta = {'snippet': {'title': v['titulo'][:100], 'description': v['descripcion'][:5000], 'tags': v.get('etiquetas', []),
                        'categoryId': '27', 'defaultLanguage': 'es', 'defaultAudioLanguage': 'es'},
            'status': {'privacyStatus': privacidad, 'selfDeclaredMadeForKids': False, 'containsSyntheticMedia': False}}
    ini = urllib.request.Request(
        'https://www.googleapis.com/upload/youtube/v3/videos?uploadType=resumable&part=snippet,status',
        data=json.dumps(meta).encode(), method='POST',
        headers={'Authorization': f'Bearer {token}', 'Content-Type': 'application/json; charset=UTF-8',
                 'X-Upload-Content-Type': 'video/mp4', 'X-Upload-Content-Length': str(tam)})
    with urllib.request.urlopen(ini, timeout=60) as r:
        destino = r.headers['Location']
    with open(ruta, 'rb') as f:
        put = urllib.request.Request(destino, data=f.read(), method='PUT',
                                     headers={'Authorization': f'Bearer {token}', 'Content-Type': 'video/mp4'})
    with urllib.request.urlopen(put, timeout=900) as r:
        res = json.load(r)
    return res['id'], res.get('status', {}).get('privacyStatus')


def main():
    cola = json.load(open(COLA, encoding='utf-8'))
    hechos = json.load(open(SUBIDOS, encoding='utf-8'))
    ya = {h['archivo'] for h in hechos}
    pendientes = [v for v in cola if v['archivo'] not in ya]
    n = int(os.environ.get('POR_EJECUCION') or 1); privacidad = os.environ.get('PRIVACIDAD') or 'public'
    if not pendientes:
        print('No quedan videos en la cola. Agrega más a publicar/cola.json.'); return
    lote = pendientes[:n]
    if os.environ.get('PRUEBA') == '1':
        for v in lote: print('[prueba] subiría:', v['archivo'], '→', v['titulo'], f'({os.path.getsize(os.path.join(RAIZ, v["archivo"])) / 1e6:.1f} MB)')
        print(f'Pendientes: {len(pendientes)}'); return
    token = token_de_acceso()
    for v in lote:
        try:
            vid, priv = subir(token, v, privacidad)
        except urllib.error.HTTPError as e:
            print('Error de YouTube:', e.code, e.read().decode()[:2000]); sys.exit(1)
        print(f'Subido: {v["titulo"]} → https://youtube.com/shorts/{vid} (visibilidad: {priv})')
        if priv != privacidad:
            print('AVISO: YouTube cambió la visibilidad. Si quedó en "private", el proyecto de Google Cloud aún no está verificado (ver publicar/README.md).')
        hechos.append({'archivo': v['archivo'], 'id': vid, 'titulo': v['titulo']})
        json.dump(hechos, open(SUBIDOS, 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
    print(f'Quedan {len(pendientes) - len(lote)} en la cola.')


if __name__ == '__main__':
    main()
