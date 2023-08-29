@ECHO OFF
wt --size "130,35" --title "Command Line" pwsh ; sp --title "Backend Server" -d ".\backend" -p "Backend"  cmd /K "pocketbase serve --dir=database";^
sp --title "Frontend Server" --size 0.85 -H -d ".\frontend" cmd /k "yarn dev"
exit 0
