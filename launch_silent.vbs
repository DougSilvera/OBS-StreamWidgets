Set fso = CreateObject("Scripting.FileSystemObject")
Set shell = CreateObject("WScript.Shell")

' Get the directory of this script
scriptPath = fso.GetParentFolderName(WScript.ScriptFullName)
exePath = scriptPath & "\widget-server.exe"
logPath = scriptPath & "\launch_log.txt"

' === Log Rotation ===
Dim maxSizeKB
maxSizeKB = 10

If fso.FileExists(logPath) Then
    If (fso.GetFile(logPath).Size > maxSizeKB * 1024) Then
        Set logFile = fso.CreateTextFile(logPath, True) ' Overwrite
        logFile.WriteLine "[" & Now & "] 🔁 Log file rotated (exceeded " & maxSizeKB & "KB)"
        logFile.Close
    End If
End If

' === Logging Attempt ===
Dim logFile
Set logFile = fso.OpenTextFile(logPath, 8, True)
logFile.WriteLine "[" & Now & "] Attempting to launch widget-server.exe"
logFile.Close

' === Launch server silently ===
If fso.FileExists(exePath) Then
    shell.CurrentDirectory = scriptPath
    shell.Run Chr(34) & exePath & Chr(34), 0

    Set logFile = fso.OpenTextFile(logPath, 8, True)
    logFile.WriteLine "[" & Now & "] ✅ widget-server.exe launched successfully"
    logFile.Close
Else
    Set logFile = fso.OpenTextFile(logPath, 8, True)
    logFile.WriteLine "[" & Now & "] ❌ ERROR: widget-server.exe not found!"
    logFile.Close
End If
