import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

import { addCommentThunk } from "../../store/modules/user/thunk";

import React from "react";
import "./style.css";

function User() {
  const [newName, setNewName] = useState("");
  const dispatch = useDispatch();

  const comment = useSelector((state) => state.user.comments);

  console.log(comment);

  function handleClick() {
    dispatch(addCommentThunk(newName));
  }

  return (
    <div className="container">
      <h2>Comentário:</h2>

      {comment.map((value, index) => {
        return <p key={index}>{value}</p>;
      })}

      <input
        type="text"
        placeholder="Insira comentário"
        onChange={(e) => setNewName(e.target.value)}
      />
      <button onClick={handleClick}>Adicionar comentário</button>
    </div>
  );
}

export default User;
