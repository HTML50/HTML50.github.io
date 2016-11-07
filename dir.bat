@echo off
FOR /F %%I IN ('DIR /B /OD /TC blog') DO set file=%%I
echo %file%