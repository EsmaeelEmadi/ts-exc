const fs = require("fs");
const path = require("path");
const dir = "/home/emad/dev/ccd/packages/ts-exc/src/http/dtos";

for (const f of fs.readdirSync(dir)) {
  if (!f.endsWith(".ts")) continue;
  let content = fs.readFileSync(path.join(dir, f), "utf8");
  const original = content;

  // Pattern 1: super(HttpStatus.XXX, i18n?.t("errors.key") ?? "default")
  content = content.replace(
    /(super\(HttpStatus\.\w+,\s*)i18n\?\.t\("errors\.([^"]+)"\)\s*\?\?\s*"([^"]+)"\)/g,
    '$1"$3")',
  );

  // Pattern 2: message ?? i18n?.t("errors.key") ?? "default"
  content = content.replace(
    /message \?\? i18n\?\.t\("errors\.([^"]+)"\) \?\? "([^"]+)"/g,
    'message ?? "$2"',
  );

  // Pattern 3: i18n?.t("errors.key") ?? "default" (standalone in super call or expression)
  content = content.replace(
    /i18n\?\.t\("errors\.([^"]+)"\)\s*\?\?\s*"([^"]+)"/g,
    '"$2"',
  );

  // Pattern 4: just i18n?.t(...) without ?? fallback (partial line)
  content = content.replace(
    /i18n\?\.t\("errors\.([^"]+)"\)\s*\?\?/g,
    "",
  );

  if (content !== original) {
    fs.writeFileSync(path.join(dir, f), content);
    console.log("Re-fixed:", f);
  }
}
