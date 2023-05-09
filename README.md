# Not Alma Uygulaması

### 💡 Kazanımlar

- useState kullanımı

- useEffect kullanımı

- axios ile api ye istek atma

- json tipindeki veriyi okuma ve kullanma

### Proje Adımları

Projenizin için bir klasör oluşturun ve bu klasör içinde React projenizi oluşturun.

`npx create-react-app .`

Sondaki nokta bulunduğunuz klasör içinde projenizi kurmak için gereklidir. Bu komutu kullandığınız klasör boş olmalıdır.

Projeniz kurulduktan sonra `src` klasörü içindeki şu dosyalar hariç diğer dosyaları silin: `App.css`, `App.js`,`index.css`, `index.js`.

`public` klasörü içindeki `index.html` hariç diğer dosyaları silin.

Şimdi de bu dosyaların içlerini temizleyelim.

`App.css` içini tamamen silin.

`App.js`

```javascript
import "./App.css";

function App() {
  return <div className="App"></div>;
}

export default App;
```

`index.css`

```css
body {
  margin: 0;
}
```

`index.js`

```javascript
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
```

`index.html`

```html
<!DOCTYPE html>
<html lang="tr">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Not Alma Uygulaması</title>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>
```

Uygulamamızı en basit haliyle çalışır hale getirdik. Şimdi terminalden uygulamamızı başlatalım.

`npm start`

Şimdi `src` klasörünün altına `components` adlı klasör açalım.

İlk olarak `header` kısmını yapacağız. `components` klasörünün altına gelip `Header.js` dosyamızı
oluşturalım. Bu dosyayı daha sonra `App.js` de import edelim.

`App.js`

```javascript
import "./App.css";
import { Header } from "./components/Header";

function App() {
  return (
    <div className="App">
      <Header />
    </div>
  );
}

export default App;
```

İkonları kullana bilmek için terminale:

`npm install react-icons`

İlk olarak navbar kısmını yapalım. Bu kısımda notlarımızın görünümünü belirleyen ikonlar ve tema
modumuzu belirleyen bir ikon olacak.

`Header.js`

```javascript
import React from "react";
import "../Style/Header.css";
import { MdOutlineDarkMode } from "react-icons/md";
import { CiGrid2H } from "react-icons/ci";
import { CiGrid41 } from "react-icons/ci";

export const Header = () => {
  return (
    <nav className="HeaderComponent">
      <h4>Not Alma Uygulaması</h4>
      <div className="NavbarIkonlar">
        <button className="NavbarIkon">
          <CiGrid2H size={22} />
        </button>
        <button className="NavbarIkon">
          <CiGrid41 size={22} />
        </button>
        <button className="NavbarIkon">
          <MdOutlineDarkMode size={22} />
        </button>
      </div>
    </nav>
  );
};
```

Şimdi de `components` klasörünün altına gelip `NoteCreate.js` dosyamızı oluşturalım. Bu dosyayı daha
sonra `App.js` de import edelim. Burada bir formumuz olacak ve girilen değerleri buradan alacağız.

`NoteCreate.js`

```javascript
import React from "react";
import "../Style/NoteCreate.css";
import { useState } from "react";

export const NoteCreate = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

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
    if (title || desc) {
      console.log(title, desc);
      //kayıt yapıldıktan sonra inputların içini boşaltalım
      setTitle("");
      setDesc("");
    }
  };

  return (
    <div className="NoteCreateComponent">
      <form className="NoteForm">
        <input
          className="TitleInput"
          placeholder="Başlık giriniz.."
          onChange={handleTitleChange}
          value={title}
        />
        <input
          className="DescInput"
          placeholder="Açıklama giriniz.."
          onChange={handleDescChange}
          value={desc}
        />
        <button className="SubmitButton" onClick={HandleSubmit}>
          Kaydet
        </button>
      </form>
    </div>
  );
};
```

Verilerimizi diğer componentlerle rahatlıkla paylaşabilmek için `contex api` yapımızı oluşturalım.

`src` klasörünün altına gidip `Context` adlı bir klasör oluşturalım. Bu klasörün altına gidip
`Notes.js` adlı dosyamızı oluşturalım.

`Notes.js`

```javascript
import { createContext } from "react";
import { useState } from "react";

const NotesContext = createContext();

function Provider({ children }) {
  //bu kısımda değerlerimiz ve fonksiyonlarımız olacak
  const sharedValuesAndMethods = {
    //bu kısımda ise paylaşacağımız değerler ve fonksiyonlar olacak
  };

  return (
    <NotesContext.Provider value={sharedValuesAndMethods}>
      {children}
    </NotesContext.Provider>
  );
}

export { Provider };
export default NotesContext;
```

