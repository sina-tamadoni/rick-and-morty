import { XCircleIcon } from "@heroicons/react/24/outline";
import React from "react";

function Modal({ children, isopen, setisopen }) {
  if (!isopen) {
    null;
  } else
    return (
      <div>
        <div className="backdrop" onClick={() => setisopen(false)}></div>
        <div className="modal">
          <div className="modal__header">
            <h2 className="title">Favorite Characters</h2>
            <button onClick={() => setisopen(false)}>
              <XCircleIcon className="icon close" />
            </button>
          </div>
          {children}
        </div>
      </div>
    );
}

export default Modal;
