# MoneyCal Master Scheduler - Windows Service Manager
# This script manages the automated content generation and GitHub sync service

param(
    [switch]$Background,
    [switch]$InstallService,
    [switch]$UninstallService,
    [switch]$StartService,
    [switch]$StopService,
    [switch]$Status,
    [switch]$Logs
)

$ServiceName = "MoneyCalMasterScheduler"
$ServiceDisplayName = "MoneyCal Master Scheduler Service"
$ServiceDescription = "Automated content generation and GitHub sync service for MoneyCal"
$ScriptPath = Join-Path $PSScriptRoot "auto-master-scheduler.cjs"
$NodePath = "node"
$WorkingDirectory = $PSScriptRoot

# Colors for output
$Green = "Green"
$Red = "Red"
$Yellow = "Yellow"
$Cyan = "Cyan"

function Write-ColorOutput {
    param([string]$Message, [string]$Color = "White")
    Write-Host $Message -ForegroundColor $Color
}

function Test-Prerequisites {
    Write-ColorOutput "🔍 Checking prerequisites..." $Cyan
    
    # Check if Node.js is installed
    try {
        $nodeVersion = & node --version 2>$null
        if ($LASTEXITCODE -eq 0) {
            Write-ColorOutput "✅ Node.js found: $nodeVersion" $Green
        } else {
            Write-ColorOutput "❌ Node.js not found. Please install Node.js first." $Red
            return $false
        }
    } catch {
        Write-ColorOutput "❌ Node.js not found. Please install Node.js first." $Red
        return $false
    }
    
    # Check if script exists
    if (Test-Path $ScriptPath) {
        Write-ColorOutput "✅ Master scheduler script found" $Green
    } else {
        Write-ColorOutput "❌ Master scheduler script not found: $ScriptPath" $Red
        return $false
    }
    
    # Check if git is available
    try {
        $gitVersion = & git --version 2>$null
        if ($LASTEXITCODE -eq 0) {
            Write-ColorOutput "✅ Git found: $gitVersion" $Green
        } else {
            Write-ColorOutput "❌ Git not found. Please install Git first." $Red
            return $false
        }
    } catch {
        Write-ColorOutput "❌ Git not found. Please install Git first." $Red
        return $false
    }
    
    return $true
}

