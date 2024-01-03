/* eslint-disable no-undef */
const puppeteer = require("puppeteer");

const url =
  "https://uocampus.public.uottawa.ca/psc/csprpr9pub/EMPLOYEE/SA/c/UO_SR_AA_MODS.UO_PUB_CLSSRCH.GBL?languageCd=ENG&PortalActualURL=https%3a%2f%2fuocampus.public.uottawa.ca%2fpsc%2fcsprpr9pub%2fEMPLOYEE%2fSA%2fc%2fUO_SR_AA_MODS.UO_PUB_CLSSRCH.GBL%3flanguageCd%3dENG&PortalContentURL=https%3a%2f%2fuocampus.public.uottawa.ca%2fpsc%2fcsprpr9pub%2fEMPLOYEE%2fSA%2fc%2fUO_SR_AA_MODS.UO_PUB_CLSSRCH.GBL&PortalContentProvider=SA&PortalCRefLabel=Public%20Class%20Search&PortalRegistryName=EMPLOYEE&PortalServletURI=https%3a%2f%2fuocampus.public.uottawa.ca%2fpsp%2fcsprpr9pub%2f&PortalURI=https%3a%2f%2fuocampus.public.uottawa.ca%2fpsc%2fcsprpr9pub%2f&PortalHostNode=SA&NoCrumbs=yes&PortalKeyStruct=yes";

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  await page.goto(url);

  const searchCourse = await page.evaluate(() => {
    const courseSubjectField = document.getElementById(
      "SSR_CLSRCH_WRK_SUBJECT$0",
    );
    courseSubjectField.value = "ADM";

    const courseCodeField = document.getElementById(
      "SSR_CLSRCH_WRK_CATALOG_NBR$0",
    );
    courseCodeField.value = "0";

    const filterSelector = document.getElementById(
      "SSR_CLSRCH_WRK_SSR_EXACT_MATCH1$0",
    );
    filterSelector.value = "G";

    const firstYearSelector = document.getElementById(
      "UO_PUB_SRCH_WRK_SSR_RPTCK_OPT_01$chk$0",
    );
    firstYearSelector.value = "Y";

    const submitButton = document.getElementById(
      "CLASS_SRCH_WRK2_SSR_PB_CLASS_SRCH",
    );
    submitButton.click();
  });

  await page.waitForSelector(".SSSTEXTBLUE");

  const titles = await page.evaluate(() => {
    const table = document.getElementById("ACE_$ICField$4$$0");
    const courses = Array.from(
      table.querySelectorAll(
        "tbody > tr [valign=center], .PAGROUPBOXLABELLEVEL1",
      ),
    );
    const results = [];
    let currentCourseObj = {};

    const all = courses.forEach((el, index) => {
      if (el.className.match(/PAGROUPBOXLABELLEVEL1/)) {
        if (!(index === 0)) {
          results.push(currentCourseObj);
        }
        currentCourseObj = { name: el.innerText };
      }
    });

    console.log(results);
    return results;
  });

  console.log(titles);
})();

// Course object
