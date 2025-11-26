import fs from "fs";
import path from "path";

const contentDir = "./content"; // your Obsidian folder
let indexContent = "# Notes Index\n\n";

function walk(dir, prefix = "") {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      walk(fullPath, prefix + file + "/");
    } else if (file.endsWith(".md")) {
      indexContent += `- [${file.replace(".md","")}](${prefix}${file})\n`;
    }
  });
}

walk(contentDir);
fs.writeFileSync(path.join(contentDir, "index.md"), indexContent);
console.log("index.md generated!");