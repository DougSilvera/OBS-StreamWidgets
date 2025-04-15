const express = require("express");
const fs = require("fs");
const app = express();
const port = 3000;

// Serve widget files
app.use(express.static("widgets"));
app.use("/assets", express.static("public"));
app.use("/settings", express.static("settings"));

const settingsPath = "settings/settings.json";
const defaultSettings = {
    subGoal: 100,
    subCount: 0,
    subGoalMiddle: 60,
    subGoalComplete: 100,
    startTime: new Date().toISOString()
};

// ✅ Reset subCount to 0 ONLY — keep other values like JWT untouched
if (fs.existsSync(settingsPath)) {
    try {
        const current = JSON.parse(fs.readFileSync(settingsPath, "utf8"));

        if (typeof current.subCount !== "undefined") {
            current.subCount = 0;

            fs.writeFileSync(settingsPath, JSON.stringify(current, null, 2));
            console.log("🔁 subCount reset to 0 on startup");
        } else {
            console.log("⚠️ subCount missing from settings. No reset applied.");
        }
    } catch (err) {
        console.error("❌ Failed to read/parse settings.json on startup:", err);
        fs.writeFileSync(settingsPath, JSON.stringify(defaultSettings, null, 2));
    }
} else {
    // If file doesn't exist, create it
    fs.writeFileSync(settingsPath, JSON.stringify(defaultSettings, null, 2));
    console.log("📦 Created default settings.json");
}

// API to get settings
app.get("/api/settings", (req, res) => {
    fs.readFile("settings/settings.json", "utf8", (err, data) => {
        if (err) return res.status(500).json({ error: "Error loading settings" });
        res.json(JSON.parse(data));
    });
});

// API to update settings
app.post("/api/settings", express.json(), (req, res) => {
    fs.writeFile("settings/settings.json", JSON.stringify(req.body, null, 2), (err) => {
        if (err) return res.status(500).json({ error: "Error saving settings" });
        res.json({ success: true });
    });
});

// Start server
app.listen(port, () => {
    console.log(`✅ OBS Widgets server running at: http://localhost:${port}`);
    console.log(`🔗 Add this URL to OBS: http://localhost:3000/subcounter.html`);
});
