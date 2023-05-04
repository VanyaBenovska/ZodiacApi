export async function saveToFile(content, sign) {
  fs.writeFile(`./files/${sign}`, content);
}
