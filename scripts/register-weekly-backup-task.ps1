param(
  [string]$TaskName = "ManjuTailorsMongoBackup",
  [ValidateSet("MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN")]
  [string]$DayOfWeek = "SUN",
  [ValidatePattern("^\d{2}:\d{2}$")]
  [string]$Time = "10:00",
  [string]$BackupRoot = "D:\Backups\manju-tailors",
  [string]$ToolsPath = ""
)

$scriptPath = Join-Path $PSScriptRoot "backup-mongodb.ps1"

if (-not (Test-Path -LiteralPath $scriptPath)) {
  Write-Error "Backup script not found at $scriptPath"
  exit 1
}

$quotedScriptPath = '"' + $scriptPath + '"'
$escapedBackupRoot = $BackupRoot.Replace('"', '\"')
$escapedToolsPath = $ToolsPath.Replace('"', '\"')

$taskCommand = "powershell.exe -NoProfile -ExecutionPolicy Bypass -File $quotedScriptPath -BackupRoot ""$escapedBackupRoot"""

if ($ToolsPath) {
  $taskCommand += " -ToolsPath ""$escapedToolsPath"""
}

schtasks /Create /SC WEEKLY /D $DayOfWeek /TN $TaskName /TR $taskCommand /ST $Time /F | Out-Null

if ($LASTEXITCODE -ne 0) {
  Write-Error "Scheduled task creation failed."
  exit $LASTEXITCODE
}

Write-Host "Scheduled task created:"
Write-Host "  Task name : $TaskName"
Write-Host "  Schedule  : Weekly on $DayOfWeek at $Time"
Write-Host "  Backup to : $BackupRoot"
