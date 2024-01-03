/* eslint-disable no-await-in-loop */
/* eslint-disable no-undef */
const puppeteer = require("puppeteer");
const fs = require("fs");

const url =
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

async function main() {
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();

  await page.goto(url);

  // const toSearch = ["ADM", "ITI", "MAT", "SEG"];
  const toSearch = ["ADM"];

  for (let j = 0; j < toSearch.length; j += 1) {
    for (let i = 1; i <= 5; i += 1) {
      // Attach util methods to window object
      await page.evaluate(() => {
        // Wrapper function for getElementById for concise code
        window.findById = (elemId) => document.getElementById(elemId);

        window.exists = (elemId) => Boolean(window.findById(elemId));
      });

      // Attach search course method to window object
      await page.evaluate(() => {
        window.selectCourseSearchOptions = (subjectCode, year) => {
          const subjectCodeFieldSelector = "SSR_CLSRCH_WRK_SUBJECT$0";
          const courseCodeFieldSelector = "SSR_CLSRCH_WRK_CATALOG_NBR$0";
          const courseCodeFilterSelector = "SSR_CLSRCH_WRK_SSR_EXACT_MATCH1$0";
          const showClosedCourseSelector = "SSR_CLSRCH_WRK_SSR_OPEN_ONLY$chk$0";
          let yearSelector = `UO_PUB_SRCH_WRK_SSR_RPTCK_OPT_0${year}$chk$0`;
          yearSelector =
            year < 5 ? yearSelector : "UO_PUB_SRCH_WRK_GRADUATED_TBL_CD$chk$0";
          const submitBtnSelector = "CLASS_SRCH_WRK2_SSR_PB_CLASS_SRCH";

          const subjectCodeField = window.findById(subjectCodeFieldSelector);
          subjectCodeField.value = subjectCode;

          const courseCodeField = window.findById(courseCodeFieldSelector);
          courseCodeField.value = "0";

          const courseCodeFilterField = window.findById(
            courseCodeFilterSelector,
          );
          courseCodeFilterField.value = "G";

          const showClosedCourseField = window.findById(
            showClosedCourseSelector,
          );
          showClosedCourseField.value = "N";

          const yearField = window.findById(yearSelector);
          yearField.value = "Y";

          const submitButton = window.findById(submitBtnSelector);
          submitButton.click();
        };
      });

      // Attach helper scraping methods to window object
      await page.evaluate(() => {
        window.createNewCourse = (courseElement) => {
          const courseInfo = courseElement.innerText;
          let [courseCode, courseName] = courseInfo.split(" - ");
          courseCode = courseCode.trim().replace(/ /g, "");
          courseName = courseName.trim();

          return { courseCode, courseName };
        };

        window.createNewComponent = (courseElement) => {
          const courseDataSelector = ".PSLEVEL3GRIDODDROW";
          const courseData = Array.from(
            courseElement.querySelectorAll(courseDataSelector),
          );

          const sectionData = courseData[1].innerText;

          const [componentInfo, sessionType] = sectionData.split("\n");
          const [section, componentType] = componentInfo.split("-");

          const statusImage = courseData[5].querySelector("img").src;
          const status =
            statusImage.match(/CLOSED/) || statusImage.match(/OPEN/);

          const component = {
            section,
            componentType,
            sessionType,
            timings: courseData[2].innerText,
            instructor: courseData[3].innerText,
            dates: courseData[4].innerText,
            status: status[0],
          };

          return component;
        };
      });

      // Attach scraper method to window object
      await page.evaluate(() => {
        window.scrapeCourseDetails = () => {
          const tableSelector = "ACE_$ICField$4$$0";
          const courseListSelector =
            "tbody > tr [valign=center], .PAGROUPBOXLABELLEVEL1";
          const table = window.findById(tableSelector);
          const courses = Array.from(
            table.querySelectorAll(courseListSelector),
          );

          const results = [];
          let currentCourseObj = {};
          let currentSectionObj = {};
          let newCourseCreated = true;
          const cond = courses.length;

          for (let index = 0; index < cond; index += 1) {
            const el = courses[index];
            const newCourseRegex = /PAGROUPBOXLABELLEVEL1/;
            const shouldCreateNewClass = newCourseRegex.test(el.className);

            if (shouldCreateNewClass) {
              const newCourse = window.createNewCourse(el);
              currentCourseObj = { ...newCourse, sections: [] };
              currentSectionObj = { components: [] };
              newCourseCreated = true;
            } else {
              const componentObj = window.createNewComponent(el);
              const { section } = componentObj;

              const sectionRegex = /[A-Z]00/;
              if (newCourseCreated) {
                currentSectionObj.section = section;
              }

              if (sectionRegex.test(section) && !newCourseCreated) {
                currentCourseObj.sections.push(currentSectionObj);
                currentSectionObj = { section, components: [] };
                currentSectionObj.components.push(componentObj);
              } else {
                currentSectionObj.components.push(componentObj);
                newCourseCreated = false;
              }

              if (
                index < cond - 1 &&
                newCourseRegex.test(courses[index + 1].className)
              ) {
                currentCourseObj.sections.push(currentSectionObj);
                results.push(currentCourseObj);
              }

              if (index === cond - 1) {
                currentCourseObj.sections.push(currentSectionObj);
                results.push(currentCourseObj);
              }
            }
          }

          return results;
        };
      });

      // Search for course
      const currentCourse = toSearch[j];
      console.log(`Searching year ${i} courses for: ${currentCourse}`);
      await page.evaluate(
        (course, index) => {
          window.selectCourseSearchOptions(course, index);
        },
        currentCourse,
        i,
      );

      let isSearchSuccessful = true;
      try {
        await page.waitForSelector(".SSSTEXTBLUE", { timeout: 7000 });
      } catch (err) {
        isSearchSuccessful = false;
      }

      if (!isSearchSuccessful) {
        console.log("Error when fetching results...");
        continue;
      } else {
        console.log("Success!");
      }

      const data = await page.evaluate(() => window.scrapeCourseDetails());

      fs.writeFileSync(
        `./courses/${currentCourse}.json`,
        JSON.stringify(data, null, 2),
        "utf-8",
      );
      await page.goto(url);
    }
  }

  browser.close();
}

main();
