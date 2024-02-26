import { useState } from 'react';
import searchIcon from '../assets/magnifyingGlass.svg';
import trashIcon from '../assets/trash.svg';

const SearchBar = ({ setQuery }) => {
  const [inputValue, setInputValue] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    const query = inputValue.trim().replaceAll(' ', '').toUpperCase();
    setQuery(query);
  }

  function handleDelete() {
    event.preventDefault();
    setQuery('reset');
  }

  function handleKeyDown(event) {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleSubmit(event);
    }
  }

  return (
    <form className="flex gap-3" onSubmit={(e) => handleSubmit(e)}>
      <input
        className="w-full rounded-md p-2 font-poppins text-xs font-normal"
        onKeyDown={(e) => handleKeyDown(e)}
        placeholder="Search for a class like CSI 2110..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value.toUpperCase())}
      />

      <button
        onClick={handleDelete}
        className="rounded-md border-[1px] border-black bg-gray-200 px-2"
      >
        <img className="h-6 w-6 stroke-white" src={trashIcon} />
      </button>

      <button className="rounded-md bg-[#822B2B] px-2 text-white">
        <img className="h-6 w-6 stroke-white" src={searchIcon} />
      </button>
    </form>
  );
};

export default SearchBar;
