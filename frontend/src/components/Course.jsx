const Course = () => {
  return (
    <div className="flex h-min w-full flex-col overflow-clip rounded-md text-sm">
      <div className="flex h-min w-full gap-4 bg-lime-300 p-2 text-base">
        <input type="checkbox" />
        <span>ITI 1100: Raman Gupta</span>
      </div>

      <div className="flex h-min w-full gap-4 bg-gray-200 p-2">
        <input type="checkbox" />
        <span>Section A00</span>
      </div>

      <div className="flex h-min w-full gap-4 bg-white px-2">
        <input type="checkbox" />
        <div className="flex-grow-1 flex w-[60%] flex-col gap-1 py-2 font-thin">
          <span>
            <b>A00</b> Raman Gupta
          </span>
          <span>Tue 8:30 - 9:20</span>
          <span>Wed 1:00 - 2:20</span>
        </div>

        <span className="grid h-full flex-grow place-items-center border-l-2 border-l-gray-300 font-semibold">
          LEC
        </span>
      </div>
    </div>
  );
};

export default Course;
