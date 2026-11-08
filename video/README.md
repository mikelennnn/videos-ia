# Video: El pollo que vivió sin cabeza

- `salida/pollo_sin_cabeza.mp4`: video final (1080x1920, 30 fps, 57 s).
- `narracion.txt`: texto de la voz (ElevenLabs, multilingual v2).
- `audio/`: voz, tiempos por palabra (`words.json`), música y efectos sintetizados (`sfx_music.py`).
- `render/`: motor de animación 2D en Canvas (`lib.js`, `assets.js`, `scenes.js`) y el script `run.js` (Playwright).

Para volver a renderizar los fotogramas:
`node render/run.js frames 0 1710 <carpeta>`, después codifica con ffmpeg junto con el audio.
