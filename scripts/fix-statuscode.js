const fs = require("fs");
const path = require("path");
const dir = "/home/emad/dev/ccd/packages/ts-exc/src/http/dtos";

for (const f of fs.readdirSync(dir)) {
  if (!f.endsWith(".ts")) continue;
  let content = fs.readFileSync(path.join(dir, f), "utf8");

  // Add type: Number to statusCode @ApiProperty
  content = content.replace(
    /(@ApiProperty\(\{)\s*\n\s*(example: HttpStatus\.\w+,)/g,
    "$1\n\t\ttype: Number,\n\t\t$2",
  );

  fs.writeFileSync(path.join(dir, f), content);
  console.log("Fixed:", f);
}
