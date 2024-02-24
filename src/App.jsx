import CalendarDay from './components/CalendarDay';
import DayNavigation from './components/DayNavigation';

function App() {
  return (
    <div className="flex h-dvh flex-col justify-between rounded-bl-md bg-[#000]">
      <div className="h-[60%] w-dvw rounded-b-xl bg-[#f1f1f1] px-8 py-8 font-poppins font-light text-gray-400">
        <DayNavigation />
        <CalendarDay />
      </div>

      <div className="h-[35%] w-full rounded-t-xl bg-[#f1f1f1]"></div>
    </div>
  );
}

export default App;
