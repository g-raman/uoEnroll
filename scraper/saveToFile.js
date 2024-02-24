const fs = require("fs");

async function saveToFile(data, subjectCode) {
  const dir = "./courses";

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }

  const json = JSON.stringify(data, null, 2);

  fs.writeFileSync(`${dir}/${subjectCode}.json`, json, "utf-8");
}

module.exports = saveToFile;
