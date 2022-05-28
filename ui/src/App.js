import axios from "axios";
import React, {useState, useEffect, useRef} from "react";
import './App.css';

function App() {

  const [notes, setNotes] = useState(null);
  const [isUpdate, setIsUpdate] = useState(false);

  
  const inputInfo = useRef(null);
  const inputTitle = useRef(null);
  const inputId = useRef(null);



  useEffect(() => {
    axios.get(
      'http://localhost:9090/api/notes',
      {
        withCredentials: false
      }
    ).then(response => {
      console.log(response.data);
      setNotes(response.data);
    });
  }, [isUpdate]);

  const addNote = () => {
    axios.post('http://localhost:9090/api/note/add',
    {
      title: inputTitle.current.value,
      info: inputInfo.current.value
    },
    {
      withCredentials: false
    }).then(() => {
      setIsUpdate(!isUpdate);
    });
  }

  const delNote = (id) => {
    axios.delete('http://localhost:9090/api/note/'+id,
    {
      withCredentials: false
    }).then(() => {
      setIsUpdate(!isUpdate);
    });
  }

  const editNote = (id) => {
    axios.put('http://localhost:9090/api/note/' + id,
    {
      title: inputTitle.current.value,
      info: inputInfo.current.value
    },
    {
      withCredentials: false
    }).then(() => {
      setIsUpdate(!isUpdate);
    });
  }
  
  return (
    <div className="main">
      <div className="App">
        <div className="Text">
          <div className="All_Boxes">
            <div className="Box_Note">
              <div className="Name_Note">
                <label className="Note_Name">Заголовок</label>
                <input ref={inputTitle} type="text"/>
              </div>
              <div className="Desc_Note">
                <label className="Note_Desc">Описание</label>
                <input ref={inputInfo} type="text"/>
              </div>
              <div className="Note_Add">
                <button onClick={() => addNote()}>Добавить</button>
              </div>
            </div>
          </div>
          <div className="box">
            {!!notes && notes.map((note, index) => (
              <div className="Note" key={index}>
                <div className="Note_text">{note.title} {note.info}</div>
                <div className="buttons">
                  <button className="Delete_Button" onClick={() => delNote(note.id)}>Удалить</button>
                  <button className="Edit_button" onClick={() => editNote(note.id)}>Редактировать</button>
                </div>
                {/* <div className="Modal_window"></div> */}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;


{/* <div className="Note_Text" key={index}>{note.title} {note.info}></div>
<button className="Delete_Button" onClick={() => delNote(note.id)}>Удалить</button> */}
