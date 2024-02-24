const DayNavigation = () => {
  const DAYS = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

  return (
    <div className="flex w-full justify-between">
      {DAYS.map((day, i) => {
        return <span key={i}>{day}</span>;
      })}
    </div>
  );
};

export default DayNavigation;
