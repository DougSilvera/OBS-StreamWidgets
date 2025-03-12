# work in progress currently not tested or stable 

# 🎬 OBS Stream Widgets

A collection of **self-hosted** OBS widgets for streamers, running on a **local Node.js server**. These widgets provide **real-time sub counts, countdown timers, and customizable overlays** using **StreamElements WebSockets**.

---

## 🎛 **Widgets Overview**
### 🔹 **Sub Counter (`subcounter.html`)**
The **Sub Counter Widget** tracks **live Twitch subscriptions** in real time using **StreamElements WebSockets**. It updates dynamically as new subscriptions come in and supports **customizable goals**.

#### **Features:**
- **Tracks live Twitch subscriptions** with **StreamElements WebSockets**.
- **Auto-updates when new subs arrive**.
- **Displays a sub goal progress bar** (`current subs / goal`).
- **Fully customizable via the settings UI**.

#### **Configurable Variables:**
| Variable | Description |
|----------|------------|
| `subGoal` | The target number of subs before a goal is met |
| `subCount` | The current number of subs in the session |

---

### 🔹 **Countdown Timer (`countdown.html`)**
The **Countdown Timer Widget** provides a **live countdown for subathons or special events**. The timer starts at a predefined time and **automatically extends** based on new subs.

#### **Features:**
- **Displays a live countdown to an event/subathon end time.**
- **Automatically extends based on new subscriptions.**
- **Starts hidden until a sub goal is reached (`subGoalMiddle`).**
- **Switches to a longer countdown if a higher sub goal is met (`subGoalComplete`).**
- **Fully configurable from the settings UI.**

#### **Configurable Variables:**
| Variable | Description |
|----------|------------|
| `startTime` | The start time of the countdown |
| `subGoalMiddle` | The number of subs needed before the countdown is visible |
| `subGoalComplete` | The number of subs needed to extend the countdown |

---

## 🔧 **Settings UI (`settings/index.html`)**
The **Settings UI** is a **web-based control panel** for modifying widget settings **without editing code**. Users can **update sub goals, event timers, and other parameters** dynamically.

#### **Features:**
- **Modify all widget settings via an easy-to-use web UI.**
- **Saves changes persistently in `settings.json`.**
- **Widgets automatically update when settings are modified.**
---

## 🔥 **Credits**
Built by **Douglas Silvera** using **Node.js, Express**.  
Special thanks to **OBS Studio & StreamElements**.

