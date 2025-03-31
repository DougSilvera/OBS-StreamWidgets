# 🎬 OBS Stream Widgets

A collection of **self-hosted OBS widgets** for streamers, running on a **local Node.js or packaged server**. These widgets display **real-time data like sub counts and countdown timers** using **StreamElements WebSocket events**.

---

## 🎛️ Widgets Overview

### 🔹 Sub Counter (`subcounter.html`)
Tracks **live Twitch subscriptions** in real-time using **StreamElements WebSockets**.

#### Features
- Live Twitch sub tracking
- Displays `subCount / subGoal`
- Customizable via settings UI
- Automatically persists changes

#### Configurable Variables
| Variable     | Description                                              |
|--------------|----------------------------------------------------------|
| `subGoal`    | The target number of subs before a goal is met          |
| `subCount`   | The current number of subs in the session               |
| `streamElementsToken` | Your StreamElements JWT for WebSocket connection |

---

### 🔹 Countdown Timer (`countdown.html`)
> A work-in-progress — currently not production-stable or useable.
A subathon-style countdown timer that starts at a fixed time and **extends with new subs**.

#### Features
- Starts hidden and reveals after a goal
- Switches to longer timer after full goal
- Live updating via settings UI

#### Configurable Variables
| Variable           | Description                                                  |
|--------------------|--------------------------------------------------------------|
| `startTime`        | The countdown’s initial reference time                       |
| `subGoalMiddle`    | Number of subs needed to reveal the countdown                |
| `subGoalComplete`  | Number of subs needed to extend countdown to full duration   |

---

## 🛠️ Setup & Installation

### ✅ Unpacking the compiled distributed Project
1. **Extract `OBS-Widget-Pack.zip`** anywhere on your computer.
2. Inside, you’ll find:
   - `widget-server.exe` (or run via `start_server.bat`)
   - `OBS-Launcher.lua` (used by OBS)
   - `settings/`, `widgets/`, and helper scripts (`.bat`, `.vbs`)
3. **Do not move files separately** — they are self-contained.

---

### 🧩 OBS Integration

#### Step-by-step:

1. In OBS, go to `Tools > Scripts`.
2. Click **+** and select `launch_server.lua` from the extracted folder.
3. In the right panel, choose:
   - ✅ **Show Terminal Window** (for debugging) — shows output on startup
   - ❌ Uncheck for silent/background mode

OBS will:
- Run `widget-server.exe` in the background when launched
- Kill the server on exit
- Log status to `launch_log.txt`

---

## 🧪 Developer Notes

If you're cloning the repo directly (not using the `.zip`):

### 🔧 Commands (`package.json`)
| Command           | What it does                                                |
|-------------------|-------------------------------------------------------------|
| `npm start`       | Runs the server (`server.js`) in dev mode                   |
| `npm run build`   | Uses `pkg` to compile `server.js` into `widget-server.exe` |
| `npm run package` | Compiles `.exe`, copies all assets, and zips to distribute  |

### 🧰 Requirements
- Node.js 18+
- Global packages:
  ```bash
  npm install -g pkg
