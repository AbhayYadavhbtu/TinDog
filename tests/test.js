const fs = require("fs");

console.log("=================================");
console.log("Running TinDog tests...");
console.log("=================================");

// Check index.html
if (!fs.existsSync("index.html")) {
    console.error("❌ index.html is missing");
    process.exit(1);
}

console.log("✅ index.html exists");

// Check CSS folder
if (!fs.existsSync("css")) {
    console.error("❌ css folder is missing");
    process.exit(1);
}

console.log("✅ css folder exists");

// Check images folder
if (!fs.existsSync("images")) {
    console.error("⚠️ images folder not found");
} else {
    console.log("✅ images folder exists");
}

console.log("=================================");
console.log("✅ All tests passed!");
console.log("=================================");