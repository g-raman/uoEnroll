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

module.exports = setSearchOptions;
