const DayNavigation = ({ selectedDay, onSelectDay }) => {
  const DAYS = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
  const active = 'text-white bg-[#822B2B]';

  return (
    <div className="flex w-full cursor-pointer justify-between">
      {DAYS.map((day, i) => {
        return (
          <span
            className={`grid h-8 w-8 place-items-center rounded-md transition-[background-color] delay-0 duration-300 ease-out ${selectedDay === i ? active : ''}`}
            onClick={() => onSelectDay(i)}
            key={i}
          >
            {day}
          </span>
        );
      })}
    </div>
  );
};

export default DayNavigation;
