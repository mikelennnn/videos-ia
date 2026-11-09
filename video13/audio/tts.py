import json, base64, urllib.request, sys
text = open('texto.txt').read().strip()
body = json.dumps({"text": text, "model_id": "eleven_multilingual_v2", "language_code": "es",
  "voice_settings": {"stability": .45, "similarity_boost": .8, "style": .38, "use_speaker_boost": True, "speed": 1.1}}).encode()
req = urllib.request.Request("https://api.elevenlabs.io/v1/text-to-speech/TX3LPaxmHKxFdv7VOQHJ/with-timestamps?output_format=mp3_44100_128", data=body, headers={"xi-api-key": "dummy", "Content-Type": "application/json"})
d = json.load(urllib.request.urlopen(req, timeout=180))
open('voz.mp3', 'wb').write(base64.b64decode(d['audio_base64']))
al = d['alignment']; ch, st, en = al['characters'], al['character_start_times_seconds'], al['character_end_times_seconds']
words, cur, s0 = [], '', None
for c, s, e in zip(ch, st, en):
    if c.isspace():
        if cur: words.append({"w": cur, "s": round(s0, 3), "e": round(pe, 3)}); cur = ''
    else:
        if not cur: s0 = s
        cur += c; pe = e
if cur: words.append({"w": cur, "s": round(s0, 3), "e": round(pe, 3)})
json.dump(words, open('words.json', 'w'), ensure_ascii=False)
print(len(words), words[-1])
