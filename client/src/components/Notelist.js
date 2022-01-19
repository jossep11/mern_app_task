import { React, useState, useEffect } from "react";
import axios from "axios";
import { format } from "timeago.js";

export default function Notelist() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    const users = await axios
      .get("http://localhost:4000/api/notes")
      .then((res) => setNotes(res.data))
      .catch((error) => console.log(error));
  };
  const deleteNote = async (id) => {
    console.log(id);
    await axios.delete(`http://localhost:4000/api/notes/${id}`);
    getUsers();
  };

  return (
    <div className="row">
      {notes.map((notes) => (
        <div className="col-md-4 p-2" key={notes._id}>
          <div className="card">
            <div className="card-header">
              <h5>{notes.title}</h5>
            </div>
            <div className="card-body">
              <p>{notes.note}</p>
              <p>{notes.author}</p>
              <p>{format(notes.createdAt)}</p>
            </div>
            <div className="card-footer ">
              <button
                className="btn btn-danger btn_delete"
                onClick={() => deleteNote(notes._id)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
