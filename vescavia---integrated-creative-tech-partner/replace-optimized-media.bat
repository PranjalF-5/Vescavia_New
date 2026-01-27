@echo off
REM ============================================
REM Media Replacement Script
REM Run this after optimizing media files
REM ============================================

echo.
echo ========================================
echo  Media Replacement Script
echo ========================================
echo.
echo This will replace original files with optimized versions.
echo.
echo WARNING: Original files will be backed up to public\backup
echo.
pause

REM Create backup directory
echo.
echo Creating backup directory...
if not exist "public\backup" mkdir "public\backup"
if not exist "public\backup\Images" mkdir "public\backup\Images"

REM Backup original files
echo Backing up original files...
copy /Y "public\*.mp4" "public\backup\" >nul 2>&1
xcopy /Y /S "public\Images\*" "public\backup\Images\" >nul 2>&1

echo Backup completed!

REM Check if optimized directory exists
if not exist "public\optimized" (
    echo.
    echo ERROR: Optimized directory not found!
    echo Please run: node optimize-media.js first
    echo.
    pause
    exit /b 1
)

REM Replace with optimized files
echo.
echo Replacing with optimized files...
copy /Y "public\optimized\*.mp4" "public\" >nul 2>&1
xcopy /Y /S "public\optimized\Images\*" "public\Images\" >nul 2>&1

echo.
echo ========================================
echo  DONE!
echo ========================================
echo.
echo  Original files backed up to: public\backup
echo  Optimized files copied to: public
echo.
echo  Next: Test your website to ensure everything works
echo.
pause
