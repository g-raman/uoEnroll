import { useState } from 'react';
import CalendarDay from './components/CalendarDay';
import Course from './components/Course';
import DayNavigation from './components/DayNavigation';
import SearchBar from './components/SearchBar';
import useFetch from './hooks/useFetch';

function App() {
  const [selectedDay, setSelectedDay] = useState(0);
  const [calendarItems, setCalendarItems] = useState([
    [],
    [],
    [],
    [],
    [],
    [],
    [],
  ]);

  const [query, setQuery] = useState('');
  const { data: searchResults, isLoading, error } = useFetch(query);

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
        <SearchBar isLoading={isLoading} setQuery={setQuery} />
        {searchResults.map((result, i) => {
          return (
            <Course
              setCalendarItems={setCalendarItems}
              calendar={calendarItems}
              course={result}
              key={i}
            />
          );
        })}
      </div>
    </div>
  );
}

export default App;
