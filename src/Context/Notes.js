import { createContext } from "react";
import { useState } from "react";

const NotesContext = createContext();

function Provider({ children }) {
  //"notes" state inde notlarımızı depoluyoruz.
  const [notes, setNotes] = useState([]);

  const [noteListStyle, setNoteListStyle] = useState(false);

  const [darkMode, setDarkMode] = useState(false);

  //"createNote" fonksiyonu "createdNotes" adlı geçiçi bir dizi oluşturuyor.
  //Bu diziye önce "notes" dizisindeki değerleri atıyor ve yeni gelen
  //title ve desc değerleriyle birlikte bir id ataması yapıp dizinin sonune bir obje daha
  //ekliyor. Son olarak "setNotes" ile "notes" dizisine "createdNotes" dizisini atıyor.
  const createNote = (title, desc) => {
    const createdNotes = [
      ...notes,
      {
        id: Math.round(Math.random() * 999999),
        title,
        desc,
      },
    ];
    setNotes(createdNotes);
  };

  //"deleteNotesById" fonksiyonunda gelen id değeriyle, "notes" adlı dizideki id değerlerini
  //kıyaslıyor.Eşleşmeyen id değerlerini "afterDeletingNotes" adlı geçiçi bir diziye aktarıyor.
  //Böylelikle eşleşen değerin ataması olmuyor ve silinmiş oluyor. Son olarak "afterDeletingNotes"
  //dizisini "setNotes" ile "notes" dizisine atıyor.
  const deleteNotesById = (id) => {
    const afterDeletingNotes = notes.filter((note) => {
      return note.id !== id;
    });
    setNotes(afterDeletingNotes);
  };

  //"editNotesById" fonksiyonunda "updatedNotes" adlı geçiçi bir dizi oluşturuyoruz
  //daha sonra "notes" dizisinde güncelenen notun id si ile eşleşmeyenleri değişiklik
  //yapmadan "updatedNotes" dizisine atıyoruz.
  //Eşleşen id de ise güncellenen değerlerin tekrar atamasını yapıp "updatedNotes" dizisine atıyoruz.
  //Son olarak "updatedNotes" dizisini "setNotes" ile "notes" dizisine atıyor.
  const editNotesById = (id, title, desc) => {
    //değerler boş ise notu sil
    if (!title && !desc) {
      return deleteNotesById(id);
    }
    const updatedNotes = notes.map((note) => {
      if (note.id === id) {
        return { id, title, desc };
      }
      return note;
    });
    setNotes(updatedNotes);
  };


  const sharedValuesAndMethods = {
    notes,
    createNote,
    deleteNotesById,
    editNotesById,
    noteListStyle,
    setNoteListStyle,
    darkMode,
    setDarkMode
  };

  return (
    <NotesContext.Provider value={sharedValuesAndMethods}>
      {children}
    </NotesContext.Provider>
  );
}

export { Provider };
export default NotesContext;