Şimdi de `index.js` e gidip App i sarmalayalım.

```javascript
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "./Context/Notes";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider>
    <App />
  </Provider>
);
```

`Notes.js` e gidelim notlarımızı tutan bir useState, gelen değerleri useState e ekleyen bir
fonksiyon oluşturalım. Bu notların olduğu useState i ve notları oluşturan fonksiyonu paylaşalım.

`Notes.js`

```javascript
import { createContext } from "react";
import { useState } from "react";

const NotesContext = createContext();

function Provider({ children }) {
  //"notes" state inde notlarımızı depoluyoruz.
  const [notes, setNotes] = useState([]);
  console.log(notes);

  //"createNote" fonksiyonu "createdNotes" adlı geçiçi bir dizi oluşturuyor.
  //Bu diziye önce "notes" dizisindeki değerleri atıyor ve yeni gelen
  //title ve desc değerleriyle birlikte bir id ataması yapıp dizinin sonune bir obje daha
  //ekliyor. Son olarak "setNotes" ile "notes" dizisine "createdNotes" dizisini atıyor.
  //id değeri silme ve düzenlemene gerekli.
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

  const sharedValuesAndMethods = {
    notes,
    createNote,
  };

  return (
    <NotesContext.Provider value={sharedValuesAndMethods}>
      {children}
    </NotesContext.Provider>
  );
}

export { Provider };
export default NotesContext;
```

`NoteCreate.js` gidelim ve kaydet butonuna tıklandığında `createNote()` fonksiyonunu çağıralım.
Önce importumuzu yapalım.

`import NotesContext from "../Context/Notes"`

Şimdi de context ten kullanacağımız fonksiyonu tanımlayalım

` const { createNote } = useContext(NotesContext)`

Şimdi de `HandleSubmit` fonksiyonumuzda `createNote()` fonksiyonunu çağıralım.

```javascript
const HandleSubmit = (event) => {
  event.preventDefault();
  if (title || desc) {
    createNote(title, desc);
    //kayıt yapıldıktan sonra inputların içini boşaltalım
    setTitle("");
    setDesc("");
  }
};
```

Notlarımızı listeleyeceğimiz bir component oluşturalım. Daha sonra da notlarımız göstereceğimiz
başka bir component çağıralım.

`components` klasörünün altında `NoteList.js` adlı dosyamızı oluşturalım.
Burada context yapısıyla notların tutulduğu diziye erişelim ve map fonksiyonuyla bunların
her birini konsola yazdıralım.

```javascript
import React from "react";
import { useContext } from "react";
import NotesContext from "../Context/Notes";

export const NoteList = () => {
  const { notes } = useContext(NotesContext);
  return (
    <div>
      {notes.map((note, index) => {
        console.log(note);
      })}
    </div>
  );
};
```

Konsolda bir sorun gözükmüyor tüm notlarım geliyor. Şimdi konsola yazdırmak yerine bu notları bir
componente gönderelim ve orada gösterelim.

`components` klasörünün altına gidip `NoteShow.js` adlı bir dosya oluşturalım.
`NoteList` i de düzenleyelim.

`NoteList`

```javascript
import React from "react";
import { useContext } from "react";
import NotesContext from "../Context/Notes";
import { NoteShow } from "./NoteShow";
import "../Style/NoteList.css";

export const NoteList = () => {
  const { notes } = useContext(NotesContext);
  return (
    <div className="NoteListComponent">
      {notes.map((note, index) => {
        return <NoteShow key={index} note={note} />;
      })}
    </div>
  );
};
```

`NoteShow.js` i de düzenleyelim.

`NoteShow.js`

```javascript
import React from "react";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import "../Style/NoteShow.css";

export const NoteShow = ({ note }) => {
  return (
    <div className="NoteShowComponent">
      <div>{note.title}</div>
      <div>{note.desc}</div>
      <div className="ButtonDiv">
        <button className="NoteButton">
          <AiOutlineDelete size={20} />
        </button>
        <button className="NoteButton">
          <AiOutlineEdit size={20} />
        </button>
      </div>
    </div>
  );
};
```

`Note.js` e gidelim ve silme aksiyonumuzu yerine getirecek fonksiyonumuzu yazalım ve bu
fonksiyonumuzu tüm componentlere açalım.

```javascript
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
const sharedValuesAndMethods = {
  notes,
  createNote,
  deleteNotesById,
};
```

`NoteShow.js` e gidelim ve silme butonu tıklandığında `deleteNotesById()` fonksiyonunu
tetikleyelim.

`NoteShow.js`

