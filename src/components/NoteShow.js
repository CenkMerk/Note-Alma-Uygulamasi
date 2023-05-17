import React from "react";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import "../Style/NoteShow.css";
import { useContext, useState } from "react";
import NotesContext from "../Context/Notes";
import { NoteCreate } from "./NoteCreate";

export const NoteShow = ({ note }) => {
  const { deleteNotesById, editNotesById, noteListStyle, darkMode } =
    useContext(NotesContext);

  const [showEdit, setShowEdit] = useState(false);

  //Alttaki fonksiyon delete ikonuna basıldığında tetiklenir ve
  //notu silmek içindir.
  const handleDeleteClick = () => {
    deleteNotesById(note.id);
  };

  //Alttaki fonksiyon edit ikonuna basıldığında tetiklenir ve notun edit formatına
  //geçmesini sağlar
  const handleEditClick = () => {
    setShowEdit(!showEdit);
  };

  //Alttaki fonksiyon edit halindeki notun güncelle butonuna tıklandıktan sonra
  //yeni verileri kaydetmek içindir.
  const handleSubmit = (id, updatedTitle, updatedDesc) => {
    setShowEdit(false);
    editNotesById(id, updatedTitle, updatedDesc);
  };

  const divWidth = {
    width: noteListStyle ? "calc(min(600px, max(245px, 50%)))" : "245px",
    border: darkMode ? "1px solid #e8eaed" : "none",
  };
  const darkModeStyle = {
    color: darkMode ? "#e8eaed" : "black",
  };
  return (
    <>
      {showEdit ? (
        <NoteCreate note={note} noteUpdate={true} onUpdate={handleSubmit} />
      ) : (
        <div
          className="NoteShowComponent animate__animated animate__fadeIn"
          style={divWidth}
        >
          <div>{note.title}</div>
          <div>{note.desc}</div>
          <div className="ButtonDiv">
            <button className="NoteButton">
              <AiOutlineDelete
                size={20}
                onClick={handleDeleteClick}
                style={darkModeStyle}
              />
            </button>
            <button className="NoteButton">
              <AiOutlineEdit
                size={20}
                onClick={handleEditClick}
                style={darkModeStyle}
              />
            </button>
          </div>
        </div>
      )}
    </>
  );
};
