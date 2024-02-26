const CalendarItem = ({ details }) => {
  const {
    courseCode,
    courseName,
    section,
    type,
    startHour,
    startMin,
    endHour,
    endMin,
  } = details;
  const HOUR_HEIGHT = 6;

  const duration = endHour - startHour + Math.abs(endMin - startMin) / 60;
  const size = `${duration * HOUR_HEIGHT}rem`;
  const courseStart = `${(startHour - 6) * HOUR_HEIGHT + 3 + (startMin / 60) * HOUR_HEIGHT}rem`;

  return (
    <div
      className="absolute left-14 w-[82%] rounded-md border-l-8 border-l-lime-400 bg-lime-100 p-3 text-lime-900"
      style={{ top: courseStart, height: size }}
    >
      {courseCode} [{section}] <br />
      {courseName}
      <br />
      {type}
    </div>
  );
};

export default CalendarItem;