```javascript
import React from "react";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import "../Style/NoteShow.css";
import { useContext } from "react";
import NotesContext from "../Context/Notes";

export const NoteShow = ({ note }) => {
  const { deleteNotesById } = useContext(NotesContext);

  //Alttaki fonksiyon delete ikonuna basıldığında tetiklenir ve
  //notu silmek içindir.
  const handleDeleteClick = () => {
    deleteNotesById(note.id);
  };
  return (
    <div className="NoteShowComponent">
      <div>{note.title}</div>
      <div>{note.desc}</div>
      <div className="ButtonDiv">
        <button className="NoteButton">
          <AiOutlineDelete size={20} onClick={handleDeleteClick} />
        </button>
        <button className="NoteButton">
          <AiOutlineEdit size={20} />
        </button>
      </div>
    </div>
  );
};
```

Şimdi de düzenleme işini yapalım.

`NoteShow.js` e gidelim ve edit işlemini kontrol edeceğimiz `showEdit` adında bir useState
oluşturalım.
Bu state true olduğunda notun edit formunu, false olduğunda ise normal halini
gösterelim.
Edit formatında iken; notun içindeki verileri, edit işleminin yapıldığını
gösteren bir değer ve edit işlemi tamamlanınca gidilecek olan fonksiyonu props
olarak `NoteCreate.js` a gönderelim.

`NoteShow.js`

```javascript
import React from "react";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import "../Style/NoteShow.css";
import { useContext, useState } from "react";
import NotesContext from "../Context/Notes";
import { NoteCreate } from "./NoteCreate";

export const NoteShow = ({ note }) => {
  const { deleteNotesById, editNotesById } = useContext(NotesContext);

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
  return (
    <>
      {showEdit ? (
        <NoteCreate note={note} noteUpdate={true} onUpdate={handleSubmit} />
      ) : (
        <div className="NoteShowComponent">
          <div>{note.title}</div>
          <div>{note.desc}</div>
          <div className="ButtonDiv">
            <button className="NoteButton">
              <AiOutlineDelete size={20} onClick={handleDeleteClick} />
            </button>
            <button className="NoteButton">
              <AiOutlineEdit size={20} onClick={handleEditClick} />
            </button>
          </div>
        </div>
      )}
    </>
  );
};
```

`NoteCreate.js` e gidelim ve `noteUpdate` true iken edit formatını false iken normal formatını
gösterelim. Güncelle butonuna tıklandığında yeni değerleri bir üst componente yani `NoteShow.js`
e gönderen bir fonksiyon yazalım.

`NoteCreate.js`

```javascript
import React from "react";
import "../Style/NoteCreate.css";
import { useState, useContext } from "react";
import NotesContext from "../Context/Notes";

export const NoteCreate = ({ note, noteUpdate, onUpdate }) => {
  const { createNote } = useContext(NotesContext);

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

  return (
    <>
      {noteUpdate ? (
        <form className="NoteForm" style={{ width: "245px" }}>
          <input
            className="TitleInput"
            placeholder="Başlık giriniz.."
            onChange={handleTitleChange}
            value={title}
          />
          <input
            className="DescInput"
            placeholder="Açıklama giriniz.."
            onChange={handleDescChange}
            value={desc}
          />
          <button
            className="SubmitButton"
            style={{ color: "white", backgroundColor: "green" }}
            onClick={HandleSubmit}
          >
            Güncelle
          </button>
        </form>
      ) : (
        <div className="NoteCreateComponent">
          <form className="NoteForm">
            <input
              className="TitleInput"
              placeholder="Başlık giriniz.."
              onChange={handleTitleChange}
              value={title}
            />
            <input
              className="DescInput"
              placeholder="Açıklama giriniz.."
              onChange={handleDescChange}
              value={desc}
            />
            <button className="SubmitButton" onClick={HandleSubmit}>
              Kaydet
            </button>
          </form>
        </div>
      )}
    </>
  );
};
```

Şimdi son olarak `NoteShow.js` e gidelim ve güncel değerleri `Note.js` de oluşturacağımız
`EditNoteById` adlı fonksiyona gönderelim.

Bunun için `NoteShow.js` e şu fonksiyonu ekleyelim.

`NoteShow.js`

```javascript
//Alttaki fonksiyon edit halindeki notun güncelle butonuna tıklandıktan sonra
//yeni verileri kaydetmek içindir.
const handleSubmit = (id, updatedTitle, updatedDesc) => {
  setShowEdit(false);
  editNotesById(id, updatedTitle, updatedDesc);
};
```

`Note.js` e gidip `EditNoteById` fonksiyonumuzu oluşturup paylaşalım.

```javascript
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
```

Artık projemiz note oluşturma, silme, güncelleme işlemlerini yapıyor.