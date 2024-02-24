const Course = () => {
  return (
    <div className="flex h-full w-full flex-col">
      <div className="flex h-min w-full gap-2 rounded-t-md bg-lime-300 p-2">
        <input type="checkbox" />
        <span>Course code: Course name</span>
      </div>

      <div className="h-mini flex w-full gap-2 bg-gray-200 p-2">
        <input type="checkbox" />
        <span>Section: Code</span>
      </div>
    </div>
  );
};

export default Course;
