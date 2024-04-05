import { useEffect, useState } from 'react';
import CalendarDay from './components/CalendarDay';
import Course from './components/Course';
import DayNavigation from './components/DayNavigation';
import SearchBar from './components/SearchBar';
import useFetch from './hooks/useFetch';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

  useEffect(
    function () {
      const customId = 'error-toast';
      const notifyError = (msg) => {
        toast(msg, {
          toastId: customId,
          type: 'error',
        });
      };

      if (error) {
        notifyError(error);
        setQuery('reset-error');
      }
    },
    [error],
  );

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover
        theme="light"
      />

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

        <div className="flex h-[35%] w-full flex-col gap-4 rounded-t-xl bg-[#f1f1f1] p-6">
          <SearchBar isLoading={isLoading} setQuery={setQuery} />

          <div className="no-scrollbar flex h-min flex-col gap-4 overflow-y-scroll rounded-md">
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
      </div>
    </>
  );
}

export default App;
