const CourseComponent = ({ component, type }) => {
  return (
    <div className="flex w-full flex-grow gap-4 bg-white px-2">
      <input type="checkbox" />
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
