import React, { useState } from "react";
import logo from "../assets/Rick-And-Morty-Logo-PNG-HD-Quality.png";
import {
  HeartIcon,
  MagnifyingGlassIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import Modal from "./Modal";
import { ListItem } from "./CharactersList";

function Navbar({ children }) {
  return (
    <div className="navbar">
      <Logo />
      {children}
    </div>
  );
}

export default Navbar;

function Logo() {
  return (
    <div className="navbar__logo">
      <img src={logo} alt="logo" style={{ width: "150px" }} />
    </div>
  );
}

export function Search({ query, setquery }) {
  return (
    <div id="navbar__search">
      <input
        value={query}
        onChange={(event) => setquery(event.target.value)}
        type="text"
        name=""
        placeholder="Search..."
      />
      <MagnifyingGlassIcon style={{ width: "20px", color: "whitesmoke" }} />
    </div>
  );
}

export function SearchResult({ length }) {
  return <div className="navbar__result">Found {length} Characters</div>;
}

export function Favorite({ favorite, deleteHandler }) {
  const [isopen, setisopen] = useState(false);
  return (
    <>
      <Modal isopen={isopen} setisopen={setisopen}>
        <div className="characters-list">
          {favorite.map((onecharacter) => (
            <ListItem onecharacter={onecharacter} key={onecharacter.id}>
              <TrashIcon
                className="eyeIcon"
                onClick={() => deleteHandler(onecharacter.id)}
              />
            </ListItem>
          ))}
        </div>
      </Modal>
      <button className="heart">
        <HeartIcon
          className="navbar__heart-icon"
          onClick={() => setisopen(true)}
        />
        <span className="badge">{favorite.length}</span>
      </button>
    </>
  );
}
