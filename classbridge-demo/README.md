# ClassBridge demo

Seven Stitch screens in one page. The screens are exactly as Stitch made them; `assets/demo.js` only adds behaviour.

## Run
```powershell
.\serve.ps1
```
Open http://localhost:8080/index.html (Chrome or Edge). Optional, once while online: `.\get-images.ps1` so the photos work offline.

## Presenter keys
| Key | Does |
|---|---|
| Right / Left arrow | next / previous screen |
| Alt+1 ... Alt+7 | jump: 1 deaf, 2 question, 3 copilot, 4 blind, 5 eye control, 6 keyboard, 7 voice bank + EEG |
| Alt+A | auto eye-control demo (calibration, phrases, keyboard, emergency) |
| Alt+C | calibration only |
| Esc | stop the auto demo / close an alert |

## What happens on each screen
1. **Deaf view**: Play lesson. Simplified captions, key words highlighted, voice reads the lecture. Wait freezes the captions while the lecture keeps going and lines pile up; Continue catches up. A door knock, a name call and an alarm arrive as full-screen flashes.
2. **Question**: the device speaks the question, the teacher replies, Thank you.
3. **Lecture copilot**: notes write themselves; tap a question for a private answer.
4. **Blind view**: speech and equation read aloud, Repeat Equation, Describe Room, Ask a Question (scripted voice question and answer), Sound Alerts. Tap any text to hear it.
5. **Eye control**: scripted gaze (dwell 0.85 s), keyboard, emergency siren.
6. **Voice bank**: Record New Phrase records your real voice (needs mic permission); Test My Voice plays it back. The four saved cards use the browser voice.
7. **EEG**: scripted; picks YES by itself.

## Honest notes
* Everything except the microphone recording is scripted. The gaze cursor is not tracking eyes and the EEG is not a headset.
* `?fix=1` fixes two Stitch defects (blind screen shows `&frac24`; the 5-tab nav wraps and cuts the logo). Off by default.
* One invisible fix is always on: on the keyboard the key labelled S typed B in Stitch's code.
* Some Stitch text still mentions signing (ASL Translator, signed in ASL). Kept as designed.
