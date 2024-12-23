import { useState, useEffect } from "react"; // Import react hooks
import notes_api from "../services/notes";
import Note from "../components/Note";
import "../styles/Home.css";

function Home() {
  // Define the variables
  const [notes, setNotes] = useState([]);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");

  // load the notes
  useEffect(() => {
    getNotes();
  }, []);

  // functions
  const getNotes = () => {
    notes_api
      .get("/notes/create/")
      .then((res) => res.data)
      .then((data) => {
        setNotes(data);
        console.log(data);
      })
      .catch((err) => alert(err));
  };

  const deleteNote = (id) => {
    notes_api
      .delete(`/notes/delete/${id}/`)
      .then((res) => {
        if (res.status === 204) alert("Note deleted");
        else alert("Failed to delete note");
        getNotes();
      })
      .catch((err) => alert(err));
  };

  const createNote = (e) => {
    e.preventDefault();
    notes_api
      .post("/notes/create/", { content, title })
      .then((res) => {
        if (res.status === 201) alert("Note created");
        else alert("Failed to create note");
        getNotes();
      })
      .catch((err) => alert(err));
  };

  return (
    <div>
      <div>
        <h2>Notes</h2>
        {notes.map((note) => (
          <Note note={note} onDelete={deleteNote} key={note.id} />
        ))}
      </div>
      <h2>Create a Note</h2>
      <form onSubmit={createNote}>
        <label htmlFor="title">Title:</label>
        <br />
        <input
          type="text"
          id="title"
          name="title"
          required
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
        <br />
        <label htmlFor="content">Content:</label>
        <br />
        <textarea
          name="content"
          id="content"
          required
          onChange={(e) => setContent(e.target.value)}
          value={content}
        ></textarea>
        <br />
        <input type="submit" value="Submit" />
        
      </form>
    </div>
  );
}

export default Home;
