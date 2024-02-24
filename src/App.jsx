import CalendarDay from './components/CalendarDay';
import DayNavigation from './components/DayNavigation';

function App() {
  return (
    <div className="h-dvh w-dvw px-6 py-6 font-poppins font-light text-gray-400">
      <DayNavigation />
      <CalendarDay />
      <div className="bg-red-500">hi</div>
    </div>
  );
}

export default App;
