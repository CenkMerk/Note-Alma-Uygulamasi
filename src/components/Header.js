import React from "react";
import "../Style/Header.css";
import { MdOutlineDarkMode } from "react-icons/md";
import { CiGrid2H } from "react-icons/ci";
import { CiGrid41 } from "react-icons/ci";
import NotesContext from "../Context/Notes";
import { useContext } from "react";

export const Header = () => {
  const { setNoteListStyle,setDarkMode,darkMode } = useContext(NotesContext);

  const darkModeStyle = {
    color: darkMode ? "#e8eaed" : "black"
  };
  return (
    <nav className="HeaderComponent animate__animated animate__fadeIn animate__delay-2s">
      <h4>Not Alma Uygulaması</h4>
      <div className="NavbarIkonlar">
        <button className="NavbarIkon" style={darkModeStyle} onClick={() => setNoteListStyle(true)}>
          <CiGrid2H size={22} />
        </button>
        <button className="NavbarIkon" style={darkModeStyle} onClick={() => setNoteListStyle(false)}>
          <CiGrid41 size={22} />
        </button>
        <button className="NavbarDarkIkon">
          <MdOutlineDarkMode size={22} style={darkModeStyle} onClick={() => setDarkMode(!darkMode)}/>
        </button>
      </div>
    </nav>
  );
};
