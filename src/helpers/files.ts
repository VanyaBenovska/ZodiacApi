import fs from "fs";

export async function saveToFile(content: Record<string, any>, sign: string) {
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

export async function mergeTextToFile(
  fileName: string,
  txtToAdd: Record<string, any>
) {
  console.log(
    `ADDING INTO FILE: 1/ File: ${fileName} 2/ txtToAdd: ${txtToAdd}`
  );

  fs.appendFile(
    `./files/${fileName}.txt`,
    `\r\n\r\n`,
    "utf8",

    function (err) {
      if (err) throw err;
      console.log("INFO IS WRITTEN INTO FILE");
    }
  );

  //let writer = fs.createWriteStream(`./files/${fileName}.txt`);
  //writer.write(txtToAdd + "\r\n");

  fs.appendFile(
    `./files/${fileName}.txt`,
    JSON.stringify(`{${txtToAdd}}\r\n`),
    "utf8",

    function (err) {
      if (err) throw err;
      console.log("INFO IS WRITTEN INTO FILE");
    }
  );
}
