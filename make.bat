:: �Զ���ָ���ļ����е�ͼƬд�뵽 html �ļ���
@echo off & SetLocal EnableDelayedExpansion
if EXIST test.html del test.html
For /f "delims=" %%i in ('dir blog /b /O-D') do (
echo ^<div class='item'^>
echo ^<div class='left-box'^>
echo ^<div class='item-img'^>
echo ^<a href='javascript:makeRequest^("./blog/%%i",1^)'^>
echo ^<img src='img/me.png'^>
echo ^</div^>
echo ^</div^>
echo ^<div class='right-box'^>
echo ^<div class='item-title'^>
echo type ./blog/%%i | findstr "<body><h1>.*</h1>"
echo ^</div^>
echo ^<div class='item-date'^>
echo %date:~0,4%-%date:~5,2%-%date:~9,2%
echo ^</div^>
echo ^<div class='item-summary'^>
echo ���µĴ�������ǣ����ǲ��ԣ�û����ʲô
echo ^</a^>
echo ^</div^>
echo ^</div^>
echo ^</div^>
echo ^<div class='divider'^>
echo ^</div^>
)>>test.html
start test.html