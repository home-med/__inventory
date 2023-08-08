@ECHO OFF

wt -d ".\backend" -p "Backend"  cmd /K "pocketbase serve --dir=database";^
sp -H -d ".\frontend" cmd /k "yarn dev"
exit 0
