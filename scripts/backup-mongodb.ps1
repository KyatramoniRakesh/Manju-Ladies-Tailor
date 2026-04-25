param(
  [string]$MongoUri = $env:MONGODB_URI,
  [string]$BackupRoot = "D:\Backups\manju-tailors",
  [string]$ToolsPath = ""
)

if (-not $MongoUri) {
  Write-Error "Set MONGODB_URI first, or pass -MongoUri."
  exit 1
}

$stamp = Get-Date -Format "yyyy-MM-dd_HH-mm"
$target = Join-Path $BackupRoot $stamp
New-Item -ItemType Directory -Force -Path $target | Out-Null

$mongodump = "mongodump"
if ($ToolsPath) {
  $mongodump = Join-Path $ToolsPath "mongodump.exe"
}

& $mongodump --uri $MongoUri --out $target

if ($LASTEXITCODE -ne 0) {
  Write-Error "Backup failed."
  exit $LASTEXITCODE
}

Write-Host "Backup created at: $target"
