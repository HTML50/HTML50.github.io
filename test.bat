:: 自动将指定文件夹中的图片写入到 html 文件中
chcp 65001
@echo off
set memo=%1
if {%1}=={} set memo=文章忘写概述标题了
FOR /F %%I IN ('DIR /B /OD /TC list-img') DO set img=%%I
FOR /F %%I IN ('DIR /B /OD /TC blog') DO set file=%%I
(
echo=
echo ^<!-----------------item-----------------^>
echo=
echo ^<div class='divider'^>^</div^>
echo=
echo ^<a href='javascript:makeRequest^("./blog/%file%",1^)'^>
echo ^<div class='item'^>
echo=
echo ^<div class='left-box'^>
echo ^<div class='item-img'^>
echo ^<img src='list-img/%img%'^>
echo ^</div^>
echo ^</div^>
echo=
echo ^<div class='right-box'^>
echo ^<div class='item-title'^>
FOR /F "tokens=2 delims=</h1>" %%I IN ('findstr /i /r "<body><h1>.*</h1>" .\blog\%file%') DO echo %%I
echo ^</div^>
echo ^<div class='item-date'^>
echo %date:~0,4%-%date:~5,2%-%date:~9,2%
echo ^</div^>
echo ^<div class='item-summary'^>
echo %memo%
echo ^</div^>
echo ^</div^>
echo=
echo ^</div^>
echo ^</a^>
echo=
)>>test.html
start "F:\Users\liu\Documents\GitHub\HTML50.github.io\index.html"
chcp 936