' Fincal Automation Startup Script
' This VBScript starts the automation service when Windows starts
' Place this file in Windows Startup folder for automatic execution

Option Explicit

' Configuration
Dim scriptPath, projectRoot, nodeExe, logFile
Dim fso, shell, env

' Get script directory
scriptPath = CreateObject("Scripting.FileSystemObject").GetParentFolderName(WScript.ScriptFullName)
projectRoot = CreateObject("Scripting.FileSystemObject").GetParentFolderName(scriptPath)
nodeExe = "node.exe"
logFile = scriptPath & "\startup-automation.log"

' Create objects
Set fso = CreateObject("Scripting.FileSystemObject")
Set shell = CreateObject("WScript.Shell")
Set env = shell.Environment("PROCESS")

' Log function
Sub LogMessage(message)
    Dim timestamp
    timestamp = Now()
    fso.OpenTextFile(logFile, 8, True).WriteLine "[" & timestamp & "] " & message
End Sub

' Main execution
LogMessage "Starting Fincal Automation Service..."

' Change to project directory
shell.CurrentDirectory = projectRoot
LogMessage "Changed to directory: " & projectRoot

' Check if Node.js is available
If Not fso.FileExists(env("ProgramFiles") & "\nodejs\" & nodeExe) And Not fso.FileExists(env("ProgramFiles(x86)") & "\nodejs\" & nodeExe) Then
    ' Try PATH
    Dim pathResult
    pathResult = shell.Run("cmd /c where " & nodeExe, 0, True)
    If pathResult <> 0 Then
        LogMessage "ERROR: Node.js not found. Please install Node.js from https://nodejs.org/"
        WScript.Quit 1
    End If
End If

' Check if automation script exists
If Not fso.FileExists(scriptPath & "\auto-runner.cjs") Then
    LogMessage "ERROR: Automation script not found: auto-runner.cjs"
    WScript.Quit 1
End If

' Start the automation service
LogMessage "Starting automation service..."
Dim result
result = shell.Run("cmd /c start /min " & nodeExe & " """ & scriptPath & "\auto-runner.cjs""", 0, False)

If result = 0 Then
    LogMessage "Automation service started successfully"
Else
    LogMessage "ERROR: Failed to start automation service. Exit code: " & result
End If

LogMessage "Startup script completed"
Set fso = Nothing
Set shell = Nothing
Set env = Nothing
