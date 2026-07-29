@echo off
setlocal
cd /d "%~dp0"

echo ============================================
echo  ApresentacaoPSTU (site GitHub Pages)
echo ============================================
echo.
rem O que entra aqui e definido pelo .gitignore: materiais .pptx/.pdf,
rem backups .save, anotacoes locais e temporarios ficam de fora, entao
rem o git add -A abaixo pega somente as pecas reais do site.
echo Alteracoes pendentes (pecas do site):
git status --short
echo.

for /f "delims=" %%i in ('git status --porcelain') do goto :haschanges
echo Nada novo para commitar.
goto :push

:haschanges
set "MSG="
set /p MSG="Mensagem do commit (Enter = 'Atualiza apresentacao'): "
if "%MSG%"=="" set "MSG=Atualiza apresentacao"
git add -A
git commit -m "%MSG%"

:push
echo.
echo Enviando para o GitHub (origin/master)...
git push origin master
if errorlevel 1 (
    echo.
    echo *** FALHA no push! Verifique a conexao ou conflitos. ***
) else (
    echo.
    echo Site sera atualizado em ~1 minuto:
    echo https://deniormachado.github.io/ApresentacaoPSTU/
)
echo.
pause
