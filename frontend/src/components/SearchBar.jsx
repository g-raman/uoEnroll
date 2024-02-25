import { useState } from 'react';

const SearchBar = ({ setQuery }) => {
  const [inputValue, setInputValue] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    const query = inputValue.trim().replaceAll(' ', '').toUpperCase();
    setQuery(query);
  }

  return (
    <form className="flex gap-3" onSubmit={(e) => handleSubmit(e)}>
      <input
        className="w-full rounded-md p-2 font-poppins text-xs font-normal"
        placeholder="Search for a class like CSI 2110..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value.toUpperCase())}
      />
      <button className="rounded-md bg-sky-400 px-4">Submit</button>
    </form>
  );
};

export default SearchBar;
