import React from "react";
import "../Style/NoteCreate.css";
import { useState, useContext } from "react";
import NotesContext from "../Context/Notes";

export const NoteCreate = ({ note, noteUpdate, onUpdate }) => {
  const { createNote, noteListStyle, darkMode } = useContext(NotesContext);

  //note ? note.title : "" bu kısmın amacı eğer bir not değeri
  //var ise (ki bu edit işleminin olduğunu gösteriyor) title değerini ata,
  //yok ise boş değeri ata.
  const [title, setTitle] = useState(note ? note.title : "");
  const [desc, setDesc] = useState(note ? note.desc : "");

  //Alttaki iki fonksiyondan girilen input değerlerini value değerlerine atıyoruz
  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };
  const handleDescChange = (event) => {
    setDesc(event.target.value);
  };

  //Alttaki fonksiyonda kaydet butonuna basıldıktan sonraki eylemler yer alıyor
  const HandleSubmit = (event) => {
    event.preventDefault();
    //edit işlemi yapılıyorsa bu koşula girecek
    if (noteUpdate) {
      onUpdate(note.id, title, desc);
    } else {
      //başlık ve açıklama kısımlarının ikiside boş ise bu koşula girmeyecek
      if (title || desc) {
        createNote(title, desc);
        setTitle("");
        setDesc("");
      }
    }
  };
  const divWidth = {
    width: noteListStyle ? "calc(min(600px, max(245px, 50%)))" : "245px",
    boxShadow: "5px 6px 7px 5px slategray",
    border: darkMode ? "1px solid #e8eaed" : "none",
  };
  const darkModeStyleInput = {
    backgroundColor: darkMode ? "#202124" : "#e8eaed",
    color: darkMode ? "#e8eaed" : "#202124",
  };
  const darkModeStyleForm = {
    border: darkMode ? "1px solid #e8eaed" : "none",
  };
  const darkModeStyleButton = {
    color: darkMode ? "#e8eaed" : "#202124",
  };
  return (
    <>
      {noteUpdate ? (
        <form className="NoteForm animate__animated animate__fadeIn" style={divWidth}>
          <input
            className="TitleInput"
            placeholder="Başlık giriniz.."
            onChange={handleTitleChange}
            value={title}
            style={darkModeStyleInput}
          />
          <input
            className="DescInput"
            placeholder="Açıklama giriniz.."
            onChange={handleDescChange}
            value={desc}
            style={darkModeStyleInput}
          />
          <button className="SubmitButton" onClick={HandleSubmit} style={darkModeStyleButton}>
            Güncelle
          </button>
        </form>
      ) : (
        <div className="NoteCreateComponent animate__animated animate__fadeIn animate__delay-3s">
          <form className="NoteForm" style={darkModeStyleForm}>
            <input
              className="TitleInput"
              placeholder="Başlık giriniz.."
              onChange={handleTitleChange}
              value={title}
              style={darkModeStyleInput}
            />
            <input
              className="DescInput"
              placeholder="Açıklama giriniz.."
              onChange={handleDescChange}
              value={desc}
              style={darkModeStyleInput}
            />
            <button className="SubmitButton" onClick={HandleSubmit} style={darkModeStyleButton}>
              Kaydet
            </button>
          </form>
        </div>
      )}
    </>
  );
};
