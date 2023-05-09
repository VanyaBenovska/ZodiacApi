import fs from "fs";

export async function saveToFile(content, sign) {
  try {
    console.log(`Sign: ${sign}\r\nContent: ${content}\r\n`);
    const fileName = `./files/${sign}.txt`;

    fs.writeFile(fileName, content + "\r\n", function (err) {
      if (err) throw err;
      console.log("File is created successfully.");
    });
  } catch (error) {
    console.log("5\r\nSave to file error.");
  }
}
