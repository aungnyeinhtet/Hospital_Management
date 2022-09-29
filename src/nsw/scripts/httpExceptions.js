const fs = require("fs");
const errors = require("../errors.json");

const stream = fs.createWriteStream("../exceptions/index.ts");

stream.once("open", function (fd) {
  stream.write(
    "export class HttpException extends Error {\n" +
      `\tconstructor(public message: string = '', public statusCode: number = 500, public name: string = '') {\n` +
      "\t\tsuper(message)\n" +
      "\t}\n" +
      "\ttoJSON() {\n" +
      "\t\treturn {\n" +
      "\t\t\tname: this.name,\n" +
      "\t\t\tstatus: this.statusCode,\n" +
      "\t\t\tmessage: this.message\n" +
      "\t\t}\n" +
      "\t}\n" +
      "}\n\n"
  );

  errors.forEach((err) => {
    const [[code, name]] = Object.entries(err);

    stream.write(
      `export class ${name}Exception extends HttpException {\n` +
        `\tconstructor(message: string = '${name}') {\n` +
        `\t\tsuper(message, ${code}, '${name}Exception')\n` +
        "\t}\n" +
        "}\n\n"
    );
  });
});
