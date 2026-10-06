const fs = require('fs');
const path = require('path');

console.log('Running Noctis theme validation...');

const pkgPath = path.join(__dirname, '..', 'package.json');
const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));

if (!pkg.contributes || !pkg.contributes.themes || pkg.contributes.themes.length === 0) {
  throw new Error('package.json contributes.themes is empty or invalid.');
}

const hexColorRegex = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/;

pkg.contributes.themes.forEach((themeEntry) => {
  const fullPath = path.join(__dirname, '..', themeEntry.path);
  if (!fs.existsSync(fullPath)) {
    throw new Error(`Theme file not found: ${themeEntry.path}`);
  }

  const themeJson = JSON.parse(fs.readFileSync(fullPath, 'utf8'));

  if (!themeJson.name || !themeJson.colors || !themeJson.tokenColors) {
    throw new Error(`Theme JSON missing mandatory fields: ${themeEntry.path}`);
  }

  for (const [key, val] of Object.entries(themeJson.colors)) {
    if (!hexColorRegex.test(val)) {
      throw new Error(`Invalid color hex format in ${themeEntry.label}: ${key} = ${val}`);
    }
  }

  themeJson.tokenColors.forEach((rule, idx) => {
    if (!rule.settings) {
      throw new Error(`Token rule #${idx} missing settings in ${themeEntry.label}`);
    }
  });

  console.log(`✓ ${themeEntry.label} passed: ${Object.keys(themeJson.colors).length} colors, ${themeJson.tokenColors.length} token rules`);
});

const iconPath = path.join(__dirname, '..', pkg.icon);
if (!fs.existsSync(iconPath)) {
  throw new Error(`Marketplace icon not found at: ${pkg.icon}`);
}
console.log(`✓ Marketplace icon verified: ${pkg.icon}`);

console.log('All Noctis validation checks passed successfully.');
