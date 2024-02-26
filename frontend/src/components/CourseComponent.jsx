import { useState } from 'react';

const DAYS = ['mo', 'tu', 'we', 'th', 'fr', 'sa', 'su'];

const CourseComponent = ({ courseInfo, setCalendarItems, component, type }) => {
  const [isSelected, setIsSelected] = useState(false);

  function handleToggle(e) {
    component.timings.forEach((timing) => {
      const newString = timing.replace(' - ', ' ');
      const [day, startTime, endTime] = newString.split(' ');
      const [startHour, startMin] = startTime.split(':').map(Number);
      const [endHour, endMin] = endTime.split(':').map(Number);
      const dayIndex = DAYS.indexOf(day.toLowerCase());

      const id = courseInfo.courseCode + ':' + component.section;

      if (!e.target.checked) {
        setCalendarItems((currCalendar) => {
          const newDay = currCalendar[dayIndex].filter((item) => {
            return !item.id === id;
          });

          const newCalendar = currCalendar.map((day, i) => {
            if (i === dayIndex) {
              return newDay;
            }

            return day;
          });

          console.log(newCalendar);
          return newCalendar;
        });
      } else {
        setCalendarItems((currCalendar) => {
          const newDay = [
            ...currCalendar[dayIndex],
            {
              id,
              ...courseInfo,
              section: component.section,
              type,
              startHour,
              startMin,
              endHour,
              endMin,
            },
          ];

          const newCalendar = currCalendar.map((day, i) => {
            if (i === dayIndex) {
              return newDay;
            }

            return day;
          });

          return newCalendar;
        });
      }
    });

    setIsSelected((is) => !is);
  }

  return (
    <div className="flex w-full flex-grow gap-4 bg-white px-2">
      <input checked={isSelected} onChange={handleToggle} type="checkbox" />
      <div className="flex-grow-1 flex w-[60%] flex-col gap-1 py-2 font-thin">
        <span>
          <b>{component.section}</b> {component.instructor}
        </span>

        {component.timings.map((timing, i) => {
          return <span key={i}>{timing}</span>;
        })}
      </div>

      <span className="grid h-auto flex-grow place-items-center border-l-2 border-l-[#f1f1f1] font-semibold">
        {type}
      </span>
    </div>
  );
};

export default CourseComponent;