function Start-MasterScheduler {
    Write-ColorOutput "🚀 Starting MoneyCal Master Scheduler..." $Cyan
    
    if (-not (Test-Prerequisites)) {
        Write-ColorOutput "❌ Prerequisites check failed. Cannot start scheduler." $Red
        return
    }
    
    Write-ColorOutput "📁 Working Directory: $WorkingDirectory" $Yellow
    Write-ColorOutput "📄 Script Path: $ScriptPath" $Yellow
    Write-ColorOutput "⏰ Schedule: Every 36 hours" $Yellow
    Write-ColorOutput "🔄 Git Sync: Every 12 hours" $Yellow
    Write-ColorOutput "🌐 Repository: https://github.com/harshraj0235/fincal" $Yellow
    
    if ($Background) {
        Write-ColorOutput "🔄 Starting in background mode..." $Yellow
        Start-Process -FilePath $NodePath -ArgumentList "`"$ScriptPath`"" -WorkingDirectory $WorkingDirectory -WindowStyle Hidden
        Write-ColorOutput "✅ Master scheduler started in background" $Green
        Write-ColorOutput "💡 Use 'Get-Process | Where-Object {$_.ProcessName -eq 'node'}' to check if running" $Yellow
    } else {
        Write-ColorOutput "🔄 Starting in foreground mode..." $Yellow
        Write-ColorOutput "💡 Press Ctrl+C to stop the scheduler" $Yellow
        Write-ColorOutput "─" * 50 $Cyan
        
        try {
            Set-Location $WorkingDirectory
            & $NodePath $ScriptPath
        } catch {
            Write-ColorOutput "❌ Error starting scheduler: $($_.Exception.Message)" $Red
        }
    }
}

function Install-WindowsService {
    Write-ColorOutput "🔧 Installing Windows Service..." $Cyan
    
    if (-not (Test-Prerequisites)) {
        Write-ColorOutput "❌ Prerequisites check failed. Cannot install service." $Red
        return
    }
    
    # Check if running as administrator
    if (-not ([Security.Principal.WindowsPrincipal] [Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole] "Administrator")) {
        Write-ColorOutput "❌ This operation requires administrator privileges." $Red
        Write-ColorOutput "💡 Please run PowerShell as Administrator and try again." $Yellow
        return
    }
    
    try {
        # Create service using sc.exe
        $scArgs = @(
            "create",
            $ServiceName,
            "binPath=`"$NodePath `"$ScriptPath`"`"",
            "DisplayName=`"$ServiceDisplayName`"",
            "start=auto",
            "obj=LocalSystem"
        )
        
        & sc.exe $scArgs
        
        if ($LASTEXITCODE -eq 0) {
            # Set service description
            & sc.exe "description", $ServiceName, $ServiceDescription
            
            Write-ColorOutput "✅ Windows service installed successfully" $Green
            Write-ColorOutput "💡 Use 'Start-Service $ServiceName' to start the service" $Yellow
            Write-ColorOutput "💡 Use 'Get-Service $ServiceName' to check service status" $Yellow
        } else {
            Write-ColorOutput "❌ Failed to install Windows service" $Red
        }
    } catch {
        Write-ColorOutput "❌ Error installing service: $($_.Exception.Message)" $Red
    }
}

function Uninstall-WindowsService {
    Write-ColorOutput "🗑️ Uninstalling Windows Service..." $Cyan
    
    # Check if running as administrator
    if (-not ([Security.Principal.WindowsPrincipal] [Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole] "Administrator")) {
        Write-ColorOutput "❌ This operation requires administrator privileges." $Red
        Write-ColorOutput "💡 Please run PowerShell as Administrator and try again." $Yellow
        return
    }
    
    try {
        # Stop service first if running
        $service = Get-Service -Name $ServiceName -ErrorAction SilentlyContinue
        if ($service -and $service.Status -eq "Running") {
            Write-ColorOutput "🛑 Stopping service first..." $Yellow
            Stop-Service -Name $ServiceName -Force
        }
        
        # Delete service
        & sc.exe "delete", $ServiceName
        
        if ($LASTEXITCODE -eq 0) {
            Write-ColorOutput "✅ Windows service uninstalled successfully" $Green
        } else {
            Write-ColorOutput "❌ Failed to uninstall Windows service" $Red
        }
    } catch {
        Write-ColorOutput "❌ Error uninstalling service: $($_.Exception.Message)" $Red
    }
}

function Start-WindowsService {
    Write-ColorOutput "🚀 Starting Windows Service..." $Cyan
    
    try {
        Start-Service -Name $ServiceName
        Write-ColorOutput "✅ Service started successfully" $Green
    } catch {
        Write-ColorOutput "❌ Error starting service: $($_.Exception.Message)" $Red
    }
}

function Stop-WindowsService {
    Write-ColorOutput "🛑 Stopping Windows Service..." $Cyan
    
    try {
        Stop-Service -Name $ServiceName -Force
        Write-ColorOutput "✅ Service stopped successfully" $Green
    } catch {
        Write-ColorOutput "❌ Error stopping service: $($_.Exception.Message)" $Red
    }
}

function Get-ServiceStatus {
    Write-ColorOutput "📊 Service Status:" $Cyan
    
    # Check Windows service
    $service = Get-Service -Name $ServiceName -ErrorAction SilentlyContinue
    if ($service) {
        Write-ColorOutput "   Windows Service: $($service.Status)" $(if ($service.Status -eq "Running") { $Green } else { $Red })
    } else {
        Write-ColorOutput "   Windows Service: Not installed" $Yellow
    }
    
    # Check Node.js processes
    $nodeProcesses = Get-Process | Where-Object { $_.ProcessName -eq "node" } | Where-Object { $_.CommandLine -like "*auto-master-scheduler*" -or $_.CommandLine -like "*$ScriptPath*" }
    if ($nodeProcesses) {
        Write-ColorOutput "   Node.js Processes: $($nodeProcesses.Count) running" $Green
        foreach ($proc in $nodeProcesses) {
            Write-ColorOutput "     - PID: $($proc.Id), Started: $($proc.StartTime)" $Yellow
        }
    } else {
        Write-ColorOutput "   Node.js Processes: None running" $Red
    }
    
    # Check log files
    $logFile = Join-Path $WorkingDirectory "master-scheduler.log"
    if (Test-Path $logFile) {
        $logInfo = Get-Item $logFile
        Write-ColorOutput "   Log File: $($logInfo.Length) bytes, Last Modified: $($logInfo.LastWriteTime)" $Yellow
    } else {
        Write-ColorOutput "   Log File: Not found" $Red
    }
}

function Show-Logs {
    Write-ColorOutput "📋 Recent Logs:" $Cyan
    
    $logFile = Join-Path $WorkingDirectory "master-scheduler.log"
    if (Test-Path $logFile) {
        $logs = Get-Content $logFile -Tail 20
        foreach ($log in $logs) {
            if ($log -match "ERROR") {
                Write-ColorOutput $log $Red
            } elseif ($log -match "WARN") {
                Write-ColorOutput $log $Yellow
            } else {
                Write-ColorOutput $log $Green
            }
        }
    } else {
        Write-ColorOutput "❌ Log file not found" $Red
    }
}

# Main execution
Write-ColorOutput "🎯 MoneyCal Master Scheduler Manager" $Cyan
Write-ColorOutput "─" * 50 $Cyan

if ($InstallService) {
    Install-WindowsService
} elseif ($UninstallService) {
    Uninstall-WindowsService
} elseif ($StartService) {
    Start-WindowsService
} elseif ($StopService) {
    Stop-WindowsService
} elseif ($Status) {
    Get-ServiceStatus
} elseif ($Logs) {
    Show-Logs
} else {
    # Default: Start the scheduler
    Start-MasterScheduler
}

Write-ColorOutput "─" * 50 $Cyan
Write-ColorOutput "✅ Operation completed" $Green
