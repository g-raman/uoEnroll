/* eslint-disable no-undef */

const attachHelperFunctions = require("./attachHelperFunctions");

async function scrapeDetails(page) {
  await attachHelperFunctions(page);

  const data = await page.evaluate(() => {
    const tableSelector = "ACE_$ICField$4$$0";
    const courseListSelector =
      "tbody > tr [valign=center], .PAGROUPBOXLABELLEVEL1";
    const table = document.getElementById(tableSelector);
    const courses = Array.from(table.querySelectorAll(courseListSelector));

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
        const newCourse = window.createCourse(el);
        currentCourseObj = { ...newCourse, sections: [] };
        currentSectionObj = { components: [] };
        newCourseCreated = true;
      } else {
        const componentObj = window.createComponent(el);
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
  });
  return data;
}

module.exports = scrapeDetails;
