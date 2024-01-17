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

async function processDetails(details) {
  for (let x = 0; x < details.length; x += 1) {
    const currCourse = details[x];
    const course = {
      courseCode: currCourse.courseCode,
      courseName: currCourse.courseName,
      sections: [],
    };

    for (let i = 0; i < currCourse.sections.length; i += 1) {
      const item = currCourse.sections[i];
      const sectionId = new mongoose.Types.ObjectId().toHexString();

      const section = {
        _id: sectionId,
        section: item.section,
        labs: [],
        dgds: [],
        tutorials: [],
      };

      for (let j = 0; j < item.components.length; j += 1) {
        const el = item.components[j];
        const componentId = new mongoose.Types.ObjectId().toHexString();
        el._id = componentId;

        if (el.startDate === "-") continue;

        if (el.componentType === "LEC") {
          await Lecture.create(el);
          section.lecture = componentId;
        } else if (el.componentType === "LAB") {
          await Lab.create(el);
          section.labs.push(componentId);
        } else if (el.componentType === "DGD") {
          await Dgd.create(el);
          section.dgds.push(componentId);
        } else if (el.componentType === "TUT") {
          await Tutorial.create(el);
          section.tutorials.push(componentId);
        }
      }

      course.sections.push(sectionId);
      await Section.create(section);
    }
    await Course.create(course);
  }

  console.log("Courses added\n");
}

async function main() {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  // const courses = ["ADM", "ITI", "MAT", "CSI"];
  const courses = ["MAT"];
  const yearMax = 6;

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

    console.log("Saving results to database");
    await processDetails(courseDetails);

    // await Course.create(courseDetails);
    // console.log("Course saved to database");
  }

  // browser.close();
  // process.exit();
}

main();
