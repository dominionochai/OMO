# Run ONCE while online: saves the 7 Stitch photos next to the page so the demo works with no internet.
$root = $PSScriptRoot
$dir = Join-Path $root 'assets\img'
New-Item -ItemType Directory -Force $dir | Out-Null
$path = Join-Path $root 'index.html'
$html = [System.IO.File]::ReadAllText($path)
$urls = @(
  'https://lh3.googleusercontent.com/aida/AEtjO1W465o8Gxz-tRdUh3SogUqx9Zu45AYviAQIFJnjyHS6xkz8EmmWRz-iX-YawcJGLKl2kj29GLl_MGaNPPIuj8Sq-YOqur5BHIsmKWzlBvWgg1jTRs8kx246guAAI9Ma5CSnaWQn2RXbpzh5IR-qL-qMNLAf9zsZCML_UDpdf3Fi3pblKhLgvPAGCdXmI1G7tQiZ4awvkZVV-riV47zhnY-rS5RG6qkGNJs4JKy21I0eXEGFMu7G_LEotFf0',
  'https://lh3.googleusercontent.com/aida/AEtjO1VhFquL_QN5SZ8qI8P5lHDiSTHK5eXnSt8HlCa2iuuiSLFwFIeECylOFef-wyUOBOa3ZQuHKQwa5f1ziDngkpNVWoRH-TSMUN1cjd4DJ7HdWG3xdPYS4MiofolbYY26PtrlnX97yuzRypbhVaMSkwo8HuQtF9qCxa03_88kIYbx_4W_b5gCrON7iuKq1_kJjVOMApcslZVK2sTlVJ-Yse7Jrvx0rfV6nKdAZlDIpNk2b0Q2PgcHm6jAqI5C',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuD9UjiEDoTMI3aFJk_tD2qCsi-40Q-iJR0Od7dqihQg9j_qD5s_sdbefsnd3cTMPp0yItUdcd-dLHyxmvqf9vT4xIryhYfqHVutf5JqQH6_3wVWxmfADzst9roHmAOsG9KZABXTRax_W2NiFvauTzVb3S0FnN7wslOvonV8YQWt-d1OSpFr0ZD2yYF4_l_oBQQwLKP6SmxwfFuk_sVw01hEkpXYnkGVuqxzhsFiGhFcadlRrecsEGxxgQ',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuB-czDjUbWbxsjYo0nJ15Kk_wyScPMr0vF9VOmzf6l3Wmtk1CEYJXCr8CSFqQZnf4ltCy2BlEbjiX8SVKPuB6i_54FTxLqREtldMYEttssshJffBzHaACSzNN4enHhuZ0gxIkzO3nr-oIvZSSWkbn2vDhhnGEWsyruG6xTSfo-wo_BYOkWCxA07eUXM2VVw5U8LU6F8iLor3pWfiCr1qKW3b8sbZ5SHuTI9Xs514KmMqAMNTMi6dAwccw',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuArKtBThr6frmg8IxeMn2BQWGyGcn--MM1SKA7jl1Krl1-ARDfqCXuUc-Am-Gskb_-cFZWpFvzpra1s67X7XBzvgBm7OuOj-wLJjN0n7RD5VnSjSEp0Nbyu274PCJHU4ejjefRHg9BxLMWzqUnY6Rdd4g0oa2yHeunJCirMqonNB754zA6tcl_P4OMt04JKxKXiSrHZEvd4upNd-pkVoEExsQ-CmR3Myp9iS5zTi5AdGp_v09FkvTjwbA',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuCkg0iaWY8JBQNwNsXWX4dszVo87T2c9MQ83vkHcvrAZa4e22vRw0p9vD8YkKvMo5Aa7Z3Wifz4JecI7yLoqZ5KKTgG6N5fOS1nN2OfdeQ7vThh3pZperKz1JpmvOXSyMlYtvapFIS3v6VEF8v7RJJsHitRiBRg5UNqSvs4icwIwaZBSjcVEya3cABulyy-oTfxm8q0eyq0qEpAHg1UAKhWFsEVJvsV9KmeEfBq_DaTPsTG9p3EvAeFLw',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuDkkcyrvZPTJ7M_oDOWXHbpbTKi_E0EpnDu1H7Cg0_EwPS029dICO_89ImhxmziEQ3blZLxXEIAOvUgH98YxZyziHEkGhXet3OpvKHNaBgdYbyy5V6bBv4FmSfMrXkBV3BpKtQ6dV-uUwmKIow7VUvcMMjdR8eyWkKnllsjgLUuL3xDascxwVJdop6bsiS67mkVofSlq0Ufs90xIUAISt8y0DCSxTbzOykNv4mPExGp6wChx6mmUQqVfA'
)
for ($i = 0; $i -lt $urls.Count; $i++) {
  $name = 'img' + ($i + 1) + '.jpg'
  Invoke-WebRequest -Uri $urls[$i] -OutFile (Join-Path $dir $name) -UseBasicParsing
  $html = $html.Replace($urls[$i], 'assets/img/' + $name)
}
[System.IO.File]::WriteAllText($path, $html, (New-Object System.Text.UTF8Encoding($false)))
Write-Host 'Done. Images saved to assets\img and index.html updated.'
