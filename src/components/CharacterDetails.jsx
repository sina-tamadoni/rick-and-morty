import React, { useEffect, useState } from "react";
// import { character, episodes } from "../../data/data";
import { ArrowUpCircleIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import toast from "react-hot-toast";

function CharacterDetails({ selectedID, addoToFavorite, isThere }) {
  const [selectedChar, setselectedChar] = useState(null);
  const [episodes, setepisodes] = useState(null);
  const [isLoading, setisLoading] = useState(false);

  useEffect(() => {
    async function getCharacter() {
      setisLoading(true);
      try {
        const { data } = await axios.get(
          `https://rickandmortyapi.com/api/character/${selectedID}`
        );
        setselectedChar(data);

        const { episode } = await data;
        // console.log(episode);
        let episodeNum = episode.map((eps) => eps.split("/").at(-1));
        // console.log(episodeNum);

        const { data: episodeData } = await axios.get(
          `https://rickandmortyapi.com/api/episode/${episodeNum}`
        );
        // console.log(episodeData); // !وقتی چند اپیزود داشته باشد خروجی به صورت آرایه است اما وقتی یک اپیزود داشته باشد خروجی به صورت آبجکت است
        setepisodes([episodeData].flat()); //! [{}, [{},{},{}], {},{},[{},{}],[{}]].flat() =====> [{},{},{},{},{},{},{},{},{}]
        // console.log(selectedChar);
      } catch ({ message }) {
        toast.error(message);
      } finally {
        setisLoading(false);
      }
    }
    if (selectedID) getCharacter();
  }, [selectedID]);

  if (isLoading) {
    return (
      <div className="loadingContainer">
        <LoadingSpinner />
      </div>
    );
  }
  if (!selectedChar || !selectedID) {
    return <div className="empty">Please Select a Character</div>;
  }
  return (
    <div style={{ width: "57.5%" }}>
      <Character
        selectedChar={selectedChar}
        addoToFavorite={addoToFavorite}
        isThere={isThere}
      />
      <Episode episodes={episodes} />
    </div>
  );
}

export default CharacterDetails;

function Character({ selectedChar, addoToFavorite, isThere }) {
  return (
    <div className="character-details">
      <img src={selectedChar.image} alt="" className="character-detail__img" />
      <div className="character-detail__info">
        <h3 className="name">
          <span>{selectedChar.gender === "Male" ? "🧑" : "👩"}</span>
          <span> {selectedChar.name}</span>
        </h3>
        <div className="info">
          &nbsp;&nbsp;
          <span
            className={`status ${selectedChar.status === "Dead" ? "red" : ""}`}
          ></span>
          <span>&nbsp;&nbsp;{selectedChar.status} </span>
          <span> - &nbsp;{selectedChar.species}</span>
        </div>
        <div className="location">
          <p style={{ color: "silver" }}>Last known location:</p>
          <p style={{ color: "white" }}>{selectedChar.location.name}</p>
        </div>
        <div className="actions">
          {
            <button
              onClick={!isThere ? () => addoToFavorite(selectedChar) : null}
              style={{ cursor: isThere ? "not-allowed" : "pointer" }}
            >
              {isThere ? "This Character Added To Favorite" : "Add to favorite"}
            </button>
          }
        </div>
      </div>
    </div>
  );
}

function Episode({ episodes }) {
  // console.log(episodes);
  const [sort, setsort] = useState(false);
  let filteredEpisodes;
  // console.log(new Date(filteredEpisodes[0].created));

  function sortingHandler() {
    setsort((prevSort) => !prevSort);
  }
  if (sort) {
    filteredEpisodes = [...episodes].sort(
      (a, b) => new Date(a.created) - new Date(b.created)
    );
  } else
    filteredEpisodes = [...episodes].sort(
      (a, b) => new Date(b.created) - new Date(a.created)
    );

  return (
    <div className="character-episodes">
      <div className="title">
        <h2>List of Episodes:</h2>
        <button
          style={{
            rotate: sort ? "180deg" : "0deg",
            transition: "rotate .2s ease-in-out",
          }}
          onClick={sortingHandler}
        >
          <ArrowUpCircleIcon className="arrow" />
        </button>
      </div>
      <ul className="timeAndDate">
        {filteredEpisodes.map((episode, index) => {
          // console.log(episode);
          return (
            <li key={episode.id}>
              <div>
                {String(index + 1).padStart(2, "0")} - {episode.episode} :{" "}
                <strong>{episode.name}</strong>
              </div>
              <div className="date">{episode.air_date}</div>
            </li>
          );
        })}
      </ul>
      <ul></ul>
    </div>
  );
}

function LoadingSpinner() {
  return (
    <div className="spinner-container">
      <div className="loading-spinner"></div>
    </div>
  );
}

{
  /* <div className="character-episodes">
<div className="title">
  <h2>List of Episodes:</h2>
  <button onClick={() => setSortby((is) => !is)}>
    <ArrowUpCircleIcon
      className="icon"
      style={{ rotate: sortBy ? "0deg" : "180deg" }}
    />
  </button>
</div>
<ul>
  {sortedEpisodes.map((item, index) => (
    <li key={item.id}>
      <div>
        {String(index + 1).padStart(2, "0")} - {item.episode} :{" "}
        <strong>{item.name}</strong>
      </div>
      <div className="badge badge--secondary">{item.air_date}</div>
    </li>
  ))}
</ul>
</div> */
}
