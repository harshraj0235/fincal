# Windows Task Scheduler Setup for Fincal Automation
# This script creates a scheduled task that runs every 36 hours

param(
    [switch]$Create,
    [switch]$Delete,
    [switch]$Status
)

# Configuration
$TaskName = "FincalAutomation"
$TaskDescription = "Runs Fincal automation scripts every 36 hours"
$ScriptPath = Join-Path $PSScriptRoot "auto-runner.cjs"
$ProjectRoot = Split-Path $PSScriptRoot -Parent
$WorkingDirectory = $ProjectRoot

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

function Test-Administrator {
    $currentUser = [Security.Principal.WindowsIdentity]::GetCurrent()
    $principal = New-Object Security.Principal.WindowsPrincipal($currentUser)
    return $principal.IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)
}

function Create-ScheduledTask {
    Write-ColorOutput "Creating scheduled task..." $Colors.Blue
    
    if (-not (Test-Administrator)) {
        Write-ColorOutput "❌ This script requires Administrator privileges" $Colors.Red
        Write-ColorOutput "Please run PowerShell as Administrator" $Colors.Yellow
        return $false
    }
    
    try {
        # Create action
        $action = New-ScheduledTaskAction -Execute "node.exe" -Argument $ScriptPath -WorkingDirectory $WorkingDirectory
        
        # Create trigger (every 36 hours)
        $trigger = New-ScheduledTaskTrigger -Once -At (Get-Date) -RepetitionInterval (New-TimeSpan -Hours 36) -RepetitionDuration (New-TimeSpan -Days 365)
        
        # Create settings
        $settings = New-ScheduledTaskSettingsSet -AllowStartIfOnBatteries -DontStopIfGoingOnBatteries -StartWhenAvailable -RunOnlyIfNetworkAvailable
        
        # Create principal (run as current user)
        $principal = New-ScheduledTaskPrincipal -UserId $env:USERNAME -LogonType Interactive -RunLevel Highest
        
        # Create the task
        $task = New-ScheduledTask -Action $action -Trigger $trigger -Settings $settings -Principal $principal -Description $TaskDescription
        
        # Register the task
        Register-ScheduledTask -TaskName $TaskName -InputObject $task -Force
        
        Write-ColorOutput "✅ Scheduled task created successfully" $Colors.Green
        Write-ColorOutput "Task name: $TaskName" $Colors.Cyan
        Write-ColorOutput "Runs every: 36 hours" $Colors.Cyan
        Write-ColorOutput "Working directory: $WorkingDirectory" $Colors.Cyan
        
        return $true
    } catch {
        Write-ColorOutput "❌ Failed to create scheduled task: $_" $Colors.Red
        return $false
    }
}

function Delete-ScheduledTask {
    Write-ColorOutput "Deleting scheduled task..." $Colors.Blue
    
    if (-not (Test-Administrator)) {
        Write-ColorOutput "❌ This script requires Administrator privileges" $Colors.Red
        Write-ColorOutput "Please run PowerShell as Administrator" $Colors.Yellow
        return $false
    }
    
    try {
        # Check if task exists
        $existingTask = Get-ScheduledTask -TaskName $TaskName -ErrorAction SilentlyContinue
        
        if ($existingTask) {
            # Stop and remove the task
            Unregister-ScheduledTask -TaskName $TaskName -Confirm:$false
            Write-ColorOutput "✅ Scheduled task deleted successfully" $Colors.Green
        } else {
            Write-ColorOutput "ℹ️ Scheduled task not found" $Colors.Yellow
        }
        
        return $true
    } catch {
        Write-ColorOutput "❌ Failed to delete scheduled task: $_" $Colors.Red
        return $false
    }
}

function Get-TaskStatus {
    Write-ColorOutput "Checking scheduled task status..." $Colors.Blue
    
    try {
        $task = Get-ScheduledTask -TaskName $TaskName -ErrorAction SilentlyContinue
        
        if ($task) {
            Write-ColorOutput "✅ Scheduled task found" $Colors.Green
            Write-ColorOutput "Task name: $($task.TaskName)" $Colors.Cyan
            Write-ColorOutput "State: $($task.State)" $Colors.Cyan
            Write-ColorOutput "Last run: $($task.LastRunTime)" $Colors.Cyan
            Write-ColorOutput "Next run: $($task.NextRunTime)" $Colors.Cyan
            
            # Get task details
            $taskDetails = Get-ScheduledTaskInfo -TaskName $TaskName
            Write-ColorOutput "Last run result: $($taskDetails.LastTaskResult)" $Colors.Cyan
            Write-ColorOutput "Last run time: $($taskDetails.LastRunTime)" $Colors.Cyan
            Write-ColorOutput "Next run time: $($taskDetails.NextRunTime)" $Colors.Cyan
        } else {
            Write-ColorOutput "❌ Scheduled task not found" $Colors.Red
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
        
    } catch {
        Write-ColorOutput "❌ Failed to check task status: $_" $Colors.Red
    }
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
        return $false
    }
    
    # Check if script exists
    if (-not (Test-Path $ScriptPath)) {
        Write-ColorOutput "❌ Automation script not found: $ScriptPath" $Colors.Red
        return $false
    }
    
    Write-ColorOutput "✅ Script found: $ScriptPath" $Colors.Green
    
    # Check if working directory exists
    if (-not (Test-Path $WorkingDirectory)) {
        Write-ColorOutput "❌ Working directory not found: $WorkingDirectory" $Colors.Red
        return $false
    }
    
    Write-ColorOutput "✅ Working directory: $WorkingDirectory" $Colors.Green
    
    return $true
}

# Main execution
Write-ColorOutput "========================================" $Colors.Magenta
Write-ColorOutput "    WINDOWS TASK SCHEDULER SETUP" $Colors.Magenta
Write-ColorOutput "========================================" $Colors.Magenta
Write-ColorOutput "" $Colors.White

if ($Create) {
    if (Test-Prerequisites) {
        Create-ScheduledTask
    } else {
        Write-ColorOutput "❌ Prerequisites not met. Cannot create scheduled task." $Colors.Red
    }
} elseif ($Delete) {
    Delete-ScheduledTask
} elseif ($Status) {
    Get-TaskStatus
} else {
    # Show help
    Write-ColorOutput "Usage:" $Colors.Cyan
    Write-ColorOutput "  -Create  : Create the scheduled task" $Colors.White
    Write-ColorOutput "  -Delete  : Delete the scheduled task" $Colors.White
    Write-ColorOutput "  -Status  : Check task status" $Colors.White
    Write-ColorOutput "" $Colors.White
    Write-ColorOutput "Examples:" $Colors.Cyan
    Write-ColorOutput "  .\setup-windows-task.ps1 -Create" $Colors.White
    Write-ColorOutput "  .\setup-windows-task.ps1 -Status" $Colors.White
    Write-ColorOutput "  .\setup-windows-task.ps1 -Delete" $Colors.White
    Write-ColorOutput "" $Colors.White
    Write-ColorOutput "Note: -Create and -Delete require Administrator privileges" $Colors.Yellow
}
