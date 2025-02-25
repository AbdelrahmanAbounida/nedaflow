const {
  PNG_ICONS_REGISTERY,
  SVG_ICONS_REGISTERY,
} = require("../constants/icons");
const path = require("path");
const fs = require("fs");

// Extract the icon registry using regex (simple approach)
const iconNames =
  Object.keys(SVG_ICONS_REGISTERY).join(", ") +
  ", " +
  Object.keys(PNG_ICONS_REGISTERY).join(", ");

const pythonOutput = `
ALL_ICONS_NAMES = [${iconNames
  .split(", ")
  .map((icon) => `"${icon}"`)
  .join(", ")}]
`;

// Write the extracted icon registry to a Python file

const outputPath = path.join(
  __dirname,
  "..",
  "..",
  "..",
  "backend",
  "nedaflow",
  "registery",
  "icons.py"
);

// fs.mkdirSync(path.dirname(outputPath), { recursive: true }); // make sure the directory exists
fs.writeFileSync(outputPath, pythonOutput);
