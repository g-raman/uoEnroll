import { useState } from 'react';
import chevronDown from '../assets/chevron-down.svg';
import CourseSection from './CourseSection';

const Course = ({ setCalendarItems, course }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex h-min w-full flex-col overflow-clip rounded-md text-sm">
      <div className="flex h-min w-full gap-4 bg-lime-300 p-2 text-base">
        <span className="overflow-hidden overflow-ellipsis whitespace-nowrap">
          {course.courseCode}: {course.courseName}
        </span>

        <span
          className="flex-grow cursor-pointer px-2 text-end"
          onClick={() => setIsOpen((is) => !is)}
        >
          <img
            className={`h-full transition-all ease-in ${isOpen ? 'rotate-0' : 'rotate-90'}`}
            src={chevronDown}
          />
        </span>
      </div>

      {course.sections.map((section, i) => {
        return (
          <CourseSection
            courseInfo={{
              courseCode: course.courseCode,
              courseName: course.courseName,
            }}
            setCalendarItems={setCalendarItems}
            key={i}
            isCourseOpen={isOpen}
            section={section}
          />
        );
      })}
    </div>
  );
};

export default Course;
