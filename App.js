import React, { useState, useEffect, useRef } from "react";

function App() {
  const [notes, setNotes] = useState([]);
  const [text, setText] = useState("");
  const [editId, setEditId] = useState(null);

  const inputRef = useRef();

  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem("notes")) || [];
    setNotes(savedNotes);
  }, []);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const addNote = () => {
    if (!text.trim()) return;

    if (editId) {
      setNotes(
        notes.map((note) =>
          note.id === editId ? { ...note, text } : note
        )
      );
      setEditId(null);
    } else {
      setNotes([
        ...notes,
        {
          id: Date.now(),
          text,
        },
      ]);
    }

    setText("");
    inputRef.current.focus();
  };

  const editNote = (note) => {
    setText(note.text);
    setEditId(note.id);
    inputRef.current.focus();
  };

  const deleteNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  return (
    <div className="container">
      <h1>📝 Notes App</h1>

      <div className="input-section">
        <input
          ref={inputRef}
          type="text"
          placeholder="Enter a note..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <button onClick={addNote}>
          {editId ? "Update" : "Add"}
        </button>
      </div>

      <div className="notes-list">
        {notes.map((note) => (
          <div className="note-card" key={note.id}>
            <p>{note.text}</p>

            <div className="actions">
              <button onClick={() => editNote(note)}>
                Edit
              </button>

              <button
                className="delete"
                onClick={() => deleteNote(note.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;