# Fincal Automation Service PowerShell Script
# This script starts the automation service that runs all scripts every 36 hours

param(
    [switch]$InstallService,
    [switch]$UninstallService,
    [switch]$StartService,
    [switch]$StopService,
    [switch]$Status
)

# Set execution policy for current session
Set-ExecutionPolicy -ExecutionPolicy Bypass -Scope Process -Force

# Configuration
$ServiceName = "FincalAutomation"
$ScriptPath = Join-Path $PSScriptRoot "auto-runner.cjs"
$ProjectRoot = Split-Path $PSScriptRoot -Parent
$LogPath = Join-Path $PSScriptRoot "auto-runner.log"

# Colors for output
$Colors = @{
    Red = "Red"
    Green = "Green"
    Yellow = "Yellow"
    Blue = "Blue"
    Cyan = "Cyan"
    Magenta = "Magenta"
}

function Write-ColorOutput {
    param(
        [string]$Message,
        [string]$Color = "White"
    )
    Write-Host $Message -ForegroundColor $Color
}

function Test-Prerequisites {
    Write-ColorOutput "Checking prerequisites..." $Colors.Blue
    
    # Check Node.js
    try {
        $nodeVersion = node --version 2>$null
        if ($LASTEXITCODE -eq 0) {
            Write-ColorOutput "✅ Node.js: $nodeVersion" $Colors.Green
        } else {
            throw "Node.js not found"
        }
    } catch {
        Write-ColorOutput "❌ Node.js is not installed or not in PATH" $Colors.Red
        Write-ColorOutput "Please install Node.js from https://nodejs.org/" $Colors.Yellow
        return $false
    }
    
    # Check Git
    try {
        $gitVersion = git --version 2>$null
        if ($LASTEXITCODE -eq 0) {
            Write-ColorOutput "✅ Git: $gitVersion" $Colors.Green
        } else {
            throw "Git not found"
        }
    } catch {
        Write-ColorOutput "❌ Git is not installed or not in PATH" $Colors.Red
        Write-ColorOutput "Please install Git from https://git-scm.com/" $Colors.Yellow
        return $false
    }
    
    # Check if this is a Git repository
    if (-not (Test-Path (Join-Path $ProjectRoot ".git"))) {
        Write-ColorOutput "❌ This directory is not a Git repository" $Colors.Red
        Write-ColorOutput "Please run 'git init' and configure the repository" $Colors.Yellow
        return $false
    }
    
    Write-ColorOutput "✅ All prerequisites are met" $Colors.Green
    return $true
}

