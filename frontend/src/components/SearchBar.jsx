import { useState } from 'react';
import searchIcon from '../assets/magnifyingGlass.svg';
import trashIcon from '../assets/trash.svg';
import Loader from './Loader';

const SearchBar = ({ isLoading, setQuery }) => {
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

      <button
        disabled={isLoading}
        className={`rounded-md bg-[#822b2b] px-2 text-white ${isLoading ? 'opacity-75' : ''}`}
      >
        {isLoading ? (
          <Loader height="1rem" width="1rem" />
        ) : (
          <img className="h-6 w-6 stroke-white" src={searchIcon} />
        )}
      </button>
    </form>
  );
};

export default SearchBar;
