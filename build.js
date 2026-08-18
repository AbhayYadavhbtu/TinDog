const fs = require("fs");

console.log("=================================");
console.log("Building TinDog...");
console.log("=================================");

const requiredFiles = [
    "index.html"
];

for (const file of requiredFiles) {

    if (!fs.existsSync(file)) {
        console.error(`❌ Build failed: ${file} is missing`);
        process.exit(1);
    }

    console.log(`✅ ${file} found`);
}

console.log("=================================");
console.log("✅ TinDog build successful!");
console.log("=================================");