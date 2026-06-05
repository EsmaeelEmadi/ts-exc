const fs = require("fs");
const path = require("path");
const dir = "/home/emad/dev/ccd/packages/ts-exc/src/http/dtos";

for (const f of fs.readdirSync(dir)) {
  if (!f.endsWith(".ts")) continue;
  let content = fs.readFileSync(path.join(dir, f), "utf8");

  // Add type: Number to statusCode @ApiProperty
  content = content.replace(
    /@ApiProperty\(\{\s*\n\s*(example: HttpStatus\.\w+,)/g,
    '@ApiProperty({\n\t\ttype: Number,\n\t\t$1',
  );

  // Add type: String to message @ApiProperty (success DTOs)
  content = content.replace(
    /@ApiProperty\(\{\s*\n\s*(example: "[\w\s]+",)\s*\n\s*(description: "Success message",)/g,
    '@ApiProperty({\n\t\ttype: String,\n\t\t$1\n\t\t$2',
  );

  // Add type: String to message @ApiProperty (error DTOs)
  content = content.replace(
    /@ApiProperty\(\{\s*\n\s*(example: "[\w\s]+",)\s*\n\s*(description: "Error message",)/g,
    '@ApiProperty({\n\t\ttype: String,\n\t\t$1\n\t\t$2',
  );

  fs.writeFileSync(path.join(dir, f), content);
}
console.log("Done");
