import toast, { Toaster } from "react-hot-toast";
import "./App.css";
import CharacterDetails from "./components/CharacterDetails";
import CharactersList from "./components/CharactersList";
import Loading from "./components/Loading";
import Navbar, { Favorite, Search, SearchResult } from "./components/Navbar";
// import { allCharacters } from "../data/data";
import { useEffect, useState } from "react";
import axios from "axios";
import useCharacters from "./hooks/useCharacters";
import useLocalStorage from "./hooks/useLocalStorage";
// import Modal from "./components/Modal";

function App() {
  const [query, setquery] = useState("");
  const { characters, isLoading } = useCharacters(query);
  const [favorite, setfavorite] = useLocalStorage("Favorites", []);
  const [selectedID, setselectedID] = useState(null);
  // const [favorite, setfavorite] = useState(
  //   () => JSON.parse(localStorage.getItem("Favorites")) || []
  // );
  // useLocalStorage(favorite)

  // const [toast, settoast] = useState("second")

  // Don't fetch on this way: Because here is Render Logic and we have not permission to fetch api here
  // fetch("https://rickandmortyapi.com/api/character")
  //   .then((response) => response.json())
  //   // .then((data) => console.log(data.results))
  //   .then(({ results }) => console.log(results));

  // useEffect(() => {
  //   setisLoading(true);
  //   fetch("https://rickandmortyapi.com/api/characterfsafa")
  //     .then((response) => {
  //       if (!response.ok) {
  //         throw new Error("No data was received");
  //       }
  //       return response.json();
  //     })
  //     .then(({ results }) => {
  //       setcharacters(results.slice(0, 5));
  //       toast.success("Hooooraaaa");
  //     })
  //     .catch(({ message }) => toast.error(message))
  //     .finally(setisLoading(false));
  // }, []);

  // useEffect(() => {
  //   async function fetchData() {
  //     setisLoading(true);
  //     try {
  //       const response = await fetch(
  //         "https://rickandmortyapi.com/api/characterبلث"
  //       );
  //       // console.log(response.ok);
  //       if (!response.ok) {
  //         throw new Error("No data was received");
  //       }
  //       const jsonResponse = response.json();
  //       const { results } = await jsonResponse;
  //       setcharacters(results.slice(0, 7));
  //       toast.success("Data received successfully");
  //       // setisLoading(false);
  //     } catch ({ message }) {
  //       // setisLoading(false);
  //       // console.log(message);
  //       toast.error(message);
  //     } finally {
  //       setisLoading(false);
  //     }
  //   }
  //   fetchData();
  // }, []);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setcount((prevCount) => prevCount + 1);
  //   }, 1000);
  //   return () => {
  //     clearInterval(interval);
  //   };
  // }, [count]);

  const addoToFavoriteHandler = (character) => {
    setfavorite((prevChar) => [...prevChar, character]);
  };

  const isThere = favorite.map((item) => item.id).includes(selectedID); // ! [1,2,3,4].includes(selectedID) =====>> true/false

  function deleteHandler(id) {
    // const filteredChars = favorite.filter(
    //   (oneCharacter) => oneCharacter.id !== id
    // );
    // setfavorite(filteredChars);
    setfavorite((prevChars) =>
      prevChars.filter((oneChar) => oneChar.id !== id)
    );
  }

  return (
    <div className="app">
      <Navbar>
        <Search query={query} setquery={setquery} />
        <SearchResult length={characters.length} />
        <Favorite favorite={favorite} deleteHandler={deleteHandler} />
      </Navbar>
      <div className="main">
        {isLoading ? (
          <Loading />
        ) : (
          <CharactersList
            allCharacters={characters}
            setselectedID={setselectedID}
            selectedID={selectedID}
          />
        )}
        <CharacterDetails
          selectedID={selectedID}
          addoToFavorite={addoToFavoriteHandler}
          isThere={isThere}
        />
        <Toaster />
      </div>
    </div>
  );
}

export default App;
