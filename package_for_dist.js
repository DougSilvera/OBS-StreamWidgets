const fs = require("fs");
const fse = require("fs-extra");
const archiver = require("archiver");
const { execSync } = require("child_process");
const path = require("path");

const distDir = "dist";
const outputZip = "OBS-Widget-Pack.zip";
const exeName = "widget-server.exe";

// 1. Clean + rebuild dist
fse.removeSync(distDir);
fse.ensureDirSync(distDir);

// 2. Build .exe using pkg
console.log("📦 Building executable...");
execSync(`pkg server.js --targets node18-win-x64 --output ${exeName}`);

// 3. Copy files to dist
console.log("📁 Copying files...");

fse.copySync("widgets", path.join(distDir, "widgets"));
fse.copySync("public", path.join(distDir, "public"));
fse.copySync("settings", path.join(distDir, "settings"));
fse.copySync("start_server.bat", path.join(distDir, "start_server.bat"));
fse.copySync("start_server_silent.bat", path.join(distDir, "start_server_silent.bat"));
fse.copySync("launch_silent.vbs", path.join(distDir, "launch_silent.vbs"));
fse.copySync("OBS-Launcher.lua", path.join(distDir, "launch_server.lua"));
fse.copySync(exeName, path.join(distDir, exeName));
fse.copySync("README.md", path.join(distDir, "README.md"));

// 4. Create ZIP archive
console.log("🗜️  Creating zip...");

const output = fs.createWriteStream(outputZip);
const archive = archiver("zip", { zlib: { level: 9 } });

output.on("close", () => {
  console.log(`✅ Packaged: ${outputZip} (${archive.pointer()} total bytes)`);
});

archive.pipe(output);
archive.directory(distDir, false);
archive.finalize();
