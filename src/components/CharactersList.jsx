import React from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
function CharactersList({ allCharacters, setselectedID, selectedID }) {
  return (
    <div className="characters-list">
      {allCharacters.map((onecharacter) => (
        <ListItem
          onecharacter={onecharacter}
          key={onecharacter.id}
          setselectedID={setselectedID}
          selectedID={selectedID}
        >
          {selectedID === onecharacter.id ? (
            <EyeSlashIcon
              className="eyeIcon"
              onClick={() => {
                setselectedID((prevID) =>
                  prevID === onecharacter.id ? null : onecharacter.id
                );
              }}
            />
          ) : (
            <EyeIcon
              className="eyeIcon"
              onClick={() => {
                setselectedID((prevID) =>
                  prevID === onecharacter.id ? null : onecharacter.id
                );
              }}
            />
          )}
        </ListItem>
      ))}
    </div>
  );
}

export default CharactersList;

export function ListItem({ onecharacter, children }) {
  return (
    <div className="list-item">
      <img src={onecharacter.image} alt={onecharacter.name} />
      <CharacterName onecharacter={onecharacter} />
      <CharacterInfo onecharacter={onecharacter} />
      {children}
    </div>
  );
}

function CharacterName({ onecharacter }) {
  return (
    <h3>
      <span>{onecharacter.gender === "Male" ? "🧑" : "👩"}</span>
      <span> {onecharacter.name}</span>
    </h3>
  );
}

function CharacterInfo({ onecharacter }) {
  return (
    <div className="list-item__info">
      <span
        className={`status ${onecharacter.status === "Dead" ? "red" : ""}`}
      ></span>
      <span> {onecharacter.status} </span>
      <span> - {onecharacter.species}</span>
    </div>
  );
}
