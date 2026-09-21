# Starts the demo on http://localhost:8080 (localhost is needed so the browser allows the microphone).
Set-Location $PSScriptRoot
Start-Process 'http://localhost:8080/index.html'
python -m http.server 8080
