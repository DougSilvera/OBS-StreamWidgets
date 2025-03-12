const express = require("express");
const fs = require("fs");
const app = express();
const port = 3000;

// Serve widget files
app.use(express.static("widgets"));
app.use("/assets", express.static("public"));
app.use("/settings", express.static("settings"));

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