function Install-WindowsService {
    Write-ColorOutput "Installing Windows Service..." $Colors.Blue
    
    try {
        # Create service using sc.exe
        $binPath = "powershell.exe -ExecutionPolicy Bypass -File `"$PSScriptRoot\start-automation.ps1`" -StartService"
        
        $result = sc.exe create $ServiceName binPath= $binPath start= auto DisplayName= "Fincal Automation Service"
        
        if ($LASTEXITCODE -eq 0) {
            Write-ColorOutput "✅ Windows Service installed successfully" $Colors.Green
            Write-ColorOutput "Service will start automatically on system boot" $Colors.Cyan
        } else {
            throw "Failed to create service"
        }
    } catch {
        Write-ColorOutput "❌ Failed to install Windows Service: $_" $Colors.Red
        Write-ColorOutput "You may need to run PowerShell as Administrator" $Colors.Yellow
    }
}

function Uninstall-WindowsService {
    Write-ColorOutput "Uninstalling Windows Service..." $Colors.Blue
    
    try {
        # Stop service first
        Stop-Service -Name $ServiceName -Force -ErrorAction SilentlyContinue
        
        # Delete service
        $result = sc.exe delete $ServiceName
        
        if ($LASTEXITCODE -eq 0) {
            Write-ColorOutput "✅ Windows Service uninstalled successfully" $Colors.Green
        } else {
            throw "Failed to delete service"
        }
    } catch {
        Write-ColorOutput "❌ Failed to uninstall Windows Service: $_" $Colors.Red
    }
}

function Start-AutomationService {
    Write-ColorOutput "Starting Fincal Automation Service..." $Colors.Magenta
    
    if (-not (Test-Prerequisites)) {
        Write-ColorOutput "❌ Prerequisites not met. Cannot start service." $Colors.Red
        return
    }
    
    # Change to project directory
    Set-Location $ProjectRoot
    
    Write-ColorOutput "Current directory: $(Get-Location)" $Colors.Cyan
    Write-ColorOutput "Script path: $ScriptPath" $Colors.Cyan
    Write-ColorOutput "Log file: $LogPath" $Colors.Cyan
    Write-ColorOutput "" $Colors.White
    Write-ColorOutput "Service will run all scripts every 36 hours" $Colors.Yellow
    Write-ColorOutput "Press Ctrl+C to stop the service" $Colors.Yellow
    Write-ColorOutput "" $Colors.White
    
    try {
        # Start the automation service
        node $ScriptPath
    } catch {
        Write-ColorOutput "❌ Failed to start automation service: $_" $Colors.Red
    }
}

function Stop-AutomationService {
    Write-ColorOutput "Stopping Fincal Automation Service..." $Colors.Blue
    
    try {
        # Find and stop Node.js processes running our script
        $processes = Get-Process -Name "node" -ErrorAction SilentlyContinue | Where-Object {
            $_.CommandLine -like "*auto-runner.cjs*"
        }
        
        if ($processes) {
            $processes | Stop-Process -Force
            Write-ColorOutput "✅ Automation service stopped" $Colors.Green
        } else {
            Write-ColorOutput "ℹ️ No automation service running" $Colors.Yellow
        }
    } catch {
        Write-ColorOutput "❌ Failed to stop automation service: $_" $Colors.Red
    }
}

function Get-ServiceStatus {
    Write-ColorOutput "Checking service status..." $Colors.Blue
    
    try {
        # Check if Windows service exists
        $service = Get-Service -Name $ServiceName -ErrorAction SilentlyContinue
        if ($service) {
            Write-ColorOutput "✅ Windows Service: $($service.Status)" $Colors.Green
        } else {
            Write-ColorOutput "❌ Windows Service not installed" $Colors.Red
        }
        
        # Check if Node.js process is running
        $processes = Get-Process -Name "node" -ErrorAction SilentlyContinue | Where-Object {
            $_.CommandLine -like "*auto-runner.cjs*"
        }
        
        if ($processes) {
            Write-ColorOutput "✅ Node.js Process: Running (PID: $($processes.Id))" $Colors.Green
        } else {
            Write-ColorOutput "❌ Node.js Process: Not running" $Colors.Red
        }
        
        # Check log file
        if (Test-Path $LogPath) {
            $lastLog = Get-Content $LogPath -Tail 5
            Write-ColorOutput "📝 Recent log entries:" $Colors.Cyan
            $lastLog | ForEach-Object { Write-Host "  $_" -ForegroundColor Gray }
        } else {
            Write-ColorOutput "📝 Log file: Not found" $Colors.Yellow
        }
    } catch {
        Write-ColorOutput "❌ Failed to check service status: $_" $Colors.Red
    }
}

# Main execution
Write-ColorOutput "========================================" $Colors.Magenta
Write-ColorOutput "    FINCAL AUTOMATION SERVICE" $Colors.Magenta
Write-ColorOutput "========================================" $Colors.Magenta
Write-ColorOutput "" $Colors.White

if ($InstallService) {
    Install-WindowsService
} elseif ($UninstallService) {
    Uninstall-WindowsService
} elseif ($StartService) {
    Start-AutomationService
} elseif ($StopService) {
    Stop-AutomationService
} elseif ($Status) {
    Get-ServiceStatus
} else {
    # Default: start the service
    Start-AutomationService
}
