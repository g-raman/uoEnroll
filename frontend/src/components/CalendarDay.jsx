const CalendarDay = ({ className = '', children }) => {
  const HOUR_HEIGHT = 6;
  const startHour = 8;
  const startMin = 0;

  const endHour = 9;
  const endMin = 50;

  const duration = endHour - startHour + Math.abs(endMin - startMin) / 60;
  const size = `${duration * HOUR_HEIGHT}rem`;
  const courseStart = `${(startHour - 6) * HOUR_HEIGHT + 3 + (startMin / 60) * HOUR_HEIGHT}rem`;

  return (
    <div
      className={`relative flex h-full w-full flex-col overflow-scroll py-12 ${className}`}
    >
      {Array.from({ length: 18 }).map((_, i) => {
        let hour = i + 6;
        const amOrPm = hour < 12 ? 'AM' : 'PM';
        hour = hour === 12 ? 12 : hour % 12;

        return (
          <div className="flex w-full justify-between" key={i}>
            <span className="w-14 font-poppins text-xs font-light leading-[0] text-gray-400">
              {`${hour} ${amOrPm}`}
            </span>
            <div className="h-24 w-full border-t-[1px] border-t-gray-400"></div>
          </div>
        );
      })}

      <div
        className="absolute left-14 w-[82%] rounded-md bg-red-100 p-3 text-red-900"
        style={{ top: courseStart, height: size }}
      >
        test
      </div>
      {children}
    </div>
  );
};

export default CalendarDay;
