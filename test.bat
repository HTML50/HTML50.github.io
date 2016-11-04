:: 自动将指定文件夹中的图片写入到 html 文件中
@echo off & SetLocal EnableDelayedExpansion
For /f "delims=" %%i in ('dir blog /b /O-D') do (
echo ^<div class='item'^>
echo ^<div class='left-box'^>
echo ^<div class='item-img'^>
echo ^<a href='javascript:makeRequest^("./blog/测试中文.html",1^)'^>
echo ^<img src='img/me.png'^>
echo ^</div^>
echo ^</div^>
echo ^<div class='right-box'^>
echo ^<div class='item-title'^>
echo {{title}}
echo ^</div^>
echo ^<div class='item-date'^>
echo {{data}}
echo ^</div^>
echo ^<div class='item-summary'^>{{memo}}
echo 文章的大概内容是，就是测试，没其他什么
echo ^</a^>
echo ^</div^>
echo ^</div^>
echo ^</div^>
echo ^<div class='divider'^>
echo ^</div^>
)

