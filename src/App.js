import "./App.css";
import 'animate.css';
import { Header } from "./components/Header";
import { NoteCreate } from "./components/NoteCreate";
import { NoteList } from "./components/NoteList";
import NotesContext from "./Context/Notes";
import { useContext } from "react";

function App() {
  const { darkMode } = useContext(NotesContext);

  const darkModeStyle = {
    backgroundColor: darkMode ? "#202124" : "#e8eaed",
    color: darkMode ? "#e8eaed" : "#202124"
  };

  return (
    <div className="App" style={darkModeStyle}>
      <Header />
      <NoteCreate />
      <NoteList />
    </div>
  );
}

export default App;
