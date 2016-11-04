:: 自动将指定文件夹中的图片写入到 html 文件中
@echo off & SetLocal EnableDelayedExpansion
For /f "delims=" %%i in ('dir /b blog') do (Set a=%%~pi
Set a=!a:\= !)
For %%i in (%a%) do Set b=%%i
::获取文件夹名
Set n=0
(
Echo ^<Html^>
Echo ^<Title^>
Echo %b%
Echo ^</Title^>
Echo ^<Body^>
For /r %%i in (*.html) do (Echo ^<Img Src="blog/%%i"^>
Set n=1)
::将指定文件夹中所有的图片地址写入到html文件中。
Echo ^</Body^>
Echo ^</Html^>
)>"%b%.html"
If %n%==0 Msg * "指定文件夹中没有图片" & del %b%.html
If %n%==1 Start "" "%b%.html"