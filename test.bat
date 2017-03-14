@echo off
::根据最新文档，自动生成html，并更新上传 
chcp 65001
::FOR /F "tokens=2 delims=</h1>" %%I IN ('findstr /i /r "<body><h1>.*</h1>" .\blog\html5api.html') DO echo %%I
FOR /F "tokens=3 delims==<>" %%I IN ("<body><h1>使用html5 audio api音频可视化</h1>") DO echo %%I
echo 生成HTML完毕！