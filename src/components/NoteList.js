import React from "react";
import { useContext } from "react";
import NotesContext from "../Context/Notes";
import { NoteShow } from "./NoteShow";
import "../Style/NoteList.css";

export const NoteList = () => {
  const { notes, noteListStyle } = useContext(NotesContext);
  
  return (
    <div className={noteListStyle ? 'Grid-mode' : 'FlexWrap-mode'}>
      {notes.map((note, index) => {
        return <NoteShow key={index} note={note} />;
      })}
    </div>
  );
};
