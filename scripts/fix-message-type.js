const fs = require("fs");
const path = require("path");
const dir = "/home/emad/dev/ccd/packages/ts-exc/src/http/dtos";

for (const f of fs.readdirSync(dir)) {
  if (!f.endsWith(".ts")) continue;
  let content = fs.readFileSync(path.join(dir, f), "utf8");

  // Add type: String before any "example: " line on message fields
  // Pattern: on a line with 'message: string;', the @ApiProperty above it
  // needs type: String added before the example line
  content = content.replace(
    /(@ApiProperty\(\{\s*\n)(\s*)(example: "[\w\s]+",\s*\n\s*description: "Success message",)/g,
    '$1$2type: String,\n$2$3',
  );

  // Also fix error DTO message properties
  content = content.replace(
    /(@ApiProperty\(\{\s*\n)(\s*)(example: "[\w\s]+",\s*\n\s*description: "Error message",)/g,
    '$1$2type: String,\n$2$3',
  );

  fs.writeFileSync(path.join(dir, f), content);
}
console.log("Done");
