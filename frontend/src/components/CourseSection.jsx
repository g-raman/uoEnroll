import { useState } from 'react';
import CourseComponent from './CourseComponent';

const CourseSection = ({ isSectionOpen, section }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className={isSectionOpen ? '' : 'hidden'}>
      <div className="flex h-min w-full gap-4 bg-gray-200 p-2">
        <input type="checkbox" />
        <span>Section {section.section}</span>
        <span
          onClick={() => setIsOpen((is) => !is)}
          className="flex-grow cursor-pointer px-2 text-end"
        >
          {isOpen ? '^' : '<'}
        </span>
      </div>

      <div className={isOpen ? 'space-y-[2px]' : 'hidden'}>
        <CourseComponent type="LEC" component={section.lecture} />

        {section.labs.map((lab, i) => {
          return <CourseComponent key={i} type="LAB" component={lab} />;
        })}

        {section.dgds.map((lab, i) => {
          return <CourseComponent key={i} type="DGD" component={lab} />;
        })}

        {section.tutorials.map((lab, i) => {
          return <CourseComponent key={i} type="TUT" component={lab} />;
        })}
      </div>
    </div>
  );
};

export default CourseSection;
