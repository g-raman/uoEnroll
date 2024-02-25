import CalendarItem from './CalendarItem';

const CalendarDay = ({ items, className = '' }) => {
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

      {items.map((item, i) => {
        return (
          <CalendarItem
            key={i}
            startHour={item.startHour}
            startMin={item.startMin}
            endHour={item.endHour}
            endMin={item.endMin}
          />
        );
      })}
    </div>
  );
};

export default CalendarDay;
