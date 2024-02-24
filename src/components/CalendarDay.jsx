const CalendarDay = () => {
  return (
    <div className="flex h-full w-full flex-col overflow-scroll py-12">
      {Array.from({ length: 12 }).map((_, i) => {
        return (
          <div className="flex w-full justify-between" key={i}>
            <span className="w-14 font-poppins text-xs font-light leading-[0] text-gray-400">
              {(i + 7) % 12 == 0 ? 12 : (i + 7) % 12} AM
            </span>
            <div className="h-24 w-full border-t-[1px] border-t-gray-400"></div>
          </div>
        );
      })}
    </div>
  );
};

export default CalendarDay;
