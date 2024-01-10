/* eslint-disable no-undef */
const puppeteer = require("puppeteer");

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

async function setSearchOptions(page, code, yearNum) {
  await page.evaluate(
    (subjectCode, year) => {
      const subjectCodeFieldSelector = "SSR_CLSRCH_WRK_SUBJECT$0";
      const courseCodeFieldSelector = "SSR_CLSRCH_WRK_CATALOG_NBR$0";
      const courseCodeFilterSelector = "SSR_CLSRCH_WRK_SSR_EXACT_MATCH1$0";
      const showClosedCourseSelector = "SSR_CLSRCH_WRK_SSR_OPEN_ONLY$chk$0";
      const yearSelector = `UO_PUB_SRCH_WRK_SSR_RPTCK_OPT_0${year}$chk$0`;
      const gradSelector = "UO_PUB_SRCH_WRK_GRADUATED_TBL_CD$chk$0";
      const yearFilterSelector = year < 5 ? yearSelector : gradSelector;

      const submitBtnSelector = "CLASS_SRCH_WRK2_SSR_PB_CLASS_SRCH";

      const subjectCodeField = document.getElementById(
        subjectCodeFieldSelector,
      );
      subjectCodeField.value = subjectCode;

      const courseCodeField = document.getElementById(courseCodeFieldSelector);
      courseCodeField.value = "0";

      const courseCodeFilterField = document.getElementById(
        courseCodeFilterSelector,
      );
      courseCodeFilterField.value = "G";

      const showClosedCourseField = document.getElementById(
        showClosedCourseSelector,
      );
      showClosedCourseField.value = "N";

      const yearField = document.getElementById(yearFilterSelector);
      yearField.value = "Y";

      const submitButton = document.getElementById(submitBtnSelector);
      submitButton.click();
    },
    code,
    yearNum,
  );
}

async function main() {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  await page.goto(URL);
  await setSearchOptions(page, "ADM", 2);
}

main();
