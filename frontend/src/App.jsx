import axios from "axios";
import { useState } from "react";
function App() {
  const [notes, setNotes] = useState([]);

  async function fetchNotes() {
    try {
      const note = await axios.get("http://localhost:3000/notes");
      setNotes(note.data);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  }

  return (
    <>
      <div>Welcome To Users </div>

      <div>
        <button onClick={fetchNotes}>Fetch Notes</button>
        <ul>
          {notes.map((note) => (
            <li key={note.id}>
              {note.content} - {note.important ? "Important" : "Not Important"}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;
