const fs = require("fs");
const path = require("path");
const dir = "/home/emad/dev/ccd/packages/ts-exc/src/http/dtos";

for (const f of fs.readdirSync(dir)) {
  if (!f.endsWith(".ts")) continue;
  let content = fs.readFileSync(path.join(dir, f), "utf8");

  // Remove i18n imports
  content = content.replace(/import \{.*?\} from "nestjs-i18n";?\n?/g, "");
  content = content.replace(/import \{.*?\} from ".*i18n\.generated.*";?\n?/g, "");

  // Fix success DTOs: this.message = message ?? i18n?.t("errors.X") ?? "X"
  content = content.replace(
    /this\.message = message \?\? i18n\?\.t\("errors\.([^"]+)"\) \?\? "([^"]+)"/g,
    'this.message = message ?? "$2"',
  );

  // Fix error DTOs: const defaultMessage = i18n?.t("errors.X") ?? "X"
  content = content.replace(
    /const defaultMessage = i18n\?\.t\("errors\.([^"]+)"\) \?\? "([^"]+)"/g,
    'const defaultMessage = "$2"',
  );

  // Remove leftover i18n declarations
  content = content.replace(/const i18n = I18nContext\.current[^;]*;\s*/g, "");

  // Collapse multiple blank lines
  content = content.replace(/\n{3,}/g, "\n\n");

  fs.writeFileSync(path.join(dir, f), content);
  console.log("Fixed:", f);
}
