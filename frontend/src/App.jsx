import CalendarDay from './components/CalendarDay';
import Course from './components/Course';
import DayNavigation from './components/DayNavigation';
import SearchBar from './components/SearchBar';

function App() {
  return (
    <div className="flex h-dvh flex-col justify-between rounded-bl-md bg-[#000]">
      <div className="h-[60%] w-dvw rounded-b-xl bg-[#f1f1f1] px-8 py-8 font-poppins font-light text-gray-400">
        <DayNavigation />
        <div className="h-full">
          <CalendarDay />
          <CalendarDay className="hidden" />
          <CalendarDay className="hidden" />
          <CalendarDay className="hidden" />
          <CalendarDay className="hidden" />
          <CalendarDay className="hidden" />
          <CalendarDay className="hidden" />
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
