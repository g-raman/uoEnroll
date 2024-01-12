/* eslint-disable no-await-in-loop */
/* eslint-disable no-console */
/* eslint-disable no-continue */
/* eslint-disable no-undef */
const puppeteer = require("puppeteer");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

const Course = require("./courseModel");
const setSearchOptions = require("./setSearchOptions");
const scrapeDetails = require("./scrapeDetails");
const { Lecture, Lab, Dgd, Tutorial } = require("./componentModel");
const Section = require("./sectionModel");

dotenv.config({ path: "./config.env" });
let DB = process.env.DATABASE.replace(
  "<USERNAME>",
  process.env.DATABASE_USERNAME,
);
DB = DB.replace("<PASSWORD>", process.env.DATABASE_PASSWORD);

mongoose.connect(DB).then(() => console.log("DB Connected"));

const URL =
  "https://uocampus.public.uottawa.ca/" +
  "psc/csprpr9pub/EMPLOYEE/SA/c/" +
  "UO_SR_AA_MODS.UO_PUB_CLSSRCH.GBL?" +
  "languageCd=ENG&PortalActualURL=https%3a%2f%2f" +
  "uocampus.public.uottawa.ca%2fpsc%2fcsprpr9pub%2f" +
  "EMPLOYEE%2fSA%2fc%2fUO_SR_AA_MODS.UO_PUB_CLSSRCH.GBL%3f" +
  "languageCd%3dENG&PortalContentURL=https%3a%2f%2f" +
  "uocampus.public.uottawa.ca%2fpsc%2fcsprpr9pub%2f" +
  "EMPLOYEE%2fSA%2fc%2fUO_SR_AA_MODS.UO_PUB_CLSSRCH.GBL&" +
  "PortalContentProvider=SA&PortalCRefLabel=" +
  "Public%20Class%20Search&PortalRegistryName=EMPLOYEE&" +
  "PortalServletURI=https%3a%2f%2f" +
  "uocampus.public.uottawa.ca%2fpsp%2fcsprpr9pub%2f&" +
  "PortalURI=https%3a%2f%2fuocampus.public.uottawa.ca" +
  "%2fpsc%2fcsprpr9pub%2f&PortalHostNode=SA&" +
  "NoCrumbs=yes&PortalKeyStruct=yes";

function processDetails(details) {
  details[0].sections.forEach(async (item) => {
    // const id = new mongoose.Types.ObjectId().toHexString();
    // item._id = id;
    // await Section.create(item);

    // console.log(item);

    item.components.forEach(async (el) => {
      const componentId = new mongoose.Types.ObjectId().toHexString();
      el._id = componentId;

      if (el.componentType === "LEC") {
        // console.log(el);
        await Lecture.create(el);
      } else if (el.componentType === "LAB") {
        await Lab.create(el);
      } else if (el.componentType === "DGD") {
        await Dgd.create(el);
      } else if (el.componentType === "TUT") {
        await Tutorial.create(el);
      }
    });
  });

  console.log("Courses added");
}

async function main() {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  // const courses = ["ADM", "ITI", "MAT", "CSI"];
  const courses = ["ITI"];
  const yearMax = 2;

  for (let i = 0; i < courses.length; i += 1) {
    const courseDetails = [];
    for (let j = 1; j < yearMax; j += 1) {
      await page.goto(URL);
      await setSearchOptions(page, courses[i], j);

      let searchSuccessful = true;
      try {
        await page.waitForSelector(".SSSMSGALERTFRAMEWBO", { timeout: 2000 });
        searchSuccessful = false;
        console.log("No results");
        continue;
      } catch (err) {
        console.log(`Attempting Search for ${courses[i]} Year: ${j}`);
      }

      try {
        await page.waitForSelector(".SSSTEXTBLUE", { timeout: 5000 });
      } catch (err) {
        console.log(`Excceed search results for: ${courses[i]}`);
        continue;
      }

      if (searchSuccessful) {
        const data = await scrapeDetails(page);
        courseDetails.push(...data);
      } else {
        console.log("No classess found");
      }
    }

    processDetails(courseDetails);

    // await Course.create(courseDetails);
    // console.log("Course saved to database");
  }

  // browser.close();
  // process.exit();
}

main();
