import { useEffect, useState } from 'react';
import CalendarDay from './components/CalendarDay';
import Course from './components/Course';
import DayNavigation from './components/DayNavigation';
import SearchBar from './components/SearchBar';

const testCourse1 = {
  startHour: 8,
  startMin: 30,
  endHour: 9,
  endMin: 50,
};

const testCourse2 = {
  startHour: 13,
  startMin: 0,
  endHour: 14,
  endMin: 20,
};

function App() {
  const [selectedDay, setSelectedDay] = useState(0);
  const [calendarItems, setCalendarItems] = useState([
    [testCourse1],
    [testCourse2],
    [],
    [],
    [],
    [],
    [],
  ]);

  const [searchResults, setSearchResults] = useState([]);

  useEffect(function () {
    async function getCourse() {
      const res = await fetch('http://localhost:8080/api/v1/courses/ITI1100');
      const data = await res.json();
      setSearchResults((results) => [...results, data.data]);
    }
    getCourse();
  }, []);

  console.log(searchResults);

  function handleSelectDay(index) {
    setSelectedDay(index);
  }

  return (
    <div className="flex h-dvh flex-col justify-between rounded-bl-md bg-[#000]">
      <div className="h-[60%] w-dvw rounded-b-xl bg-[#f1f1f1] px-8 py-8 font-poppins font-light text-gray-400">
        <DayNavigation
          onSelectDay={handleSelectDay}
          selectedDay={selectedDay}
        />
        <div className="h-full">
          {Array.from({ length: 7 }).map((_, i) => {
            return (
              <CalendarDay
                key={i}
                items={calendarItems[i]}
                className={`${selectedDay === i ? '' : 'hidden'}`}
              />
            );
          })}
        </div>
      </div>

      <div className="flex h-[35%] w-full flex-col gap-4 overflow-scroll rounded-t-xl bg-[#f1f1f1] p-6">
        <SearchBar />
        <Course />
        <Course />
        <Course />
      </div>
    </div>
  );
}

export default App;
