async function attachHelperFunctios(page) {
  await page.evaluate(() => {
    window.createCourse = (courseElement) => {
      const courseInfo = courseElement.innerText;
      let [courseCode, courseName] = courseInfo.split(" - ");
      courseCode = courseCode.trim().replace(/ /g, "");
      courseName = courseName.trim();

      return { courseCode, courseName };
    };
  });

  await page.evaluate(() => {
    window.createComponent = (courseElement) => {
      const courseDataSelector = ".PSLEVEL3GRIDODDROW";
      const courseData = Array.from(
        courseElement.querySelectorAll(courseDataSelector),
      );

      const sectionData = courseData[1].innerText;

      const [componentInfo, sessionType] = sectionData.split("\n");
      const [section, componentType] = componentInfo.split("-");

      const statusImage = courseData[5].querySelector("img").src;
      const status = statusImage.match(/CLOSED/) || statusImage.match(/OPEN/);

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
}

module.exports = attachHelperFunctios;
