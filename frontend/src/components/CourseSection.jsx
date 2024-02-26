import { useState } from 'react';
import CourseComponent from './CourseComponent';

const CourseSection = ({
  courseInfo,
  setCalendarItems,
  isCourseOpen,
  section,
}) => {
  const [isSectionOpen, setIsSectionOpen] = useState(true);

  return (
    <div
      className={`transition-all delay-100 ease-in ${isCourseOpen ? 'opacity-1 visible h-full' : 'invisible h-0 opacity-0'}`}
    >
      <div className="flex h-min w-full gap-4 bg-gray-200 p-2">
        <input type="checkbox" />
        <span>Section {section.section}</span>
        <span
          onClick={() => setIsSectionOpen((is) => !is)}
          className="flex-grow cursor-pointer px-2 text-end"
        >
          {isSectionOpen ? '^' : '<'}
        </span>
      </div>

      <div
        className={`space-y-[2px] transition-all ease-in ${isSectionOpen ? 'opacity-1 visible h-full' : 'invisible h-0 opacity-0'}`}
      >
        <CourseComponent
          courseInfo={courseInfo}
          setCalendarItems={setCalendarItems}
          type="LEC"
          component={section.lecture}
        />

        {section.labs.map((lab, i) => {
          return (
            <CourseComponent
              courseInfo={courseInfo}
              setCalendarItems={setCalendarItems}
              key={i}
              type="LAB"
              component={lab}
            />
          );
        })}

        {section.dgds.map((lab, i) => {
          return (
            <CourseComponent
              courseInfo={courseInfo}
              setCalendarItems={setCalendarItems}
              key={i}
              type="DGD"
              component={lab}
            />
          );
        })}

        {section.tutorials.map((lab, i) => {
          return (
            <CourseComponent
              courseCode={courseInfo}
              setCalendarItems={setCalendarItems}
              key={i}
              type="TUT"
              component={lab}
            />
          );
        })}
      </div>
    </div>
  );
};

export default CourseSection;
