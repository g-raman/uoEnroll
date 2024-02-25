import { useState } from 'react';
import CalendarDay from './components/CalendarDay';
import CalendarItem from './components/CalendarItem';
import Course from './components/Course';
import DayNavigation from './components/DayNavigation';
import SearchBar from './components/SearchBar';

function App() {
  const [selectedDay, setSelectedDay] = useState(0);

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
                className={`${selectedDay === i ? '' : 'hidden'}`}
              />
            );
          })}
        </div>
      </div>

      <div className="flex h-[35%] w-full flex-col gap-4 rounded-t-xl bg-[#f1f1f1] p-6">
        <SearchBar />
        <Course />
      </div>
    </div>
  );
}

export default App;
