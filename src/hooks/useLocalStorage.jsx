import { useEffect, useState } from "react";

// function useLocalStorage(favorite) {
//   useEffect(() => {
//     localStorage.setItem("Favorites", JSON.stringify(favorite));
//   }, [favorite]);
// }

function useLocalStorage(key, initial) {
  const [value, setValue] = useState(
    () => JSON.parse(localStorage.getItem(key)) || initial
  );
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value]);
  return [value, setValue];
}

export default useLocalStorage;
