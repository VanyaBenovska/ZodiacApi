import fs from "fs";

export async function mergeTextToFile(
  fileName: string,
  txtToAdd: string
): Promise<void> {
  if (txtToAdd) {
    fs.appendFile(
      `./files/${fileName}.txt`,
      `\r\n\r\n` + new Date() + `\r\n` + txtToAdd,
      "utf8",

      function (err) {
        if (err) throw err;
      }
    );
  }
}
