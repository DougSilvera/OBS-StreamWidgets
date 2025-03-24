obs = obslua

local script_dir = script_path()
local bat_path = script_dir .. "start_server.bat"
local log_path = script_dir .. "launch_log.txt"
local server_process_name = "node.exe"

-- User toggle (default = false)
local show_terminal = false

--------------------------------------------------
-- Logging utility
--------------------------------------------------
local function log(message)
    local f = io.open(log_path, "a")
    if f then
        f:write("[" .. os.date() .. "] " .. message .. "\n")
        f:close()
    end
end

--------------------------------------------------
-- Run server on launch
--------------------------------------------------
function script_description()
    return "🟢 Launches the local OBS Widget Server on OBS start and kills it on exit.\nIncludes toggle to show or hide terminal window."
end

function script_properties()
    local props = obs.obs_properties_create()

    obs.obs_properties_add_bool(props, "show_terminal", "Show Terminal Window (for Debugging)")

    return props
end

function script_update(settings)
    show_terminal = obs.obs_data_get_bool(settings, "show_terminal")
end

function script_load(settings)
    show_terminal = obs.obs_data_get_bool(settings, "show_terminal")

    local command
    if show_terminal then
        -- Show the command prompt window
        command = 'start cmd /k "' .. bat_path .. '"'
    else
        -- Run silently in background
        command = 'start "" "' .. bat_path .. '"'
    end

    log("OBS started. Launching server...")
    local result = os.execute(command)
    if result == 0 then
        log("✅ Server launched successfully. Terminal visible: " .. tostring(show_terminal))
    else
        log("❌ Failed to launch server. Exit code: " .. tostring(result))
    end
end

--------------------------------------------------
-- Kill Node.js server on unload
--------------------------------------------------
function script_unload()
    log("OBS exiting. Attempting to kill server process...")
    local result = os.execute('taskkill /F /IM ' .. server_process_name .. ' >nul 2>&1')
    if result == 0 then
        log("✅ Server terminated.")
    else
        log("⚠️ Could not terminate server (maybe already closed).")
    end
end
