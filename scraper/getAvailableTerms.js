const puppeteer = require("puppeteer");
const saveToFile = require("./saveToFile");

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

async function main() {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  await page.goto(URL);

  const results = await page.evaluate(() => {
    const terms = document.getElementById("CLASS_SRCH_WRK2_STRM$35$");

    return Array.from(terms.options)
      .filter((term) => term.value !== "")
      .map((term) => {
        let dbName = term.text.split(" ")[1];

        if (dbName.includes("/")) {
          dbName = dbName.split("/")[0];
        }

        const obj = {
          value: term.value,
          title: term.innerHTML,
          dbName,
        };
        return obj;
      });
  });
  saveToFile(results, "Terms");
}

main();
