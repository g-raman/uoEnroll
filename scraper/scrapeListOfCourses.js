/* eslint-disable no-undef */
const puppeteer = require("puppeteer");
const fs = require("fs");

const URL = "https://catalogue.uottawa.ca/en/courses/";

async function main() {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  await page.goto(URL);

  const results = await page.evaluate(() => {
    const courseLists = document.querySelectorAll(".letternav-head + ul");
    const courses = [];

    for (let i = 0; i < courseLists.length; i += 1) {
      courses.push(...courseLists[i].querySelectorAll("li"));
    }

    const courseCodes = courses
      .map((el) => {
        const courseCodeRegex = /\(([A-Z]+)\)/;
        const match = el.innerText.match(courseCodeRegex);
        const res = match ? match[1] : null;

        return res;
      })
      .filter((code) => code !== null);
    return courseCodes;
  });

  const json = JSON.stringify(results, null, 2);
  fs.writeFileSync("courseCodes.json", json);
}

main();
