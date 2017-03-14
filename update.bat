@echo off
set p=%1

if "%p%"=="" (echo= && echo 使用方法: %0  文章的摘要) else (
cmd /c "make.bat %1"
git add ./
git commit -m "blog update: %1"
git push
)