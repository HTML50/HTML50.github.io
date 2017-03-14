@echo off

set memo=%1
if {%memo%}=={} (
set memo=new blog
) else (
set memo=%1
)


cmd /c "make.bat %1"
git add ./
git commit -m "blog update: %memo%"
git push


