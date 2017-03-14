::根据最新文档，自动生成html，并更新上传 
chcp 65001
@echo off
setlocal enabledelayedexpansion
set memo=%1
if {%memo%}=={} (
echo= 
set /p memo=输入文章标题: 
if {!memo!}=={} set memo=文章忘写概述标题了
) else (
set memo=%1
)

FOR /F %%I IN ('DIR /B /OD /TC list-img') DO set img=%%I
FOR /F %%I IN ('DIR /B /OD /TC blog') DO set file=%%I
(
echo=
echo ^<^^!-----------------item-----------------^>
echo=
echo ^<div class='divider'^>^</div^>
echo=
echo ^<a href='javascript:makeRequest^("./blog/%file%",1^)' target='_self'^>
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
FOR /F "tokens=3 delims=<>" %%I IN ('findstr /i /r "<body><h1>.*</h1>" .\blog\%file%') DO echo %%I
echo ^</div^>
echo ^<div class='item-date'^>
echo %date:~0,4%-%date:~5,2%-%date:~8,2%
echo ^</div^>
echo ^<div class='item-summary'^>
echo %memo%
echo ^</div^>
echo ^</div^>
echo=
echo ^</div^>
echo ^</a^>
)>>list.html
chcp 936
mode con cols=130 lines=230
echo 生成HTML完毕！